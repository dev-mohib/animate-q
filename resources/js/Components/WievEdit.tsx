import React from 'react'
import { MdAdd, MdRemove} from 'react-icons/md'
import { TStateActions } from '@/Pages/Editor/editor.types'
const WievEdit = ({tActions, tState} : TStateActions) => {
  

  return (
    <div 
      className='flex flex-row items-center justify-center opacity-40 wieve-edit bg-black  rounded-tr-xl py-3 '
      // style={{clipPath : currentControl == 'Wieve Edit' ? 'circle(45% at 35% 50%)' : 'circle(20% at 22% 73%)'}}
      >
      <MdRemove className='cursor-pointer active:text-red-500 mx-0.5'
       onClick={() => tState.threads.length > 1 && tActions.popThread()}
       size={35}/>
      <MdAdd className='cursor-pointer active:text-red-500 mx-0.5'
      onClick={() => tState.threads.length < 5 &&  tActions.pushThread({
        activeFrame : 0,
        degreeOfOrigin : 0,
        fps : 10,
        frames : [{isFilled : false}],
        index : tState.threads.length,
        isActive : false,
        isPlaying : false
      })}
      size={35}/> 
    </div>
  )
}


export default WievEdit