import{v as w,d,b as o,u as s,w as m,F as b,o as i,X as h,t as k,e as c,a as t,c as x,s as y,n as v,k as V,g as _}from"./app-5e210827.js";import{A as $}from"./AuthenticationCard-f99f1acc.js";import{_ as B}from"./AuthenticationCardLogo-cabb9956.js";import{_ as C}from"./Checkbox-18d5cb23.js";import{_ as u,a as f}from"./TextInput-e1dd4954.js";import{_ as p}from"./InputLabel-1899c985.js";import{_ as F}from"./PrimaryButton-745f8478.js";import"./_plugin-vue_export-helper-c27b6911.js";const N={key:0,class:"mb-4 font-medium text-sm text-green-600"},S=["onSubmit"],q={class:"mt-4"},L={class:"block mt-4"},P={class:"flex items-center"},R=t("span",{class:"ml-2 text-sm text-gray-600"},"Remember me",-1),U={class:"flex items-center justify-end mt-4"},A=_(" Forgot your password? "),E=_(" Log in "),I={name:"Login",props:{canResetPassword:Boolean,status:String},setup(l){const e=w({email:"",password:"",remember:!1}),g=()=>{e.transform(n=>({...n,remember:e.remember?"on":""})).post(route("login"),{onFinish:()=>e.reset("password")})};return(n,a)=>(i(),d(b,null,[o(s(h),{title:"Log in"}),o($,null,{logo:m(()=>[o(B)]),default:m(()=>[l.status?(i(),d("div",N,k(l.status),1)):c("",!0),t("form",{onSubmit:V(g,["prevent"])},[t("div",null,[o(p,{for:"email",value:"Email"}),o(u,{id:"email",modelValue:s(e).email,"onUpdate:modelValue":a[0]||(a[0]=r=>s(e).email=r),type:"email",class:"mt-1 block w-full",required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),o(f,{class:"mt-2",message:s(e).errors.email},null,8,["message"])]),t("div",q,[o(p,{for:"password",value:"Password"}),o(u,{id:"password",modelValue:s(e).password,"onUpdate:modelValue":a[1]||(a[1]=r=>s(e).password=r),type:"password",class:"mt-1 block w-full",required:"",autocomplete:"current-password"},null,8,["modelValue"]),o(f,{class:"mt-2",message:s(e).errors.password},null,8,["message"])]),t("div",L,[t("label",P,[o(C,{checked:s(e).remember,"onUpdate:checked":a[2]||(a[2]=r=>s(e).remember=r),name:"remember"},null,8,["checked"]),R])]),t("div",U,[l.canResetPassword?(i(),x(s(y),{key:0,href:n.route("password.request"),class:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},{default:m(()=>[A]),_:1},8,["href"])):c("",!0),o(F,{class:v(["ml-4",{"opacity-25":s(e).processing}]),disabled:s(e).processing},{default:m(()=>[E]),_:1},8,["class","disabled"])])],40,S)]),_:1})],64))}};export{I as default};
