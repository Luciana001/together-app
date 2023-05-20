import{r as u,v as p,c as h,w as e,o as w,a as r,b as o,n as y,u as l,g as t}from"./app-5e210827.js";import{_ as T}from"./Modal-a9183897.js";import{_ as g}from"./ConfirmationModal-2652ec19.js";import{_ as i}from"./DangerButton-6d11c8e3.js";import{_ as v}from"./SecondaryButton-3cf9c612.js";import"./_plugin-vue_export-helper-c27b6911.js";const x=t(" Delete Team "),C=t(" Permanently delete this team. "),D=r("div",{class:"max-w-xl text-sm text-gray-600"}," Once a team is deleted, all of its resources and data will be permanently deleted. Before deleting this team, please download any data or information regarding this team that you wish to retain. ",-1),b={class:"mt-5"},$=t(" Delete Team "),k=t(" Delete Team "),B=t(" Are you sure you want to delete this team? Once a team is deleted, all of its resources and data will be permanently deleted. "),N=t(" Cancel "),O=t(" Delete Team "),E={name:"DeleteTeamForm",props:{team:Object},setup(m){const d=m,a=u(!1),n=p({}),c=()=>{a.value=!0},_=()=>{n.delete(route("teams.destroy",d.team),{errorBag:"deleteTeam"})};return(V,s)=>(w(),h(T,null,{title:e(()=>[x]),description:e(()=>[C]),content:e(()=>[D,r("div",b,[o(i,{onClick:c},{default:e(()=>[$]),_:1})]),o(g,{show:a.value,onClose:s[1]||(s[1]=f=>a.value=!1)},{title:e(()=>[k]),content:e(()=>[B]),footer:e(()=>[o(v,{onClick:s[0]||(s[0]=f=>a.value=!1)},{default:e(()=>[N]),_:1}),o(i,{class:y(["ml-3",{"opacity-25":l(n).processing}]),disabled:l(n).processing,onClick:_},{default:e(()=>[O]),_:1},8,["class","disabled"])]),_:1},8,["show"])]),_:1}))}};export{E as default};