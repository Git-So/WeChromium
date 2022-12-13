import { XHR } from './core/XHR';
import './style.scss';

// 微信跳转登录页
if (location.pathname == "/" && location.search.indexOf("target=t") == -1) {
    location.search = location.search == "" ? "?target=t" : "&target=t"
}

// 微信登录使用 UOS 密钥强登
const extspam = import.meta.env.VITE_EXTSPAM
XHR.addListener(XHR.ReadyState.OPENED, (xhr, uri) => {
    if (uri.pathname == "/cgi-bin/mmwebwx-bin/webwxnewloginpage") {
        xhr.setRequestHeader("extspam", extspam)
        xhr.setRequestHeader("client-version", "2.0.0")
    }
})