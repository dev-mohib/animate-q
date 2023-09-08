import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import { editorActions, useAppDispatch, useAppSelector, uiActions } from "../state/store";
import { BsCircle, BsCircleFill  } from 'react-icons/bs'
import { FaPlay, FaPause } from 'react-icons/fa'
import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi'

import { ThreadState, Actions as TActions, Thread, Frame } from '@/Pages/Editor/editor.types'


export const SwipeControl = ({index = 0, tActions, thread, tState} : {index : number, tActions : TActions, thread : Thread, tState : ThreadState}) => {
  const [startingPoint, setStartingPoint] = useState(0)

  const { activeThread } = tState
  const { isThreadShow } = useAppSelector(s => s.uiSlice)
  
  return index == activeThread && isThreadShow  ?(
    <div  className="w-32 bg-black opacity-0  h-56 text-white absolute bottom-12 left-16" 
    onTouchStart={(e) => {
      setStartingPoint(e.touches[0].clientY);
    }}
    onTouchMove={(e) => {
      const _clientY = e.touches[0].clientY;
      if(startingPoint < _clientY){
        // setDegreeOfOrigin((d: number) => d + 1 < 360 ? d + 1 : (d+1) - 360)
        const newValue = thread.degreeOfOrigin + 3
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
  const { activeThread } = tState
  var interval : any 
  useLayoutEffect(() => {
    if(isPlaying){
      interval = setInterval(
        () => {
          const t = (15 * fps)/100
         const sum = degreeOfOrigin + t
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

  return (
  <div>
    <div className="relative">
      <div 
        className="wheel-container " 
        style={isThreadShow && activeThread == index? 
            {clipPath : 'circle(27% at 50% 28%)', backgroundColor : 'rgba(0, 0, 0, 0.35)'} :
            {clipPath : 'circle(13% at 34.4% 28.5%)', backgroundColor : 'rgba(0, 0, 0, 0.555)'}}
        >
        <div className="wheel" onClick={() => {
          dispatch(editorActions.setActiveThread(index))
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
                // degreePerFrame={degreePerFrame} 
                degreeOfOrigin={degreeOfOrigin} 
                frameIndex={i} 
                tActions={tActions}
                threadIndex={index}
                // isPlaying={isPlaying}

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
    </div>
  </div>
  );
}

const CurrentFrame = (
  {
    Icon, frameIndex, 
    activeFrame, degreeOfOrigin,
    tActions, threadIndex
  } : {
    Icon : any,
    frameIndex : number,
    activeFrame : number,
    degreeOfOrigin : number,
    tActions : TActions,
    threadIndex : number
  }
) => { 
  // let currentFrameDegree = ((degreePerFrame * frameIndex) + degreeOfOrigin) - degreePerFrame
  let currentFrameDegree = (15 * frameIndex) + degreeOfOrigin
  const maxDegree = 367.5
  const minDegree = 352.5
  

  useLayoutEffect(() => {
      if(currentFrameDegree > minDegree && currentFrameDegree < maxDegree){
        // dispatch(editorActions.setActiveFrame({thread : threadIndex, frame : frameIndex}))
        tActions.setActiveThread(threadIndex)
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
    <div className="flex flex-col justify-around items-center h-24 w-16 mr-4" >
        <div className="flex flex-col items-center">
          <h4 style={{fontSize : 8}}>Frames</h4>
          <div  className='flex flex-row items-center'>
            <BiMinusCircle onClick={() => {
              if(frames.length > 0){
                tActions.popFrame(index)
              }
            }} className="cursor-pointer" size={18} />
            <span className="text-xs px-1 rounded bg-gray-700">{frames.length}</span>
            <BiPlusCircle onClick={() => {
              if(frames.length < 24){
                tActions.pushFrame(index)
              }
            }} className="cursor-pointer" size={18} />
          </div>
        </div>
          <div>
          {
              isPlaying ?
              <FaPause className='cursor-pointer' onClick={() => tActions.pauseThread(index)}  size={10} />
              :
              <FaPlay className='cursor-pointer' onClick={() => tActions.playThread(index)}  size={10} />
            }
            </div>
            <div className="flex flex-col items-center -mt-2">
              <h4 style={{fontSize : 7}}>FPS</h4>
              <div className='flex flex-row items-center'>
                <BiMinusCircle onClick={() => tActions.setFps('decrease', index)} className="cursor-pointer" size={18} />
                <span className="text-xs px-1 rounded bg-gray-700">{fps}</span>
                <BiPlusCircle onClick={() => tActions.setFps('increase', index)}  className="cursor-pointer" size={18} />
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