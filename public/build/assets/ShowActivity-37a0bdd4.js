import{_ as y}from"./AppLayout-36f53fba.js";import{a as b,_ as d,b as x,c as w,f as $}from"./LinkUser-f247b45f.js";import{_ as k}from"./SecondaryNavigation-db4a6c85.js";import{o as e,d as n,n as S,c as u,w as m,b as c,a as s,t as a,f as p,F as h}from"./app-5e210827.js";const M=["src"],f={name:"ImgRounded",props:{type:{src:String,class:String}},setup(r){const t=r;return(_,v)=>(e(),n("img",{src:t.src,class:S([t.class,"object-cover rounded-full my-4"]),alt:""},null,10,M))}},B={class:"relative h-96"},N=["src"],j={class:"absolute bottom-12 left-4 text-blue-50 pt-4 pb-2 text-lg font-bold truncate"},A={class:"flex py-0.5 absolute bottom-4 left-4 bg-green-50 rounded-lg p-2"},D={class:"px-5 py-3 flex justify-between bg-cyan-800 font-medium"},C={class:"text-blue-50 font-extrabold pt-1"},F={href:"",class:"bg-blue-50 text-cyan-800 font-extrabold py-1 px-2 rounded-lg"},I={class:"px-2 pt-12"},V={class:"text-blue-50 font-medium"},z={class:"font-bold text-lg mt-12 mb-4"},E={class:""},H={class:"mt-4"},L={class:"mt-12 flex gap-4 text-sm"},O={class:"w-1/2"},R={class:"mt-12 text-blue-50 font-medium"},U=s("span",{class:""},"Organisé par",-1),W={class:"flex gap-1 mb-12"},q={class:"font-normal"},G={class:"grid grid-cols-6 grid-flow-row"},J={class:"inline-block"},K={class:"py-6 mb-16"},Z={name:"ShowActivity",props:{activity:Array},setup(r){const t=r;function _(o){const l=new Date(o);return $(l,"d MMMM")}function v(o){let[l,i,P]=o.split(":");return`${l}h${i}`}const g=o=>`${window.location.origin}/storage/activites/${o}`;return console.table(t.activity),(o,l)=>(e(),u(y,{title:"ShowActivity",class:"bg-gradient-to-b from-teal to-cyan"},{nav:m(()=>[c(k,{class:"bg-teal"})]),header:m(()=>[s("div",B,[s("img",{src:g(t.activity.images[0].name),alt:"",class:"object-cover h-96 w-full"},null,8,N),s("h2",j,a(t.activity.title),1),s("div",A,[c(b,{distance:t.activity.distance,localisation:t.activity.localisation},null,8,["distance","localisation"])]),s("div",D,[s("span",C,a(_(t.activity.date_activity)),1),s("a",F,a(t.activity.category.name),1)])])]),main:m(()=>[s("div",I,[s("article",V,[s("h2",z,a(t.activity.title),1),s("span",E,a(_(t.activity.date_activity))+", à "+a(v(t.activity.hour)),1),s("p",H,a(t.activity.description),1),s("div",L,[c(d,{src:"../../img/icon/pointeur-de-localisation.png",class:"w-10 h-8 mt-1"},null,8,["src"]),s("div",O,a(t.activity.adress),1)])]),s("section",R,[U,c(f,{src:`../../img/users/${t.activity.user.profile_photo_path}`,class:"w-16 h-16"},null,8,["src"]),c(x,{value:t.activity.user.name},null,8,["value"]),s("div",W,[(e(!0),n(h,null,p(Math.min(t.activity.averageNote,5),i=>(e(),u(d,{src:"../../img/icon/star.png",key:i},null,8,["src"]))),128)),(e(!0),n(h,null,p(5-t.activity.averageNote,i=>(e(),u(d,{src:"../../img/icon/starWhite.png",key:i},null,8,["src"]))),128))]),s("span",q,a(t.activity.users.length)+"/"+a(t.activity.nb_max_participants)+" participants",1),s("div",G,[(e(!0),n(h,null,p(t.activity.users,i=>(e(),n("div",J,[c(f,{src:`../../img/users/${i.profile_photo_path}`,class:"w-12 h-12"},null,8,["src"])]))),256))]),s("div",K,[c(w,{value:"S'inscrire"})])])])]),_:1}))}};export{Z as default};