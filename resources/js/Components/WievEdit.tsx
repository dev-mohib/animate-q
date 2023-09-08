import React, { useContext } from 'react'
import { TbCircles  } from 'react-icons/tb'
import { editorActions, uiActions, useAppDispatch, useAppSelector } from '@/state/store'
import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi'
import { fabric } from 'fabric'
import { FabricContext } from '@/context/fabricContext'
const WievEdit = () => {
  const { currentControl } = useAppSelector(s => s.uiSlice)
  const dispatch = useAppDispatch()

  return (
    <div 
      className='flex flex-row items-center opacity-40 wieve-edit bg-black mb-10  rounded-xl h-32'
      style={{clipPath : currentControl == 'Wieve Edit' ? 'circle(45% at 35% 50%)' : 'circle(20% at 22% 73%)'}}
      >
      <div className='p-3 self-end' onClick={() => {
        dispatch(uiActions.setCurrentControl(currentControl == 'Wieve Edit'? null : 'Wieve Edit'))
        }
      }
      >
        <TbCircles onClick={() => dispatch(uiActions.changeBgColorControl())} className='cursor-pointer'  size={40} />
      </div>
      <WieveOptions />
    </div>
  )
}

const WieveOptions = () => {
  const canvas = useContext(FabricContext)
  const dispatch = useAppDispatch()

  const pushThread = () => {
    //const box = new fabric.Rect({width : 1, height : 1, top: 1,left : 1,data : {activeThread : threads.length + 1, activeFrame : 0}})
    // // canvas?.add(box)
    // dispatch(editorActions.pushThread({
    //   fps : 10, 
    //   index : threads.length,
    //   frames : [{index : 0, isActive : false, isFilled : false, json : []}],
    //   isActive : false, 
    //   isPlaying : false,
    //   activeFrame : 0,
    // }))
  }
  const popThread = () => {
    // dispatch(editorActions.popThread())
  }
  
  return (
      <div className={`relative`}>
      {/* {isShow && */}
          <div>
              <h4 className='text-xs color-white'>Thread</h4>
              <div className='flex'>
                  <BiMinusCircle onClick={popThread} size={20} className='btn-small bg-gray-400 text-red-500  cursor-pointer' />
                  <BiPlusCircle onClick={pushThread} size={20} className='btn-small bg-gray-400 text-red-500  cursor-pointer' />
              </div>
          </div>
      {/*  } */}
      </div>
  )
}

export default WievEdit