(this["webpackJsonppdco-dashboard"]=this["webpackJsonppdco-dashboard"]||[]).push([[0],{38:function(e,a,t){e.exports=t(52)},43:function(e,a,t){},52:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(31),l=t.n(c);t(43),t(44),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=t(16),o=t(14),m=t(36),u=(Object(m.a)({palette:{type:"dark",background:{default:"black"}}}),Object(m.a)({palette:{type:"light"}}),Object(m.a)({palette:{type:"dark",primary:{main:"#375a7f"},secondary:{main:"#444"},error:{main:"#E74C3C"},background:{default:"black"}}})),s=(Object(m.a)({palette:{type:"dark",primary:{main:"#DF691A"},secondary:{main:"#4E5D6C"},error:{main:"#d9534f"},background:{default:"#2B3E50"}}}),u),d=t(67),g=t(68),f=t(12),p=t(13),b=t(66),x=Object(b.a)((function(e){return{container:{width:"100%",height:"100%",backgroundColor:"black"},image:{width:"100%",height:"100%",backgroundSize:"contain",backgroundPosition:"center center",backgroundRepeat:"no-repeat"}}})),h=function(e){var a=x();return r.a.createElement("div",{className:a.container},r.a.createElement("div",{className:a.image,style:{backgroundImage:"url(".concat(e.imageUrl,")")}}))},E=t(9),k=Object(b.a)((function(e){return Object(E.a)({container:{width:"100vw",height:"95vh",display:"grid",gridTemplateRows:"minmax(0px,.5fr) minmax(0px,.5fr) minmax(0px,1.5fr) minmax(0px,3fr)",gridTemplateColumns:"repeat(8,minmax(0px,1fr))",gridTemplateAreas:"\n  'imageLeft title     title     title     title     title    title      imageRight'\n  'imageLeft clocks    clocks    clocks    clocks    clocks   clocks     imageRight'\n  'neoCount  neoCount  neoCount  neoCount  sentry    sentry   programs   programs'\n  'recentTab recentTab recentTab recentTab futureTab futureTab futureTab futureTab'\n",gridGap:20,textAlign:"center",text:"center",border:"".concat(20,"px solid ").concat("transparent"),"& > div":{backgroundColor:"#181b2e",boxSizing:"border-box",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:1}},imageLeft:{gridArea:"imageLeft",backgroundColor:"pink"},imageRight:{gridArea:"imageRight",backgroundColor:"red"},title:{gridArea:"title",backgroundColor:"blue",fontSize:20,fontWeight:"bold"},clocks:{gridArea:"clocks",backgroundColor:"green"},neoCount:{gridArea:"neoCount",backgroundColor:"cyan"},sentry:{gridArea:"sentry",backgroundColor:"purple"},programs:{gridArea:"programs",backgroundColor:"purple"},recentTab:{gridArea:"recentTab",backgroundColor:"brown"},futureTab:{gridArea:"futureTab",backgroundColor:"yellow"}},"@media (max-width: ".concat(600,"px)"),{container:{height:"auto",gridGap:10,gridTemplateRows:"\n  minmax(0px,100px)\n  minmax(0px,200px)\n  minmax(0px,150px)\n  minmax(0px,1fr)\n  minmax(0px,1fr)\n  minmax(0px,1fr)\n",gridTemplateColumns:"\n  minmax(0px,1fr) minmax(0px,2fr) minmax(0px,2fr) minmax(0px,1fr)",gridTemplateAreas:"\n  'imageLeft title     title     imageRight'\n  'clocks    clocks    clocks    clocks '\n  'sentry    sentry    programs  programs '\n  'neoCount  neoCount  neoCount  neoCount'\n  'recentTab recentTab recentTab recentTab'\n  'futureTab futureTab futureTab  futureTab'\n"}})}),{name:"main-ui"}),v=Object(b.a)((function(e){return Object(E.a)({container:{width:"100%",height:"100%",padding:0,flex:1,display:"grid",gridGap:5,gridTemplateRows:"repeat(1,minmax(0px,1fr))",gridTemplateColumns:"repeat(7,minmax(0px,1fr))",gridTemplateAreas:"'clock1 clock2 clock3 clock4 clock5 clock6 clock7'","& > div":{display:"flex",justifyContent:"center",alignItems:"center"}},clock1:{gridArea:"clock1"},clock2:{gridArea:"clock2"},clock3:{gridArea:"clock3"},clock4:{gridArea:"clock4"},clock5:{gridArea:"clock5"},clock6:{gridArea:"clock6"},clock7:{gridArea:"clock7"}},"@media (max-width: ".concat(600,"px)"),{container:{gridTemplateRows:"minmax(0px,1fr) repeat(2,minmax(0px,1fr))",gridTemplateColumns:"minmax(0px,1fr) minmax(0px,1fr) minmax(0px,1fr)",gridTemplateAreas:"\n          'clock5 clock5 clock5'\n          'clock1 clock2 clock3'\n          'clock4 clock6 clock7'\n        "}})}),{name:"clocks"}),y=Object(b.a)((function(e){return Object(E.a)({container:{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"column","& > div.xxx":{flex:1,display:"flex",justifyContent:"center",alignItems:"center",zIndex:2,color:"white",fontSize:14,fontWeight:"bold"},"&:hover":{color:"green",transform:"scale(2) translate(0%, 0%)",zIndex:5,"& div.yyy":{opacity:.9,zIndex:6},"& div.xxx ":{textShadow:"1px 1px 1px rgba(0,0,0,1)",zIndex:7}}},flagImage:{padding:5,boxSizing:"border-box",backgroundPosition:"center center",backgroundRepeat:"no-repeat",backgroundSize:"100% 100%",position:"absolute",top:0,left:0,right:0,bottom:0,opacity:.2,zIndex:1}},"@media (max-width: ".concat(600,"px)"),{container:{flexDirection:"row"}})}),{name:"clock"}),C=function(e){var a=y();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:a.container},r.a.createElement("div",{className:"xxx"},e.location),r.a.createElement("div",{className:"xxx"},e.time),r.a.createElement("div",{className:a.flagImage+" yyy",style:{backgroundImage:"url(".concat(e.flagUrl,")")}})))},T=function(){var e=v();return r.a.createElement("div",{className:e.container},r.a.createElement("div",{className:e.clock1},r.a.createElement(C,{location:"Hawaii",time:"12:00",flagUrl:"images/hawaii-flag.png"})),r.a.createElement("div",{className:e.clock2},r.a.createElement(C,{location:"Arizona",time:"12:00",flagUrl:"images/arizona-flag.png"})),r.a.createElement("div",{className:e.clock3},r.a.createElement(C,{location:"DC",time:"12:00",flagUrl:"images/dc-flag.svg"})),r.a.createElement("div",{className:e.clock4},r.a.createElement(C,{location:"Santiago",time:"12:00",flagUrl:"images/chile-flag.png"})),r.a.createElement("div",{className:e.clock5},r.a.createElement(C,{location:"UTC",time:"12:00",flagUrl:"images/utc-flag.png"})),r.a.createElement("div",{className:e.clock6},r.a.createElement(C,{location:"RSA",time:"12:00",flagUrl:"images/rsa-flag.png"})),r.a.createElement("div",{className:e.clock7},r.a.createElement(C,{location:"Perth",time:"12:00",flagUrl:"images/aus-flag.png"})))},w=t(27),N=Object(b.a)((function(e){return{container:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",position:"relative"},triangleSvg:{width:"100%",height:"100%",position:"absolute",top:0,bottom:0,left:0,right:0},score:{marginTop:30,color:"black",fontSize:30,flex:1,zIndex:10},title:{fontSize:12,fontWeight:"bold",position:"absolute",top:10,left:0,right:0,height:"33%"}}})),A=["green","orange","red"],j=function(){var e=N(),a=Object(n.useState)(0),t=Object(w.a)(a,2),c=t[0],l=t[1],i=Object(n.useState)(0),o=Object(w.a)(i,2),m=o[0],u=o[1];return Object(n.useEffect)((function(){var e=setInterval((function(){var e=Math.round(100*Math.random());l(e)}),3e3);return function(){return clearInterval(e)}}),[]),Object(n.useEffect)((function(){c<33?u(0):c<66?u(1):c<100&&u(2)}),[c]),r.a.createElement("div",{className:e.container},r.a.createElement("svg",{className:e.triangleSvg,height:"100",width:"100px",viewBox:"".concat(-20," ").concat(-20," ").concat(140," ").concat(140),onClick:function(){return u((function(e){return(e+1)%A.length}))}},r.a.createElement("g",null,r.a.createElement("path",{d:"M 50,0 L 0,100 L 100,100 Z",fill:"white",stroke:A[m],strokeWidth:10}))),r.a.createElement("div",{className:e.score},c))},O=Object(b.a)((function(e){return{container:{width:"100%",height:"100%"},example:{color:"red"},imagePlaceholder:{width:"100%",height:"100%",backgroundImage:"url(images/world-placeholder.png)",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center center"}}})),S=function(){var e=O();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:e.container},r.a.createElement("div",{className:e.imagePlaceholder})))},R=Object(b.a)((function(e){return Object(E.a)({container:{width:"100%",height:"100%",display:"flex"},month:{flex:1},year:{flex:1},count:{width:"100%",height:"100%",fontSize:60,fontWeight:"bold",display:"flex",justifyContent:"center",alignItems:"center"}},"@media (max-width: ".concat(600,"px)"),{container:{}})}),{name:"neo-count"}),z=Object(b.a)((function(e){return Object(E.a)({container:{width:"100%",height:"100%",display:"grid",gridTemplateRows:"1fr 3fr",gridTemplateColumns:"repeat(1, minmax(0px,1fr))"},title:{gridColumn:"1 / 2",gridRow:"1 / 2",display:"flex",justifyContent:"center",padding:"0px 10px",alignItems:"center",fontSize:16,fontWeight:"bold"},content:{backgroundColor:"rgba(255,255,255,0)",gridColumn:"1 / 2",gridRow:"2 / 3"}},"@media (max-width: ".concat(600,"px)"),{title:{fontSize:14}})})),I=function(e){var a=z();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:a.container},r.a.createElement("div",{className:a.title,style:{justifyContent:e.alignment}},r.a.createElement("span",{style:{paddingRight:5}},e.icon?r.a.createElement(e.icon,null):null," "),e.title),r.a.createElement("div",{className:a.content},e.children)))},U=function(){var e=R();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:e.container},r.a.createElement("div",{className:e.month},r.a.createElement(I,{title:"LAST 30 DAYS",icon:function(){return r.a.createElement(f.a,{icon:p.b})},alignment:"center"},r.a.createElement("div",{className:e.count},"10"))),r.a.createElement("div",{className:e.year},r.a.createElement(I,{title:"LAST 365 DAYS",icon:function(){return r.a.createElement(f.a,{icon:p.a})},alignment:"center"},r.a.createElement("div",{className:e.count},"999")))))},L=function(){var e=k();return r.a.createElement("div",{className:e.container},r.a.createElement("div",{className:e.imageLeft},r.a.createElement(h,{imageUrl:"images/pdco-logo.jpg"})),r.a.createElement("div",{className:e.imageRight},r.a.createElement(h,{imageUrl:"images/nasa-logo.png"})),r.a.createElement("div",{className:e.title}," Planetary Defense Coordination Office "),r.a.createElement("div",{className:e.clocks},r.a.createElement(T,null)),r.a.createElement("div",{className:e.neoCount},r.a.createElement(I,{title:"CLOSE APPROACHES",icon:function(){return r.a.createElement(f.a,{icon:p.d})}},r.a.createElement(U,null))),r.a.createElement("div",{className:e.sentry},r.a.createElement(I,{title:"SENTRY STATUS",icon:function(){return r.a.createElement(f.a,{icon:p.e})}},r.a.createElement(j,null))),r.a.createElement("div",{className:e.programs},r.a.createElement(I,{title:"PROGRAMS",icon:function(){return r.a.createElement(f.a,{icon:p.c})}},r.a.createElement(S,null))),r.a.createElement("div",{className:e.recentTab},r.a.createElement(I,{title:"RECENT TABLE",icon:function(){return r.a.createElement(f.a,{icon:p.f})}},"...")),r.a.createElement("div",{className:e.futureTab},r.a.createElement(I,{title:"FUTURE TABLE",icon:function(){return r.a.createElement(f.a,{icon:p.f})}},"...")))},P=Object(b.a)((function(e){return{container:{width:"100%",height:"100%"}}}),{name:"page-home"}),D=function(){P();return r.a.createElement(r.a.Fragment,null,r.a.createElement(L,null))},F=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"About Page"),r.a.createElement("p",null,"This is my about page!"))},W=Object(b.a)((function(e){return{container:{}}}),{name:"app-entry"}),B=Object(b.a)((function(e){return{container:{"& ul":{margin:0,"& li":{color:"white",display:"inline-block",margin:"0px 10px"}}}}})),G=function(){var e=B();return r.a.createElement("div",{className:"simple-menu-container "+e.container},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(i.b,{to:"/"},"Home")),r.a.createElement("li",null,r.a.createElement(i.b,{to:"/about"},"About"))))},M=Object(b.a)((function(e){return{container:{width:"100%",height:"100%",backgroundColor:e.palette.background.default}}}),{name:"layout"}),H=function(e){var a=M();return r.a.createElement("div",{className:"layout-container "+a.container},e.children)};l.a.render(r.a.createElement((function(){var e=W();return r.a.createElement("div",{className:e.container},r.a.createElement(d.a,{theme:s},r.a.createElement(g.a,null),r.a.createElement(H,null,r.a.createElement(i.a,{basename:"/pdco-dashboard/"},r.a.createElement(o.c,null,r.a.createElement(o.a,{exact:!0,path:"/"},r.a.createElement(D,null)),r.a.createElement(o.a,{path:"/about"},r.a.createElement(F,null))),r.a.createElement(G,null)))))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[38,1,2]]]);
//# sourceMappingURL=main.366e0713.chunk.js.map