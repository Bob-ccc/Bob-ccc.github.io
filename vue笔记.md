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
##### :calss :style

##### watch

##### computed

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


##### 事件触发:冒泡触发和捕获触发
捕获阶段:从根元素开始，到目标元素终止(从外到内)
冒泡阶段:从目标元素开始,到根元素终止(从内到外) I