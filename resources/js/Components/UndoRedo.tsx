import React, { useContext } from 'react'
import { GrUndo, GrRedo } from 'react-icons/gr'
import { useAppSelector, useAppDispatch, uiActions } from '../state/store'
import { FabricContext } from '../context/fabricContext'
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
      historyState.redoHistory.push(canvas?.toJSON(["data"]))      
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

  return (
    <div className='flex items-center justify-center h-14  bg-black rounded-br-xl opacity-70'>
        <GrUndo size={45} className={`cursor-pointer   ${isUndoAble ? 'text-white active:text-red-500' : 'text-gray-400'}`} onClick={handleUndo} />
        <GrRedo size={45} className={`cursor-pointer   ${isRedoAble ? 'text-white active:text-red-500' : 'text-gray-400'}`} onClick={handleRedo} />
    </div>
  )
}

export default UndoRedo