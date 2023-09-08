import React, { useEffect, useState } from 'react'
import Canvas from './fabricCanvas'
import Controls from './controls'
import "./style.css"
import { uiActions, useAppDispatch } from '@/state/store'
import { Actions, ThreadState } from './editor.types'
import { Head } from '@inertiajs/react'
const Index = () => {
  const [threadState, setThreadState] = useState<ThreadState>({activeThread : 0,isPlayAll : false,threads : []})
  const dispatch = useAppDispatch()

  const actions : Actions = {
    pushThread : (thread) => {
      setThreadState(prev => ({
        ...prev,
        threads : [...threadState.threads, thread]
      }))
    },
    popThread : () => {
      if(threadState.threads.length > 1)
      setThreadState(prev => ({...prev, threads : prev.threads.filter((t, i) => i != prev.threads.length - 1)}))
    },
    pauseThread : (index) => {
      setThreadState(prev => ({
        ...prev,
        threads : prev.threads.map((t, i) => i == index ? ({...t, isPlaying : false}) : ({...t}))
      }))
    },
    playThread : (index) => {
      setThreadState(prev => ({
        ...prev,
        threads : prev.threads.map((t, i) => i == index ? ({...t, isPlaying : true}) : ({...t}))
      }))
    },
    setActiveThread : (value) => {
      setThreadState(prev => ({...prev, activeThread : value}))
    },
    setDegreeOfOrigin : (value, index) => {
      setThreadState(prev => ({
        ...prev,
        threads : prev.threads.map((t, i) => i == index ? ({...t,degreeOfOrigin : value}) : t)
      }))
    },
    setActiveFrame : (index, value) => {
      setThreadState(prev => ({
        ...prev,
        threads : prev.threads.map((t, i) => i == index ? ({...t,activeFrame : value}) : t)
      }))
    },
    setFps : (action, index) => {
      if(action == 'increase'){
        setThreadState(prev => ({
          ...prev,
          threads : prev.threads.map((t, i) => i == index ? ({...t, fps : t.fps < 30 ? t.fps + 5 : t.fps}) : ({...t}))
        }))
      }else {
        setThreadState(prev => ({
          ...prev,
          threads : prev.threads.map((t, i) => i == index ? ({...t, fps : t.fps > 5 ? t.fps - 5 : t.fps}) : ({...t}))
        }))
      }
    },
    playAll : () => {
      setThreadState(prev => ({
        ...prev,
        threads : prev.threads.map(t => ({...t, isPlaying : true}))
      }))
    },
    pauseAll : () => {
      setThreadState(prev => ({
        ...prev,
        threads : prev.threads.map(t => ({...t, isPlaying : false}))
      }))
    },
    pushFrame : (index) => {
      setThreadState(prev => ({
        ...prev,
        threads :prev.threads.map((t,i) => i==index ? ({...t, frames : [...t.frames, {isFilled : false}]}) : t)
      }))
    },
    popFrame : (index) => {
      setThreadState(prev => ({
        ...prev,
        threads :prev.threads.map((t,i) => i==index ?({...t, frames : t.frames.filter((_t,_i)=> _i != t.frames.length - 1)}) : t)
      }))
    },
    fillFrame : (tIndex, fIndex) => {
      setThreadState(prev => ({
        ...prev,
        threads :prev.threads.map((t,i) => i == tIndex ? ({
            ...t, 
            frames : t.frames.map((_t,_i)=> _i == fIndex  ? ({..._t, isFilled : true })
          : _t )
        }) : t)
      }))
    },
    unfillFrame : (index) => {},
    getState : () => threadState
  }
  useEffect(() => {
    window.addEventListener("orientationchange", (event) => {
      dispatch(uiActions.setWindowResized())
    });

    actions.pushThread(
      {
        fps : 15, index : 0, isActive : false,isPlaying : false, degreeOfOrigin : 0, 
        frames : [{isFilled : false}], 
        // frames : [{isFilled : false}],
        activeFrame : 0})
    // window.addEventListener('beforeunload', (event) => {
    //   event.preventDefault();
    //   event.returnValue = '';
    // });
  },[])

  return (
    <div className='bg-black'>
      <Head title='Editor'/>
        <Canvas tState={threadState} tActions={actions} />
        {/* <TestCanvas /> */}
        <Controls threadState={threadState} actions={actions} />
    </div>
  )
}

export default Index