# webpack笔记

#### 1安装cnpm(可以加快安装速度)
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

# 入口文件 默认src/index.js
# 出口文件 默认dist/main.js

# 指定出口 (指定生成谁)
npx webpack -o xx.js

# 配置文件 当前项目根目录node_modules同级  package.json
webpack.config.js
npx webpack

# 默认指定 webpack.config.js 作为配置文件
npx webpack --config webpack.config.test.js

# 手动指定配置文件
npm test
npm run yyy
npm start

# 加载 CSS
npm install --save-dev style-loader css-loader

# 改变webpack.config.js的内容,加上
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
	  
# 在src创建一个style.css文件内容改变body背景颜色
# 在index.js 引用.css 前面加上 import './style.css';

# 运行命令npx webpack
<!-- 背景变颜色 -->

# 安装less-loader
npm install --save-dev less-loader less

# 改变webpack.config.js里面为
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

# 将style.css 改为.less   index.js文件引用时也要改变那个后缀
# 运行命令npx webpack即可

#加载图片
# 安装file-loader
npm install --save-dev file-loader

# 给webpack.config.js里面的rules添加test对象
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
	

# 在src目录中添加图片

# 在src/index.js中引入
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

# 运行命令npx webpack可以看到div追加了图片
