# 記事の保存・旧サイトからの移行

記事は `src/content/posts/YYYY/YYYY-MM-DD-short-english-description/index.md` に保存する。
画像も同じ記事フォルダーに置き、`![説明](./photo.jpg)` として参照する。
記事を作成するときは `src/content/posts/_template.md` を複製する。
年・日付は `publishedDate` に合わせる。公開URLは `/posts/YYYY-MM-DD-short-english-description/` で、年の保存フォルダーを含めない。

## 一覧のサムネイル

記事冒頭のfrontmatterに `thumbnail: ./photo.jpg` を指定する。ファイル名は任意で、記事と同じフォルダーの画像を使う。
旧記事の `featured.jpg`・`featured.png` 計90ファイルを初期設定に使用した。
画像がない記事は指定不要。本文の先頭画像とは独立して選べる。

記事一覧とトップページの最新記事で、文章の右側にサムネイルを表示する。
4:3の枠内に画像全体を収め、集合写真やポスターを切り抜かない。
Astroで幅200px・400pxのWebP画像を生成し、画面に合わせて選択・遅延読み込みする。
同じリンク内のタイトルを読み上げるため、サムネイルのaltは空文字にする。

## 2026-10-08 の旧記事移行

- 旧リポジトリの `content/post/**/index.md` 全121記事（2018–2026年）を移行。既存9記事と合わせて130記事。
- タイトル、公開日、タグ、概要、本文を引き継ぎ、Hugoの `summary` を `description` に変換。
- 日付は旧フォルダー名ではなく記事の `date` を採用。旧 `2026/0201` の記事は公開日が2025-12-12のため2025年に保存。
- 本文の画像、先頭写真、ギャラリーの写真を354ファイル取り込み。画像の内容は変更せず、AstroのビルドでWebPを生成。
- Hugoのギャラリー記法は通常のMarkdown画像へ変換。HTMLコメント内の編集メモ・非表示画像は公開本文へ取り込まない。
- 旧URLへの転送ページは作成しない。記事内の既存の外部リンクは引き継ぐ。
- `content/post/2022/0715/index.md` の `bbq1.jpg` は元リポジトリに存在せず、旧公開URLでも取得できなかった。この画像参照だけを除外し、本文とほかの写真を保持。
- リニューアル記事は、過去記事を引き継いだことを説明する内容へ修正。

取得元コミット、各記事の元パス・SHA-256、移行先slug、画像のSHA-256、欠落画像は `posts-migration-manifest.json` に記録。

## 検証

```powershell
npm.cmd run build
python scripts/check-posts.py
python scripts/check-publications.py
```

`check-posts.py` は移行した121記事の掲載、画像のハッシュ、全130記事のURL、記事一覧のリンク、ビルド済み画像・内部リンクのファイル存在を確認する。

`scripts/import-posts.mjs` は今回の一括移行用。通常の記事追加では使わない。既存記事を上書きしないため、取り込み済み環境では再実行しない。
記事調査のみの場合は `node scripts/import-posts.mjs <旧リポジトリのパス>`、取り込みには `--write` を付ける。プロジェクトの依存関係に含まれる `js-yaml` を使用する。
