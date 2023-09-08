import React from 'react'
import { uiActions, useAppDispatch, useAppSelector } from '@/state/store'
import { BsLayoutSidebarInsetReverse, BsLayoutSidebarInset} from 'react-icons/bs'
import { BiCheckboxSquare } from 'react-icons/bi'
import { BsEraser } from 'react-icons/bs'
import { CgPlayStopO } from 'react-icons/cg'
// import { saveRecording } from '@/utils/recording'
const Effects = () => {
  const { threadLayersView, drawTool, isRecording } = useAppSelector(s => s.uiSlice)
  const dispatch = useAppDispatch()
  return (
    <div className='mt-2 flex items-center'>
      <BsEraser size={25}  
        className={`-mt-2 mx-2 cursor-pointer ${drawTool == 'eraser' && 'text-green-400'}`} 
        onClick={() => {
          dispatch(uiActions.setDrawTool(drawTool == 'eraser'? 'brush' : 'eraser'))
        }}
      />
      <div className='h-10 w-10 cursor-pointer'  onClick={() => {
          dispatch(uiActions.setThreadLayersView(threadLayersView == 'Next' ? 'Previous' :threadLayersView =='Previous' ? 'Current' : 'Next'))
        }}>
      {
        threadLayersView == 'Current' ? <BiCheckboxSquare size={33} width={40} />
        :threadLayersView == 'Previous' ? <BsLayoutSidebarInset size={25} className='mt-1' width={40}/>
        :<BsLayoutSidebarInsetReverse size={25} className='mt-1' width={40}/>
      }
      </div>
      {isRecording && <RecordingButton />}
    </div>
  )
}


const RecordingButton = () => {
  const { isRecording } = useAppSelector(s => s.uiSlice)
  const dispatch = useAppDispatch()
  const handleStopRecording = () => {
    if(isRecording){
      dispatch(uiActions.stopRecording())
      // saveRecording()
    }
  }
  return( <div className='h-16 w-52 bg-gray-700 rounded z-50 absolute top-20 right-0 shadow-3xl border border-gray-600'>
  <div className='flex flex-row justify-between items-center'>
  <div className='flex flex-row justify-start items-center h-16 px-5'>
    <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-700 opacity-75"></span>
    <span className='ml-3 text-white'>Recording...</span>
  </div>
  <div className='h-14 bg-red-700 my-1' style={{width : '2px'}} />
    <div className='h-16 w-12 flex justify-center items-center  cursor-pointer rounded-tr roundedbr'>
      <CgPlayStopO size={24} className='play-icon' onClick={handleStopRecording} />
    </div>
</div>
</div>)
}
export default Effects