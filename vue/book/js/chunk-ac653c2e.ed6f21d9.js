(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ac653c2e"],{"5db0":function(t,a,e){},b288:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"home"},[e("div",{staticClass:"search"},[e("van-icon",{attrs:{size:"24px",name:"search"}})],1),e("van-tabs",{staticClass:"tabs-box",attrs:{sticky:"","swipe-threshold":"3",animated:"",swipeable:"",route:"","title-inactive-color":"#999"},model:{value:t.active,callback:function(a){t.active=a},expression:"active"}},t._l(t.categoriesData,(function(a,i){return e("van-tab",{key:i,attrs:{title:a.tab}},[e("div",{staticClass:"content"},[e("div",{staticClass:"tuijian"},[e("h2",[t._v(t._s(a.title))]),e("div",{staticClass:"ranking-box clearfix"},[e("van-tabs",{staticClass:"ranking-tabs",on:{click:function(a){return t.setBookData(i)}},model:{value:a.active,callback:function(e){t.$set(a,"active",e)},expression:"item.active"}},t._l(a.data,(function(a,o){return e("van-tab",{key:o,attrs:{title:a.shortTitle}},[e("div",{staticClass:"books-box"},t._l(t.booksData[i],(function(a,i){return e("div",{key:i,staticClass:"book clearfix",on:{click:function(e){return t.goDetail(a._id)}}},[e("div",{staticClass:"book-img fl"},[e("img",{staticClass:"auto-img",attrs:{src:a.cover,alt:""}})]),e("div",{staticClass:"book-num fl"},[t._v(t._s(i+1))]),e("div",{staticClass:"book-text fl"},[e("div",{staticClass:"book-title"},[t._v(t._s(a.title))]),e("div",{staticClass:"book-hot"},[e("van-icon",{attrs:{name:"fire-o"}}),t._v(" "+t._s(a.latelyFollower)+" ")],1)])])})),0)])})),1)],1)])])])})),1)],1)},o=[],s=(e("d81d"),e("fb6a"),e("a434"),e("5db0"),{name:"Home",data:function(){return{active:0,categoriesData:{male:{tab:"男生",title:"排行榜",active:0,data:[]},female:{tab:"女生",title:"排行榜",active:0,data:[]},picture:{tab:"漫画",title:"排行榜",active:0,data:[]},epub:{tab:"出版",title:"排行榜",active:0,data:[]}},booksData:{epub:[],female:[],male:[],picture:[]}}},created:function(){this.getCategoriesData(),this.setHistoryData()},methods:{getCategoriesData:function(){var t=this;this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({method:"GET",url:"/rank-category"}).then((function(a){for(var e in t.$toast.clear(),t.categoriesData)t.categoriesData[e].data=a.data[e].splice(0,4);t.setBookData()})).catch((function(a){t.$toast.clear()}))},setHistoryData:function(){var t=this,a=localStorage.getItem("BOOKHISTORY");if(a){if(console.log("historyData",this.$store.state.bookrackStore.historyData),JSON.parse(a).length=0)return;JSON.parse(a).map((function(a){t.$store.dispatch("bookrackStore/addHistoryData",a)})),localStorage.setItem("BOOKHISTORY",JSON.stringify(this.$store.state.bookrackStore.historyData))}else a=[],localStorage.setItem("BOOKHISTORY",JSON.stringify(a))},getIdData:function(t){var a="/rank/"+t;return this.axios({method:"GET",url:a})},getRankData:function(t){var a=this,e=[];return t.map((function(t){e.push(a.getIdData(t))})),this.axios.all(e)},setBookData:function(){var t=this,a=[];for(var e in this.categoriesData)a.push(this.categoriesData[e].data[this.categoriesData[e].active]._id);this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0,loadingType:"spinner"}),this.getRankData(a).then((function(a){t.$toast.clear();var e=function(e){a.map((function(a){a.data.ranking.gender==e&&(a.data.ranking.books.sort((function(t,a){return a.latelyFollower-t.latelyFollower})),t.booksData[e]=a.data.ranking.books.splice(0,8),t.booksData[e].map((function(t){return[t.cover=unescape(t.cover.slice(7))]})))}))};for(var i in t.booksData)e(i)}))},goDetail:function(t){var a=this;this.$store.dispatch("detailStore/setBookIdListById",t),this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios.all([this.axios({method:"GET",url:"/book-info/"+t}),this.axios({method:"GET",url:"/book-sources?view=summary&book="+t})]).then((function(t){a.$toast.clear(),a.$store.dispatch("detailStore/setBookDetail",t[0].data),a.$store.dispatch("detailStore/setBookOriginIdListById",t[1].data[0]._id),a.$router.push({name:"Detail"})})).catch((function(t){a.$toast.clear()}))}}}),n=s,r=e("2877"),c=Object(r["a"])(n,i,o,!1,null,null,null);a["default"]=c.exports}}]);
//# sourceMappingURL=chunk-ac653c2e.ed6f21d9.js.map