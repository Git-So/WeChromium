import { $ } from "./core/DOM";
import { XHR } from "./core/XHR";
import "./style.scss";

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

document.addEventListener("load", () => {
  console.log(11111);
});

const contextMenu = $("#contextMenu")
if (contextMenu) {
  $(".main_inner")?.insertAdjacentElement('beforebegin', contextMenu)
}

const tab = $(".panel .tab");
if (tab) {
  $(".panel .header .info")?.insertAdjacentElement('beforebegin', tab)
}

const header = $(".panel .header");
if (header) {
  console.log(header);
  $(".main_inner")?.insertAdjacentElement('afterbegin', header)
}


