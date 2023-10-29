import React, { useState, useContext, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector, uiActions } from "../state/store";
import { BsCircle, BsCircleFill  } from 'react-icons/bs'
import { FaPlay, FaPause } from 'react-icons/fa'
import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi'
import { CgTrash } from 'react-icons/cg'
import { MdNavigateNext, MdNavigateBefore} from 'react-icons/md'
import { FabricContext} from '../context/fabricContext'
import { ThreadState, Actions as TActions, Thread } from '@/Pages/Editor/editor.types'


export const SwipeControl = ({index = 0, tActions, thread, tState} : {index : number, tActions : TActions, thread : Thread, tState : ThreadState}) => {
  const [startingPoint, setStartingPoint] = useState(0)  
  const { activeThread } = tState
  const { isThreadShow } = useAppSelector(s => s.uiSlice)
  
  return index == activeThread && isThreadShow ? (
    <div  className="w-32 bg-black opacity-0  h-56 text-white absolute bottom-12 left-16" 
    onTouchStart={(e) => {
      setStartingPoint(e.touches[0].clientY);
    }}
    onTouchMove={(e) => {
      const _clientY = e.touches[0].clientY;
      if(startingPoint < _clientY){
        const newValue = thread.degreeOfOrigin??0 + 3
        tActions.setDegreeOfOrigin(newValue < 360 ? newValue : newValue - 360, index)
      }
      else{
        const newVal = thread.degreeOfOrigin - 3
        tActions.setDegreeOfOrigin(newVal > 0 ? newVal : newVal + 360, index)
      }
      setStartingPoint(_clientY);
    }}
    >
    </div>
  ) : <></>
}

export const  ThreadWheel = ({index = 0, tState, tActions, thread} : {index : number, tState : ThreadState, tActions : TActions, thread : Thread}) => {
  const dispatch = useAppDispatch()
  const { isThreadShow } = useAppSelector(s => s.uiSlice) 
  const { frames, fps, isPlaying, degreeOfOrigin, activeFrame } = thread
  const canvas = useContext(FabricContext)

  const { activeThread } = tState
  var interval : any 
  let degreePerFrame = 360/frames.length

  useLayoutEffect(() => {
    
    if(isPlaying){
      interval = setInterval(
        () => {
          const delta = (degreePerFrame * fps)/100
          const sum = degreeOfOrigin + delta
          tActions.setDegreeOfOrigin(sum < 360 ? sum : sum - 360, index)
      },
      (10));
    }
    else {
        if(interval)
        clearInterval(interval);
    }
  return () => {
    if(interval)
      clearInterval(interval)
  }
 },[isPlaying, fps, degreeOfOrigin])

 const handleDelete = () => {
  if(tState.threads.length > 1){
    tActions.popThread(index)
    tActions.setActiveThread(0)
    canvas?.forEachObject((object) => {
      if(object.data?.activeThread == index)
        canvas.remove(object)
     })
     canvas?.renderAll()

     console.log(canvas?._objects)
  }
}

const handleFrameNext = () => {
    // tActions.setDegreeOfOrigin(degreeOfOrigin + degreePerFrame, index)
    tActions.setActiveFrame(index, activeFrame == tState.threads[index].frames.length -1 ? 0 : activeFrame + 1)
}
const handleFrameBack = () => {
  // tActions.setDegreeOfOrigin(degreeOfOrigin - degreePerFrame, index)
  tActions.setActiveFrame(index, activeFrame ==  0 ?tState.threads[index].frames.length - 1 : activeFrame - 1)
}

  return (
  <div>
    <div className="relative">
      <div 
        // style={isThreadShow && activeThread == index ? 
        //   {clipPath : 'circle(100% at 50% 28%)', backgroundColor : 'rgba(0, 0, 0, 0.35)', zIndex : 999} :
        //   {clipPath : 'circle(19% at 34% 43%)', backgroundColor : 'rgba(0, 0, 0, 0.555)', zIndex : 1}}  
        style={{
          clipPath : isThreadShow && activeThread == index ? 'circle(100% at 50% 28%)' : 'circle(19% at 34% 43%)',
          backgroundColor : isThreadShow && activeThread == index ? 'rgba(0, 0, 0, 0.35)' : activeThread == index ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.5)',
          zIndex : isThreadShow && activeThread == index ? 999 : 1
        }}
        className="wheel-container flex flex-col justify-start bg-green-300" 

      >
        <div className="flex flex-row justify-between -mt-4">
        <div className="wheel" onClick={() => {
          tActions.setActiveThread(index)
          if(activeThread == index){
            dispatch(isThreadShow ? uiActions.hideThreadWheel()  : uiActions.showThreadWheel())
          }else {
            dispatch(uiActions.showThreadWheel())
          }
          }}
        >
          {frames.map((frame, i) => <CurrentFrame
                key={i} 
                activeFrame={activeFrame}  
                Icon={frame.isFilled ? BsCircleFill : BsCircle}
                degreePerFrame={degreePerFrame} 
                degreeOfOrigin={degreeOfOrigin} 
                frameIndex={i} 
                tActions={tActions}
                threadIndex={index}
              />
            )
          }
        </div>
        <WheelOptions 
          index={index}
          tState={tState}
          tActions={tActions}
          thread={thread}
        />  
        </div>
        <div className="ml-5 flex justify-start items-center px-3 mt-1">
        <div onClick={handleDelete}>
          <CgTrash className="button-active" size={18} />
        </div>
        <div className="flex items-center  ml-3">
          <MdNavigateBefore onClick={handleFrameBack}  className="button-active"  size={22} />
          <span className="text-xs w-5  rounded bg-gray-700 flex items-center justify-center">{activeFrame}</span>
          {/* <BsCircle size={5} /> */}
          <MdNavigateNext onClick={handleFrameNext} className="button-active"  size={22 } />
        </div>
        </div>
      </div>
    </div>
  </div>
  );
}

