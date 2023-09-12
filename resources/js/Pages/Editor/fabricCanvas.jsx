import * as fabric from 'fabric'
import { useEffect, useRef, useState, useContext } from 'react';
import { useAppSelector, useAppDispatch, uiActions } from '@/state/store';
import { FabricContext, FabricDispatchContext} from '@/context/fabricContext'
import { historyState } from '@/Components/UndoRedo'
const {fabric : Fabric} = fabric


const FabricCanvas = ({tState, tActions}) => {
  const [isLoaded, setLoaded] = useState(false)
  const [isPainting, setPainting] = useState(false)
  const canvas = useContext(FabricContext)
  const setFabric = useContext(FabricDispatchContext)
  const dispatch = useAppDispatch()
  const [client, setClient] = useState({x : 0, y : 0})
  

  const { threads, activeThread } = tState
  const { brushColor, bgColor, brushWidth, brushShadow } = useAppSelector(s => s.editorSlice)
  const { drawTool, threadLayersView, isResized } = useAppSelector(s => s.uiSlice)
  // var clientX,clientY, optionsE
  const findObjectsByData = (activeThread, activeFrame) =>{
    return canvas._objects.filter(obj => obj.data.activeThread == activeThread && obj.data.activeFrame == activeFrame )
  }
  const findObjectsByName = (name) =>{
    return canvas._objects.filter(obj => obj.name == name)
  }
  useEffect(() => {
    const _canvas = new Fabric.Canvas('myCanvas', {
      width: window.innerWidth, 
      height: window.innerHeight,
      backgroundColor : bgColor,
      stateful : false,
      isDrawingMode : true,
      // allowTouchScrolling : true,
      enableRetinaScaling : false,
      selection : false,
      allowTouchScrolling : false,
      renderOnAddRemove : false,
      enablePointerEvents: true,
    })
    Fabric.Object.prototype.objectCaching = false
    Fabric.Object.prototype.hasBorders = false
    Fabric.Object.prototype.hasControls = false
    Fabric.Object.prototype.statefullCache = false
    let _pencilBrush =  new Fabric.PencilBrush(_canvas)
    _pencilBrush.initialize(_canvas)
    _pencilBrush.color =  brushColor
    _pencilBrush.width = brushWidth
  
    _canvas.freeDrawingBrush = _pencilBrush
    setFabric(_canvas)
    _canvas.on('mouse:wheel', function(opt) {
      var delta = opt.e.deltaY;
      var zoom = _canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
    _canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
    _canvas.on('mouse:down',(_) => {
      setPainting(true)
     })
    _canvas.on('mouse:up',(_) => {
      setPainting(false)
     })
    _canvas.on('mouse:move', (options) => {
      setClient({x : options.e.clientX, y : options.e.clientY})
    })
    setLoaded(true)
    
  }, [])


//Resize Canvas on Window changed
  useEffect(() => {
    var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
    if(orientation == 'portrait-primary' || orientation == 'portrait-secondary'){
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }else if(orientation == 'landscape-primary' || orientation == 'landscape-secondary'){
      canvas.width = window.innerHeight
      canvas.height = window.innerWidth
    }

    canvas.renderAll()
  },[isResized])

  useEffect(() => {
    if(isLoaded){
        canvas.backgroundColor = bgColor
        findObjectsByName('eraser').forEach(obj => {
          obj.stroke = bgColor
          obj.dirty = true
        })
      if(drawTool == 'brush'){
        canvas.isDrawingMode = true
        canvas.freeDrawingBrush.color = brushColor
        canvas.freeDrawingBrush.shadow = brushShadow  //{offsetX : brushShadow, offsetY : brushShadow, blur : 8}
        try {
          canvas.__eventListeners["path:created"] = [];
        } catch (error) {}
      }
      else if(drawTool == 'eraser'){
        // pencilBrush.color = bgColor
        canvas.freeDrawingBrush.color = bgColor
        canvas.freeDrawingBrush.shadow = null
      }
      else {
          canvas.isDrawingMode = true
          canvas.__eventListeners["path:created"] = [];
          canvas.on('path:created', function(options) {
            var path = options.path;
            path.set('fill', brushColor);
            // canvas.isDrawingMode = false;
            canvas.clipTo = function(ctx) {
                path.render(ctx);
            };
        });
      }
      canvas.renderAll()
    }
  },[brushColor, brushWidth, bgColor, drawTool, isLoaded, brushShadow])


  useEffect(() => {
    if(isLoaded){
    const circle = new Fabric.Circle({ 
      fill : brushColor, 
      left : client.x, 
      top : client.y, 
      radius : brushWidth / 2,
      shadow : brushShadow
    })
    if(threads[activeThread]?.isPlaying){     
      canvas.isDrawingMode = false
      if(isPainting && drawTool == 'brush'){
        canvas.add(circle)  
      }
    }else if(!threads[activeThread]?.isPlaying && !isPainting){
    canvas.isDrawingMode = true
    }
  }
  },[isLoaded, activeThread, threads[activeThread], isPainting, brushShadow])

  useEffect(() => {
    if(isLoaded){
      canvas.__eventListeners["object:added"] = [];
      canvas.on('object:added', (e) => {
      e.target.name = drawTool
      e.target.data = {
        activeThread,
        activeFrame : threads[activeThread??0].activeFrame 
      }
      if(findObjectsByData(activeThread, threads[activeThread].activeFrame).length){
        tActions.fillFrame(activeThread,threads[activeThread].activeFrame)
      }
      if(!historyState.isLocked){
        dispatch(uiActions.enableUndo())
        historyState.undoHistory.push(canvas.toJSON())
        historyState.redoHistory = []
        dispatch(uiActions.disableRedo())
      }
      })
    }
  },[activeThread, threads[activeThread], isLoaded])


  useEffect(() => {
    if(isLoaded){
      const threadActive = threads[activeThread??0]
      canvas._objects.forEach(obj => {
        obj.sendToBack()
        obj.visible = false,
        obj.selectable = false
      })

      
      threads.forEach((_thread, index) => {
        findObjectsByData(index, _thread.activeFrame)
        .forEach((object, index) => {
          object.sendToBack()
          object.visible = true
          object.opacity = 1
          if(!threadActive.isPlaying){
            if(threadLayersView == 'Next'){
              const nextIndex = threadActive.activeFrame == threadActive.frames.length - 1  ? 0 : threadActive.activeFrame + 1
              findObjectsByData(activeThread, nextIndex).forEach(obj => {
                obj.visible = true
                obj.opacity = 0.3
              })
            }else if(threadLayersView == 'Previous'){
              const previousIndex = threadActive.activeFrame ==  0 ?  threadActive.frames.length - 1 : threadActive.activeFrame - 1
              findObjectsByData(activeThread, previousIndex).forEach(obj => {
                obj.visible = true
                obj.selectable = false
                obj.opacity = 0.3
               })
            }
          }
        })
      })
      
      canvas.renderAll()
    }
      
  },[activeThread, threads, threadLayersView])

  return (
    <canvas id='myCanvas'></canvas>
  )

}

export default FabricCanvas
export {Fabric} 