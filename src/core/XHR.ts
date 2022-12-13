import { ref } from "./Ref";

enum ReadyState {
    UNSENT = 0,
    OPENED,
    HEADERS_RECEIVED,
    LOADING,
    DONE,
}

export type XHREvent = (xhr: XMLHttpRequest, uri: URL) => void

// 监听事件
const eventList = ref(new Map<ReadyState, XHREvent[]>([]));

// 初始化
const initState = ref(false)
function init() {
    if (initState.value) return
    initState.value = true
    const originXMLHttpRequestOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open =
        function (method: string, url: string | URL, async: boolean = true,
            username?: string, password?: string) {
            const uri =
                url instanceof URL ? url
                    : new URL((url.indexOf("/") == 0 ? location.origin : "") + url)
            this.addEventListener("readystatechange", function () {
                eventList.value.get(this.readyState)?.forEach(fn => fn(this, uri));
            })
            originXMLHttpRequestOpen.apply(this, [method, url, async, username, password])
        }
}

// 添加监听
function addListener(readyState: ReadyState, func: XHREvent) {
    if (!eventList.value.get(readyState)) {
        eventList.value.set(readyState, []);
    }
    eventList.value.get(readyState)?.push(func)
}

// 移除监听
function removeListener(readyState: ReadyState, func: XHREvent) {
    const index = eventList.value.get(readyState)?.findIndex(fn => fn === func);
    if (index === undefined || index < 0) return;
    eventList.value?.get(readyState)?.splice(index, 1);
}

// 默认初始化
init()

export const XHR = {
    ReadyState,
    init,
    addListener,
    removeListener,
}