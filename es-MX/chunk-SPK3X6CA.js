import{a as re,e as se,f as _e,l as le,m as pe,n as ae}from"./chunk-B2OAQ3EP.js";import{a as Q,b as Y,c as Z,d as ee,e as te,f as ie,g as oe,h as ne}from"./chunk-WMFLTBGP.js";import"./chunk-7N5EIHF5.js";import{$ as t,$a as L,D as X,Fa as V,Ga as W,Ha as j,I as g,J as u,Ja as q,La as H,Q as U,S as a,T as M,V as E,X as h,Z as d,a as O,aa as o,ab as P,ba as p,ca as x,fa as f,ia as S,ja as R,kb as K,na as C,oa as z,qa as D,va as B,xa as J,ya as A,za as b}from"./chunk-R5MUVTMB.js";var fe=_=>({"sf-profile__section__responsive-display":_});function de(_,l){if(_&1){let m=x();t(0,"sf-post-refresh",45),S("onRefresh",function(){g(m);let i=R();return u(i.getData());}),o();}}function ce(_,l){_&1&&p(0,"sf-post-placeholder");}function me(_,l){if(_&1){let m=x();t(0,"sf-post",46),S("commentChange",function(i){let e=g(m).$implicit,s=R();return u(s.commentPost(e,i));})("likeChange",function(){let i=g(m).$implicit,e=R();return u(e.likePost(i));}),o();}if(_&2){let m=l.$implicit;d("post",m);}}var ye=(()=>{let l=class l{constructor(n,i){this.store=n,this.authStore=i,this.posts=E([]),this.user=E(null),this.displayMenu=E(!1),this.trackByPostId=(e,s)=>s.id,this.loading$=this.store.pipe(P(le)),this.errorFetching$=this.store.pipe(P(pe)),this.postsSub=this.store.pipe(P(ae)).subscribe(e=>{this.posts.set(e);}),this.userSubscription=this.authStore.pipe(P(K)).subscribe(e=>{this.user.set(e),this.posts().length==0&&this.getData();});}ngOnDestroy(){this.postsSub.unsubscribe(),this.userSubscription.unsubscribe();}getData(){this.store.dispatch(re({pageNumber:1,userId:this.user()?.id}));}toggleDisplayMenu(){this.displayMenu.set(!this.displayMenu());}likePost(n){let i=O({},n);i.liked=!n.liked,this.store.dispatch(_e({post:i}));}commentPost(n,i){let e=O({},n),s={comment:i,postId:n.id,userData:this.user()};e.comments=n.comments?n.comments.concat([s]):[s],this.store.dispatch(se({post:e}));}};l.ɵfac=function(i){return new(i||l)(M(L),M(L));},l.ɵcmp=X({type:l,selectors:[["sf-profile"]],standalone:!0,features:[B],decls:62,vars:16,consts:()=>{let n;n="Secci\xF3n de Perfil de Usuario";let i;i="Foto de Perfil del Usuario";let e;e="Direcci\xF3n del Usuario";let s;s="P\xE1gina Web del Usuario";let c;c="Fecha de Registro del Usuario";let I;I="Trabajo del Usuario";let T;T="Estado del Usuario";let N;N="Acerca de m\xED";let $;$="\"Este es un texto de muestra para prop\xF3sito de dise\xF1o. Representa la secci\xF3n de\n          Acerca de m\xED que usualmente el usuario edita aqu\xED\"";let F;F="Aqu\xED va tu direcci\xF3n";let y;y="Se uni\xF3 entre 1993 y 2024";let G;G="Trabaja en Unosquare";let w;w="Casado con su esposa";let k;k="Mis fotos";let v;return v="Mis publicaciones",[N,$,F,y,G,w,k,v,[3,"menuButtonClick"],[1,"sf-profile"],[1,"sf-profile__section",3,"ngClass"],[3,"user"],["aria-label",n,1,"sf-profile__container"],[1,"sf-profile__container__pictures"],["alt",i,3,"src"],[1,"sf-profile__container__pictures__text"],["tabindex","0"],[1,"sf-profile__content"],[1,"sf-profile__content__bio"],[1,"sf-profile__content__bio__info"],[1,"sf-profile__content__bio__info__details"],["tabindex","0","aria-label",e],["name","map-pin"],["tabindex","0","aria-label",s],["name","globe"],["tabindex","0","aria-label",c],["name","calendar"],["tabindex","0","aria-label",I],["name","briefcase"],["tabindex","0","aria-label",T],["name","heart"],[1,"sf-profile__content__bio__pictures"],["src","https://picsum.photos/300?random=10","alt","User random photo 1"],["src","https://picsum.photos/300?random=11","alt","User random photo 2"],["src","https://picsum.photos/300?random=12","alt","User random photo 3"],["src","https://picsum.photos/300?random=13","alt","User random photo 4"],["src","https://picsum.photos/300?random=14","alt","User random photo 5"],["src","https://picsum.photos/300?random=15","alt","User random photo 6"],["src","https://picsum.photos/300?random=16","alt","User random photo 7"],["src","https://picsum.photos/300?random=17","alt","User random photo 8"],["src","https://picsum.photos/300?random=18","alt","User random photo 9"],[1,"sf-profile__content__posts"],[3,"onRefresh",4,"ngIf"],[4,"ngIf"],[3,"post","commentChange","likeChange",4,"ngFor","ngForOf","ngForTrackBy"],[3,"onRefresh"],[3,"commentChange","likeChange","post"]];},template:function(i,e){if(i&1&&(t(0,"sf-header",8),S("menuButtonClick",function(){return e.toggleDisplayMenu();}),o(),t(1,"div",9)(2,"section",10),p(3,"sf-sidebar",11),o(),t(4,"section",12)(5,"div",13),p(6,"img",14),t(7,"div",15)(8,"h3",16),C(9),o(),t(10,"p",16),C(11),o()()(),t(12,"div",17)(13,"div",18)(14,"div",19)(15,"h4",16),f(16,0),o(),t(17,"p",16),f(18,1),o(),t(19,"div",20)(20,"ul")(21,"li",21),p(22,"i-feather",22),t(23,"span"),f(24,2),o()(),t(25,"li",23),p(26,"i-feather",24),t(27,"span"),C(28,"fakeaddress.com/user"),o()(),t(29,"li",25),p(30,"i-feather",26),t(31,"span"),f(32,3),o()(),t(33,"li",27),p(34,"i-feather",28),t(35,"span"),f(36,4),o()(),t(37,"li",29),p(38,"i-feather",30),t(39,"span"),f(40,5),o()()()()(),t(41,"div",31)(42,"h4",16),f(43,6),o(),t(44,"div"),p(45,"img",32)(46,"img",33)(47,"img",34)(48,"img",35)(49,"img",36)(50,"img",37)(51,"img",38)(52,"img",39)(53,"img",40),o()()(),t(54,"div",41)(55,"h3",16),f(56,7),o(),h(57,de,1,0,"sf-post-refresh",42),A(58,"async"),h(59,ce,1,0,"sf-post-placeholder",43),A(60,"async"),h(61,me,1,1,"sf-post",44),o()()()()),i&2){let s,c;a(2),d("ngClass",J(14,fe,e.displayMenu())),a(),d("user",e.user()),a(3),d("src",(s=e.user())==null?null:s.profilePicture,U),a(3),D("",(c=e.user())==null?null:c.firstName," ",(c=e.user())==null?null:c.lastName,""),a(2),z("@fakeuserhasktag"),a(46),d("ngIf",b(58,10,e.errorFetching$)),a(2),d("ngIf",b(60,12,e.loading$)),a(2),d("ngForOf",e.posts())("ngForTrackBy",e.trackByPostId);}},dependencies:[H,V,W,j,q,ne,Y,ee,te,oe,ie,Z,Q],styles:[`.sf-profile{padding-top:75px;background-color:#f3f6f8;min-height:calc(100% - 90px);display:flex;justify-content:center}.sf-profile__section{width:350px;flex-shrink:0}.sf-profile__container{display:flex;justify-content:center;flex-direction:column;gap:20px;margin:20px 50px 30px}.sf-profile__container__pictures{width:100%;box-shadow:#32325d40 0 2px 5px -1px,#0000004d 0 1px 3px -1px;background-image:url(https://loremflickr.com/1024/600);position:relative;height:400px;border-radius:5px;background-repeat:no-repeat;background-size:100%}.sf-profile__container__pictures__text{position:absolute;left:220px;bottom:0;color:#fff}.sf-profile__container__pictures__text h3{margin-bottom:5px}.sf-profile__container__pictures__text p{margin-top:0}.sf-profile__container__pictures img{position:absolute;left:50px;bottom:-30px;width:150px;height:150px;border-radius:50%}.sf-profile__content{display:flex;gap:20px}.sf-profile__content__bio{width:350px;flex-shrink:0;display:flex;gap:20px;flex-direction:column}.sf-profile__content__bio__info{padding:20px;box-shadow:#32325d40 0 2px 5px -1px,#0000004d 0 1px 3px -1px;background-color:#fff;border-radius:5px;height:fit-content}.sf-profile__content__bio__info h4{font-size:16px;margin-top:0}.sf-profile__content__bio__info p{color:gray;margin-bottom:30px}.sf-profile__content__bio__info__details{border-top:1px solid #c7c7c7;padding-top:15px}.sf-profile__content__bio__info__details ul{padding:0;margin:0}.sf-profile__content__bio__info__details ul li{list-style:none;display:flex;align-items:center;gap:15px;padding:10px 0}.sf-profile__content__bio__info__details ul li i-feather{color:gray}.sf-profile__content__bio__pictures{box-shadow:#32325d40 0 2px 5px -1px,#0000004d 0 1px 3px -1px;background-color:#fff;border-radius:5px;height:fit-content;padding:20px}.sf-profile__content__bio__pictures h4{margin-top:0}.sf-profile__content__bio__pictures img{width:calc(33.3333333333% - 3.4px)}.sf-profile__content__bio__pictures>div{display:flex;flex-wrap:wrap;gap:5px;border-radius:10px;overflow:hidden}.sf-profile__content__posts{max-width:700px;display:flex;flex-direction:column;gap:20px}.sf-profile__content__posts h3{margin:0}sf-profile .sf-header__section__chat-button{display:none!important}@media only screen and (min-width: 1281px) and (max-width: 1366px){.sf-profile__content__bio{width:300px}}@media only screen and (max-width: 1279px){.sf-profile__container{margin:20px}.sf-profile__section__responsive-display:first-child{display:block!important}.sf-profile__section:first-child{display:none;position:fixed;left:0;top:0;background-color:#fff;height:100%;overflow-y:auto;z-index:99}.sf-profile__section:first-child .sf-profile__sidebar{position:relative}sf-profile .sf-header__section>button:not(.sf-header__section__chat-button){display:block!important}}@media only screen and (max-width: 800px){.sf-profile__section__responsive-display:last-child{display:block!important}.sf-profile__container{margin:20px}.sf-profile__content{flex-direction:column}.sf-profile__content__bio{width:100%}.sf-profile__content__posts{max-width:unset}}@media only screen and (max-device-width: 600px) and (orientation: portrait),(max-device-height: 500px) and (orientation: landscape){.sf-profile__container__pictures{height:190px}.sf-profile__container__pictures__text{left:120px}.sf-profile__container__pictures img{left:20px;bottom:-20px;width:80px;height:80px}}
`],encapsulation:2});let _=l;return _;})();export{ye as ProfileComponent};/**i18n:78ec41dfc2d5945b80dcfac9750f5f174f20eab2bfa86945afb4182e6c3fdd7c*/