import{r as f,F as L,b as R,u as A,c as O,e as S,j as E,f as z,a as M}from"./app-efb1e0f9.js";import{h as P,C as H}from"./controls-75c4592c.js";const{fabric:p}=z,N=({tState:w,tActions:l})=>{const[m,x]=f.useState(!1),[t,s]=f.useState(!1),e=f.useContext(L),r=f.useContext(R),d=A(),[g,T]=f.useState({x:0,y:0}),{threads:u,activeThread:o}=w,{brushColor:v,bgColor:b,brushWidth:y}=O(a=>a.editorSlice),{drawTool:F,threadLayersView:D,isResized:_,isThreadShow:B}=O(a=>a.uiSlice);f.useEffect(()=>{const a=new p.Canvas("myCanvas",{width:window.innerWidth,height:window.innerHeight,backgroundColor:b,stateful:!1,isDrawingMode:!0,enableRetinaScaling:!1,selection:!1,allowTouchScrolling:!1,renderOnAddRemove:!1,enablePointerEvents:!0});p.Object.prototype.objectCaching=!1,p.Object.prototype.hasBorders=!1,p.Object.prototype.hasControls=!1,p.Object.prototype.statefullCache=!1,p.Object.prototype.selectable=!1;let n=new p.PencilBrush(a);n.initialize(a),n.color=v,n.width=y,a.freeDrawingBrush=n,r(a),a.on("mouse:wheel",function(i){var h=i.e.deltaY,c=a.getZoom();c*=.999**h,c>20&&(c=20),c<.01&&(c=.01),a.zoomToPoint({x:i.e.offsetX,y:i.e.offsetY},c),i.e.preventDefault(),i.e.stopPropagation()}),a.on("mouse:down",i=>{s(!0)}),a.on("mouse:up",i=>{s(!1)}),a.on("mouse:move",i=>{T({x:i.e.clientX,y:i.e.clientY})}),x(!0)},[]);const C=(a=0,n=0)=>e._objects.filter(i=>{var h,c;return((h=i==null?void 0:i.data)==null?void 0:h.activeThread)==a&&((c=i==null?void 0:i.data)==null?void 0:c.activeFrame)==n}),k=a=>e._objects.filter(n=>n.name==a);return f.useEffect(()=>{m&&e.setDimensions({width:window.innerWidth,height:window.innerHeight})},[_]),f.useEffect(()=>{if(m){if(e.backgroundColor=b,k("eraser").forEach(a=>{a.stroke=b,a.dirty=!0}),F=="brush"){e.isDrawingMode=!0,e.freeDrawingBrush.color=v,e.freeDrawingBrush.width=y;try{e.__eventListeners["path:created"]=[]}catch{}}else F=="eraser"?(e.freeDrawingBrush.color=b,e.freeDrawingBrush.width=y):(e.isDrawingMode=!0,e.freeDrawingBrush.color=v,e.freeDrawingBrush.width=y,e.__eventListeners["path:created"]=[],e.on("path:created",function(a){var n=a.path;n.set("fill",v),e.clipTo=function(i){n.render(i)}}));e.renderAll()}},[v,y,b,F,m]),f.useEffect(()=>{var a,n;if(m){const i=new p.Circle({fill:v,left:g.x,top:g.y,radius:y/2});(a=u[o])!=null&&a.isPlaying?(e.isDrawingMode=!1,t&&F=="brush"&&e.add(i)):!((n=u[o])!=null&&n.isPlaying)&&!t&&(e.isDrawingMode=!0)}},[m,o,u[o],t]),f.useEffect(()=>{m&&(e.__eventListeners["object:added"]=[],e.on("object:added",a=>{P.isLocked||(a.target.name=F,a.target.data={activeThread:o,activeFrame:u[o??0].activeFrame},C(o,u[o].activeFrame).length&&l.fillFrame(o,u[o].activeFrame),d(S.enableUndo()),P.undoHistory.push(e.toJSON(["data"])),P.redoHistory=[],d(S.disableRedo()))}))},[o,u[o],m,F]),f.useEffect(()=>{if(m){const a=u[o??0];e._objects.forEach(n=>{n.sendToBack(),n.visible=!1}),B?C(o,u[o].activeFrame).forEach((n,i)=>{if(n.sendToBack(),n.visible=!0,n.opacity=1,!a.isPlaying){if(D=="Next"){const h=a.activeFrame==a.frames.length-1?0:a.activeFrame+1;C(o,h).forEach(c=>{c.visible=!0,c.opacity=.3})}else if(D=="Previous"){const h=a.activeFrame==0?a.frames.length-1:a.activeFrame-1;C(o,h).forEach(c=>{c.visible=!0,c.selectable=!1,c.opacity=.3})}}}):u.forEach((n,i)=>{C(i,n.activeFrame).forEach((h,c)=>{h.sendToBack(),h.visible=!0,h.opacity=1})}),e.renderAll()}},[o,u,D,B]),E.jsx("canvas",{id:"myCanvas"})};const Y=()=>{const[w,l]=f.useState({activeThread:0,isPlayAll:!1,threads:[]}),m=A(),x={pushThread:t=>{l(s=>({...s,threads:[...w.threads,t]}))},popThread:t=>{l(s=>({...s,threads:s.threads.filter((e,r)=>r!=(t??s.threads.length-1))}))},pauseThread:t=>{l(s=>({...s,threads:s.threads.map((e,r)=>r==t?{...e,isPlaying:!1}:{...e})}))},playThread:t=>{l(s=>({...s,threads:s.threads.map((e,r)=>r==t?{...e,isPlaying:!0}:{...e})}))},setActiveThread:t=>{l(s=>({...s,activeThread:t}))},setDegreeOfOrigin:(t,s)=>{l(e=>({...e,threads:e.threads.map((r,d)=>d==s?{...r,degreeOfOrigin:t}:r)}))},setActiveFrame:(t,s)=>{l(e=>({...e,threads:e.threads.map((r,d)=>d==t?{...r,activeFrame:s}:r)}))},setFps:(t,s)=>{t=="increase"?l(e=>({...e,threads:e.threads.map((r,d)=>d==s?{...r,fps:r.fps<30?r.fps+5:r.fps}:{...r})})):l(e=>({...e,threads:e.threads.map((r,d)=>d==s?{...r,fps:r.fps>5?r.fps-5:r.fps}:{...r})}))},playAll:()=>{l(t=>({...t,threads:t.threads.map(s=>({...s,isPlaying:!0}))}))},pauseAll:()=>{l(t=>({...t,threads:t.threads.map(s=>({...s,isPlaying:!1}))}))},pushFrame:t=>{l(s=>({...s,threads:s.threads.map((e,r)=>r==t?{...e,frames:[...e.frames,{isFilled:!1}]}:e)}))},popFrame:t=>{l(s=>({...s,threads:s.threads.map((e,r)=>r==t?{...e,frames:e.frames.filter((d,g)=>g!=e.frames.length-1)}:e)}))},fillFrame:(t,s)=>{l(e=>({...e,threads:e.threads.map((r,d)=>d==t?{...r,frames:r.frames.map((g,T)=>T==s?{...g,isFilled:!0}:g)}:r)}))},unfillFrame:t=>{},getState:()=>w};return f.useEffect(()=>{window.addEventListener("orientationchange",t=>{m(S.setWindowResized())}),x.pushThread({fps:15,index:0,isActive:!1,isPlaying:!1,degreeOfOrigin:0,frames:[{isFilled:!1}],activeFrame:0})},[]),E.jsxs("div",{className:"bg-black",children:[E.jsx(M,{title:"Editor"}),E.jsx(N,{tState:w,tActions:x}),E.jsx(H,{threadState:w,actions:x})]})};export{Y as default};
