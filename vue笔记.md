### 起步

v-bind: 可以简写为 :
##### 事件绑定
v-on:事件名称 = 方法
v-on: 简写为 @
##### v-if vs v-show
v-if: 添加或者移除节点, 具有更高的切换渲染， 不适用频繁操作的dom的场景
v-show: 显示或者被隐藏节点，具有更高初始化渲染，适用于频繁操作的dom的场景
##### v-for
v-for="变量 in 模型"
v-for="(变量, 下标) in 模型"

##### :calss 

##### 内联样式:style
:style="{css样式属性1: 模型1, css样式属性2: 模型2}"
:style="[{css样式属性1: 模型1, css样式属性2: 模型2}, {css样式属性3: 模型3}]"

##### 侦听器
watch

##### 计算属性
computed: {
  a: {
    get() {},
    set() {}
  },

  b() {
    return 100;
  }
}

##### 计算属性 VS 方法
计算属性 值未改变只调用一次
方法 使用几次调用几次
  
##### 双向数据绑定原理
Object.defineProperty(target, target属性, 配置)

##### Vue生命周期
+ beforeCreate data
  + 生成之前, 没有开始编译，el还没有生成
+ created 
  + data已经生成, 没有开始编译，el还没有生成
+ beforeMount 
  + 渲染之前, data已经生成，el有生成，还没有开始编译
+ mounted 
  + 渲染之后，data已经生成，el有生成，已经完成编译
+ beforeUpdate 
  + 页面数据更新之前
+ updated 
  + 页面数据更新之后, data数据已经匹配虚拟DOM
+ beforeDestroy 
  + 销毁之前 
+ destroyed 
  + 销毁之后

#### 事件
事件修饰符
stop:阻止事件冒泡
prevent:阻止浏览器默认行为
capture:捕获阶段触发
self:自身触发事件
once:只触发一次事件

##### 事件触发:冒泡触发和捕获触发
捕获阶段:从根元素开始，到目标元素终止(从外到内)
冒泡阶段:从目标元素开始,到根元素终止(从内到外)
事件触发要么在捕获触发，要么冒泡触发,只能触发一次

##### 组件: html,css,js集合
什么时候使用组件:
当多个页面使用同样的逻辑，在其他复用.


##### 键盘事件
  @keyup.esc
  @keyup.y
  @keyup.enter
  @keyup.ctrl.y
  @keyup.ctrl.shift.y
  @keyup.ctrl.shift.alt.y

##### 全局注册
  Vue.component(组件名称, 组件的配置)
  全局注册的组件在任何页面都可以使用

##### 局部注册
  components: {
    组件名称: 组件的配置
  }
  局部注册可以使用全局注册组件

  子组件不能直接访问父组件的数据

  如何实现父子组件数据传递(父子组件通讯)

  数据只能从父组件流向子组件 (单向数据流)

  如果修改父组件的数据，子组件需要通过触发自定义事件通知父组件主动修改数据

  而不是在子组件内部修改父组件

##### 全局注册组件与局部注册组件
  全局注册组件可以调用全局注册组件
  局部注册组件可以调用全局注册组件

##### 等待页面初始化完成后，获取DOM节点
$nextTick(() => {

})

##### 组件props
  name: {
    type: Array,
    default() {
      return []
    }
  }
  如果属性的默认值为数组或者对象，default必须时一个函数，且返回一个对象或者数组

#####   插槽
无名插槽：
```
<slot></slot>
```
具名插槽：
```
<slot name="插槽名称"></slot>
```
插槽作用域



### 安装脚手架
#####  gitbash命令工具
  ctrl + c: 终止程序执行

  install 简写 i
  uninstall 简写 uni

#####  npm淘宝镜像： 加快安装速度
  npm install -g cnpm --registry=https://registry.npm.taobao.org

#####  查看cnpm是否安装完成
  cnpm -v

#####  安装vue-cli4.x
  cnpm i @vue/cli -g

#####  查看vue-cli版本
  vue -V

#####  全局卸载vue-cli
  npm uni @vue/cli -g


### 路由vrouter

##### 创建vue-cli
  vue create 项目

