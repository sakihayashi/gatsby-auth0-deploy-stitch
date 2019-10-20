---
template: SinglePost
title: Gatsbyのテクノロジーとは？
status: Published
date: '2019-07-05'
featuredImage: 'https://ucarecdn.com/5f43ee37-2d49-4465-989d-3eec3d7d174c/'
excerpt: NextJSと並んで注目されているGatsbyがスタティックウェブサイトの利点を全て網羅している、そのテクノロジーの内容を紹介
categories:
  - category: Gatsbyチュートリアル
meta:
  description: スタティックウェブサイトの利点を全て網羅していると言うGatsbyが使うテクノロジーの内容を紹介。
  title: Gatsbyのテクノロジーとは？
---
![Gatsby JS logo image](https://ucarecdn.com/50261905-a858-4e60-85f0-7258413f259c/ "Gatsby JS ")

Gatsbyに実際にどんなテクノロジーが使われているのか、[トップページ](https://www.gatsbyjs.org/)に説明がありますが、内容を掘り下げて説明します。
Gatsbyはそのフレームワークの位置付けを「継続可能静的ウェブサイト生成するもの」ーStatic Progressive Web Apps　Gatsby.js is a static PWA (Progressive Web App) generatorと呼んでいます。平たくいうと、単純にHTMLとCSSで出来ているが（JavaScriptがかけない訳では無い）、マークダウンファイル、API、データベースからデータを全て取ってきた状態で指示どうりにページを生成してくれるジェネレーターなのです。こうしてページを動的に動く要素を極力省くことで早いウェブサイトを作ります。何故早いウェブサイトが重要なのかは私のブログをお読みください。

1. [ウェブパック](https://en.wikipedia.org/wiki/Webpack)（リンクは英語）やノードJSと言ったSEOに必要なライブラリやバンドルがギャッツビー用に用意されており、従来のように一つ一つライブラリをチェックして、インストールして（リアクトや必要なモデュールは予めパッケージされている）、仕様書をみながら組み立てる手間を省いてる
2. Gatsbyは[豊富なプラグインエコシステム](https://www.gatsbyjs.org/plugins/)を用意しており、ファイルシステム作成からイメージの挿入までウェブページ、アプリ作成に必要なモジュールをGatsbyのプラグインとしてオファーしている。また自分の作成したデータやAPIがGraphQLを用いて作りやすいように設計されいる。
3. JAMstack（JavaScript, APIs, and prerendered Markup　ージャムスタック）を使用
4. Gatsbyは前もって別のページのリソースを呼び出しているので、ページ内をクリックした際に、ユーザーにとってより「早い」ウェブサイトに感じさせる


リアクトやNodeJSの知識なしに使えるフレームワークではありませんので、Gatsbyをお使いになりたい方は、少なくとも[ReactJSのチュートリアル](https://ja.reactjs.org/tutorial/tutorial.html)日本語のものがありますので、をさらっておくことをお勧めします。

Gatsbyを使いたい方は[英語のチュートリアルページ](https://www.gatsbyjs.org/tutorial/)、もしくは私のチュートリアルをご覧ください
