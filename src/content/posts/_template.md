---
title: 記事タイトル
description: 記事一覧や検索結果に表示する短い説明を記入します。
publishedDate: 2026-09-01
tags: []
draft: true
---

ここに記事本文をMarkdownで記入します。

このファイルを `src/content/posts/YYYY/YYYY-MM-DD-short-english-description/index.md` へ複製してください。
公開するときは、記事フォルダー名と `publishedDate` の日付を一致させ、`draft` を `false` に変更します。
画像は `index.md` と同じフォルダーに置き、`![画像の説明](./photo.jpg)` のように参照します。
公開URLは `/posts/YYYY-MM-DD-short-english-description/` です。年のフォルダーはURLに含みません。

---

### 記事作成のガイドライン・フォーマット例

- **title / description**: タイトルおよび概要文では、対象が複数名の場合は個人名は書かず「大島研のメンバーが…」「大島研のメンバーの論文が…」のように記述してください（対象が1名の場合は個人名を記載して構いません）。
- **本文の文末・結び**: 「いただいたアドバイスを糧に今後の研究を一層進めてまいります」や「研究に励んでまいります」といった紋切型の抱負・結び言葉は避け、活動の事実を中心に簡潔に記述してください。

#### 論文採録（論文誌・国際会議録など）の場合
「〇〇さんの論文が〇〇に採録されました。」という文に続けて、「書誌情報は以下の通りです。」とし、書誌情報をリスト形式で記載してください。
タグには `研究成果` や `論文採録` などを指定します。

**国内論文誌の例:**
```markdown
三林亮太さんの論文が電子情報通信学会論文誌に採録されました。

書誌情報は以下の通りです。

- 三林 亮太, 佃 洸摂, 渡邉 研斗, 中野 倫靖, 後藤 真孝, 山本 岳洋, 大島 裕明：「ラップバトルにおけるアンサーの類型化およびアンサーの有無と表現の自動分類」 電子情報通信学会和文論文誌D データ工学と情報マネジメント特集 J108-D, No.5, pp.206-219, 2025年5月．
```

**国際会議（Proceedings採録）の例:**
```markdown
国際会議 The 13th International Conference on Behavioural and Social Computing (BESC 2026) に論文が採録されました。

書誌情報は以下の通りです。

- Wakana Kuwata, Ryota Mibayashi, Masanori Tani, Hiroaki Ohshima: "Japanese Handwriting Generation Based on Human Preference Feedback Using Direct Preference Optimization", Proceedings of the 13th International Conference on Behavioural and Social Computing (BESC 2026), October 2026.
```
