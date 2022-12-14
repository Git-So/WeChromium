import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        name: "WeChromium,微信网页版,网页版微信,Linux微信",
        author: "So",
        homepage: "https://github.com/Git-So/WeChromium",
        supportURL: "https://github.com/Git-So/WeChromium/issues",
        updateURL:
          "https://github.com/Git-So/WeChromium/releases/latest/download/wechromium.user.js",
        downloadURL:
          "https://github.com/Git-So/WeChromium/releases/latest/download/wechromium.user.js",
        description:
          "微信网页版增强 Monkey 脚本,UOS密钥强登,界面优化贴合应用模式",
        icon: "https://res.wx.qq.com/a/wx_fed/assets/res/OTE0YTAw.png",
        namespace: "sooo.site/wechromium",
        match: [
          "https://wx.qq.com/*",
          "https://wx1.qq.com/*",
          "https://wx2.qq.com/*",
          "https://wx8.qq.com/*",
          "https://web.wechat.com/*",
        ],
        grant: ["unsafeWindow"],
        noframes: true,
      },
    }),
  ],
});
