(this["webpackJsonppdco-dashboard"]=this["webpackJsonppdco-dashboard"]||[]).push([[0],{61:function(e,t,a){e.exports=a(78)},66:function(e,t,a){},78:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(9),i=a.n(c);a(66),a(67),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o=a(33),l=a(11),m=a(55),s=(Object(m.a)({palette:{type:"dark",background:{default:"black"}}}),Object(m.a)({palette:{type:"light"}}),Object(m.a)({palette:{type:"dark",primary:{main:"#375a7f"},secondary:{main:"#444"},error:{main:"#E74C3C"},background:{default:"black"}}})),u=(Object(m.a)({palette:{type:"dark",primary:{main:"#DF691A"},secondary:{main:"#4E5D6C"},error:{main:"#d9534f"},background:{default:"#2B3E50"}}}),s),d=a(127),g=a(128),f=a(6),p=a(20),h=a(21),b=a(117),E=Object(b.a)((function(e){return{container:{width:"100%",height:"100%",backgroundColor:"black"},image:{width:"100%",height:"100%",backgroundSize:"contain",backgroundPosition:"center center",backgroundRepeat:"no-repeat"}}})),k=function(e){var t=E();return r.a.createElement("div",{className:t.container},r.a.createElement("div",{className:t.image,style:{backgroundImage:"url(".concat(e.imageUrl,")")}}))},v=a(14),x=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],y=0,w=1,C=2,T=3,S=4,j=5,A=6,O=7,D=8,N=9,U=10,z=11,R=Object(b.a)((function(e){return Object(v.a)({container:{width:"100vw",height:"95vh",display:"grid",gridTemplateRows:"minmax(0px,.5fr) minmax(0px,.5fr) minmax(0px,1.5fr) minmax(0px,3fr)",gridTemplateColumns:"repeat(8,minmax(0px,1fr))",gridTemplateAreas:"\n  'imageLeft title     title     title     title     title    title      imageRight'\n  'imageLeft clocks    clocks    clocks    clocks    clocks   clocks     imageRight'\n  'neoCount  neoCount  neoCount  neoCount  sentry    sentry   programs   programs'\n  'recentTab recentTab recentTab recentTab futureTab futureTab futureTab futureTab'\n",gridGap:20,textAlign:"center",text:"center",border:"".concat(20,"px solid ").concat("transparent"),"& > div":{backgroundColor:"#181b2e",boxSizing:"border-box",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:1}},imageLeft:{gridArea:"imageLeft",backgroundColor:"pink"},imageRight:{gridArea:"imageRight",backgroundColor:"red"},title:{gridArea:"title",backgroundColor:"blue",fontSize:20,fontWeight:"bold",display:"flex",position:"relative",flexDirection:"column","& > div":{paddingBottom:2},"& > .shortTitle":{display:"none",paddingBottom:2},"& > .date":{fontSize:12}},date:{gridArea:"date",backgroundColor:"blue",fontSize:20,fontWeight:"bold"},clocks:{gridArea:"clocks",backgroundColor:"green"},neoCount:{gridArea:"neoCount",backgroundColor:"cyan"},sentry:{gridArea:"sentry",backgroundColor:"purple"},programs:{gridArea:"programs",backgroundColor:"purple"},recentTab:{gridArea:"recentTab",backgroundColor:"brown"},futureTab:{gridArea:"futureTab",backgroundColor:"yellow"}},"@media (max-width: ".concat(730,"px)"),{container:{height:"auto",gridGap:10,gridTemplateRows:"\n  minmax(0px,70px)\n  minmax(0px,120px)\n  minmax(0px,150px)\n  minmax(0px,120px)\n  minmax(0px,350px)\n  minmax(0px,350px)\n",gridTemplateColumns:"\n  minmax(0px,1fr) minmax(0px,2fr) minmax(0px,2fr) minmax(0px,1fr)",gridTemplateAreas:"\n  'imageLeft title     title     imageRight'\n  'clocks    clocks    clocks    clocks '\n  'sentry    sentry    programs  programs '\n  'neoCount  neoCount  neoCount  neoCount'\n  'recentTab recentTab recentTab recentTab'\n  'futureTab futureTab futureTab  futureTab'\n"},title:{"& > .shortTitle":{display:"block"},"& > .longTitle":{display:"none"}}})}),{name:"main-ui"}),L=Object(b.a)((function(e){return Object(v.a)({container:{width:"100%",height:"100%",padding:0,flex:1,display:"grid",gridGap:5,gridTemplateRows:"repeat(1,minmax(0px,1fr))",gridTemplateColumns:"repeat(7,minmax(0px,1fr))",gridTemplateAreas:"'clock1 clock2 clock3 clock4 clock5 clock6 clock7'","& > div":{display:"flex",justifyContent:"center",alignItems:"center"}},clock1:{gridArea:"clock1"},clock2:{gridArea:"clock2"},clock3:{gridArea:"clock3"},clock4:{gridArea:"clock4"},clock5:{gridArea:"clock5"},clock6:{gridArea:"clock6"},clock7:{gridArea:"clock7"}},"@media (max-width: ".concat(730,"px)"),{container:{gridTemplateRows:"repeat(2,minmax(0px,1fr))",gridTemplateColumns:"repeat(12,minmax(0px,1fr))",gridTemplateAreas:"\n          'clock1 clock1 clock1 clock1 clock2 clock2 clock2 clock2 clock3 clock3 clock3 clock3'\n          'clock4 clock4 clock4 clock5 clock5 clock5 clock6 clock6 clock6 clock7 clock7 clock7'\n        "}})}),{name:"clocks"}),I=a(52),P=a.n(I),W=Object(b.a)((function(e){return Object(v.a)({container:{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"column","& > div.aux":{flex:1,display:"flex",justifyContent:"center",alignItems:"center",zIndex:2,color:"white",fontSize:14,fontWeight:"bold"},"&:hover":{color:"green",transform:"scale(2) translate(0%, 0%)",zIndex:5,"& div.auy":{opacity:.9,zIndex:6},"& div.aux ":{textShadow:"1px 1px 1px rgba(0,0,0,1)",zIndex:7}}},flagImage:{padding:5,boxSizing:"border-box",backgroundPosition:"center center",backgroundRepeat:"no-repeat",backgroundSize:"100% 100%",position:"absolute",top:0,left:0,right:0,bottom:0,opacity:.2,zIndex:1}},"@media (max-width: ".concat(730,"px)"),{container:{}})}),{name:"clock"}),F=function(e){var t=W(),a=Object(n.useState)(P.a.tz(e.timezone)),c=Object(f.a)(a,2),i=c[0],o=c[1];return Object(n.useEffect)((function(){var e=setInterval((function(){return o(i.add(1,"second").clone())}),1e3);return function(){return clearInterval(e)}})),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:t.container},r.a.createElement("div",{className:"aux"},e.location),r.a.createElement("div",{className:"aux"},i.format("HH:mm")),r.a.createElement("div",{className:t.flagImage+" auy",style:{backgroundImage:"url(".concat(e.flagUrl,")")}})))},_=function(){var e=L();return r.a.createElement("div",{className:e.container},r.a.createElement("div",{className:e.clock1},r.a.createElement(F,{location:"Hawaii",timezone:"Pacific/Honolulu",flagUrl:"images/hawaii-flag.png"})),r.a.createElement("div",{className:e.clock2},r.a.createElement(F,{location:"Arizona",timezone:"America/Phoenix",flagUrl:"images/arizona-flag.png"})),r.a.createElement("div",{className:e.clock3},r.a.createElement(F,{location:"DC",timezone:"America/New_York",flagUrl:"images/dc-flag.svg"})),r.a.createElement("div",{className:e.clock4},r.a.createElement(F,{location:"Santiago",timezone:"America/Santiago",flagUrl:"images/chile-flag.png"})),r.a.createElement("div",{className:e.clock5},r.a.createElement(F,{location:"UTC",timezone:"UTC",flagUrl:"images/utc-flag.png"})),r.a.createElement("div",{className:e.clock6},r.a.createElement(F,{location:"RSA",timezone:"Africa/Johannesburg",flagUrl:"images/rsa-flag.png"})),r.a.createElement("div",{className:e.clock7},r.a.createElement(F,{location:"Perth",timezone:"Australia/Perth",flagUrl:"images/aus-flag.png"})))},H=Object(b.a)((function(e){return{container:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",position:"relative"},triangleSvg:{width:"100%",height:"100%",position:"absolute",top:0,bottom:0,left:0,right:0},score:{marginTop:30,color:"black",fontSize:30,flex:1,zIndex:10},title:{fontSize:12,fontWeight:"bold",position:"absolute",top:10,left:0,right:0,height:"33%"}}})),J=function(e){var t=e.sentryData,a=H(),c=Object(n.useState)(0),i=Object(f.a)(c,2),o=i[0],l=i[1],m=Object(n.useState)("grey"),s=Object(f.a)(m,2),u=s[0],d=s[1];return Object(n.useEffect)((function(){var e=t.data.filter((function(e,t){return"string"===typeof e.ts_max})).map((function(e){return parseInt(e.ts_max,10)})),a=Math.max.apply(null,e);l(a)}),[t]),Object(n.useEffect)((function(){0===o&&d("grey"),1===o&&d("green"),o>=2&&o<=4&&d("yellow"),o>=5&&o<=7&&d("orange"),o>=8&&d("red")}),[o]),r.a.createElement("div",{className:a.container},r.a.createElement("svg",{className:a.triangleSvg,height:"100",width:"100px",viewBox:"".concat(-20," ").concat(-20," ").concat(140," ").concat(140)},r.a.createElement("g",null,r.a.createElement("path",{d:"M 50,0 L 0,100 L 100,100 Z",fill:"white",stroke:u,strokeWidth:10}))),r.a.createElement("div",{className:a.score},o))},M=a(54),Y=Object(b.a)((function(e){return{container:{width:"100%",height:"100%"},example:{color:"red"},imagePlaceholder:{width:"100%",height:"100%",backgroundImage:"url(images/world-placeholder.png)",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center center"}}})),B=function(){var e=Y();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:e.container},r.a.createElement(M.a,{options:{controlsPosition:"no-controls",isSunshineDisplayed:!1,icons:[{iconLabel:"Honolulu, Hawaii",iconCoord:{lat:21.306944,lng:-157.858333},iconUrl:"images/hawaii-flag.png",iconToSvgWidthRatio:.4},{iconLabel:"Phoenix, Arizona",iconCoord:{lat:33.45,lng:-112.066667},iconUrl:"images/arizona-flag.png",iconToSvgWidthRatio:.4},{iconLabel:"Washington, DC",iconCoord:{lat:38.904722,lng:-77.016389},iconUrl:"images/dc-flag.svg",iconToSvgWidthRatio:.4},{iconLabel:"Santiago, Chile",iconCoord:{lat:-33.45,lng:-70.666667},iconUrl:"images/santiago-flag.png",iconToSvgWidthRatio:.4},{iconLabel:"London, UK",iconCoord:{lat:51.507222,lng:-.1275},iconUrl:"images/utc-flag.png",iconToSvgWidthRatio:.4},{iconLabel:"Cape Town, South Africa",iconCoord:{lat:-33.925278,lng:18.423889},iconUrl:"images/rsa-flag.png",iconToSvgWidthRatio:.4},{iconLabel:"Perth, Australia",iconCoord:{lat:-31.952222,lng:115.858889},iconUrl:"images/aus-flag.png",iconToSvgWidthRatio:.4}]}})))},G=Object(b.a)((function(e){return Object(v.a)({container:{width:"100%",height:"100%",display:"flex"},week:{flex:1},month:{flex:1},year:{flex:1},count:{width:"100%",height:"100%",fontSize:60,fontWeight:"bold",display:"flex",justifyContent:"center",alignItems:"center"}},"@media (max-width: ".concat(730,"px)"),{container:{},count:{fontSize:40}})}),{name:"neo-count"}),V=Object(b.a)((function(e){return Object(v.a)({container:{width:"100%",height:"100%",position:"relative"},title:{position:"absolute",top:0,height:35,left:0,right:0,display:"flex",justifyContent:"center",alignItems:"center",fontSize:16,fontWeight:"bold","& a":{textDecoration:"none",color:"white","&:hover":{color:"cyan"}}},content:{position:"absolute",top:35,bottom:0,left:0,right:0,backgroundColor:"rgba(255,255,255,0)",display:"flex",justifyContent:"center",alignItems:"center"}},"@media (max-width: ".concat(730,"px)"),{title:{fontSize:12}})})),q=a(119),K=function(e){var t="string"===typeof e.title?function(){return r.a.createElement(r.a.Fragment,null,e.title)}:function(){return r.a.createElement(e.title,null)},a=V();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:a.container},r.a.createElement("div",{className:a.title,style:{justifyContent:e.alignment}},r.a.createElement("span",{style:{paddingRight:5}},e.icon?r.a.createElement(e.icon,null):null," "),r.a.createElement(t,null)),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:a.content},e.isDisplayed?e.children:r.a.createElement(q.a,null)))))};function Z(e){var t=e.replace(" ","T").replace("Jan","01").replace("Feb","02").replace("Mar","03").replace("Apr","04").replace("May","05").replace("Jun","06").replace("Jul","07").replace("Aug","08").replace("Sep","09").replace("Oct","10").replace("Nov","11").replace("Dec","12");return new Date(t)}var $=function(e){var t=e.cadData,a=Object(n.useState)(0),c=Object(f.a)(a,2),i=c[0],o=c[1],l=Object(n.useState)(0),m=Object(f.a)(l,2),s=m[0],u=m[1],d=Object(n.useState)(0),g=Object(f.a)(d,2),b=g[0],E=g[1];Object(n.useEffect)((function(){var e=function(e){return function(t){var a=Z(t[T]);return(+new Date-+a)/864e5<=e}};E(t.data.length),u(t.data.filter(e(30)).length),o(t.data.filter(e(7)).length)}),[t]);var k=G();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:k.container},r.a.createElement("div",{className:k.week},r.a.createElement(K,{title:"".concat(window.outerWidth<730?"<":"LAST"," 7 DAYS"),icon:function(){return r.a.createElement(p.a,{icon:h.b})},alignment:"center",isDisplayed:!!i},r.a.createElement("div",{className:k.count},i))),r.a.createElement("div",{className:k.month},r.a.createElement(K,{title:"".concat(window.outerWidth<730?"<":"LAST"," 30 DAYS"),icon:function(){return r.a.createElement(p.a,{icon:h.c})},alignment:"center",isDisplayed:!!s},r.a.createElement("div",{className:k.count},s))),r.a.createElement("div",{className:k.year},r.a.createElement(K,{title:"".concat(window.outerWidth<730?"<":"LAST"," 365 DAYS"),icon:function(){return r.a.createElement(p.a,{icon:h.a})},alignment:"center",isDisplayed:!!b},r.a.createElement("div",{className:k.count},b)))))},Q=a(123),X=a(126),ee=a(121),te=a(122),ae=a(124),ne=a(129),re=a(125),ce=Object(b.a)((function(e){return{container:{width:"100%",height:"100%",padding:10,paddingTop:0,overflow:"hidden"},root:{width:"100%"},tableContainer:{maxHeight:240}}}),{name:"table-cad"}),ie=a(5),oe=Object(ie.a)((function(e){return{head:{backgroundColor:"#181b2e",color:e.palette.common.white},body:{backgroundColor:"rgba(255,255,255,0.05)",fontSize:14}}}))(ee.a),le=[{id:"fullname",label:"Object",minWidth:130,align:"left",format:function(e){return e}},{id:"cd",label:"Close Approach Date",minWidth:190,align:"left",format:function(e){return e}},{id:"dist",label:"CA Distance Nominal (LD|AU)",minWidth:170,align:"left",format:se},{id:"dist_min",label:"CA Distance Mininum (LD|AU)",minWidth:170,align:"left",format:se},{id:"v_rel",label:"V Relative (km/s)",minWidth:120,align:"left",format:function(e){return parseFloat(e).toFixed(2)}},{id:"v_inf",label:"V Infinity (km/s)",minWidth:120,align:"left",format:function(e){return parseFloat(e).toFixed(2)}},{id:"h",label:"H (mag)",minWidth:100,align:"left",format:function(e){return parseFloat(e).toFixed(1)}}],me=function(e){var t=e.cadData,a=e.period,n=r.a.useState(0),c=Object(f.a)(n,2),i=c[0],o=c[1],l=r.a.useState(10),m=Object(f.a)(l,2),s=m[0],u=m[1],d=t.data.filter((function(e){var t=Z(e[T]),n=+new Date-+t;return"recent"===a?n<0:n>=0})).map((function(e){return{fullname:e[z],des:e[y],orbit_id:e[w],jd:e[C],cd:e[T],dist:e[S],dist_min:e[j],dist_max:e[A],v_rel:e[O],v_inf:e[D],t_sigma_f:e[N],h:e[U]}})),g=ce();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:g.container},r.a.createElement(te.a,{className:g.tableContainer},r.a.createElement(Q.a,{stickyHeader:!0,size:"small","aria-label":"sticky table"},r.a.createElement(ae.a,null,r.a.createElement(re.a,null,le.map((function(e){return r.a.createElement(oe,{key:e.id,align:e.align,style:{minWidth:e.minWidth}},e.label)})))),r.a.createElement(X.a,null,d.slice(i*s,i*s+s).map((function(e){return r.a.createElement(re.a,{hover:!0,role:"checkbox",tabIndex:-1,key:e.fullname},le.map((function(t){var a=e[t.id];return r.a.createElement(oe,{key:t.id,align:t.align||"left"},t.format(a))})))}))))),r.a.createElement(ne.a,{rowsPerPageOptions:[10,25,100],component:"div",count:d.length,rowsPerPage:s,page:i,onChangePage:function(e,t){o(t)},onChangeRowsPerPage:function(e){u(+e.target.value),o(0)}})))};function se(e){var t=parseFloat(e);return"".concat((389.17037554435*t).toFixed(2)," | ").concat(t.toFixed(5))}var ue=a(8),de=a.n(ue),ge=a(53);function fe(){return(fe=Object(ge.a)(de.a.mark((function e(){var t,a,n,r,c,i,o;return de.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://ssd-api.jpl.nasa.gov/sentry.api",t=pe("1LD"),a=pe("0p05AU"),e.next=5,Promise.all([fetch("https://ssd-api.jpl.nasa.gov/sentry.api").then((function(e){return e.json()})),fetch(t).then((function(e){return e.json()})),fetch(a).then((function(e){return e.json()}))]).catch((function(e){return[null,null,null]}));case 5:if(n=e.sent,r=Object(f.a)(n,3),c=r[0],i=r[1],o=r[2],c&&t&&a){e.next=12;break}return e.abrupt("return",null);case 12:return e.abrupt("return",{sentryData:c,cadData1LD:i,cadData0p05AU:o,timestamp:(new Date).toUTCString()});case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function pe(e){var t=new Date,a=new Date(t.setUTCSeconds(t.getUTCSeconds()+5184e3)).toISOString().split("T")[0];return"https://ssd-api.jpl.nasa.gov/cad.api?www=1&nea-comet=Y&fullname=true"+("1LD"===e?"&dist-max=1LD&date-min=-365&date-max=now":"&dist-max=0.05&date-min=-30&date-max=".concat(a))}var he=function(){var e=R(),t=function(e,t){var a=Object(n.useState)((function(){try{var a=window.localStorage.getItem(e);return a?JSON.parse(a):t}catch(n){return console.log(n),t}})),r=Object(f.a)(a,2),c=r[0],i=r[1];return[c,function(t){try{var a=t instanceof Function?t(c):t;i(a),window.localStorage.setItem(e,JSON.stringify(a))}catch(n){console.log(n)}}]}("APIDATA",null),a=Object(f.a)(t,2),c=a[0],i=a[1],o=Object(n.useState)(!0),l=Object(f.a)(o,2),m=l[0],s=l[1],u=Object(n.useState)(""),d=Object(f.a)(u,2),g=d[0],b=d[1];return Object(n.useEffect)((function(){!c||m?(console.log("Fetching data"),function(){return fe.apply(this,arguments)}().then((function(e){e&&i(e),s(!1)}))):b(c?function(e){var t=new Date(e),a="".concat(x[t.getMonth()],"-").concat(t.getDate(),"-").concat(t.getFullYear()),n=t.toTimeString().split(" ")[0];return"".concat(n," ").concat(a)}(c.timestamp):"")}),[c,i,m,s]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:e.container},r.a.createElement("div",{className:e.imageLeft},r.a.createElement(k,{imageUrl:"images/pdco-logo.jpg"})),r.a.createElement("div",{className:e.imageRight},r.a.createElement(k,{imageUrl:"images/nasa-logo.png"})),r.a.createElement("div",{className:e.title,onClick:function(){return s(!0)}},r.a.createElement("div",{className:"longTitle"},"PDCO STATUS SUMMARY"),r.a.createElement("div",{className:"shortTitle"},"PDCO STATUS"),r.a.createElement("div",{className:"date"},r.a.createElement("span",{style:{paddingRight:3}},g+" "),r.a.createElement(p.a,{style:{fontSize:10},flip:"horizontal",icon:h.f}))),r.a.createElement("div",{className:e.clocks},r.a.createElement(_,null)),r.a.createElement("div",{className:e.neoCount},r.a.createElement(K,{title:"CLOSE APPROACHES <1LD",icon:function(){return r.a.createElement(p.a,{icon:h.e})},isDisplayed:!m},!!c&&r.a.createElement($,{cadData:c.cadData1LD}))),r.a.createElement("div",{className:e.sentry},r.a.createElement(K,{title:function(){return r.a.createElement("a",{href:"https://cneos.jpl.nasa.gov/sentry/"},"SENTRY STATUS")},icon:function(){return r.a.createElement(p.a,{icon:h.g})},isDisplayed:!m},!!c&&r.a.createElement(J,{sentryData:c.sentryData}))),r.a.createElement("div",{className:e.programs},r.a.createElement(K,{title:"PROGRAMS",icon:function(){return r.a.createElement(p.a,{icon:h.d})},isDisplayed:!m},r.a.createElement(B,null))),r.a.createElement("div",{className:e.recentTab},r.a.createElement(K,{title:"RECENT TABLE",icon:function(){return r.a.createElement(p.a,{icon:h.h})},isDisplayed:!m},!!c&&r.a.createElement(me,{period:"recent",cadData:c.cadData0p05AU}))),r.a.createElement("div",{className:e.futureTab},r.a.createElement(K,{title:"FUTURE TABLE",icon:function(){return r.a.createElement(p.a,{icon:h.h})},isDisplayed:!m},!!c&&r.a.createElement(me,{period:"future",cadData:c.cadData0p05AU})))))},be=Object(b.a)((function(e){return{container:{width:"100%",height:"100%"}}}),{name:"page-home"}),Ee=function(){be();return r.a.createElement(r.a.Fragment,null,r.a.createElement(he,null))},ke=Object(b.a)((function(e){return{container:{minHeight:"95vh",width:"100%",height:"100%",overflow:"hidden",padding:10}}}),{name:"page-about"}),ve=function(){var e=ke();return r.a.createElement("div",{className:e.container},r.a.createElement("h1",null,"PDCO Status Dashboard"),r.a.createElement("p",null,"This is the dashboard for quickly summarizing the state of concern for the Planetary Defence Coordination Office."),r.a.createElement("h1",null,"Usage"),r.a.createElement("p",null,"To preserve API calls, this dashboard caches data at the time displayed in the title bar. It will also refresh automatically every 12 hours. You can manually refresh the data by clicking on the title bar."))},xe=Object(b.a)((function(e){return{container:{}}}),{name:"app-entry"}),ye=Object(b.a)((function(e){return{container:{"& ul":{margin:0,"& li":{color:"white",display:"inline-block",margin:"0px 10px"}}}}})),we=function(){var e=ye();return r.a.createElement("div",{className:"simple-menu-container "+e.container},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(o.b,{to:"/"},"Home")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"/about"},"About"))))},Ce=Object(b.a)((function(e){return{container:{width:"100%",height:"100%",backgroundColor:e.palette.background.default}}}),{name:"layout"}),Te=function(e){var t=Ce();return r.a.createElement("div",{className:"layout-container "+t.container},e.children)};i.a.render(r.a.createElement((function(){var e=xe();return r.a.createElement("div",{className:e.container},r.a.createElement(d.a,{theme:u},r.a.createElement(g.a,null),r.a.createElement(Te,null,r.a.createElement(o.a,{basename:"/pdco-dashboard/"},r.a.createElement(l.c,null,r.a.createElement(l.a,{exact:!0,path:"/"},r.a.createElement(Ee,null)),r.a.createElement(l.a,{path:"/about"},r.a.createElement(ve,null))),r.a.createElement(we,null)))))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[61,1,2]]]);
//# sourceMappingURL=main.54db1440.chunk.js.map