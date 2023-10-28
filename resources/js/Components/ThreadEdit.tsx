import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { editorActions, useAppDispatch, useAppSelector } from "../state/store";
// import { Thread as ThreadType} from "../state/slices/editorSlice";
import { ThreadWheel } from "./ThreadWheel";
import { SwipeControl } from './ThreadWheel'
import { ThreadState, Actions as ThreadActions, Thread as ThreadList, Frame } from "@/Pages/Editor/editor.types";

const reOrder = (list : ThreadList[], startIndex : number, endIndex : number) => {
  const result  = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function ThreadsEdit({threadState, actions, isExpanded} : {threadState : ThreadState, actions : ThreadActions, isExpanded : boolean}) {

  function onDragEnd(result : any) {
    console.log("drag end called")
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const _threads = reOrder(
      threadState.threads,
      result.source.index,
      result.destination.index
    );
    console.log({_threads})
    // dispatch(editorActions.reOrderThreads(_threads))
    actions.reOrderThreads(_threads)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="threads">
        {provided => (
          <div className={`flex flex-col justify-evenly  ml-7 mt-16 ${!isExpanded && 'hidden'}`} style={{ height : '70%'}} ref={provided.innerRef} {...provided.droppableProps}>
            {
              threadState.threads.map((thread, index) => <ThreadItem 
                key={index}  index={index} 
                provided={provided} thread={thread} 
                tActions={actions}
                tState={threadState}
              />)
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
const ThreadItem = ({index, provided, thread, tActions, tState} : {index : number, provided : any, thread : ThreadList, tActions : ThreadActions, tState : ThreadState}) => {
  return(
    <>
      <Draggable key={index}  draggableId={`${index}`} index={index} >
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <ThreadWheel key={index} index={index}  
              thread={thread}
              tActions={tActions}
              tState={tState}
            />
          </div>
        )}
      </Draggable>
      <SwipeControl index={index} thread={thread} tActions={tActions} tState={tState} />
    </>
  )
}
export default ThreadsEdit