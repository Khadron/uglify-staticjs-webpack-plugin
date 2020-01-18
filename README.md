# uglify-staticjs-webpack-plugin

一个简单灵活的 Webpack Plugin，用来压缩混淆项目中没后`import`或`require`的 JavaScript 文件，比如项目中的 public 文件夹
支持 webpack4，兼容 webpack3，支持 es6 及以上版本语法的混淆

### 安装

```shell

npm install -save-dev uglify-staticjs-webpack-plugin

```

## 如何使用

#### webpack 中使用

编辑`webpack.config.js`文件，添加如下代码

```js
plugins: [
  new CopyWebpackPlugin([
    {
      from: path.join(__dirname, "./public"),
      to: "static"
    }
  ]),
  new UglifyStatcJSWebpackPlugin({ staticPaths: ["./static/mylib.js"] })
];
```

#### Vue-CLI 3 中使用

编辑`vue.config.js`文件，添加如下代码

```js

chainWebpack(config) {
    config
    .plugin('UglifyStaticJSWebpackPlugin')
    .use('uglify-staticjs-webpack-plugin', [
        { staticPaths: ['./static/mylib.js'] }
    ])
    .end()
})


```

### 参数及配置

大道至简，只有一个参数：`staticPaths`，指定要压缩混淆的文件和文件夹的路径，它的值为`Array`也就是可以支持多个文件压缩混淆
**注意：**
uglify-staticjs-webpack-plugin 操作的根目录为`dist`文件夹，也就是在 webpack 中配置的`output.path`的路径，切记！

**更多详细的内容，请参考`example`文件夹里的内容
