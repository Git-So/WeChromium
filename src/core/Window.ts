import { useDomWatch } from "./DOM";

// 窗口大小改变并居中屏幕
export function resizeAndCenter(x: number, y: number) {
  window.resizeTo(x, y);
  window.moveTo((screen.width - x) / 2, (screen.height - y) / 2);
}

// 窗口自动变动
export type WindowWatchEvent = (
  mutations: MutationRecord[],
  isInit: boolean
) => void;
export function useWindowWatch(func: WindowWatchEvent, init: boolean = false) {
  init && func([], true);
  useDomWatch("body", (mutations) => {
    if (mutations.length < 1) return;
    func(mutations, false);
  });
}
