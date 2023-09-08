import{r as l,F as z,b as R,u as j,c as B,e as _,j as T,f as H}from"./app-00c4ff73.js";import{h as D,C as M}from"./controls-28b58742.js";import"./index-387d7a00.js";const{fabric:p}=H,W=({tState:g,tActions:o})=>{const[h,y]=l.useState(!1),[t,s]=l.useState(!1),e=l.useContext(z);l.useState(null);const r=l.useContext(R),c=j(),[u,E]=l.useState({x:0,y:0}),{threads:f,activeThread:d}=g,{brushColor:v,bgColor:b,brushWidth:O,brushShadow:C}=B(a=>a.editorSlice),{drawTool:F,threadLayersView:P,isThreadShow:N,isResized:L}=B(a=>a.uiSlice);l.useEffect(()=>{const a=new p.Canvas("myCanvas",{width:window.innerWidth,height:window.innerHeight,backgroundColor:b,stateful:!1,isDrawingMode:!0,enableRetinaScaling:!1,selection:!1,allowTouchScrolling:!1,renderOnAddRemove:!1,enablePointerEvents:!0});p.Object.prototype.objectCaching=!1,p.Object.prototype.hasBorders=!1,p.Object.prototype.hasControls=!1,p.Object.prototype.statefullCache=!1;let i=new p.PencilBrush(a);i.initialize(a),i.color=v,i.width=O,a.freeDrawingBrush=i,r(a),a.on("mouse:wheel",function(n){var x=n.e.deltaY,m=a.getZoom();m*=.999**x,m>20&&(m=20),m<.01&&(m=.01),a.zoomToPoint({x:n.e.offsetX,y:n.e.offsetY},m),n.e.preventDefault(),n.e.stopPropagation()}),a.on("mouse:down",n=>{s(!0)}),a.on("mouse:up",n=>{s(!1)}),a.on("mouse:move",n=>{E({x:n.e.clientX,y:n.e.clientY})}),y(!0)},[]);const S=(a,i)=>e._objects.filter(n=>n.data.activeThread==a&&n.data.activeFrame==i),k=a=>e._objects.filter(i=>i.name==a);return l.useEffect(()=>{var a=(screen.orientation||{}).type||screen.mozOrientation||screen.msOrientation;a=="portrait-primary"||a=="portrait-secondary"?(e.width=window.innerWidth,e.height=window.innerHeight):(a=="landscape-primary"||a=="landscape-secondary")&&(e.width=window.innerHeight,e.height=window.innerWidth),e.renderAll()},[L]),l.useEffect(()=>{if(h){if(e.backgroundColor=b,k("eraser").forEach(a=>{a.stroke=b,a.dirty=!0}),F=="brush"){e.isDrawingMode=!0,e.freeDrawingBrush.color=v,e.freeDrawingBrush.shadow=C;try{e.__eventListeners["path:created"]=[]}catch{}}else F=="eraser"?(e.freeDrawingBrush.color=b,e.freeDrawingBrush.shadow=null):(e.isDrawingMode=!0,e.__eventListeners["path:created"]=[],e.on("path:created",function(a){var i=a.path;i.set("fill",v),e.clipTo=function(n){i.render(n)}}));e.renderAll()}},[v,O,b,F,h,C]),l.useEffect(()=>{var a,i;if(h){const n=new p.Circle({fill:v,left:u.x,top:u.y,radius:O/2,shadow:C});(a=f[d])!=null&&a.isPlaying?(e.isDrawingMode=!1,t&&F=="brush"&&e.add(n)):!((i=f[d])!=null&&i.isPlaying)&&!t&&(e.isDrawingMode=!0)}},[h,d,f[d],t,C]),l.useEffect(()=>{h&&(e.__eventListeners["object:added"]=[],e.on("object:added",a=>{a.target.name=F,a.target.data={activeThread:d,activeFrame:f[d??0].activeFrame},S(d,f[d].activeFrame).length&&o.fillFrame(d,f[d].activeFrame),D.isLocked||(c(_.enableUndo()),D.undoHistory.push(e.toJSON()),D.redoHistory=[],c(_.disableRedo()))}))},[d,f[d],h]),l.useEffect(()=>{if(h){const a=f[d??0];e._objects.forEach(i=>{i.sendToBack(),i.visible=!1,i.selectable=!1}),f.forEach((i,n)=>{S(n,i.activeFrame).forEach((x,m)=>{if(x.sendToBack(),x.visible=!0,x.opacity=1,!a.isPlaying){if(P=="Next"){const A=a.activeFrame==a.frames.length-1?0:a.activeFrame+1;S(d,A).forEach(w=>{w.visible=!0,w.opacity=.3})}else if(P=="Previous"){const A=a.activeFrame==0?a.frames.length-1:a.activeFrame-1;S(d,A).forEach(w=>{w.visible=!0,w.selectable=!1,w.opacity=.3})}}})}),e.renderAll()}},[d,f,P]),T.jsx("canvas",{id:"myCanvas"})};const J=()=>{const[g,o]=l.useState({activeThread:0,isPlayAll:!1,threads:[]}),h=j(),y={pushThread:t=>{o(s=>({...s,threads:[...g.threads,t]}))},popThread:()=>{o(t=>({...t,threads:t.threads.filter((s,e)=>e!=t.threads.length-1)}))},pauseThread:t=>{o(s=>({...s,threads:s.threads.map((e,r)=>r==t?{...e,isPlaying:!1}:{...e})}))},playThread:t=>{o(s=>({...s,threads:s.threads.map((e,r)=>r==t?{...e,isPlaying:!0}:{...e})}))},setActiveThread:t=>{o(s=>({...s,activeThread:t}))},setDegreeOfOrigin:(t,s)=>{o(e=>({...e,threads:e.threads.map((r,c)=>c==s?{...r,degreeOfOrigin:t}:r)}))},setActiveFrame:(t,s)=>{o(e=>({...e,threads:e.threads.map((r,c)=>c==t?{...r,activeFrame:s}:r)}))},setFps:(t,s)=>{t=="increase"?o(e=>({...e,threads:e.threads.map((r,c)=>c==s?{...r,fps:r.fps<30?r.fps+5:r.fps}:{...r})})):o(e=>({...e,threads:e.threads.map((r,c)=>c==s?{...r,fps:r.fps>5?r.fps-5:r.fps}:{...r})}))},playAll:()=>{o(t=>({...t,threads:t.threads.map(s=>({...s,isPlaying:!0}))}))},pauseAll:()=>{o(t=>({...t,threads:t.threads.map(s=>({...s,isPlaying:!1}))}))},pushFrame:t=>{o(s=>({...s,threads:s.threads.map((e,r)=>r==t?{...e,frames:[...e.frames,{isFilled:!1}]}:e)}))},popFrame:t=>{o(s=>({...s,threads:s.threads.map((e,r)=>r==t?{...e,frames:e.frames.filter((c,u)=>u!=e.frames.length-1)}:e)}))},fillFrame:(t,s)=>{o(e=>({...e,threads:e.threads.map((r,c)=>c==t?{...r,frames:r.frames.map((u,E)=>E==s?{...u,isFilled:!0}:u)}:r)}))},unfillFrame:t=>{},getState:()=>g};return l.useEffect(()=>{window.addEventListener("orientationchange",t=>{h(_.setWindowResized())}),y.pushThread({fps:15,index:0,isActive:!1,isPlaying:!1,degreeOfOrigin:0,frames:[{isFilled:!1}],activeFrame:0})},[]),T.jsxs("div",{className:"bg-black",children:[T.jsx(W,{tState:g,tActions:y}),T.jsx(M,{threadState:g,actions:y})]})};export{J as default};