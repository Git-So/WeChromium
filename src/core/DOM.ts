const mutationObserverInit = {
  attributes: true,
  childList: true,
  subtree: true,
};
export function useDomWatch(
  selectors: string,
  callback: MutationCallback,
  autoStart: boolean = true,
  config?: MutationObserverInit
) {
  const observer = new MutationObserver(callback);

  const onStart = () =>
    dom && observer.observe(dom, config || mutationObserverInit);
  const onStop = () => observer.disconnect();

  // 自动启动
  const dom = document.querySelector(selectors);
  if (autoStart && dom) {
    observer.observe(dom, config || mutationObserverInit);
  }
  return {
    onStart,
    onStop,
  };
}
