(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6bc59e89"],{"33c5":function(t,a,e){},b288:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"home"},[e("div",{staticClass:"banner"},[e("van-swipe",{attrs:{autoplay:3e3,height:"250"}},t._l(t.bannerData,(function(a,n){return e("van-swipe-item",{key:n,on:{click:function(e){return t.proDetails(a.pid)}}},[e("div",{staticClass:"banner-img"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a.bannerImg,expression:"item.bannerImg"}],staticClass:"auto-img"})])])})),1)],1),e("div",{staticClass:"home-content"},[e("h1",[t._v(" Hello, "),t.isLogin?e("span",[t._v(t._s(t.userInfo.nickName))]):e("span",[t._v("陌生人")])]),e("h2",[t._v("咖啡会让你脑洞大开哟")]),t._m(0),e("div",{staticClass:"hotRecom"},[e("h2",[t._v("热门推荐")]),t._l(t.hotRecomData,(function(a,n){return e("div",{key:n,staticClass:"tab-pro fl",on:{click:function(e){return t.proDetails(a.pid)}}},[e("img",{staticClass:"auto-img",attrs:{src:a.largeImg,alt:""}}),e("h4",[t._v(t._s(a.name)+" "),e("span",[t._v(" ￥"+t._s(a.price)+" ")])])])}))],2)])])},i=[function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"btns clearfix"},[n("div",{staticClass:"btn btn-left"},[n("img",{attrs:{src:e("f3a9"),alt:""}})]),n("div",{staticClass:"btn btn-right clearfix"},[n("img",{attrs:{src:e("d730"),alt:""}})])])}],s=(e("33c5"),{name:"Home",data:function(){return{isLogin:!1,date:{week:0},bannerData:[],hotRecomData:[],userInfo:{}}},created:function(){this.getBannerData(),this.getHotRecomData(),this.getDate(),this.getUserInfo()},methods:{getBannerData:function(){var t=this;this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({method:"GET",url:"/banner",params:{appkey:this.appkey}}).then((function(a){t.$toast.clear(),300==a.data.code&&(t.bannerData=a.data.result)})).catch((function(t){}))},getHotRecomData:function(){var t=this;this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({method:"GET",url:"/typeProducts",params:{appkey:this.appkey,key:"isHot",value:1}}).then((function(a){t.$toast.clear(),500==a.data.code&&(t.hotRecomData=a.data.result)})).catch((function(t){}))},getDate:function(){this.date.week=(new Date).getDay()-1},proDetails:function(t){this.$router.push({name:"Details",query:{pid:t}})},getUserInfo:function(){var t=this,a=localStorage.getItem("YXCFTK");a&&(this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({method:"GET",url:"/findMy",params:{appkey:this.appkey,tokenString:a}}).then((function(a){t.$toast.clear(),"A001"==a.data.code&&a.data.result.length>0&&(t.isLogin=!0,t.userInfo=a.data.result[0])})).catch((function(a){t.$toast.clear()})))}}}),o=s,r=e("2877"),c=Object(r["a"])(o,n,i,!1,null,"94640f68",null);a["default"]=c.exports},d730:function(t,a,e){t.exports=e.p+"img/btnRight.a8309ca4.png"},f3a9:function(t,a,e){t.exports=e.p+"img/btnLeft.a090c3c8.png"}}]);
//# sourceMappingURL=chunk-6bc59e89.942d07ef.js.map