import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.aliyun.tongyi',
  name: '通义千问',
  groups: [
    {
      key: 1,
      name: '更新提示',
      desc: '点击[取消]/[以后再说]',
      fastQuery: true,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          matches: [
            '[text*="新版本" || text*="更新"][visibleToUser=true]',
            '[text="取消" || text="以后再说" || text="暂不" || text="稍后"][visibleToUser=true]',
          ],
        },
      ],
    },
    {
      key: 2,
      name: '全屏广告-活动弹窗',
      desc: '关闭弹窗',
      fastQuery: true,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          matches:
            '[id="com.aliyun.tongyi:id/iv_close" || id="com.aliyun.tongyi:id/close_btn"][visibleToUser=true]',
        },
      ],
    },
  ],
});
