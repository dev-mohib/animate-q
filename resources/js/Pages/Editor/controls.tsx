import React from 'react'
import Effects from '@/Components/Effects'
import CentralMenu from '@/Components/CentralMenu'
import ThreadEdit from '@/Components/ThreadEdit'
import UndoRedo from '@/Components/UndoRedo'
import WievEdit from '@/Components/WievEdit'
import IroColor from '@/Components/IroColor'
import PaintBrush from '@/Components/PaintBrush'
import { Actions, ThreadState, TStateActions } from './editor.types'
const Controls = ({threadState, actions} : {threadState : ThreadState, actions : Actions}) => {
  return (
    <div className='w-full flex flex-row items-center justify-between '>
        <LeftSide tState={threadState} tActions={actions} />
        <CentralMenu tState={threadState} tActions={actions}/>
        <RightSide tState={threadState} tActions={actions}/>
    </div>
  )
}

const LeftSide = ({tState, tActions} : TStateActions) => {
    return (
        <div className='flex flex-col justify-between absolute top-0 bottom-0 left-0 w-36'>
            <UndoRedo threadState={tState} actions={tActions}/>
            <ThreadEdit threadState={tState} actions={tActions} />
            <WievEdit tActions={tActions}/>
        </div>
    )
}

export const RightSide = ({tState, tActions} : TStateActions) => {
  return (
    <div className='flex flex-col justify-between items-end absolute top-0 bottom-0 right-0 pr-5'>
        <Effects tState={tState} tActions={tActions} />
        <IroColor />
        <PaintBrush />
    </div>
  )
}

export default Controls