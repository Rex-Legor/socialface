import{Wa as t,Xa as r,bb as c,cb as p}from"./chunk-R5MUVTMB.js";var s=function(e){return e.GetPosts="[Feed Page] Get Posts",e.GetPostsSuccess="[Feed Page] Get Posts Success",e.GetPostsError="[Feed Page] Get Posts Error",e.GetAds="[Feed Page] Get Ads",e.GetAdsSuccess="[Feed Page] Get Ads Success",e.GetAdsError="[Feed Page] Get Ads Error",e.PostComment="[Feed Page] Post Comment Success",e.PostCommentSuccess="[Feed Page] Post Comment",e.PostLike="[Feed Page] Post Like",e.PostLikeSuccess="[Feed Page] Post Like Success",e}(s||{}),S=t(s.GetPosts,r()),l=t(s.GetPostsSuccess,r()),G=t(s.GetPostsError),f=t(s.GetAds),k=t(s.PostComment,r()),C=t(s.PostLike,r()),F=t(s.GetAdsSuccess,r()),L=t(s.GetAdsError),E=t(s.PostCommentSuccess,r()),h=t(s.PostLikeSuccess,r());var u="feed",n=p(u),b=c(n,e=>e.loading),D=c(n,e=>e.errorFetching),v=c(n,e=>e.posts),I=c(n,e=>e.totalPostPages),K=c(n,e=>e.ads),j=c(n,e=>{let m=e.posts,i=e.ads,P=[],a=0;for(let d=0;d<m.length;d++){let g=m[d];if(P.push(g),(d+1)%4==0&&a<i.length){let o=i[a];P.push({id:o.id,date:"",description:o.description,picture:o.picture,totalComments:o.totalComments,totalLikes:o.totalLikes,comments:o.comments||[],liked:o.liked,isSponsored:!0,userData:{profilePicture:o.companyPicture,lastName:"",firstName:o.companyName,birthDate:"",country:"",email:"",id:"",notificationPreference:""}}),a+=1}}return P});export{S as a,l as b,G as c,f as d,k as e,C as f,F as g,L as h,E as i,h as j,u as k,b as l,D as m,v as n,I as o,j as p};
/**i18n:78ec41dfc2d5945b80dcfac9750f5f174f20eab2bfa86945afb4182e6c3fdd7c*/