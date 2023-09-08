import React, { createRef, useState } from 'react'
import { uiActions, useAppDispatch, useAppSelector } from '@/state/store'
import { BsLayoutSidebarInsetReverse, BsLayoutSidebarInset} from 'react-icons/bs'
import { BiCheckboxSquare } from 'react-icons/bi'
import { BsEraser } from 'react-icons/bs'
import { CgPlayStopO } from 'react-icons/cg'
import { downloadRecording, recordedBlobs, ssBlob, stopRecorder } from '@/utils/recording'
import { router } from '@inertiajs/react'
import { TStateActions } from '@/Pages/Editor/editor.types'

const Effects = ({tState, tActions} : TStateActions) => {
  const dialogRef = createRef<HTMLDialogElement>()
  const { threadLayersView, drawTool, isRecording } = useAppSelector(s => s.uiSlice)
  const dispatch = useAppDispatch()

  const handleStopRecording = () => {
    if(isRecording){
      dispatch(uiActions.stopRecording())
      dialogRef.current?.showModal()
      stopRecorder()
      tActions.pauseAll()
    }
  }
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
      {isRecording && 
        <div className='h-16 w-52 bg-gray-700 rounded z-50 absolute top-20 right-0 shadow-3xl border border-gray-600'>
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
      </div>
      }
      <Dialog ref={dialogRef}/>
    </div>
  )
}



const Dialog = React.forwardRef((props, ref) => {
  const [ title, settitle ] = useState('')
  const [isError, setError] = useState(false)
  const [isUploading, setUploading] = useState(false)
  const handlePostRecording = async(
    // e: FormEvent<HTMLFormElement>
    ) => {
    // e.preventDefault()
    if(isUploading){
      return
    }
    if(title == ''){
      setError(true)
      return
    }
    setUploading(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('fileName', `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`)

    if(ssBlob)
    formData.append('screenshot', ssBlob)

    const arrayBufferViews = await processBlobs(recordedBlobs);
    var file = new Blob(arrayBufferViews, 
      {type: 'video/mp4'}
  );

    formData.append('video', file)

    router.post('/video', formData)
  
  }
  async function processBlobs(blobArray : Blob[] | any) {
    const arrayBufferViews = [];
  
    for (const blob of blobArray) {
      const arrayBuffer = await blob.arrayBuffer(); // Convert Blob to ArrayBuffer
      const arrayBufferView = new Uint8Array(arrayBuffer);
      arrayBufferViews.push(arrayBufferView.buffer);
    }
  
    return arrayBufferViews;
  }
  
  return (
    <dialog
      className=' bg-gray-800 rounded-lg shadow-xl'
      // @ts-ignore
      ref={ref}
    >
      <div className='text-white flex justify-between'>
          <h1 className='font-semibold text-base p-4'>Video Recorded</h1>
          <span className='cursor-pointer p-4' onClick={() => {
          // @ts-ignore
          ref.current.close()
        }}>X</span>
        </div>
        <div className='flex flex-col my-16 ml-8'>
          {/* <form onSubmit={handlePostRecording}> */}
            <h1 className='font-normal text-white text-xl my-3'>Video recorded successfully. Select the action</h1>
            <div className="mb-4 w-1/2">
              <input value={title} onChange={e => {
                settitle(e.target.value)
                if(isError)
                setError(false)
              }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter Video Title(Optional)" required/>
              {isError && <h1 className='text-red-400 m-0.5'>title is required</h1>}
            </div>
            <div className='self-end px-10 mt-16 flex'>
              <button className='btn btn-primary  mx-10' onClick={() => downloadRecording(title)}>Download</button>
              {
                isUploading ? 
                <div className='btn bg-gray-400 cursor-not-allowed '>
                  <div className='custom-loader'/>
                </div>
                :
              <input type='submit' onClick={handlePostRecording}  className='btn btn-success' value="Post Video"/>
              }
            </div>
          {/* </form> */}
        </div>
    </dialog>
  )
})

export default Effects