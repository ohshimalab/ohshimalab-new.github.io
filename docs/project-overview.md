# 大島研究室 Astroサイト：プロジェクト概要

## このプロジェクトの目的

兵庫県立大学・大島裕明研究室の既存ウェブサイトを参考に、Astroで新しいウェブサイトを構築する。
既存サイトの情報設計と雰囲気は引き継ぐが、実装はHugo/Wowchemyから独立した新規実装とする。

## 参考サイト

- 公開サイト: <https://ohshimalab.github.io/>
- 旧サイトのGitHubリポジトリ: <https://github.com/ohshimalab/ohshimalab.github.io>

既存サイトには、研究室名・所属、研究内容の紹介、学生募集・プロジェクトへの導線、記事一覧、アクセス情報がある。
現在の公開サイトはWowchemyで生成されているため、見た目や情報構成を参考にしつつ、Astroのコンポーネントとして再設計する。

## 技術構成

- フレームワーク: Astro
- 言語: Astro components / TypeScript（必要な場合）
- スタイリング: まず通常のCSS。サイト全体のCSSは `src/styles/global.css` に集約し、部品固有のCSSは各 `.astro` ファイルの `<style>` に置く
- コンテンツ: Markdown + Astro Content Collections（記事・メンバー・プロジェクトなど）
- 静的ファイル: `public/`
- デプロイ先: GitHub Pagesを第一候補とする

現在の試験公開先は `https://ohshimalab.github.io/ohshimalab-new.github.io/` とし、Astroの `base` を `/ohshimalab-new.github.io` に設定する。最終的にリポジトリを `ohshimalab.github.io` へ切り替える際は `base` を削除し、ルートURLで公開する。

## 現在の状態

Astroの最小構成から開始した段階。現在はトップページにAstroの初期表示があるだけで、研究室サイトのページやデザインは未実装である。

最初に実装する範囲は次のとおり。

1. 共通レイアウト (`src/layouts/BaseLayout.astro`)
2. ヘッダー (`src/components/Header.astro`)
3. トップページ (`src/pages/index.astro`)
4. サイト全体のスタイル (`src/styles/global.css`)
5. 記事一覧と記事詳細

## 目指すページ構成

- `/`: 研究室紹介、主要リンク、最新記事、アクセス
- `/posts/`: 記事・お知らせ一覧
- `/posts/[slug]/`: 記事詳細
- `/members/`: メンバー一覧
- `/projects/`: 研究プロジェクト
- `/publications/`: 論文・発表実績
- `/recruitment/`: 学生募集
- `/contact/` またはトップページ内のアクセス欄

ページは必要に応じて追加・変更する。存在しないページを機械的に作らず、実際のコンテンツ要件を確認してから追加する。

## デザイン方針

- 既存サイトの落ち着いた研究室・大学サイトらしい印象を保つ
- 文字の可読性、余白、モバイル表示を優先する
- 色、コンテンツ幅、余白、境界線などはCSS変数として管理する
- 固定値を各コンポーネントに重複して書かない
- 既存サイトのHTMLをそのまま移植せず、Astroのコンポーネント単位に分解する
- 画像やロゴは権利と出典を確認してから使用する

## HugoからAstroへの対応方針

| 旧サイト | Astro |
| --- | --- |
| `layouts/_default/baseof.html` | `src/layouts/BaseLayout.astro` |
| `layouts/partials/` | `src/components/` |
| `content/` | `src/content/` |
| `static/` | `public/` |
| SCSS/CSS | `src/styles/` またはコンポーネント内の `<style>` |

記事本文や日付などのデータは、表示用コンポーネントと分離する。

### 記事slugのルール

- 記事ファイル名は `YYYY-MM-DD-short-english-description.md` 形式とする
- 日付と単語の区切りには、すべてハイフンを使用する
- 英語部分は小文字の半角英数字で簡潔に記述する
- ファイル名の日付と `publishedDate` を一致させる
- 同日に類似記事がある場合は、人名やイベント名を加えて区別する
- 公開後のslug（ファイル名）は原則として変更しない
- `draft: true` の記事は開発環境のみで表示し、本番ビルドから除外する

## 開発コマンド

```sh
npm install
npm run dev
npm run build
npm run preview
```

このプロジェクトの指示に従い、開発サーバーを起動するときは `astro dev --background` を使用する。

## 新しい対話を開始するときの手順

1. このファイルを読む
2. `src/` と `public/` の現在の状態を確認する
3. 変更対象と既存の作業を確認する
4. 変更前に、今回の作業がこの概要の方針と矛盾しないか確認する
5. 実装後に `npm run build` を実行する

この概要にない仕様は、既存サイト・リポジトリ・実際のコンテンツを調査したうえで、必要最小限の仮定を置く。判断が分かれる場合は、実装前にユーザーへ確認する。

## Codexへの依頼例

```text
まず docs/project-overview.md を読んで、このプロジェクトの前提を確認してください。
今回の作業は、その方針に沿って実装してください。
変更前に関連ファイルを調査し、実装後は npm run build で確認してください。
```
