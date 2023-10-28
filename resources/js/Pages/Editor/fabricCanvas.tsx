// @ts-nocheck
import * as fabric from 'fabric'
import { useEffect, useState, useContext } from 'react';
import { useAppSelector, useAppDispatch, uiActions } from '@/state/store';
import { FabricContext, FabricDispatchContext} from '@/context/fabricContext'
import { historyState } from '@/Components/UndoRedo'
import { ThreadState, Actions as TStateActions } from './editor.types';
const {fabric : Fabric} = fabric


const FabricCanvas = ({tState, tActions} : {tState : ThreadState, tActions : TStateActions}) => {
  const [isLoaded, setLoaded] = useState(false)
  const [isPainting, setPainting] = useState(false)
  const canvas = useContext(FabricContext)
  const setFabric = useContext(FabricDispatchContext)
  const dispatch = useAppDispatch()
  const [client, setClient] = useState({x : 0, y : 0})
  

  const { threads, activeThread } = tState
  const { brushColor, bgColor, brushWidth } = useAppSelector(s => s.editorSlice)
  const { drawTool, threadLayersView, isResized, isThreadShow } = useAppSelector(s => s.uiSlice)

  useEffect(() => {
    const _canvas = new Fabric.Canvas('myCanvas', {
      width: window.innerWidth, 
      height: window.innerHeight,
      backgroundColor : bgColor,
      stateful : false,
      isDrawingMode : true,
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
    Fabric.Object.prototype.selectable=false
    let _pencilBrush =  new Fabric.PencilBrush(_canvas)
    _pencilBrush.initialize(_canvas)
    _pencilBrush.color =  brushColor
    _pencilBrush.width = brushWidth
  
    _canvas.freeDrawingBrush = _pencilBrush
    //Free circle
    const circle = new Fabric.Circle({ 
      opacity : 0,
      left : 0, 
      top : 0, 
      radius : 1,
      visible : false,
      data : {
        activeThread : 0,
        activeFrame : 0
      },
      fill : 'red'
    })

    _canvas.add(circle)
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
const findObjectsByData = (activeThread = 0, activeFrame = 0) =>{
  return canvas._objects.filter(obj => obj?.data?.activeThread == activeThread && obj?.data?.activeFrame == activeFrame )
}
const findObjectsByName = (name) =>{
  return canvas._objects.filter(obj => obj.name == name)
}

  useEffect(() => {
    if(isLoaded){
      // alert('setting canvas dimenstions')
      canvas.setDimensions({
        width : window.innerWidth,
        height : window.innerHeight
      })
      
    }
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
        canvas.freeDrawingBrush.width = brushWidth
        try {
          canvas.__eventListeners["path:created"] = [];
        } catch (error) {}
      }
      else if(drawTool == 'eraser'){
        canvas.freeDrawingBrush.color = bgColor
        canvas.freeDrawingBrush.width = brushWidth   
      }
      else {
          canvas.isDrawingMode = true
          canvas.freeDrawingBrush.color = brushColor
          canvas.freeDrawingBrush.width = brushWidth
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
  },[brushColor, brushWidth, bgColor, drawTool, isLoaded])


  useEffect(() => {
    if(isLoaded){
    const circle = new Fabric.Circle({ 
      fill : brushColor, 
      left : client.x, 
      top : client.y, 
      radius : brushWidth / 2,
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
  },[isLoaded, activeThread, threads[activeThread], isPainting])

  useEffect(() => {
    if(isLoaded){
      canvas.__eventListeners["object:added"] = [];
      canvas.on('object:added', (e) => {
        if(!historyState.isLocked){
          e.target.name = drawTool
          e.target.data = {
            activeThread,
            activeFrame : threads[activeThread??0].activeFrame 
          }
          if(findObjectsByData(activeThread, threads[activeThread].activeFrame).length){
            tActions.fillFrame(activeThread,threads[activeThread].activeFrame)
          }
          dispatch(uiActions.enableUndo())
          historyState.undoHistory.push(canvas.toJSON(["data"]))
          historyState.redoHistory = []
          dispatch(uiActions.disableRedo())
        }
      })
    }
  },[activeThread, threads[activeThread], isLoaded, drawTool])

 useEffect(() => {
    if(isLoaded){
      const threadActive = threads[activeThread??0]
      canvas._objects.forEach(obj => {
        obj.sendToBack()
        obj.visible = false
      })
      if(isThreadShow) {
          findObjectsByData(activeThread, threads[activeThread].activeFrame)
          // canvas?._objects
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
      } else {
        threads.forEach((_thread) => {
          findObjectsByData(_thread.index, _thread.activeFrame)
          .forEach((object) => {
            object.sendToBack()
            object.visible = true
            object.opacity = 1
          })
        })
      }
      canvas.renderAll()
    } 
   },[activeThread, threads, threadLayersView, isThreadShow])

  
// },[])

  return (
    <canvas id='myCanvas'></canvas>
  )

}

export default FabricCanvas
export {Fabric} 