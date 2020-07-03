# webpack笔记

#### 1安装cnpm(可以加快安装速度 淘宝镜像)
npm config set registry https://registry.npm.taobao.org

#### 2--save-dev 本地安装
npm install --save-dev webpack


#### 3如果你使用 webpack 4+ 版本，你还需要安装 CLI。

npm install --save-dev webpack-cli

当你在本地安装 webpack 后，你能够从 node_modules/.bin/webpack 访问它的 bin 版本。

#### 4查看版本号(出现版本号说明成功)
node_modules/.bin/webpack -v

#### 5初始化包软件项目(一直回车,这样才会出现json文件)
npm init 


#### 6在根目录新建一个index.html  再新建一个src文件夹里面放index.js

index.html内容为
<!doctype html>
<html>
  <head>
    <title>起步</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>

index.js的内容为

>function component() {
  var element = document.createElement('div');
  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
document.body.appendChild(component());

此时网页会显示hello 

#### 7在跟目录新建一个dist文件夹 把index.html移动到里面

#### 8把两个script删掉新增一个<script src="main.js"></script>

#### 9在终端输入 npm install --save lodash

#### 10在index.js最前面引用lodash 加下面的代码
import _ from 'lodash';

#### 11最后在终端执行 npx webpack
#### 如果dist自动生成了一个main.js文件说已经成功了

##### 入口文件 默认src/index.js
##### 出口文件 默认dist/main.js

##### 指定出口 (指定生成谁)
npx webpack -o xx.js

##### 配置文件 当前项目根目录node_modules同级  package.json
webpack.config.js
npx webpack

##### 默认指定 webpack.config.js 作为配置文件
npx webpack --config webpack.config.test.js

##### 手动指定配置文件
npm test
npm run yyy
npm start

# 加载 CSS
npm install --save-dev style-loader css-loader

#### 改变webpack.config.js的内容,加上
> module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          }
        ]
      }
	  
#### 在src创建一个style.css文件内容改变body背景颜色
#### 在index.js 引用.css 前面加上 import './style.css';

#### 运行命令npx webpack
<!-- 背景变颜色 -->

# 安装less-loader
npm install --save-dev less-loader less

#### 改变webpack.config.js里面为
>rules: [{
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }]

#### 将style.css 改为.less   index.js文件引用时也要改变那个后缀
#### 运行命令npx webpack即可

# 加载图片
#### 安装file-loader
npm install --save-dev file-loader

#### 给webpack.config.js里面的rules添加test对象
>module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
	

#### 在src目录中添加图片

#### 在src/index.js中引入
src/index.js

>  import _ from 'lodash';
  import './style.css';
+ import Icon from './icon.png';
  function component() {
    var element = document.createElement('div');
    // Lodash，现在由此脚本导入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
+   // 将图像添加到我们现有的 div。
+   var myIcon = new Image();
+   myIcon.src = Icon;
+   element.appendChild(myIcon);
    return element;
  }
  document.body.appendChild(component());

#### 运行命令npx webpack可以看到div追加了图片


# 管理输出

## 预先准备

#### 在 src中新建print.js ，并在print.js中添加一些逻辑：
>export default function printMe() {
  console.log('I get called from print.js!');
}

#### 并且在 src/index.js 文件中使用这个函数：
src/index.js
在开头引入
>import printMe from './print.js';

在尾部调用
>printMe();

#### 调整配置。在webpack.config.js中，我们将在 entry 添加 src/print.js 作为新的入口起点（print），然后修改 output，以便根据入口起点名称动态生成名称：
webpack.config.js

>module.exports = {
    entry: {
      index: './src/index.js',
      another: './src/print.js'
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };

#### 执行npx webpack后dist目录生成
例如 
another.4fb794f2f2b47836393d.js
index.76d6b39cb8fdd7996bfd.js

## 设定 HtmlWebpackPlugin

#### 首先安装插件，
npm install --save-dev html-webpack-plugin
#### 并且调整 webpack.config.js 文件
webpack.config.js
开头引入
>const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports中加入plugins对象

> plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],

#### 执行npx webpack
虽然在 dist/ 文件夹我们已经有 index.html 这个文件，然而 HtmlWebpackPlugin 还是会默认生成 index.html 文件。这就是说，它会用新生成的 index.html 文件，把我们的原来的替换。

## 清理 /dist 文件夹

#### 安装插件clean-webpack-plugin
npm install clean-webpack-plugin --save-dev
#### 配置
webpack.config.js
开头加入
>const {CleanWebpackPlugin} = require('clean-webpack-plugin');

在module.exports中的plugins加入
>new CleanWebpackPlugin(['dist'])

#### 执行npx webpack
再检查 /dist 文件夹。如果一切顺利，应该不会再看到旧的文件，只有构建后生成的文件！

## index.html模板
#### 在src/目录中新建一个index.html
#### 配置
webpack.config.js
在plugins的new HtmlWebpackPlugin中添加，完成如下
>plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      minify: "false",
      template: "./src/index.html",
    })
  ],

## 开发

#### 使用 source map
#### 配置webpack.config.js
在module.exports中添加devtool对象
webpack.config.js
>devtool: 'inline-source-map',
#### 执行命令后，当js文件有错误是，会有js映射，而不是指向dist中编译过的js
如当js出现错误是浏览器控制台会显示
Uncaught ReferenceError: consol is not defined (print.js:2 )

## 观察模式 webpack's Watch Mode
#### package.json配置
在"scripts"中添加
package.json
>"watch": "webpack --watch",
#### 执行 npm run watch
执行后bash终端处于观察模式，一直在等待，保存后实现自动编译
由于vs code 可以安装live sever 插件，浏览器会自动刷新，如果没有安装或者是使用其他开发工具，需要手动刷新，如果想要实现浏览器自动刷新，就需要webpack-dev-server
## 使用webpack-dev-server
#### 安装webpack-dev-server
npm install --save-dev webpack-dev-server
#### 配置
安装webpack-dev-server完成后，在module.exports中添加devServer
webpack.config.js
> devServer: {
    contentBase: './dist'
  },
#### 以上配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
#### 让我们添加一个 script 脚本，可以直接运行开发服务器(dev server)
在"scripts"中添加
package.json
>"start": "webpack-dev-server --open",
#### 执行 npm start
执行后就会看到浏览器自动加载页面。如果现在修改和保存任意源文件，web 服务器就会自动重新加载编译后的代码。
正常情况下成功时浏览器网址为http://localhost:8080/

