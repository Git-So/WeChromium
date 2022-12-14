import { $, useDomWatch } from "./core/DOM";
import { ref } from "./core/Ref";
import { XHR } from "./core/XHR";
import "./style.scss";

// 元素变动
const loginState = ref(false)
useDomWatch('body', (mutations) => {
  if (mutations.length < 1) return

  // 登录状态
  const currLoginState = !document.body.classList.contains('unlogin');
  if (currLoginState != loginState.value) {
    loginState.value = currLoginState
    if (currLoginState) {
      window.resizeTo(800, 600)
    }
    else {
      window.resizeTo(380, 540)
    }
  }
})

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
const contextMenu = $("#contextMenu")
if (contextMenu) {
  $(".main_inner")?.insertAdjacentElement('beforebegin', contextMenu)
}

// 标签栏
const tab = $(".panel .tab");
if (tab) {
  $(".panel .header .info")?.insertAdjacentElement('beforebegin', tab)
}

// 侧边栏
const header = $(".panel .header");
if (header) {
  $(".main_inner")?.insertAdjacentElement('afterbegin', header)
}


