(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d03b3f12"],{1157:function(t,o,i){},"857a":function(t,o,i){var a=i("1d80"),s=/"/g;t.exports=function(t,o,i,e){var r=String(a(t)),n="<"+o;return""!==i&&(n+=" "+i+'="'+String(e).replace(s,"&quot;")+'"'),n+">"+r+"</"+o+">"}},9911:function(t,o,i){"use strict";var a=i("23e7"),s=i("857a"),e=i("af03");a({target:"String",proto:!0,forced:e("link")},{link:function(t){return s(this,"a","href",t)}})},af03:function(t,o,i){var a=i("d039");t.exports=function(t){return a((function(){var o=""[t]('"');return o!==o.toLowerCase()||o.split('"').length>3}))}},e4bb:function(t,o,i){"use strict";i.r(o);var a=function(){var t=this,o=t.$createElement,i=t._self._c||o;return i("div",{staticClass:"history"},[i("van-nav-bar",{ref:"toolbar",staticStyle:{background:"#f6f6f6"},attrs:{title:"阅读记录","left-arrow":""},on:{"click-left":t.back}}),i("div",{staticClass:"classifyList-box"},t._l(t.historyData,(function(o,a){return i("div",{key:a,staticClass:"list-box"},[i("div",{staticClass:"img-box",on:{click:function(i){return t.goDetail(o._id)}}},[i("img",{staticClass:"auto-img",attrs:{src:o.cover,alt:""}})]),i("div",{staticClass:"text-box",on:{click:function(i){return t.goDetail(o._id)}}},[i("div",{staticClass:"title-box"},[i("div",{staticClass:"title"},[t._v(t._s(o.title))])]),i("div",{staticClass:"history-title"},[t._v(t._s(o.bookState.historyTitle))]),i("div",{staticClass:"history-time"},[t._v("上次阅读："+t._s(t._f("formatDate")(o.bookState.time,"yyyy-MM-dd hh:mm:ss")))])]),i("div",{staticClass:"btn-box"},[o.bookState.isAtClassify?i("div",{staticClass:"btn open-btn",on:{click:function(i){return t.goChapters(o)}}},[t._v("打开")]):i("div",{staticClass:"btn add-btn",on:{click:function(i){return t.addClassify(o)}}},[t._v("加入书架")])])])})),0)],1)},s=[],e=(i("a434"),i("9911"),i("1157"),{data:function(){return{}},computed:{historyData:function(){for(var t=Object.assign(this.$store.state.bookrackStore.historyData),o=t.length-1;o>=0;o--)t[o].bookState.isReaded||t.splice(o,1);return t}},methods:{back:function(){this.$router.go(-1)},goChapters:function(t){var o=this;this.$store.dispatch("detailStore/setBookIdListById",t._id),this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({method:"GET",url:"/book-sources?view=summary&book="+t._id}).then((function(i){o.$toast.clear(),o.$store.dispatch("detailStore/setBookOriginIdListById",i.data[0]._id),o.axios({method:"GET",url:"/book-chapters/"+o.$store.state.detailStore.bookOriginId}).then((function(i){o.$store.dispatch("detailStore/setDirectoryListByLink",i.data.chapters);var a=o.$store.state.detailStore.directoryList[t.bookState.bookOrder],s=a.link;o.$store.dispatch("chaptersStore/setChaptersList",a),o.axios({method:"GET",url:"/chapters/"+encodeURIComponent(s)}).then((function(i){o.$toast.clear(),o.$store.dispatch("chaptersStore/setChapterText",i.data.chapter);var s=Object.assign(t.bookState);s.historyTitle=a.title,s.time=new Date,s.isReaded=!0,o.$store.dispatch("detailStore/setBookDetailBookState",s).then((function(t){o.$store.dispatch("bookrackStore/addHistoryData",t)})),o.$router.push({name:"Chapters"})}))})).catch((function(t){o.$toast.clear()}))})).catch((function(t){o.$toast.clear()}))},addClassify:function(t){this.$store.dispatch("bookrackStore/setHistoryDataBookState",t)},goDetail:function(t){var o=this;this.$store.dispatch("detailStore/setBookIdListById",t),this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios.all([this.axios({method:"GET",url:"/book-info/"+t}),this.axios({method:"GET",url:"/book-sources?view=summary&book="+t})]).then((function(t){o.$toast.clear(),o.$store.dispatch("detailStore/setBookDetail",t[0].data),o.$store.dispatch("detailStore/setBookOriginIdListById",t[1].data[0]._id),o.$router.push({name:"Detail"})})).catch((function(t){o.$toast.clear()}))}}}),r=e,n=i("2877"),c=Object(n["a"])(r,a,s,!1,null,null,null);o["default"]=c.exports}}]);
//# sourceMappingURL=chunk-d03b3f12.877976a5.js.map