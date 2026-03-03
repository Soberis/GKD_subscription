import { defineGkdApp } from '@gkd-kit/define';

// 抖音火山版与抖音同属字节跳动，界面结构高度相似
// 参考规则：com.ss.android.ugc.aweme (抖音)
export default defineGkdApp({
  id: 'com.ss.android.ugc.livelite',
  name: '抖音火山版',
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
      desc: '点击[以后再说]',
      fastQuery: true,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          matches: [
            '[text*="立即升级" || text*="新版本"][visibleToUser=true]',
            '[text="以后再说" || text="取消" || text="暂不"][visibleToUser=true]',
          ],
        },
      ],
    },
    {
      key: 2,
      name: '全屏广告',
      desc: '字节系广告弹窗',
      rules: [
        {
          key: 0,
          // 字节SDK互动广告
          anyMatches: [
            '@View[text=null][clickable=true][childCount=0][visibleToUser=true][width<200&&height<200] +(1,2) TextView[index=parent.childCount.minus(1)][childCount=0] <n FrameLayout[childCount>2][text=null][desc=null] >(n+6) [text*="第三方应用" || text*="扭动手机" || text*="点击或上滑" || text*="省钱好物"][visibleToUser=true]',
            'FrameLayout > FrameLayout[childCount>2][text=null][desc=null] > @View[text=null][clickable=true][childCount=0][visibleToUser=true][width<200&&height<200] +(1,2) TextView[index=parent.childCount.minus(1)][childCount=0][visibleToUser=true]',
          ],
        },
      ],
    },
    {
      key: 12,
      name: '其他-休息提醒',
      fastQuery: true,
      rules: [
        {
          key: 1,
          matches: '@[text="取消"] + [text*="提醒我"]',
        },
      ],
    },
    {
      key: 20,
      name: '青少年模式',
      fastQuery: true,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          matches: [
            '[text*="青少年" || text*="未成年"][text*="模式"][visibleToUser=true]',
            '[text="关闭" || text="不再提醒"][visibleToUser=true]',
          ],
        },
      ],
    },
  ],
});
