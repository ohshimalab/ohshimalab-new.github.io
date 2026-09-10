# 開発状況

最終更新: 2026-09-10

この文書は、大島研究室ウェブサイト刷新プロジェクトの進捗、保留事項、次に行う作業を共有するための記録である。作業を完了・開始・保留したときに更新する。

## 現在の公開状況

- 開発リポジトリ: <https://github.com/ohshimalab/ohshimalab-new.github.io>
- 試験公開サイト: <https://ohshimalab.github.io/ohshimalab-new.github.io/>
- 公開ブランチ: `master`
- デプロイ: GitHub Actionsで自動実行
- 現行の旧サイト: <https://ohshimalab.github.io/>

`master` へのpushを契機に `.github/workflows/deploy.yml` がAstroをビルドし、GitHub Pagesへ公開する。

## 完了した作業

- Astroの基本構成を確認
- 旧Hugo／Wowchemyサイトの構成と背景素材を調査
- 旧サイトの `question-mark.jpg` をトップページ背景として移行
- 共通レイアウトとヘッダーを実装
- トップページを実装
  - ヒーロー
  - 研究室紹介
  - 学生募集・プロジェクトへの導線
  - 最新記事
  - アクセス
- サイト全体のCSSとモバイル表示を実装
- Astro Content CollectionsによるPosts基盤を実装
- `/posts/` の記事一覧を実装
- `/posts/[slug]/` の記事詳細を実装
- 開発環境限定の下書きプレビューを実装
- 記事slugの命名規則を決定
- GitHub Pagesの試験公開を設定
- サブディレクトリ公開に対応する共通パス処理を実装
- `/thesis/` の学位論文一覧を旧サイトから移植
  - 博士論文、修士論文、卒業論文を型付きデータとして分離
  - モバイル向けの横スクロール表示に対応
- `/faculty/` に大島裕明准教授の教員紹介ページを実装

## 現在のコンテンツ

### 最初の記事

`src/content/posts/2026-09-01-website-renewal.md` に「ウェブサイトをリニューアルしました」を作成済み。

- 状態: 下書き（`draft: true`）
- 本番サイトには未公開
- 公開前に旧サイトの移転後URLへリンクを変更する必要がある
- 公開するときは `draft: false` に変更する

### 記事テンプレート

`src/content/posts/_template.md` を複製して新しい記事を作成する。

ファイル名は次の形式とする。

```text
YYYY-MM-DD-short-english-description.md
```

## 未実装のページ

- `/about/`: 研究室紹介
- `/admission/`: 学生募集
- `/members/`: メンバー一覧
- `/projects/`: 研究プロジェクト
- `/publications/`: 論文・発表実績

ページは旧サイトをそのまま複製せず、内容を確認しながら改善して移行する。

## 保留・確認事項

- 旧サイトの移転先URLを決める
- 最初の記事に記載する旧サイトURLを確定する
- 最初の記事の公開日と本文を最終確認する
- Organizationの現役メンバー、OB、権限を整理する
- ウェブ担当者へリポジトリの `Write` 権限を付与する
- ウェブ担当者向けの `CONTRIBUTING.md` を作成する
- `package-lock.json` にnpm実行由来の未コミット変更が残っているため、内容を確認して採否を決める

## 次に行う作業の候補

推奨順:

1. `/about/` を実装する
2. ウェブ担当者向けの更新手順を `CONTRIBUTING.md` にまとめる
3. Pull Request時の自動ビルド検査を追加する
4. `/admission/` を実装する
5. メンバー、プロジェクト、業績のデータ構造を決める

## 最終公開への切り替え

最終的には、新サイトを <https://ohshimalab.github.io/> で公開する予定である。

切り替え時には少なくとも次を行う。

1. 旧サイトのリポジトリと公開先を退避する
2. 新サイトのリポジトリ名を `ohshimalab.github.io` に変更する
3. `astro.config.mjs` から `base: '/ohshimalab-new.github.io'` を削除する
4. ローカルで `npm run build` を実行する
5. GitHub Pagesへデプロイし、内部リンクと画像を確認する
6. 最初の記事の旧サイトリンクを移転後URLへ変更する
7. 最初の記事を公開する

## 直近の主要コミット

- `fbc7172`: GitHub Pagesのデプロイ設定
- `5541933`: AstroサイトとPosts基盤の初期実装

## この文書の更新ルール

- 作業開始時: 対象を「次に行う作業」から現在の作業として明確にする
- 作業完了時: 「完了した作業」へ移す
- 判断を先送りした場合: 理由と必要な確認事項を「保留・確認事項」に書く
- 公開設定やURLを変更した場合: 「現在の公開状況」と「最終公開への切り替え」を更新する
- 日付と、必要に応じて関連コミットIDを更新する
