import{c as t,e as m,r as d,j as e,m as r}from"./index-Ceq5VMyo.js";import{T as p}from"./TopBar-ByvwDU73.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=t("Box",[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=t("ChefHat",[["path",{d:"M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z",key:"1qvrer"}],["path",{d:"M6 17h12",key:"1jwigz"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=t("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=t("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=t("Navigation",[["polygon",{points:"3 11 22 2 13 21 11 13 3 11",key:"1ltx0t"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=t("PackageCheck",[["path",{d:"m16 16 2 2 4-4",key:"gfu2re"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]),n=[{label:"Preparing",detail:"Kitchen is weighing sauces and prepping the protein stack.",icon:f},{label:"Grilling",detail:"Patty is on heat with the selected cleaner oil finish.",icon:b},{label:"Packing",detail:"Order is being sealed with sides, drinks, and thermal wrap.",icon:g},{label:"Out for delivery",detail:"Rider is moving through the final delivery route.",icon:v}];function j(){const c=m(),[s,h]=d.useState(0);return d.useEffect(()=>{const a=window.setInterval(()=>{h(i=>Math.min(n.length-1,i+1))},2200);return()=>window.clearInterval(a)},[]),e.jsxs("div",{className:"relative min-h-screen overflow-hidden bg-[#030405]",children:[e.jsx(p,{navigate:c,variant:"menu"}),e.jsx("div",{className:"pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(240,199,111,0.16),transparent_30rem),radial-gradient(circle_at_20%_62%,rgba(214,65,53,0.14),transparent_34rem)]"}),e.jsxs("main",{className:"relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-28 sm:px-8 lg:px-12",children:[e.jsxs(r.div,{initial:{opacity:0,y:28},animate:{opacity:1,y:0},className:"text-center",children:[e.jsx("p",{className:"text-xs font-black uppercase tracking-[0.34em] text-[#f0c76f]",children:"Live kitchen tracker"}),e.jsx("h1",{className:"mt-4 font-display text-5xl font-black leading-none text-white sm:text-7xl",children:"Your order is moving"}),e.jsx("p",{className:"mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/62",children:"A cinematic fake live tracker for the full ordering flow, from prep table to delivery route."})]}),e.jsxs("section",{className:"mt-12 rounded-[8px] border border-white/10 bg-white/[0.045] p-5 shadow-glass backdrop-blur-2xl sm:p-7",children:[e.jsx("div",{className:"relative mb-10 h-2 overflow-hidden rounded-full bg-white/10",children:e.jsx(r.div,{className:"h-full rounded-full bg-[#f0c76f] shadow-glow",animate:{width:`${(s+1)/n.length*100}%`},transition:{duration:.9,ease:[.22,1,.36,1]}})}),e.jsx("div",{className:"grid gap-4 lg:grid-cols-4",children:n.map((a,i)=>{const x=a.icon,l=s===i,o=s>i;return e.jsxs(r.article,{animate:{y:l?-8:0,opacity:s>=i?1:.45},className:`rounded-[8px] border p-5 transition ${l?"border-[#f0c76f]/50 bg-[#f0c76f]/12":o?"border-white/16 bg-white/[0.055]":"border-white/10 bg-black/24"}`,children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:`grid size-12 place-items-center rounded-full border ${l?"border-[#f0c76f]/45 bg-[#f0c76f]/18 text-[#ffe1a0]":"border-white/12 bg-black/30 text-white/55"}`,children:o?e.jsx(k,{className:"size-5"}):e.jsx(x,{className:"size-5"})}),l?e.jsx("span",{className:"size-2.5 rounded-full bg-[#f0c76f] shadow-glow"}):null]}),e.jsx("h2",{className:"mt-5 text-xl font-black text-white",children:a.label}),e.jsx("p",{className:"mt-3 text-sm leading-6 text-white/55",children:a.detail})]},a.label)})})]}),e.jsx("div",{className:"mt-8 flex justify-center",children:e.jsxs("button",{type:"button",onClick:()=>c("/"),className:"inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl transition hover:border-[#f0c76f]/40 hover:text-[#ffe1a0]",children:[e.jsx(u,{className:"size-4"}),"Back home"]})})]})]})}export{j as TrackingPage};
