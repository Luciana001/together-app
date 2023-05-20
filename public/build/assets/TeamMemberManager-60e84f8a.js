import{v as k,r as x,d as a,b as n,w as t,e as u,o as l,a as o,u as s,F as w,f as C,n as v,g as i,J as G,t as h,O as H}from"./app-5e210827.js";import{_ as K}from"./ActionMessage-25208254.js";import{_ as j}from"./Modal-a9183897.js";import{_ as B}from"./ConfirmationModal-2652ec19.js";import{_ as L}from"./DangerButton-6d11c8e3.js";import{_ as Q}from"./DialogModal-4c01c56b.js";import{_ as W}from"./FormSection-a8f8434e.js";import{_ as X,a as P}from"./TextInput-e1dd4954.js";import{_ as z}from"./InputLabel-1899c985.js";import{_ as F}from"./PrimaryButton-745f8478.js";import{_ as $}from"./SecondaryButton-3cf9c612.js";import{S}from"./SectionBorder-66cc835b.js";import"./_plugin-vue_export-helper-c27b6911.js";const Y={key:0},Z=i(" Add Team Member "),ee=i(" Add a new team member to your team, allowing them to collaborate with you. "),te=o("div",{class:"col-span-6"},[o("div",{class:"max-w-xl text-sm text-gray-600"}," Please provide the email address of the person you would like to add to this team. ")],-1),se={class:"col-span-6 sm:col-span-4"},oe={key:0,class:"col-span-6 lg:col-span-4"},ne={class:"relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer"},ae=["onClick"],le={class:"flex items-center"},ie={key:0,class:"ml-2 h-5 w-5 text-green-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},re=o("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),ce=[re],me={class:"mt-2 text-xs text-gray-600 text-left"},de=i(" Added. "),ue=i(" Add "),ve={key:1},_e=i(" Pending Team Invitations "),fe=i(" These people have been invited to your team and have been sent an invitation email. They may join the team by accepting the email invitation. "),he={class:"space-y-6"},be={class:"text-gray-600"},ye={class:"flex items-center"},ge=["onClick"],pe={key:2},ke=i(" Team Members "),xe=i(" All of the people that are part of this team. "),we={class:"space-y-6"},Ce={class:"flex items-center"},Te=["src","alt"],Re={class:"ml-4"},Me={class:"flex items-center"},$e=["onClick"],Se={key:1,class:"ml-2 text-sm text-gray-400"},Ae=["onClick"],je=i(" Manage Role "),Be={key:0},Le={class:"relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer"},Pe=["onClick"],ze={class:"flex items-center"},Fe={key:0,class:"ml-2 h-5 w-5 text-green-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},Ve=o("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),Oe=[Ve],Ne={class:"mt-2 text-xs text-gray-600"},Ee=i(" Cancel "),Ie=i(" Save "),De=i(" Leave Team "),Je=i(" Are you sure you would like to leave this team? "),Ue=i(" Cancel "),qe=i(" Leave "),Ge=i(" Remove Team Member "),He=i(" Are you sure you would like to remove this person from the team? "),Ke=i(" Cancel "),Qe=i(" Remove "),ct={name:"TeamMemberManager",props:{team:Object,availableRoles:Array,userPermissions:Object},setup(r){const y=r,m=k({email:"",role:null}),_=k({role:null}),T=k({}),R=k({}),g=x(!1),M=x(null),p=x(!1),b=x(null),V=()=>{m.post(route("team-members.store",y.team),{errorBag:"addTeamMember",preserveScroll:!0,onSuccess:()=>m.reset()})},O=d=>{H.delete(route("team-invitations.destroy",d),{preserveScroll:!0})},N=d=>{M.value=d,_.role=d.membership.role,g.value=!0},E=()=>{_.put(route("team-members.update",[y.team,M.value]),{preserveScroll:!0,onSuccess:()=>g.value=!1})},I=()=>{p.value=!0},D=()=>{T.delete(route("team-members.destroy",[y.team,G().props.auth.user]))},J=d=>{b.value=d},U=()=>{R.delete(route("team-members.destroy",[y.team,b.value]),{errorBag:"removeTeamMember",preserveScroll:!0,preserveState:!0,onSuccess:()=>b.value=null})},A=d=>y.availableRoles.find(c=>c.key===d).name;return(d,c)=>(l(),a("div",null,[r.userPermissions.canAddTeamMembers?(l(),a("div",Y,[n(S),n(W,{onSubmitted:V},{title:t(()=>[Z]),description:t(()=>[ee]),form:t(()=>[te,o("div",se,[n(z,{for:"email",value:"Email"}),n(X,{id:"email",modelValue:s(m).email,"onUpdate:modelValue":c[0]||(c[0]=e=>s(m).email=e),type:"email",class:"mt-1 block w-full"},null,8,["modelValue"]),n(P,{message:s(m).errors.email,class:"mt-2"},null,8,["message"])]),r.availableRoles.length>0?(l(),a("div",oe,[n(z,{for:"roles",value:"Role"}),n(P,{message:s(m).errors.role,class:"mt-2"},null,8,["message"]),o("div",ne,[(l(!0),a(w,null,C(r.availableRoles,(e,f)=>(l(),a("button",{key:e.key,type:"button",class:v(["relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500",{"border-t border-gray-200 focus:border-none rounded-t-none":f>0,"rounded-b-none":f!=Object.keys(r.availableRoles).length-1}]),onClick:q=>s(m).role=e.key},[o("div",{class:v({"opacity-50":s(m).role&&s(m).role!=e.key})},[o("div",le,[o("div",{class:v(["text-sm text-gray-600",{"font-semibold":s(m).role==e.key}])},h(e.name),3),s(m).role==e.key?(l(),a("svg",ie,ce)):u("",!0)]),o("div",me,h(e.description),1)],2)],10,ae))),128))])])):u("",!0)]),actions:t(()=>[n(K,{on:s(m).recentlySuccessful,class:"mr-3"},{default:t(()=>[de]),_:1},8,["on"]),n(F,{class:v({"opacity-25":s(m).processing}),disabled:s(m).processing},{default:t(()=>[ue]),_:1},8,["class","disabled"])]),_:1})])):u("",!0),r.team.team_invitations.length>0&&r.userPermissions.canAddTeamMembers?(l(),a("div",ve,[n(S),n(j,{class:"mt-10 sm:mt-0"},{title:t(()=>[_e]),description:t(()=>[fe]),content:t(()=>[o("div",he,[(l(!0),a(w,null,C(r.team.team_invitations,e=>(l(),a("div",{key:e.id,class:"flex items-center justify-between"},[o("div",be,h(e.email),1),o("div",ye,[r.userPermissions.canRemoveTeamMembers?(l(),a("button",{key:0,class:"cursor-pointer ml-6 text-sm text-red-500 focus:outline-none",onClick:f=>O(e)}," Cancel ",8,ge)):u("",!0)])]))),128))])]),_:1})])):u("",!0),r.team.users.length>0?(l(),a("div",pe,[n(S),n(j,{class:"mt-10 sm:mt-0"},{title:t(()=>[ke]),description:t(()=>[xe]),content:t(()=>[o("div",we,[(l(!0),a(w,null,C(r.team.users,e=>(l(),a("div",{key:e.id,class:"flex items-center justify-between"},[o("div",Ce,[o("img",{class:"w-8 h-8 rounded-full",src:e.profile_photo_url,alt:e.name},null,8,Te),o("div",Re,h(e.name),1)]),o("div",Me,[r.userPermissions.canAddTeamMembers&&r.availableRoles.length?(l(),a("button",{key:0,class:"ml-2 text-sm text-gray-400 underline",onClick:f=>N(e)},h(A(e.membership.role)),9,$e)):r.availableRoles.length?(l(),a("div",Se,h(A(e.membership.role)),1)):u("",!0),d.$page.props.auth.user.id===e.id?(l(),a("button",{key:2,class:"cursor-pointer ml-6 text-sm text-red-500",onClick:I}," Leave ")):r.userPermissions.canRemoveTeamMembers?(l(),a("button",{key:3,class:"cursor-pointer ml-6 text-sm text-red-500",onClick:f=>J(e)}," Remove ",8,Ae)):u("",!0)])]))),128))])]),_:1})])):u("",!0),n(Q,{show:g.value,onClose:c[2]||(c[2]=e=>g.value=!1)},{title:t(()=>[je]),content:t(()=>[M.value?(l(),a("div",Be,[o("div",Le,[(l(!0),a(w,null,C(r.availableRoles,(e,f)=>(l(),a("button",{key:e.key,type:"button",class:v(["relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500",{"border-t border-gray-200 focus:border-none rounded-t-none":f>0,"rounded-b-none":f!==Object.keys(r.availableRoles).length-1}]),onClick:q=>s(_).role=e.key},[o("div",{class:v({"opacity-50":s(_).role&&s(_).role!==e.key})},[o("div",ze,[o("div",{class:v(["text-sm text-gray-600",{"font-semibold":s(_).role===e.key}])},h(e.name),3),s(_).role==e.key?(l(),a("svg",Fe,Oe)):u("",!0)]),o("div",Ne,h(e.description),1)],2)],10,Pe))),128))])])):u("",!0)]),footer:t(()=>[n($,{onClick:c[1]||(c[1]=e=>g.value=!1)},{default:t(()=>[Ee]),_:1}),n(F,{class:v(["ml-3",{"opacity-25":s(_).processing}]),disabled:s(_).processing,onClick:E},{default:t(()=>[Ie]),_:1},8,["class","disabled"])]),_:1},8,["show"]),n(B,{show:p.value,onClose:c[4]||(c[4]=e=>p.value=!1)},{title:t(()=>[De]),content:t(()=>[Je]),footer:t(()=>[n($,{onClick:c[3]||(c[3]=e=>p.value=!1)},{default:t(()=>[Ue]),_:1}),n(L,{class:v(["ml-3",{"opacity-25":s(T).processing}]),disabled:s(T).processing,onClick:D},{default:t(()=>[qe]),_:1},8,["class","disabled"])]),_:1},8,["show"]),n(B,{show:b.value,onClose:c[6]||(c[6]=e=>b.value=null)},{title:t(()=>[Ge]),content:t(()=>[He]),footer:t(()=>[n($,{onClick:c[5]||(c[5]=e=>b.value=null)},{default:t(()=>[Ke]),_:1}),n(L,{class:v(["ml-3",{"opacity-25":s(R).processing}]),disabled:s(R).processing,onClick:U},{default:t(()=>[Qe]),_:1},8,["class","disabled"])]),_:1},8,["show"])]))}};export{ct as default};
