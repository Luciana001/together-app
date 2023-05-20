import{r as p,C as H,o as t,d as s,a as c,h as N,b as a,w as o,g as n,t as C,B,n as b,A as D,v as O,x as Q,D as Y,c as y,u as h,e as u,F as I,f as U,J as z,O as P}from"./app-5e210827.js";import{_ as G}from"./Modal-a9183897.js";import{_ as J}from"./DialogModal-4c01c56b.js";import{_ as R,a as L}from"./TextInput-e1dd4954.js";import{_ as $}from"./PrimaryButton-745f8478.js";import{_ as S}from"./SecondaryButton-3cf9c612.js";import{_ as W}from"./DangerButton-6d11c8e3.js";import{_ as j}from"./InputLabel-1899c985.js";import"./_plugin-vue_export-helper-c27b6911.js";const X={class:"mt-4"},Z=n(" Cancel "),w={name:"ConfirmsPassword",props:{title:{type:String,default:"Confirm Password"},content:{type:String,default:"For your security, please confirm your password to continue."},button:{type:String,default:"Confirm"}},emits:["confirmed"],setup(g,{emit:x}){const l=p(!1),e=H({password:"",error:"",processing:!1}),i=p(null),v=()=>{axios.get(route("password.confirmation")).then(r=>{r.data.confirmed?x("confirmed"):(l.value=!0,setTimeout(()=>i.value.focus(),250))})},_=()=>{e.processing=!0,axios.post(route("password.confirm"),{password:e.password}).then(()=>{e.processing=!1,d(),D().then(()=>x("confirmed"))}).catch(r=>{e.processing=!1,e.error=r.response.data.errors.password[0],i.value.focus()})},d=()=>{l.value=!1,e.password="",e.error=""};return(r,m)=>(t(),s("span",null,[c("span",{onClick:v},[N(r.$slots,"default")]),a(J,{show:l.value,onClose:d},{title:o(()=>[n(C(g.title),1)]),content:o(()=>[n(C(g.content)+" ",1),c("div",X,[a(R,{ref_key:"passwordInput",ref:i,modelValue:e.password,"onUpdate:modelValue":m[0]||(m[0]=T=>e.password=T),type:"password",class:"mt-1 block w-3/4",placeholder:"Password",autocomplete:"current-password",onKeyup:B(_,["enter"])},null,8,["modelValue","onKeyup"]),a(L,{message:e.error,class:"mt-2"},null,8,["message"])])]),footer:o(()=>[a(S,{onClick:d},{default:o(()=>[Z]),_:1}),a($,{class:b(["ml-3",{"opacity-25":e.processing}]),disabled:e.processing,onClick:_},{default:o(()=>[n(C(g.button),1)]),_:1},8,["class","disabled"])]),_:1},8,["show"])]))}},ee=n(" Two Factor Authentication "),te=n(" Add additional security to your account using two factor authentication. "),oe={key:0,class:"text-lg font-medium text-gray-900"},se={key:1,class:"text-lg font-medium text-gray-900"},ae={key:2,class:"text-lg font-medium text-gray-900"},ne=c("div",{class:"mt-3 max-w-xl text-sm text-gray-600"},[c("p",null," When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application. ")],-1),re={key:3},ce={key:0},le={class:"mt-4 max-w-xl text-sm text-gray-600"},ie={key:0,class:"font-semibold"},ue={key:1},de=["innerHTML"],me={key:0,class:"mt-4 max-w-xl text-sm text-gray-600"},fe={class:"font-semibold"},pe=n(" Setup Key: "),_e=["innerHTML"],he={key:1,class:"mt-4"},ve={key:1},ye=c("div",{class:"mt-4 max-w-xl text-sm text-gray-600"},[c("p",{class:"font-semibold"}," Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost. ")],-1),we={class:"grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 rounded-lg"},ge={class:"mt-5"},be={key:0},xe=n(" Enable "),ke={key:1},Ce=n(" Confirm "),Se=n(" Regenerate Recovery Codes "),Te=n(" Show Recovery Codes "),Fe=n(" Cancel "),$e=n(" Disable "),Ee={name:"TwoFactorAuthenticationForm",props:{requiresConfirmation:Boolean},setup(g){const x=g,l=p(!1),e=p(!1),i=p(!1),v=p(null),_=p(null),d=p([]),r=O({code:""}),m=Q(()=>{var f;return!l.value&&((f=z().props.auth.user)==null?void 0:f.two_factor_enabled)});Y(m,()=>{m.value||(r.reset(),r.clearErrors())});const T=()=>{l.value=!0,P.post(route("two-factor.enable"),{},{preserveScroll:!0,onSuccess:()=>Promise.all([M(),q(),F()]),onFinish:()=>{l.value=!1,e.value=x.requiresConfirmation}})},M=()=>axios.get(route("two-factor.qr-code")).then(f=>{v.value=f.data.svg}),q=()=>axios.get(route("two-factor.secret-key")).then(f=>{_.value=f.data.secretKey}),F=()=>axios.get(route("two-factor.recovery-codes")).then(f=>{d.value=f.data}),V=()=>{r.post(route("two-factor.confirm"),{errorBag:"confirmTwoFactorAuthentication",preserveScroll:!0,preserveState:!0,onSuccess:()=>{e.value=!1,v.value=null,_.value=null}})},E=()=>{axios.post(route("two-factor.recovery-codes")).then(()=>F())},A=()=>{i.value=!0,P.delete(route("two-factor.disable"),{preserveScroll:!0,onSuccess:()=>{i.value=!1,e.value=!1}})};return(f,K)=>(t(),y(G,null,{title:o(()=>[ee]),description:o(()=>[te]),content:o(()=>[h(m)&&!e.value?(t(),s("h3",oe," You have enabled two factor authentication. ")):h(m)&&e.value?(t(),s("h3",se," Finish enabling two factor authentication. ")):(t(),s("h3",ae," You have not enabled two factor authentication. ")),ne,h(m)?(t(),s("div",re,[v.value?(t(),s("div",ce,[c("div",le,[e.value?(t(),s("p",ie," To finish enabling two factor authentication, scan the following QR code using your phone's authenticator application or enter the setup key and provide the generated OTP code. ")):(t(),s("p",ue," Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator application or enter the setup key. "))]),c("div",{class:"mt-4",innerHTML:v.value},null,8,de),_.value?(t(),s("div",me,[c("p",fe,[pe,c("span",{innerHTML:_.value},null,8,_e)])])):u("",!0),e.value?(t(),s("div",he,[a(j,{for:"code",value:"Code"}),a(R,{id:"code",modelValue:h(r).code,"onUpdate:modelValue":K[0]||(K[0]=k=>h(r).code=k),type:"text",name:"code",class:"block mt-1 w-1/2",inputmode:"numeric",autofocus:"",autocomplete:"one-time-code",onKeyup:B(V,["enter"])},null,8,["modelValue","onKeyup"]),a(L,{message:h(r).errors.code,class:"mt-2"},null,8,["message"])])):u("",!0)])):u("",!0),d.value.length>0&&!e.value?(t(),s("div",ve,[ye,c("div",we,[(t(!0),s(I,null,U(d.value,k=>(t(),s("div",{key:k},C(k),1))),128))])])):u("",!0)])):u("",!0),c("div",ge,[h(m)?(t(),s("div",ke,[a(w,{onConfirmed:V},{default:o(()=>[e.value?(t(),y($,{key:0,type:"button",class:b(["mr-3",{"opacity-25":l.value}]),disabled:l.value},{default:o(()=>[Ce]),_:1},8,["class","disabled"])):u("",!0)]),_:1}),a(w,{onConfirmed:E},{default:o(()=>[d.value.length>0&&!e.value?(t(),y(S,{key:0,class:"mr-3"},{default:o(()=>[Se]),_:1})):u("",!0)]),_:1}),a(w,{onConfirmed:F},{default:o(()=>[d.value.length===0&&!e.value?(t(),y(S,{key:0,class:"mr-3"},{default:o(()=>[Te]),_:1})):u("",!0)]),_:1}),a(w,{onConfirmed:A},{default:o(()=>[e.value?(t(),y(S,{key:0,class:b({"opacity-25":i.value}),disabled:i.value},{default:o(()=>[Fe]),_:1},8,["class","disabled"])):u("",!0)]),_:1}),a(w,{onConfirmed:A},{default:o(()=>[e.value?u("",!0):(t(),y(W,{key:0,class:b({"opacity-25":i.value}),disabled:i.value},{default:o(()=>[$e]),_:1},8,["class","disabled"]))]),_:1})])):(t(),s("div",be,[a(w,{onConfirmed:T},{default:o(()=>[a($,{type:"button",class:b({"opacity-25":l.value}),disabled:l.value},{default:o(()=>[xe]),_:1},8,["class","disabled"])]),_:1})]))])]),_:1}))}};export{Ee as default};
