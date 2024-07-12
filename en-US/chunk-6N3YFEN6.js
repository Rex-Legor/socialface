import{e as oe}from"./chunk-2ZWGIUOF.js";import{h as de}from"./chunk-U662JCHK.js";import{b as ae,d as g,e as se,f as ue,h as Se,i as pe,j as Pe,k as me,l as ge,n as Ne}from"./chunk-MKZTZUHH.js";import{$ as t,$a as ie,D as F,F as w,H as D,Ha as J,Ia as Q,Ja as Y,La as Z,N as z,O as k,S as p,Sa as ee,T as f,Ta as te,V as B,Va as ne,X as E,Z as P,aa as n,ab as G,ba as m,da as V,ea as q,fa as l,ia as C,ib as re,jb as _e,lb as le,va as j,wa as x,xa as W,ya as H,za as K}from"./chunk-CRGJQDHV.js";var Ee=(()=>{let r=class r{constructor(_){this.eleRef=_,this.autocompleteOptions=[],this.inputValue="",this.optionChange=new k(),this.showAutocompleteDiv=!1;}removeAutocompleteDiv(){document.getElementById("sf-autocomplete-div")?.remove(),this.showAutocompleteDiv=!1;}buildAutocompleteDiv(_){let a=this.autocompleteOptions.filter(u=>u.toLocaleLowerCase().includes(_.toLowerCase()));if(_==""||a.length==0){this.removeAutocompleteDiv();return;}this.showAutocompleteDiv=!0;let e=document.getElementById("sf-autocomplete-div")||document.createElement("div");e.id="sf-autocomplete-div",e.innerHTML="";let s=document.createElement("ul");a.forEach(u=>{let S=document.createElement("li");S.innerHTML=u,S.addEventListener("click",()=>{this.optionChange.emit(u),setTimeout(()=>{this.removeAutocompleteDiv();},100);}),s.appendChild(S);}),e.className="sf-autocomplete__list",e.appendChild(s),this.eleRef.nativeElement.parentElement?.appendChild(e);}ngOnChanges(_){let a=_.inputValue.currentValue;this.buildAutocompleteDiv(a);}};r.ɵfac=function(a){return new(a||r)(f(z));},r.ɵdir=w({type:r,selectors:[["","sfAutocomplete",""]],inputs:{autocompleteOptions:"autocompleteOptions",inputValue:"inputValue"},outputs:{optionChange:"optionChange"},standalone:!0,features:[D]});let o=r;return o;})();var ce=o=>({"--placeholder":o}),Ge=()=>["Mexico","USA","Canada"];function Ce(o,r){o&1&&(t(0,"span",42),l(1,11),n());}function Ie(o,r){o&1&&(t(0,"span",43),l(1,12),n());}function Me(o,r){o&1&&(t(0,"span",43),l(1,13),n());}function Te(o,r){o&1&&(t(0,"span",43),l(1,14),n());}function Ae(o,r){o&1&&(t(0,"span",43),l(1,15),n());}function he(o,r){o&1&&(t(0,"span",43),l(1,16),n());}var He=(()=>{let r=class r{constructor(_,a,e){this.fb=_,this.store=a,this.router=e,this.errorMessage=B(""),this.birthdatePLaceholder="Birthdate",this.form=this.fb.group({firstName:["",[g.required]],lastName:["",[g.required]],email:["",[g.email,g.required]],birthDate:["",[g.required]],country:["",[g.required]],notificationPreference:["browser",[g.required]]}),this.loading$=this.store.pipe(G(_e)),this.store.pipe(G(re)).subscribe(s=>{this.errorMessage.set(s);}),this.store.pipe(G(le)).subscribe(s=>{s&&this.router.navigate(["/feed"]);});}onCountrySelect(_){this.form.get("country")?.setValue(_);}onSubmit(){if(this.form.markAllAsTouched(),this.form.valid){let _={id:"123",email:this.form.get("email")?.value,firstName:this.form.get("fistName")?.value,lastName:this.form.get("lastName")?.value,notificationPreference:this.form.get("notificationPreference")?.value,country:this.form.get("country")?.value,birthDate:this.form.get("birthDate")?.value,profilePicture:""};this.store.dispatch(oe({user:_}));}}};r.ɵfac=function(a){return new(a||r)(f(ge),f(ie),f(ee));},r.ɵcmp=F({type:r,selectors:[["sf-signup"]],standalone:!0,features:[j],decls:52,vars:16,consts:()=>{let _;_="First name*";let a;a="Last name*";let e;e="Email*";let s;s="Birthdate";let u;u="Country*";let S;S="Social Network Illustration";let N;N="Sign up";let c;c=" Become part of the worldwide community! ";let d;d=" Notification preference ";let I;I="Receive In browser notifications";let M;M="Receive only email notifications";let T;T=" Sign up ";let A;A="or";let h;h=" Sign up with Google ";let $;$=" Already have an account? "+"\uFFFD#44\uFFFD"+"Log in"+"\uFFFD/#44\uFFFD"+"";let R;R="Connect with everyone";let O;O=" Be part of this worldwide social network and don't miss anything. ";let y;y="This email is already taken";let U;U="Please enter your first name";let v;v="Please enter your last name";let L;L="Please enter a valid email";let b;b="Please enter your birthdate";let X;return X="Please select your country",[N,c,d,I,M,T,A,h,$,R,O,y,U,v,L,b,X,[1,"sf-auth"],[1,"sf-auth__container"],[3,"ngSubmit","formGroup"],[1,"sf-form-title"],["tabindex","0"],["tabindex","0","class","sf-span sf-span__error",4,"ngIf"],[1,"sf-input"],["type","text","placeholder",_,"formControlName","firstName"],["tabindex","0","class","sf-input__error",4,"ngIf"],["type","text","placeholder",a,"formControlName","lastName"],["type","email","placeholder",e,"formControlName","email"],[1,"sf-input","sf-datepicker"],["type","date","min","1900-01-01","max","2024-06-13","aria-label",s,"formControlName","birthDate",3,"ngStyle"],[1,"sf-input","sf-autocomplete"],["placeholder",u,"sfAutocomplete","","formControlName","country",3,"optionChange","autocompleteOptions","inputValue"],[1,"sf-radio-group"],["type","radio","value","browser","formControlName","notificationPreference"],["type","radio","value","email","formControlName","notificationPreference"],[1,"sf-button","primary",3,"disabled"],[1,"sf-separator"],[1,"sf-button","sf-button-google"],["routerLink","/login"],[1,"sf-auth__container","sf-auth__container__side"],["src","assets/images/login-side.png","alt",S],[1,"sf-auth__container__side__slogan"],["tabindex","0",1,"sf-span","sf-span__error"],["tabindex","0",1,"sf-input__error"]];},template:function(a,e){if(a&1&&(t(0,"div",17)(1,"div",18)(2,"form",19),C("ngSubmit",function(){return e.onSubmit();}),t(3,"div",20)(4,"h1",21),l(5,0),n(),t(6,"p",21),l(7,1),n()(),E(8,Ce,2,0,"span",22),t(9,"div",23),m(10,"input",24),E(11,Ie,2,0,"span",25),n(),t(12,"div",23),m(13,"input",26),E(14,Me,2,0,"span",25),n(),t(15,"div",23),m(16,"input",27),E(17,Te,2,0,"span",25),n(),t(18,"div",28),m(19,"input",29),E(20,Ae,2,0,"span",25),n(),t(21,"div",30)(22,"input",31),C("optionChange",function(u){return e.onCountrySelect(u);}),n(),E(23,he,2,0,"span",25),n(),t(24,"div",32)(25,"h3",21),l(26,2),n(),t(27,"label"),m(28,"input",33),t(29,"span",21),l(30,3),n()(),t(31,"label"),m(32,"input",34),t(33,"span",21),l(34,4),n()()(),t(35,"button",35),H(36,"async"),l(37,5),n(),t(38,"div",36),l(39,6),n(),t(40,"button",37),l(41,7),n(),t(42,"p",21),V(43,8),m(44,"a",38),q(),n()()(),t(45,"div",39),m(46,"img",40),t(47,"div",41)(48,"h2",21),l(49,9),n(),t(50,"p",21),l(51,10),n()()()()),a&2){let s,u,S,N,c,d;p(2),P("formGroup",e.form),p(6),P("ngIf",e.errorMessage()=="already exist"),p(3),P("ngIf",((s=e.form.get("firstName"))==null?null:s.touched)&&((s=e.form.get("firstName"))==null?null:s.invalid)),p(3),P("ngIf",((u=e.form.get("lastName"))==null?null:u.touched)&&((u=e.form.get("lastName"))==null?null:u.invalid)),p(3),P("ngIf",((S=e.form.get("email"))==null?null:S.touched)&&((S=e.form.get("email"))==null?null:S.invalid)),p(2),P("ngStyle",W(13,ce,'"'+e.birthdatePLaceholder+'"')),p(),P("ngIf",((N=e.form.get("birthDate"))==null?null:N.touched)&&((N=e.form.get("birthDate"))==null?null:N.invalid)),p(2),P("autocompleteOptions",x(15,Ge))("inputValue",(c=e.form.get("country"))==null?null:c.value),p(),P("ngIf",((d=e.form.get("country"))==null?null:d.touched)&&((d=e.form.get("country"))==null?null:d.invalid)),p(12),P("disabled",K(36,11,e.loading$));}},dependencies:[Z,J,Q,Y,Ne,Se,ae,pe,se,ue,Pe,me,de,ne,te,Ee],styles:[`.sf-auth__container{padding-bottom:20px}
`],encapsulation:2});let o=r;return o;})();export{He as SignupComponent};/**i18n:09bae54218b88e4f05ff41eae164937f157eca229141359bef14509b10ad6ed6*/