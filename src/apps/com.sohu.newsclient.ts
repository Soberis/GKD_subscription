import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.sohu.newsclient',
  name: '搜狐新闻',
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
      desc: '点击[取消]/[以后再说]/[稍后]',
      fastQuery: true,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          matches: [
            '[text*="更新" || text*="新版本"][visibleToUser=true]',
            '[text="取消" || text="以后再说" || text="稍后" || text="暂不更新"][visibleToUser=true]',
          ],
        },
      ],
    },
    {
      key: 2,
      name: '全屏广告-弹窗广告',
      desc: '关闭弹窗',
      actionMaximum: 2,
      resetMatch: 'app',
      rules: [
        {
          fastQuery: true,
          key: 0,
          matches:
            '[id="com.sohu.newsclient:id/close" || id="com.sohu.newsclient:id/iv_close" || id="com.sohu.newsclient:id/ad_close"][visibleToUser=true]',
        },
        {
          key: 1,
          anyMatches: [
            '@View[text=null][clickable=true][childCount=0][visibleToUser=true][width<200&&height<200] +(1,2) TextView[index=parent.childCount.minus(1)][childCount=0] <n FrameLayout[childCount>2][text=null][desc=null] >(n+6) [text*="第三方应用" || text*="扭动手机" || text*="点击或上滑" || text*="省钱好物" || text*="扭一扭"][visibleToUser=true]',
          ],
        },
      ],
    },
    {
      key: 3,
      name: '分段广告-信息流广告',
      desc: '点击[不感兴趣]屏蔽广告',
      rules: [
        {
          fastQuery: true,
          key: 0,
          matches: '[text="不感兴趣" || text="屏蔽广告"][visibleToUser=true]',
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
            '[text*="通知" || text*="推送"][visibleToUser=true]',
            '[text="暂不" || text="取消" || text="拒绝"][visibleToUser=true]',
          ],
        },
      ],
    },
  ],
});