#####  配置gitbash，以便可以使用vue脚手架创建vue项目是可以选择性安装依赖包
  alias vue='winpty vue.cmd'

#####  运行vue项目
  npm run serve

##### 项目结构
```
  vrouter
    |- node_modules 第三方依赖包
    |- public 公共文件
       |- favicon.ico 浏览器标签展示的小图标
       |- index.html 宿主页面(所有vue都在此页面显示)
    |- src 开发目录
       |- assets 静态文件 (css、js、图片、视频、音频，字体图标文件)
       |- components 公共组件(非路由配置的组件)
       |- router 路由
       |- views 视图 (路由配置的视图【vue组件】)
       |- App.vue 根组件 (具有路由入口【一级路由】)
       |- main.js vue入口文件(创建vue实例)
    |- .browserslistrc 有关于一些浏览器问题
    |- .gitignore git仓库忽略文件， 忽略的文件不能被添加到暂存区 git add .
    |- babel.config.js 将一些ES6转ES5
    |- package.json 项目描述文件， 记录一些项目名称、版本、作者、关键字、开发环境依赖包、生产环境依赖包、脚本命令、协议MIT、ISC，git地址...
    |- package-lock.json 根据package.json文件生成的文件
    |- README.md 项目说明文件，编写一些接口使用方法, 功能描述
```

##### vue的ajax方案
cnpm i axios vue-axios --save
--save简写-S
--save-dev简写-D

##### 声明式导航
```
<router-link to="/路径名称"></router-link>
<router-link :to="{path: '/路径名称'}"></router-link>
<router-link :to="{name: '路由名称'}"></router-link>
<router-link :to="{path: '/路径名称', query: {查询参数}}"></router-link>
<router-link :to="{name: '路由名称', query: {查询参数}}"></router-link>
```

##### 编程式导航
```
this.$router.push('/路径名称');
this.$router.push({path: '/路径名称'});
this.$router.push({name: '路由名称'});
this.$router.push({path: '/路径名称', query: {查询参数}});
this.$router.push({name: '路由名称', query: {查询参数}});
```

##### 参数
http默认端口80
https默认端口为443
查询参数和路由参数一般用于请求参数

##### 路由嵌套
  一级路由含有二级路由, 二级路由含有三级路由, ....

  一级路由不能直接显示三级路由

  一级路由展示二级路由，二级路由展示三级路由


##### 防止点击同一路由报错 在main.js中加入
```
let originalPush = Router.prototype.push;
Router.prototype.push = function(url){
	return originalPush.call(this, url).catch(err=>err);
}
```


##### 路由守卫
在访问路由之前或者之后触发守卫
##### 全局前置守卫 router.beforeEach
```
router.beforeEach((to, from, next) => {
  // ...
})
```
##### 守卫参数
to: Route: 即将要进入的目标 路由对象

from: Route: 当前导航正要离开的路由

next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

##### 全局后置钩子  router.afterEach
```
  router.afterEach((to, from) => {
  // ...
})
```

##### 路由独享的守卫 在路由配置上直接定义 beforeEnter 守卫

```
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
##### 组件内的守卫
```
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```
beforeRouteEnter 守卫 不能 访问 this

##### 凡是带有before的都有next，可以根据情况执行，
1、全局守卫
前置守卫: router.beforeEach (1)
后置守卫: router.afterEach (4)
2、路由独享守卫
进入路由之前:beforeEnter (2)
3、组件内的守卫
进入组件之前:beforeRouteEnter (3)
离开组件之前:beforeRogteLeave
更新路由参数之前:beforeRouteUpdate

##### 完整的导航解析流程
1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

##### 多窗口数据传递
vueX 只能在当前窗口有效，跨窗口读取不到数据，解决办法：
 //利用storage事件实时监视wev Storage中的数据
window.addEventListener('storage',function (e) {
})

##### require找不到文件路径
require(*)中,*为变量时(路径为"@/...")是获取不到文件的，应改为字符串拼接
 if (layerIcon.indexOf('@' !== -1)) {
        var index = layerIcon.lastIndexOf('/')
        layerIcon = layerIcon.substring(index + 1, layerIcon.length)
        return require('@/assets/layer/' + layerIcon)
      } else {
        return layerIcon
      }
