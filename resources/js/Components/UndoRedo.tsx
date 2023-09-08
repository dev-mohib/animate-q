import React, { useContext, useEffect, useState } from 'react'
import { GrUndo, GrRedo } from 'react-icons/gr'
import { useAppSelector, useAppDispatch, uiActions } from '../state/store'
import { FabricContext } from '@/context/fabricContext'
import { Actions, ThreadState } from '@/Pages/Editor/editor.types'

export var historyState : {
  isLocked : boolean,
  undoHistory : any[],
  redoHistory : any[]
} = {
  isLocked : false,
  undoHistory : [],
  redoHistory : []
}
const UndoRedo = ({threadState, actions} : {threadState : ThreadState, actions : Actions}) => {
  const { isUndoAble, isRedoAble } = useAppSelector(s => s.uiSlice)
  const dispatch = useAppDispatch()
  const canvas = useContext(FabricContext)
  
  const handleUndo = () => {
    if(historyState.undoHistory.length > 0){
      historyState.isLocked = true
      const content = historyState.undoHistory[historyState.undoHistory.length - 2]
      historyState.undoHistory.pop()
      historyState.redoHistory.push(canvas?.toJSON())
      
      canvas?.loadFromJSON(content, () => {
        canvas.renderAll()
        historyState.isLocked = false
        dispatch(historyState.redoHistory.length == 0 ? uiActions.disableRedo() : uiActions.enableRedo()) 
        dispatch(historyState.undoHistory.length == 0 ? uiActions.disableUndo() : uiActions.enableUndo()) 
      })
    }
  }
  const handleRedo = () => {
    if(historyState.redoHistory.length> 0) {
      historyState.isLocked = true
      const content = historyState.redoHistory[historyState.redoHistory.length - 1]
      historyState.undoHistory.push(content)
      historyState.redoHistory.pop()
      
      canvas?.loadFromJSON(content, () => {
        canvas.renderAll()
        historyState.isLocked = false
        dispatch(historyState.undoHistory.length == 0 ? uiActions.disableUndo() : uiActions.enableUndo()) 
        dispatch(historyState.redoHistory.length == 0 ? uiActions.disableRedo() : uiActions.enableRedo()) 
      })
    }
  }

  // useEffect(() => {
  //   historyState.undoHistory.push(canvas?.toJSON())
  // },[])
  return (
    <div className='mt-5 flex'>
      <div className='flex cursor-pointer'>
        <GrUndo size={20} className={`cursor-pointer ${isUndoAble ? 'text-white' : 'text-gray-400'}`} onClick={handleUndo} />
        <GrRedo size={20} className={`cursor-pointer ${isRedoAble ? 'text-white' : 'text-gray-400'}`} onClick={handleRedo} />
      </div>
    </div>
  )
}

export default UndoRedo