import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: "WeChromium",
        icon: 'https://res.wx.qq.com/a/wx_fed/assets/res/OTE0YTAw.png',
        namespace: 'sooo.site/wechromium',
        match: ['https://wx.qq.com/*', 'https://web.wechat.com/*'],
      },
    }),
  ],
});
