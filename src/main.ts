import { $ } from "./core/DOM";
import { ref } from "./core/Ref";
import { resizeAndCenter, useWindowWatch } from "./core/Window";
import { XHR } from "./core/XHR";
import "./style.scss";

// 窗口跟随登录状态改变
const loginState = ref(false);
useWindowWatch((_, force: boolean = true) => {
  const currLoginState = !document.body.classList.contains("unlogin");
  if (force || currLoginState != loginState.value) {
    loginState.value = currLoginState;
    currLoginState ? resizeAndCenter(1000, 600) : resizeAndCenter(380, 540);
  }
}, true);

// 微信跳转登录页
if (location.pathname == "/" && location.search.indexOf("target=t") == -1) {
  location.search = location.search == "" ? "?target=t" : "&target=t";
}

// 微信登录使用 UOS 密钥强登
const extspam = import.meta.env.VITE_EXTSPAM;
XHR.addListener(XHR.ReadyState.OPENED, (xhr, uri) => {
  if (uri.pathname == "/cgi-bin/mmwebwx-bin/webwxnewloginpage") {
    xhr.setRequestHeader("extspam", extspam);
    xhr.setRequestHeader("client-version", "2.0.0");
  }
});

// 上下文菜单移动到容器外
const contextMenu = $("#contextMenu");
if (contextMenu) {
  $(".main_inner")?.insertAdjacentElement("beforebegin", contextMenu);
}

// 标签栏
const tab = $(".panel .tab");
if (tab) {
  $(".panel .header .info")?.insertAdjacentElement("beforebegin", tab);
}

// 侧边栏
const header = $(".panel .header");
if (header) {
  $(".main_inner")?.insertAdjacentElement("afterbegin", header);
}
