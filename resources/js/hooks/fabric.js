import * as fabric from 'fabric'
import { useEffect, useRef, useState, useContext } from 'react';
import { useAppSelector } from '../state/store';
import { FabricContext, FabricDispatchContext} from '../context/fabricContext'

const {fabric : Fabric} = fabric

const initCanvas = new Fabric.Canvas('myCanvas', { isDrawingMode : true})
const ctx = new Fabric.Canvas('myCanvas2', { isDrawingMode : true})

export const useFabric = (id) => {
  const canvasRef = useRef(null)
  const [canvas, setCanvas] = useState(initCanvas)
  const [isLoaded, setLoaded] = useState(false)
  const fCanvas = useContext(FabricContext)
  const setFabric = useContext(FabricDispatchContext)
  const { brushColor, bgColor, brushWidth, activeThread, threads} = useAppSelector(s => s.editorSlice)
  const { activeFrame } = threads[activeThread??0]


  const toJSON = () => canvas?.toJSON()
  useEffect(() => {
    
    const _canvas = new Fabric.Canvas(id, {
      width: window.innerWidth - 17, 
      height: window.innerHeight,
      backgroundColor : bgColor,
      // stateful : true,
      isDrawingMode : true,
      // centeredScaling : true,
      allowTouchScrolling : true,
      // freeDrawingCursor : 'some value'
    })

    setCanvas(_canvas)
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
    setLoaded(true)
  }, [])


  useEffect(() => {
    if(isLoaded){
      // const pointer = canvas.getPointer()
      // console.log({pointer});
      // onMouseDown(pointer)
      // onMouseUp(pointer)
      canvas.isDrawingMode = false
      canvas.isDrawingMode = true
    }
  },[isLoaded, activeFrame])
  useEffect(() => {
    if(canvas){
      const circle = new Fabric.Circle({
        radius: 70, fill: 'green', left: 100, top: 100
      })

      // canvas.add(circle)
      canvas.freeDrawingBrush.color = brushColor
      canvas.backgroundColor = bgColor
      canvas.freeDrawingBrush.width = brushWidth
      canvas.freeDrawingBrush.strokeLineCap = 'round'
      canvas.freeDrawingBrush.shadow = new Fabric.Shadow({
        blur: parseInt(5, 10) || 0,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: '#000000',
      });
      canvas.renderAll()
    }
  },[canvas, brushColor, brushWidth, bgColor])


  const loadFromJSON = (json) => {
    // canvas.loadFromJSON(json)
    Fabric.loadFromJSON(json, () => {
      canvas.renderAll()
    },(options, o) => {
      console.log({options, o})
    }) 
  }
  function onMouseDown(pointer) {
    // const pointer = canvas.getPointer(e);
    canvas.freeDrawingBrush.onMouseDown(pointer);
  }
  
  function onMouseUp(pointer) {
    // const pointer = canvas.getPointer(e);
    canvas.freeDrawingBrush.onMouseUp(pointer);
  }
  
  function drawRealTime(pointer) {
    canvas.freeDrawingBrush.onMouseMove(pointer);
  }

  return {canvas, canvasRef, loadFromJSON, toJSON, isLoaded}

}


export {Fabric} 