import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.netease.uu',
  name: 'UU加速器',
  groups: [
    {
      key: -1,
      name: '开屏广告',
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      priorityTime: 10000,
      rules: [
        {
          fastQuery: true,
          matches:
            '[text*="跳过"][text.length<10][width<500 && height<300][visibleToUser=true]',
        },
      ],
    },
    {
      key: 1,
      name: '更新提示',
      desc: '点击[取消]/[稍后更新]',
      fastQuery: true,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          matches: [
            '[text*="新版本" || text*="更新" || text*="升级"][visibleToUser=true]',
            '[text="取消" || text="稍后更新" || text="以后再说" || text="暂不"][visibleToUser=true]',
          ],
        },
      ],
    },
    {
      key: 2,
      name: '全屏广告-弹窗广告',
      desc: '关闭弹窗广告',
      fastQuery: true,
      actionMaximum: 2,
      resetMatch: 'app',
      rules: [
        {
          matches:
            '[id="com.netease.uu:id/iv_close_dialog" || id="com.netease.uu:id/close_icon" || id="com.netease.uu:id/iv_close"][visibleToUser=true]',
        },
      ],
    },
    {
      key: 10,
      name: '权限提示-通知权限',
      desc: '点击[暂不]',
      fastQuery: true,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          matches: [
            '[text*="通知" || text*="消息推送"][visibleToUser=true]',
            '[text="暂不" || text="取消" || text="拒绝"][visibleToUser=true]',
          ],
        },
      ],
    },
  ],
});
