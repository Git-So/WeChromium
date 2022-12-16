import { ref } from "./core/Ref";
import { ng, WxBodyScope } from "./core/Angular";
import { resizeAndCenter, useWindowWatch } from "./core/Window";
import { XHR } from "./core/XHR";
import "./style.scss";

// 窗口跟随登录状态改变
const loginState = ref(false);
useWindowWatch((_, force: boolean = true) => {
  const currLoginState = !document.body.classList.contains("unlogin");
  if (force || currLoginState != loginState.value) {
    loginState.value = currLoginState;
    currLoginState ? resizeAndCenter(800, 600) : resizeAndCenter(380, 540);
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

// 显示公众号
let bodyScope = ng.element(document.body).scope() as WxBodyScope;
bodyScope.isShowReader = false;

// 界面调整
(() => {
  // 上下文菜单移动到容器外
  $(".main_inner").before($(".main_inner"));

  // 标签栏
  $(".panel .header .info").before($(".panel .tab"));

  // 侧边栏
  $(".main_inner").prepend($(".panel .header"));

  // 默认标签选中
  $(".tab .tab_item")
    .find(
      ".web_wechat_tab_chat_hl,.web_wechat_tab_friends_hl,.web_wechat_tab_public_hl"
    )
    .parent()
    .parent()
    .addClass("active");

  // 标签选择
  $(".tab").on("click", " .tab_item", function () {
    $(".tab .tab_item").removeClass("active");
    $(this as HTMLElement).addClass("active");
  });
})();
