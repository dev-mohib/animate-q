import React, { useEffect, useState } from 'react'
import { fabric } from 'fabric'
import { useAppSelector } from '@/state/store'

const ct = new fabric.Canvas('myCanvas')

const TestCanvas = () => {
    const [canvas, setCanvas] = useState(ct)
    const [isLoaded, setLoaded]  = useState(false)
    const [isDrawing, setDrawing] = useState(false)
    const [rerender, setRender] = useState(false)
    const [brush, setBrush] = useState(null)
    const [phrase, setPhrase] = useState('')
    const { drawTool, currentControl } = useAppSelector(s => s.uiSlice)
    const { bgColor, brushColor, brushWidth } = useAppSelector(s => s.editorSlice)
    let interval
    var drawing = false;

    var getMouseCoordinate = function (evt) {
      return {
        x : evt.pageX - this.offsetLeft,
        y : evt.pageY - this.offsetTop
      };
    };

    useEffect(() => {
    const _ctx = new fabric.Canvas('myCanvas', {
        width: window.innerWidth, 
        height: window.innerHeight,
        backgroundColor : bgColor,
        // stateful : true,
        isDrawingMode : true,
        // centeredScaling : true,
        allowTouchScrolling : true,
        // freeDrawingCursor : 'some value'
        })
        setCanvas(_ctx)
        setLoaded(true)
    }, [])

    useEffect(() => {
        if(isLoaded){
          const ctx = canvas.getContext('2d') 
          let pencilBrush =  new fabric.PencilBrush(canvas)
          if(drawTool == 'brush'){
              pencilBrush.initialize(canvas)
              pencilBrush.color =  'red'
              pencilBrush.width = brushWidth
              pencilBrush.globalCompositeOperation = 'destination-out'
              canvas.freeDrawingBrush = pencilBrush
              canvas.freeDrawingBrush.globalCompositeOperation = 'destination-out';
              
              canvas.freeDrawingBrush.id = 'brush'
              setBrush(pencilBrush)

            }else if(drawTool == 'eraser'){
              let pencilBrush =  new fabric.PencilBrush(canvas)
              pencilBrush.initialize(canvas)
              pencilBrush.color =  'green'
              pencilBrush.width = brushWidth

              canvas.freeDrawingBrush = pencilBrush
              canvas.freeDrawingBrush.globalCompositeOperation = 'destination-out';
              canvas.freeDrawingBrush.id = 'eraser'
              setBrush(pencilBrush)
            }

            // pencilBrush.onMouseDown =  function( t, e) {
            //    setDrawing(true)
             
            //     this.canvas._isMainEvent(e.e) &&
            //    (
            //       this.drawStraightLine = e.e[ this.straightLineKey],
            //       this._prepareForDrawing(t),
            //       this._captureDrawingPath(t),
            //       this._render()
            //    )
            //  }

            //  pencilBrush.onMouseUp = function(options) {
            //   if (!this.canvas._isMainEvent(options.e)) {
            //     return true;
            //   }
            //   this.drawStraightLine = false;
            //   this.oldEnd = undefined;
            //   this._finalizeAndAddPath();
            //   setDrawing(false)
            //   return false;
            // }



            pencilBrush.onMouseDown = function (e) {
              if (drawing) return false;
              drawing = true;
              var mouse = getMouseCoordinate.call(this, e);
              
              // ctx.globalCompositeOperation = drawTool === "brush" ? "xor" : "destination-out";
              ctx.globalCompositeOperation = 'destination-out'
              ctx.fillStyle = drawTool === "brush" ? 'red' : "rgba(0,0,0,1)";
              
              ctx.beginPath();
              ctx.arc(mouse.x, mouse.y, brushWidth, 0, 2*Math.PI);
              ctx.fill();
              ctx.closePath();
            };
            
            pencilBrush.onMouseMove = function (e) {
              if (!drawing) return false;
              var mouse = getMouseCoordinate.call(this, e);
              ctx.beginPath();
              ctx.arc(mouse.x, mouse.y, brushWidth, 0, 2*Math.PI);
              ctx.fill();
              ctx.closePath();
            };
            
            pencilBrush.onMouseUp = function (e) {
              if (!drawing) return false;
              drawing = false;
            };
            
        }
    },[isLoaded, drawTool])


      useEffect(() => {
        interval = setInterval(
            () => {
                if(isDrawing && brush){
                  brush._finalizeAndAddPath()
                }
          },
          (500));
          return () => {
            clearInterval(interval)
          }
      },[isDrawing])


      

  return (
    <div className='bg-white text-black'>
         <canvas id='myCanvas'></canvas>
         {/* <div>{phrase}</div> */}
    </div>
  )
}


const _finalizeAndAddPath = ()=> {
    var ctx = this.canvas.contextTop;
    ctx.closePath();
    if (this.decimate) {
      this._points = this.decimatePoints(this._points, this.decimate);
    }
    var pathData = this.convertPointsToSVGPath(this._points);
    if (this._isEmptySVGPath(pathData)) {
      // do not create 0 width/height paths, as they are
      // rendered inconsistently across browsers
      // Firefox 4, for example, renders a dot,
      // whereas Chrome 10 renders nothing
      this.canvas.requestRenderAll();
      return;
    }
    var path = this.createPath(pathData);
    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.fire('before:path:created', { path: path });
    this.canvas.add(path);
    this.canvas.requestRenderAll();
    path.setCoords();
    this._resetShadow();
    // fire event 'path' created
    this.canvas.fire('path:created', { path: path });
  }
export default TestCanvas