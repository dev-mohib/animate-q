import React from 'react'
import { FaPaintBrush } from 'react-icons/fa'
import { BiPaint } from 'react-icons/bi'
import { GiLasso } from 'react-icons/gi'
import { editorActions, uiActions, useAppDispatch, useAppSelector } from '@/state/store'

const PaintBrush = () => {
    const { brushColor } =  useAppSelector(s => s.editorSlice)
    const { currentControl } = useAppSelector(s => s.uiSlice)
    const dispatch = useAppDispatch()
  return (
    <div 
        className='flex flex-row paint-brush bg-black mb-10 rounded-xl opacity-70'
        style={{height : 300, 
            clipPath : currentControl == 'Paint Brush' ? 'circle(100% at 50% 50%)' : 'circle(11% at 88% 89%)'
        }}
    >
        <PaintOptions />
        <div className='p-3 cursor-pointer self-end  shadow-black  rounded-full' onClick={() => dispatch(uiActions.setCurrentControl(currentControl == 'Paint Brush' ? null : 'Paint Brush'))}>
            <FaPaintBrush color={brushColor}  className='' size={40} />
        </div>
    </div>
  )
}

const PaintOptions = () => {
    const { brushWidth, activeThread, threads } = useAppSelector(s => s.editorSlice)
    const { drawTool, currentControl } = useAppSelector(s => s.uiSlice)
    const dispatch = useAppDispatch()
    return (
    <div className='relative w-52 h-64 rounded-full'>
        <div className={`absolute rounded-md  ${currentControl == 'Paint Brush' ? 'opacity-60' : 'opacity-0'} `}>
        {currentControl == 'Paint Brush' &&
            <div className='flex flex-col relative px-0'>
                <div className='flex justify-around my-4'>
                    <BiPaint className={drawTool === 'brush' ? 'bg-black text-green-400' : 'cursor-pointer'}  size={20} onClick={() => dispatch(uiActions.setDrawTool('brush'))} />
                    <GiLasso className={drawTool === 'lasso' ? 'bg-black text-green-400' : 'cursor-pointer'}  size={20} onClick={() => dispatch(uiActions.setDrawTool('lasso'))} />
                    {/* <TbDragDrop className={drawTool === 'select' ? 'bg-black text-green-400' : 'cursor-pointer'}  size={20} onClick={() => dispatch(uiActions.setDrawTool('select'))} /> */}
                </div>
                <div className='w-36 bg-white my-3' style={{height : 1}}/>

                <div className='flex flex-row justify-between w-36'>    
                    <RangeSlider />
                    <RangeSlider type="Shadow" />
                </div>
            </div>
        }
        </div>
     </div>
    )
}


const RangeSlider = ({type = 'Width'}) => {
    const { brushWidth, brushShadow } = useAppSelector(s => s.editorSlice)
    const dispatch = useAppDispatch()

    const handleChange = (value) => {
        if(type == 'Width'){
            dispatch(editorActions.setBrushWidth(value))
        }else {
            const shadow = value > 0 ? {offsetX : value, offsetY : value, blur : 8, color : 'rgba(0,0,0,0.3)'} : null
            dispatch(editorActions.setBrushShadow(shadow))
        }
    }
    return (<div className='flex flex-col relative  mx-3 w-36'>
        <label htmlFor='brush-width'>{type}</label>
        <input id='brush-width'  className='r-slider absolute' 
        orientation='vertical'
        style={{
            top : 25,
            left :10
        }} min={type === 'Width' ? 1 : 0} max={type === 'Width' ? 50 : 25} type="range" value={type === 'Width' ? brushWidth : brushShadow?.offsetX ?? 0} onChange={(e) => handleChange(parseInt(e.target.value))} />
    </div>)
}
export default PaintBrush