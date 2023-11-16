# DHPG-Client

`DHPG`のフロントエンドです。
バックエンドは[こちら](https://github.com/guinpen98/DHPG-Server)

## 環境構築のしかた

### Node.jsをインストールする

[Node.js](https://nodejs.org)がパソコンに入っていなければ入れてください。

### yarnをインストールする

`npm`のかわりに`yarn`を使うので、`yarn`が入っていなければ入れてください。

```sh
npm install --global yarn
```

### リポジトリをクローンする

```sh
git clone https://github.com/HotariTobu/DHPG-Client.git
```

### クローンしたリポジトリのディレクトリに移動する

```sh
cd DHPG-Client
```

以降のコマンドはこのディレクトリで実行します。

### パッケージをインストールする

```sh
yarn
```

`package.json`と`yarn.lock`の内容にしたがってパッケージが`node_modules`にインストールされます。

## 実行してみるには

### サーバーを起動する

```
yarn dev
```

### ブラウザでアクセスする

[localhost:3000](http://localhost:3000)にアクセスしてください。

## ディレクトリ構造について

Nuxtを使っているので、詳しくは[Nuxtのドキュメント](https://nuxt.com/docs/getting-started/introduction)を参照してください。
Nuxtは簡単にいうと、Vue.jsでWebアプリを作れるものです。

また、Vuetifyを使っているのでvから始まるコンポーネントに関しては[Vuetifyのコンポーネント一覧](https://vuetifyjs.com/en/components/all/#containment)を参照してください。
Vuetifyは簡単にいうと、いい感じの見た目（マテリアルデザイン）のコンポーネントをまとめたライブラリです。

### `/components`

UIのコンポーネント（パーツ）が入っています。
例えば`/components/PasswordField.vue`ではパスワード入力のためのコンポーネントが定義されています。

### `/composables`

コンポーネントで使われる便利なものが入っています。
例えば`/composables/useAxios.ts`ではAxios（HTTPリクエストのライブラリ）を使うための`useAxios`が定義されています。

### `/layouts`

複数のページのコンポーネントに適用されるレイアウトのコンポーネントが入っています。
例えば`/layouts/default.vue`では通常のページのコンポーネントが内包されるレイアウトが定義されています。

### `/pages`

ページを表すコンポーネントが入っています。
例えば`/pages/login.vue`では[/login](http://localhost:3000/login)にアクセスしたときに表示されるページのコンポーネントが定義されています。
`index.vue`は特殊で、`/pages/index.vue`は[/](http://localhost:3000/)に、`/pages/post/index.vue`は[/post](http://localhost:3000/post)にアクセスしたときのページです。

### `/schemas`

データ構造が入っています。
例えば`/schemas/post.ts`に定義されている`Post`インターフェースは投稿を表します。

### `/utils`

どこでも使える便利なものが入っています。
例えば`/utils/getQueryString.ts`では

```json
{
    "q": "検索文字列",
    "t": "タブ"
}
```

このようなオブジェクトを

```js
"?q=検索文字列&t=タブ"
```

このような文字列に変換する関数が定義されています。