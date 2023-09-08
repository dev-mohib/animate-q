import React, { useState } from 'react'
import { FaPlay, FaPause} from 'react-icons/fa' 
import { TbGridDots, TbFileExport } from 'react-icons/tb'
import { CgRecord, CgImport } from 'react-icons/cg'
import { AiOutlineLogout} from 'react-icons/ai'
import { editorActions, uiActions, useAppDispatch, useAppSelector } from '@/state/store'
// import { saveRecording, startRecording} from '@/utils/recording'
import { TStateActions } from '@/Pages/Editor/editor.types'
const CentralMenu = ({tState, tActions} : TStateActions) => {
  const [isPlaying, setPlaying] = useState(false)
  const { currentControl, isRecording } = useAppSelector(s => s.uiSlice)
  const dispatch = useAppDispatch()
  
  const handleLogout = () => {
    const confirm = window.confirm("Please confirm to logout")
    if(confirm){
      localStorage.removeItem('aq_email')
      localStorage.removeItem('aq_password')
      window.location.reload()
    }
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
            }
            }} color={isRecording ? 'gray' : 'red'} />
          <CgImport className='text-green-400' onClick={importFromJson} />
          <AiOutlineLogout className='text-red-700' onClick={handleLogout} />
        </div>
      </div>
    </div>
  )
}

export default CentralMenu