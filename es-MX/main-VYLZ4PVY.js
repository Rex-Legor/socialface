import{a as z,b as J,c as K,d as Y,e as X,f as Z,g as q,h as Q,i as W,j as _,k as $t}from"./chunk-B2OAQ3EP.js";import{a as T,b as D,c as $,d as k,e as L,f as H,g as N,h as U,i as B,j as G,k as Dt,l as V}from"./chunk-5H4HIWJM.js";import{$ as Ft,$a as v,A as m,B as At,D as y,G as St,M as vt,Ma as R,Na as yt,Oa as It,Pa as Mt,Ra as jt,Sa as w,T as it,Ua as bt,Wa as Rt,Ya as wt,Za as Pt,_a as xt,a as n,aa as Ct,ab as P,b as f,ba as b,d as dt,db as ct,e as lt,eb as Ot,fb as a,g as F,gb as x,h as u,hb as Tt,i as st,k as ot,kb as O,l as j,m as A,n as mt,o as ht,p as gt,q as d,r as nt,s as Et,va as I,w as l,y as S,z as p}from"./chunk-R5MUVTMB.js";var M=(t,e)=>{let c=m(v),r=m(w);return c.pipe(P(O),u(s=>(s||r.navigate(["/login"]),s&&t.routeConfig?.path=="business"&&s?.canAccessBusiness?!0:!!s)))};var kt=(()=>{let e=class e{constructor(r,s){this.store=r,this.router=s,this.store.dispatch(D()),this.userSubscription=this.store.pipe(P(O)).subscribe(o=>{o||this.router.navigate(["/login"])})}ngOnDestroy(){this.userSubscription.unsubscribe()}};e.\u0275fac=function(s){return new(s||e)(it(v),it(w))},e.\u0275cmp=y({type:e,selectors:[["sf-logout"]],standalone:!0,features:[I],decls:0,vars:0,template:function(s,o){},encapsulation:2,changeDetection:0});let t=e;return t})();var Lt=(()=>{let e=class e{};e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=y({type:e,selectors:[["sf-business"]],standalone:!0,features:[I],decls:2,vars:0,consts:[[1,"sf-business"],["src","https://unblast.com/wp-content/uploads/2021/07/Business-Team-Building-Illustration.jpg","alt",""]],template:function(s,o){s&1&&(Ft(0,"div",0),b(1,"img",1),Ct())},styles:[".sf-business[_ngcontent-%COMP%]{min-height:100%;display:flex;justify-content:center;align-items:center}.sf-business[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50%}"],changeDetection:0});let t=e;return t})();var Ht=[{path:"",redirectTo:"/login",pathMatch:"full"},{path:"login",loadComponent:()=>import("./chunk-OXQXX6IQ.js").then(t=>t.LoginComponent)},{path:"logout",component:kt},{path:"business",component:Lt,canActivate:[M]},{path:"signup",loadComponent:()=>import("./chunk-WZJETQB7.js").then(t=>t.SignupComponent)},{path:"forgot-password",loadComponent:()=>import("./chunk-HYNHOBNE.js").then(t=>t.ForgotPasswordComponent)},{path:"feed",loadComponent:()=>import("./chunk-ZOW6NMUP.js").then(t=>t.FeedComponent),canActivate:[M]},{path:"profile",loadComponent:()=>import("./chunk-SPK3X6CA.js").then(t=>t.ProfileComponent),canActivate:[M]},{path:"settings",loadComponent:()=>import("./chunk-JFQQJGDO.js").then(t=>t.SettingsComponent),canActivate:[M]}];var ie={dispatch:!0,functional:!1,useEffectsErrorHandler:!0},tt="__@ngrx/effects_create__";function h(t,e={}){let c=e.functional?t:t(),r=n(n({},ie),e);return Object.defineProperty(c,tt,{value:r}),c}function ce(t){return Object.getOwnPropertyNames(t).filter(r=>t[r]&&t[r].hasOwnProperty(tt)?t[r][tt].hasOwnProperty("dispatch"):!1).map(r=>{let s=t[r][tt];return n({propertyName:r},s)})}function ae(t){return ce(t)}function Nt(t){return Object.getPrototypeOf(t)}function fe(t){return!!t.constructor&&t.constructor.name!=="Object"&&t.constructor.name!=="Function"}function Ut(t){return typeof t=="function"}function ue(t){return t.filter(Ut)}function pe(t,e,c){let r=Nt(t),o=!!r&&r.constructor.name!=="Object"?r.constructor.name:null,i=ae(t).map(({propertyName:E,dispatch:rt,useEffectsErrorHandler:se})=>{let ut=typeof t[E]=="function"?t[E]():t[E],pt=se?c(ut,e):ut;return rt===!1?pt.pipe(ht()):pt.pipe(Et()).pipe(u(oe=>({effect:t[E],notification:oe,propertyName:E,sourceName:o,sourceInstance:t})))});return ot(...i)}var de=10;function Bt(t,e,c=de){return t.pipe(A(r=>(e&&e.handleError(r),c<=1?t:Bt(t,e,c-1))))}var et=(()=>{let e=class e extends dt{constructor(r){super(),r&&(this.source=r)}lift(r){let s=new e;return s.source=this,s.operator=r,s}};e.\u0275fac=function(s){return new(s||e)(p(xt))},e.\u0275prov=l({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();function g(...t){return j(e=>t.some(c=>typeof c=="string"?c===e.type:c.type===e.type))}var lr=new S("@ngrx/effects Internal Root Guard"),mr=new S("@ngrx/effects User Provided Effects"),hr=new S("@ngrx/effects Internal Root Effects"),gr=new S("@ngrx/effects Internal Root Effects Instances"),Er=new S("@ngrx/effects Internal Feature Effects"),Ar=new S("@ngrx/effects Internal Feature Effects Instance Groups"),le=new S("@ngrx/effects Effects Error Handler",{providedIn:"root",factory:()=>Bt}),me="@ngrx/effects/init",he=Rt(me);function ge(t,e){if(t.notification.kind==="N"){let c=t.notification.value;!Ee(c)&&e.handleError(new Error(`Effect ${Ae(t)} dispatched an invalid action: ${Se(c)}`))}}function Ee(t){return typeof t!="function"&&t&&t.type&&typeof t.type=="string"}function Ae({propertyName:t,sourceInstance:e,sourceName:c}){let r=typeof e[t]=="function";return!!c?`"${c}.${String(t)}${r?"()":""}"`:`"${String(t)}()"`}function Se(t){try{return JSON.stringify(t)}catch{return t}}var ve="ngrxOnIdentifyEffects";function Fe(t){return at(t,ve)}var Ce="ngrxOnRunEffects";function ye(t){return at(t,Ce)}var Ie="ngrxOnInitEffects";function Me(t){return at(t,Ie)}function at(t,e){return t&&e in t&&typeof t[e]=="function"}var Gt=(()=>{let e=class e extends lt{constructor(r,s){super(),this.errorHandler=r,this.effectsErrorHandler=s}addEffects(r){this.next(r)}toActions(){return this.pipe(nt(r=>fe(r)?Nt(r):r),st(r=>r.pipe(nt(je))),st(r=>{let s=r.pipe(d(i=>be(this.errorHandler,this.effectsErrorHandler)(i)),u(i=>(ge(i,this.errorHandler),i.notification)),j(i=>i.kind==="N"&&i.value!=null),gt()),o=r.pipe(mt(1),j(Me),u(i=>i.ngrxOnInitEffects()));return ot(s,o)}))}};e.\u0275fac=function(s){return new(s||e)(p(vt),p(le))},e.\u0275prov=l({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();function je(t){return Fe(t)?t.ngrxOnIdentifyEffects():""}function be(t,e){return c=>{let r=pe(c,t,e);return ye(c)?c.ngrxOnRunEffects(r):r}}var Re=(()=>{let e=class e{get isStarted(){return!!this.effectsSubscription}constructor(r,s){this.effectSources=r,this.store=s,this.effectsSubscription=null}start(){this.effectsSubscription||(this.effectsSubscription=this.effectSources.toActions().subscribe(this.store))}ngOnDestroy(){this.effectsSubscription&&(this.effectsSubscription.unsubscribe(),this.effectsSubscription=null)}};e.\u0275fac=function(s){return new(s||e)(p(Gt),p(v))},e.\u0275prov=l({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();function Vt(...t){let e=t.flat(),c=ue(e);return St([c,{provide:At,multi:!0,useValue:()=>{m(wt),m(Pt,{optional:!0});let r=m(Re),s=m(Gt),o=!r.isStarted;o&&r.start();for(let i of e){let E=Ut(i)?m(i):i;s.addEffects(E)}o&&m(v).dispatch(he())}}])}var ft=localStorage.getItem("sf-user"),Jt={isLoggedIn:!!ft,user:ft?JSON.parse(ft):null,loading:!1,errorMessage:"",resetPasswordSuccess:!1},Kt=x(Jt,a(T,t=>f(n({},t),{loading:!0,errorMessage:""})),a($,(t,e)=>(localStorage.setItem("sf-user",JSON.stringify(e.user)),f(n({},t),{user:e.user,loading:!1,errorMessage:"",isLoggedIn:!0}))),a(k,(t,e)=>f(n({},t),{errorMessage:e.errorMessage,loading:!1})),a(L,t=>f(n({},t),{loading:!0,errorMessage:""})),a(H,(t,e)=>(localStorage.setItem("sf-user",JSON.stringify(e.user)),f(n({},t),{user:e.user,loading:!1,errorMessage:"",isLoggedIn:!0}))),a(N,(t,e)=>f(n({},t),{errorMessage:e.errorMessage,loading:!1})),a(U,t=>f(n({},t),{loading:!0,errorMessage:"",resetPasswordSuccess:!1,isLoggedIn:!1})),a(B,(t,e)=>f(n({},t),{loading:!1,errorMessage:"",resetPasswordSuccess:!0,isLoggedIn:!1})),a(G,(t,e)=>f(n({},t),{errorMessage:e.errorMessage,loading:!1,resetPasswordSuccess:!1,isLoggedIn:!1})),a(V,(t,e)=>(localStorage.setItem("sf-user",JSON.stringify(e.user)),f(n({},t),{user:e.user}))),a(D,()=>(localStorage.removeItem("sf-user"),f(n({},Jt),{user:null,isLoggedIn:!1}))));var Yt=(()=>{let e=class e{constructor(r){this.httpClient=r}login(r){return this.httpClient.post("/auth/login",r)}signup(r){return this.httpClient.post("/auth/signup",{email:r})}resetPassword(r){return this.httpClient.post("/auth/reset-password",{email:r})}updateUser(r){return this.httpClient.put("/api/user/update",{user:r},{params:{id:r.id}})}};e.\u0275fac=function(s){return new(s||e)(p(R))},e.\u0275prov=l({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();var Xt=(()=>{let e=class e{constructor(r,s){this.authService=r,this.actions$=s,this.logins$=h(()=>this.actions$.pipe(g(T),d(o=>this.authService.login(o).pipe(u(i=>$({user:i.user})),A(i=>F(k({errorMessage:i.status})))))),{useEffectsErrorHandler:!1}),this.signup$=h(()=>this.actions$.pipe(g(L),d(o=>this.authService.signup(o.user.email).pipe(u(i=>H({user:i.user})),A(i=>F(N({errorMessage:i?.error?.message})))))),{useEffectsErrorHandler:!1}),this.resetPassword$=h(()=>this.actions$.pipe(g(U),d(o=>this.authService.resetPassword(o.email).pipe(u(()=>B()),A(i=>F(G({errorMessage:i?.error?.message})))))),{useEffectsErrorHandler:!1}),this.updateUser$=h(()=>this.actions$.pipe(g(Dt),d(o=>this.authService.updateUser(o.user).pipe(u(()=>V({user:o.user}))))))}};e.\u0275fac=function(s){return new(s||e)(p(Yt),p(et))},e.\u0275prov=l({token:e,factory:e.\u0275fac});let t=e;return t})();var Zt={API_URL:"http://localhost:3000"};var qt=(t,e)=>{let c=t.clone({url:`${Zt.API_URL}${t.url}`});return e(c)};var Te={posts:[],ads:[],loading:!0,errorFetching:!1,totalPostPages:1},Qt=(t,e)=>{let r=(t.isSponsored?e.ads:e.posts).map(s=>{if(s.id==t.id)if(t.isSponsored){let o=e.ads.find(({id:i})=>i==t.id);return n(n({},o),t)}else return t;return s});return t.isSponsored?{ads:r}:{posts:r}},Wt=x(Te,a(z,t=>f(n({},t),{loading:!0,errorFetching:!1})),a(Y,t=>f(n({},t),{loading:!0,errorFetching:!1})),a(X,t=>n({},t)),a(Z,t=>n({},t)),a(J,(t,e)=>f(n({},t),{loading:!1,posts:e.resetPosts?e.posts:t.posts.concat(e.posts),totalPostPages:e.totalPages})),a(K,(t,e)=>f(n({},t),{loading:!1,errorFetching:!0})),a(q,(t,e)=>f(n({},t),{loading:!1,ads:e.ads})),a(Q,(t,e)=>f(n({},t),{loading:!1,errorFetching:!0})),a(W,(t,e)=>n(n({},t),Qt(e.post,t))),a(_,(t,e)=>n(n({},t),Qt(e.post,t))));var _t=(()=>{let e=class e{constructor(r){this.httpClient=r}getPosts(r,s){let o={pageNumber:r};return s&&(o.userId=s),this.httpClient.get("/api/posts",{params:o})}getAds(){return this.httpClient.get("/api/ads")}postComment(r){return this.httpClient.post("/api/post/comment",r)}postLike(r){return this.httpClient.post("/api/post/like",r)}};e.\u0275fac=function(s){return new(s||e)(p(R))},e.\u0275prov=l({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();var te=(()=>{let e=class e{constructor(r,s){this.feedService=r,this.actions$=s,this.getPosts$=h(()=>this.actions$.pipe(g(z),d(({pageNumber:o,userId:i})=>this.feedService.getPosts(o,i).pipe(u(({posts:E,totalPages:rt})=>J({posts:E,totalPages:rt,resetPosts:o==1})),A(()=>F(K()))))),{useEffectsErrorHandler:!0}),this.getAds$=h(()=>this.actions$.pipe(g(Y),d(()=>this.feedService.getAds().pipe(u(o=>q({ads:o})),A(()=>F(Q()))))),{useEffectsErrorHandler:!0}),this.postComment$=h(()=>this.actions$.pipe(g(X),d(({post:o})=>this.feedService.postComment(o).pipe(u(()=>W({post:o}))))),{useEffectsErrorHandler:!0}),this.postLike$=h(()=>this.actions$.pipe(g(Z),d(({post:o})=>this.feedService.postLike(o).pipe(u(()=>_({post:o}))))),{useEffectsErrorHandler:!0})}};e.\u0275fac=function(s){return new(s||e)(p(_t),p(et))},e.\u0275prov=l({token:e,factory:e.\u0275fac});let t=e;return t})();var ee={providers:[bt(Ht),yt(It([qt])),Ot(),ct({name:Tt,reducer:Kt}),ct({name:$t,reducer:Wt}),Vt([Xt,te])]};var re=(()=>{let e=class e{};e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=y({type:e,selectors:[["sf-root"]],standalone:!0,features:[I],decls:1,vars:0,template:function(s,o){s&1&&b(0,"router-outlet")},dependencies:[jt]});let t=e;return t})();Mt(re,ee).catch(t=>console.error(t));
/**i18n:78ec41dfc2d5945b80dcfac9750f5f174f20eab2bfa86945afb4182e6c3fdd7c*/
