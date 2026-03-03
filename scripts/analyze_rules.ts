import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appsDir = path.resolve(__dirname, '../src/apps');

async function main() {
  const files = await fs.readdir(appsDir);
  const tsFiles = files.filter((f) => f.endsWith('.ts'));

  const issues: {
    missingFastQuery: string[];
    missingActionMaximum: string[];
    missingActivityIds: string[];
  } = {
    missingFastQuery: [],
    missingActionMaximum: [],
    missingActivityIds: [],
  };

  for (const file of tsFiles) {
    const appPath = path.resolve(appsDir, file);
    try {
      const module = await import(pathToFileURL(appPath).href);
      const app = module.default;
      if (!app || !app.groups) continue;

      for (const group of app.groups) {
        // 1. 检查一次性弹窗是否缺少 actionMaximum
        const isOneShot = /开屏|更新|权限|青少年|评价|评分/i.test(group.name);
        if (
          isOneShot &&
          group.actionMaximum === undefined &&
          group.matchTime === undefined
        ) {
          issues.missingActionMaximum.push(
            `${app.id} - Group(key:${group.key} '${group.name}')`,
          );
        }

        // 2. 检查全局规则是否缺失 activityIds
        for (const rule of group.rules || []) {
          const hasActivityIds = group.activityIds || rule.activityIds;

          // 对于一些明显的弹窗（如广告），如果没有 activityIds 会比较耗电
          if (
            !hasActivityIds &&
            (group.name?.includes('广告') || group.name?.includes('弹窗'))
          ) {
            if (
              app.id !== 'com.tencent.mm' &&
              app.id !== 'com.eg.android.AlipayGphone'
            ) {
              // 排除两大毒瘤
              issues.missingActivityIds.push(
                `${app.id} - Group(key:${group.key} '${group.name}') Rule(key:${rule.key})`,
              );
            }
          }

          // 3. 检查 fastQuery 潜在缺失 (规则非常简单但没有 fastQuery)
          const isFastQueryEnabled = group.fastQuery || rule.fastQuery;
          if (!isFastQueryEnabled) {
            const matchers = [];
            if (rule.matches)
              matchers.push(
                ...(Array.isArray(rule.matches)
                  ? rule.matches
                  : [rule.matches]),
              );
            if (rule.anyMatches)
              matchers.push(
                ...(Array.isArray(rule.anyMatches)
                  ? rule.anyMatches
                  : [rule.anyMatches]),
              );

            for (const m of matchers) {
              if (typeof m !== 'string') continue;
              // 如果选择器只包含属性查找，比如 [text="跳过"], [vid="close"]，不包含层级如 > + <<n
              if (
                !m.includes('>') &&
                !m.includes('+') &&
                !m.includes('<') &&
                (m.includes('text') || m.includes('vid') || m.includes('id'))
              ) {
                issues.missingFastQuery.push(
                  `${app.id} - Group(key:${group.key} '${group.name}') Rule(key:${rule.key}): ${m}`,
                );
              }
            }
          }
        }
      }
    } catch (e) {
      console.error(`Failed to load ${file}:`, e);
    }
  }

  console.log('=== Performance Issues Report ===');
  console.log(
    `Missing FastQuery for simple rules: ${issues.missingFastQuery.length}`,
  );
  console.log(
    issues.missingFastQuery.slice(0, 10).join('\n') +
      (issues.missingFastQuery.length > 10 ? '\n...more' : ''),
  );
  console.log('\n---------------------------\n');
  console.log(
    `Missing ActionMaximum for one-shot popups: ${issues.missingActionMaximum.length}`,
  );
  console.log(
    issues.missingActionMaximum.slice(0, 10).join('\n') +
      (issues.missingActionMaximum.length > 10 ? '\n...more' : ''),
  );
  console.log('\n---------------------------\n');
  console.log(
    `Missing ActivityIds for common popups: ${issues.missingActivityIds.length}`,
  );
  console.log(
    issues.missingActivityIds.slice(0, 10).join('\n') +
      (issues.missingActivityIds.length > 10 ? '\n...more' : ''),
  );
}

main();
