(()=>{var e={};e.id=931,e.ids=[931],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1017:e=>{"use strict";e.exports=require("path")},7310:e=>{"use strict";e.exports=require("url")},5618:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d});var a=r(482),s=r(9108),o=r(2563),i=r.n(o),n=r(8300),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let d=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,1136)),"/Users/taisei_yamaguchi/Desktop/Chat-Board-Remake/frontend/src/app/page.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,592))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,1684)),"/Users/taisei_yamaguchi/Desktop/Chat-Board-Remake/frontend/src/app/layout.tsx"],error:[()=>Promise.resolve().then(r.bind(r,4117)),"/Users/taisei_yamaguchi/Desktop/Chat-Board-Remake/frontend/src/app/error.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,8206)),"/Users/taisei_yamaguchi/Desktop/Chat-Board-Remake/frontend/src/app/not-found.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,592))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/Users/taisei_yamaguchi/Desktop/Chat-Board-Remake/frontend/src/app/page.tsx"],u="/page",p={require:r,loadChunk:()=>Promise.resolve()},m=new a.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},3883:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2583,23)),Promise.resolve().then(r.t.bind(r,6840,23)),Promise.resolve().then(r.t.bind(r,8771,23)),Promise.resolve().then(r.t.bind(r,3225,23)),Promise.resolve().then(r.t.bind(r,9295,23)),Promise.resolve().then(r.t.bind(r,3982,23))},5510:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,1476,23))},8602:(e,t,r)=>{Promise.resolve().then(r.bind(r,9309))},1330:(e,t,r)=>{Promise.resolve().then(r.bind(r,6414))},8753:(e,t,r)=>{Promise.resolve().then(r.bind(r,1532))},8428:(e,t,r)=>{"use strict";var a=r(4767);r.o(a,"useRouter")&&r.d(t,{useRouter:function(){return a.useRouter}})},6414:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var a=r(5344),s=r(3729);function o({error:e,reset:t}){return(0,s.useEffect)(()=>{console.log(e)},[e]),(0,a.jsxs)("div",{className:"flex min-h-full flex-col justify-center align-center px-6 py-12 lg:px-8 h-screen items-center space-y-8 bg-white",children:[a.jsx("h2",{className:"mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",children:"Something Wrong Happened:"}),(0,a.jsxs)("div",{className:" flex items-center flex-col m-y-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative space-y-6",role:"alert",children:[a.jsx("p",{className:"font-bold",children:"Error:"}),a.jsx("p",{className:"text-sm",children:e.message})]}),a.jsx("div",{children:a.jsx("button",{onClick:()=>t(),className:"flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",children:"Try again"})})]})}},1532:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var a=r(8428),s=r(3729);let o=()=>{let e=(0,a.useRouter)();return(0,s.useEffect)(()=>{e.push("/home")},[]),null}},9309:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var a=r(5344),s=r(6013),o=r(4170);let i=({children:e})=>a.jsx(s.zt,{store:o.w_,children:e})},4170:(e,t,r)=>{"use strict";r.d(t,{w_:()=>d,TL:()=>c,CG:()=>u});var a=r(6013),s=r(448),o=r(2183),i=r(8685),n=r(2897),l=r(7633);r(9309);let d=(0,s.xC)({reducer:{loginUserSlice:o.ZP,reloadSlice:i.ZP,searchBoardResultSlice:n.ZP,commentReplySlice:l.ZP}}),c=a.I0,u=a.v9},7633:(e,t,r)=>{"use strict";r.d(t,{VH:()=>s,ZP:()=>o});let a=(0,r(448).oM)({name:"commentReplySlice",initialState:{commentReply:null},reducers:{setCommentReply(e,t){e.commentReply=t.payload}}}),{setCommentReply:s}=a.actions,o=a.reducer},2183:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>i,hv:()=>s,o4:()=>o});let a=(0,r(448).oM)({name:"loginUser",initialState:{account:null,token:null},reducers:{setAccount(e,t){e.account=t.payload},setToken(e,t){e.token=t.payload}}}),{setAccount:s,setToken:o}=a.actions,i=a.reducer},8685:(e,t,r)=>{"use strict";r.d(t,{NH:()=>s,XX:()=>o,ZP:()=>i});let a=(0,r(448).oM)({name:"Reload",initialState:{reloading:!1,searchLoad:!1},reducers:{setReloading(e,t){e.reloading=t.payload},setSearchLoad(e,t){e.searchLoad=t.payload}}}),{setReloading:s,setSearchLoad:o}=a.actions,i=a.reducer},2897:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>i,mu:()=>s});let a=(0,r(448).oM)({name:"searchBoardResult",initialState:{searchBoardResult:[],totalPages:1},reducers:{setSearchBoardResult(e,t){e.searchBoardResult=t.payload},setTotalPages(e,t){e.totalPages=t.payload}}}),{setSearchBoardResult:s,setTotalPages:o}=a.actions,i=a.reducer},4117:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>o,__esModule:()=>s,default:()=>i});let a=(0,r(6843).createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Chat-Board-Remake/frontend/src/app/error.tsx`),{__esModule:s,$$typeof:o}=a,i=a.default},1684:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>B,metadata:()=>j});var a=r(5036),s=r(1057),o=r.n(s);r(5023),r(1659),r(1078);var i=r(9936);let n=(0,i.oM)({name:"loginUser",initialState:{account:null,token:null},reducers:{setAccount(e,t){e.account=t.payload},setToken(e,t){e.token=t.payload}}}),{setAccount:l,setToken:d}=n.actions,c=n.reducer,u=(0,i.oM)({name:"Reload",initialState:{reloading:!1,searchLoad:!1},reducers:{setReloading(e,t){e.reloading=t.payload},setSearchLoad(e,t){e.searchLoad=t.payload}}}),{setReloading:p,setSearchLoad:m}=u.actions,h=u.reducer,x=(0,i.oM)({name:"searchBoardResult",initialState:{searchBoardResult:[],totalPages:1},reducers:{setSearchBoardResult(e,t){e.searchBoardResult=t.payload},setTotalPages(e,t){e.totalPages=t.payload}}}),{setSearchBoardResult:g,setTotalPages:f}=x.actions,y=x.reducer,v=(0,i.oM)({name:"commentReplySlice",initialState:{commentReply:null},reducers:{setCommentReply(e,t){e.commentReply=t.payload}}}),{setCommentReply:P}=v.actions,b=v.reducer,R=(0,r(6843).createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Chat-Board-Remake/frontend/src/store/Providers.tsx`),{__esModule:k,$$typeof:_}=R,S=R.default;(0,i.xC)({reducer:{loginUserSlice:c,reloadSlice:h,searchBoardResultSlice:y,commentReplySlice:b}});let j={title:"Chat-Board",description:"This is a chat app."},B=({children:e})=>a.jsx("html",{lang:"en",children:a.jsx("body",{className:o().className,children:a.jsx(S,{children:a.jsx("main",{children:e})})})})},8206:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var a=r(5036),s=r(6274);function o(){return(0,a.jsxs)("div",{className:"flex min-h-full flex-col justify-center align-center px-6 py-12 lg:px-8 h-screen items-center space-y-8 bg-white",children:[a.jsx("h2",{className:"mt-5 text-center text-6xl font-bold leading-9 tracking-tight text-gray-900",children:"Not Found"}),(0,a.jsxs)("div",{className:" flex items-center flex-col m-y-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative space-y-6",role:"alert",children:[a.jsx("p",{className:"font-bold",children:"Error:"}),a.jsx("p",{className:"text-sm",children:"Could not find requested resource \uD83D\uDE35‍\uD83D\uDCAB"})]}),a.jsx(s.default,{className:"text-sky-600",href:"/",children:"Return Home"})]})}},1136:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>o,__esModule:()=>s,default:()=>i});let a=(0,r(6843).createProxy)(String.raw`/Users/taisei_yamaguchi/Desktop/Chat-Board-Remake/frontend/src/app/page.tsx`),{__esModule:s,$$typeof:o}=a,i=a.default},592:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var a=r(337);let s=e=>[{type:"image/x-icon",sizes:"631x708",url:(0,a.fillMetadataSegment)(".",e.params,"icon.ico")+"?f3913ffb57f9d025"}]},5023:()=>{}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[638,546],()=>r(5618));module.exports=a})();