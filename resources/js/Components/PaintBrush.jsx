import React from 'react'
import { FaPaintBrush } from 'react-icons/fa'
import { BiPaint } from 'react-icons/bi'
import { GiLasso } from 'react-icons/gi'
import { MdFormatColorFill } from 'react-icons/md'
import { editorActions, uiActions, useAppDispatch, useAppSelector } from '@/state/store'
const PaintBrush = () => {
    const { brushColor, bgColor } =  useAppSelector(s => s.editorSlice)
    const { currentControl } = useAppSelector(s => s.uiSlice)
    const dispatch = useAppDispatch()
  return (
    <div> 
        <div 
            className='flex flex-row paint-brush bg-black mb-20 rounded-xl opacity-70'
            style={{height : 300, 
                clipPath : currentControl == 'Paint Brush' ? 'circle(100% at 50% 50%)' : 'circle(12% at 85% 90%)',
                position : "absolute",
                bottom : 30,
                right : 5, 
            }}
        >
            <PaintOptions />
            <div className={`cursor-pointer bg-green-400  self-end shadow-black ${currentControl == 'Paint Brush' && 'bg-white'}  rounded-full z-50 relative`}
            // ${currentControl == 'Paint Brush' ? 'bg-green-400' : 'bg-red-400'}
                style={{padding : 10}}
                onClick={() => dispatch(uiActions.setCurrentControl(currentControl == 'Paint Brush' ? null : 'Paint Brush'))}
            >
                <FaPaintBrush color={brushColor} size={40} />
            </div>
        </div>
        <div style={{bottom : 120, right : 6, padding : 5}}  className={` cursor-pointer absolute ${currentControl == 'Wieve Edit'? 'bg-white' : 'bg-black'} opacity-50 shadow-black  rounded-full`} 
            onClick={() => dispatch(uiActions.setCurrentControl(currentControl == 'Wieve Edit' ? null : 'Wieve Edit'))}
            >
            <MdFormatColorFill color={bgColor}  className='button-active' size={50} />
            
        </div>
    </div>
  )
}

const PaintOptions = () => {
    const { brushWidth } = useAppSelector(s => s.editorSlice)
    const { drawTool, currentControl } = useAppSelector(s => s.uiSlice)
    const dispatch = useAppDispatch()
    return (
    <div className='relative w-36 h-64 rounded-full'>
        <div className={`absolute rounded-md  ${currentControl == 'Paint Brush' ? 'opacity-60' : 'opacity-0'} `}>
        {currentControl == 'Paint Brush' &&
            <div className='flex flex-col relative px-0'>
                <div className='flex justify-around my-4'>
                    <BiPaint className={drawTool === 'brush' ? 'bg-black text-green-400 ' : 'cursor-pointer button-active'}  size={20} onClick={() => dispatch(uiActions.setDrawTool('brush'))} />
                    <GiLasso className={drawTool === 'lasso' ? 'bg-black text-green-400' : 'cursor-pointer button-active'}  size={20} onClick={() => dispatch(uiActions.setDrawTool('lasso'))} />
                </div>
                <div className='w-52 bg-white my-3' style={{height : 1}}/>
                <div className='px-5 w-full'>    
                    <input type="range" min="1" max="100" onChange={e => dispatch(editorActions.setBrushWidth(parseInt(e.target.value)))}  value={brushWidth} className="range range-primary" />
                </div>
            </div>
        }
        </div>
     </div>
    )
}

export default PaintBrush