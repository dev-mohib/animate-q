import React, { createRef, useState } from 'react'
import { FaPlay, FaPause} from 'react-icons/fa' 
import { TbGridDots } from 'react-icons/tb'
import { CgRecord, CgImport } from 'react-icons/cg'
import { AiOutlineLogout} from 'react-icons/ai'
import { uiActions, useAppDispatch, useAppSelector } from '@/state/store'
import { TStateActions } from '@/Pages/Editor/editor.types'
import { startRecorder } from '@/utils/recording'
import { usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
const CentralMenu = ({tState, tActions} : TStateActions) => {
  const { auth } = usePage<PageProps>().props
  
  const { currentControl, isRecording } = useAppSelector(s => s.uiSlice)
  const dispatch = useAppDispatch()
  
  const handleLogout = () => {
  //  
  }

  const importFromJson = () => {

  }

  return (
    <div className='absolute top-0 left-52 right-52 flex justify-center'>
      <div 
        className='flex flex-col items-center bg-black opacity-50 rounded-xl pt-4 px-3 pb-2 paint-brush'
        style={{clipPath : currentControl == 'Center Menu' ? 'circle(100%)' : 'circle(17% at 72% 36%)'}}
        > 
        <div className='flex items-center justify-between'>
          {
          tState.threads[0]?.isPlaying?? false ? 
            <FaPause onClick={() => tActions.pauseAll()}  className='cursor-pointer mr-4'  size={30} />
            :<FaPlay onClick={() => tActions.playAll()}  className='cursor-pointer mr-4'  size={30} />
          }
          <TbGridDots size={30}
            onClick={() => dispatch(uiActions.setCurrentControl(currentControl == 'Center Menu' ? null : 'Center Menu'))} />
        </div>
        <div className='flex justify-between w-full mt-4 cursor-pointer'>
          <CgRecord onClick={() => {
            if(!isRecording){
              dispatch(uiActions.startRecording())
              // startRecording()
              startRecorder()
            }
            }} color={isRecording ? 'gray' : 'red'} />
          <CgImport className='text-green-400' onClick={importFromJson} />
          {
            auth.user &&
            <AiOutlineLogout className='text-red-700' onClick={handleLogout} />
          }
        </div>
      </div>
    </div>
  )
}


export default CentralMenu