const CurrentFrame = (
  {
    Icon, frameIndex, 
    activeFrame, degreeOfOrigin,
    tActions, threadIndex,
    degreePerFrame
  } : {
    Icon : any,
    frameIndex : number,
    activeFrame : number,
    degreeOfOrigin : number,
    tActions : TActions,
    threadIndex : number,
    degreePerFrame : number
  }
) => { 
  let currentFrameDegree = ((degreePerFrame * (frameIndex + 1)) + degreeOfOrigin) - degreePerFrame
  // let currentFrameDegree = (15 * frameIndex) + degreeOfOrigin
  const maxDegree = 360 + (degreePerFrame/2) //367.5
  const minDegree = 360 - (degreePerFrame/2) //352.5
  

  useLayoutEffect(() => {
      if(currentFrameDegree > minDegree && currentFrameDegree < maxDegree){
        tActions.setActiveFrame(threadIndex, frameIndex)
      }
  },[degreeOfOrigin])

  return (
    <Icon
      style={{
        height: 50,
        position: "absolute",
        transform: `rotate(${currentFrameDegree + 90}deg)`,
        transformOrigin: "0 100%"
      }}
      size={5} 
      color={frameIndex == activeFrame ? 'green' : 'white'}
    />
  )
}

const WheelOptions = ({ index, tState, tActions, thread} : {index : number, tState : ThreadState, tActions : TActions, thread : Thread}) => {
  const { frames, fps, isPlaying } = thread
  
 
  return (
    <div className="flex flex-col justify-around items-center h-24 w-16" >
        <div className="flex flex-col items-center">
          <h4 style={{fontSize : 8}}>Frames</h4>
          <div  className='flex flex-row items-center'>
            <BiMinusCircle onClick={() => {
              if(frames.length > 0){
                tActions.popFrame(index)
              }
            }} className="cursor-pointer button-active" size={18} />
            <span className="text-xs px-1 rounded bg-gray-700">{frames.length}</span>
            <BiPlusCircle onClick={() => {
              if(frames.length < 24){
                tActions.pushFrame(index)
              }
            }} className="cursor-pointer button-active" size={18} />
          </div>
        </div>
          <div>
          {
              isPlaying ?
              <FaPause className='cursor-pointer button-active' onClick={() => tActions.pauseThread(index)}  size={10} />
              :
              <FaPlay className='cursor-pointer button-active' onClick={() => tActions.playThread(index)}  size={10} />
            }
            </div>
            <div className="flex flex-col items-center">
              <h4 style={{fontSize : 7}}>FPS</h4>
              <div className='flex flex-row items-center'>
                <BiMinusCircle onClick={() => tActions.setFps('decrease', index)} className="cursor-pointer button-active" size={18} />
                <span className="text-xs px-1 rounded bg-gray-700">{fps}</span>
                <BiPlusCircle onClick={() => tActions.setFps('increase', index)}  className="cursor-pointer button-active" size={18} />
              </div>
            </div>
           
        </div>
  )
}



const ThreadEdit = () => {
  
  return (
    <div className='flex flex-col justify-evenly  ml-7 mt-16' style={{ height : '70%'}}>
        {
         // threads.map((thread, index) => <ThreadWheel key={index} index={index} thread={thread} />)
        }
    </div>
  )
}


export default ThreadEdit