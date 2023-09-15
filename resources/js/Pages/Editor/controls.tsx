import Effects from '@/Components/Effects'
import CentralMenu from '@/Components/CentralMenu'
import ThreadEdit from '@/Components/ThreadEdit'
import UndoRedo from '@/Components/UndoRedo'
import WievEdit from '@/Components/WievEdit'
import IroColor from '@/Components/IroColor'
import PaintBrush from '@/Components/PaintBrush'
import { Actions, ThreadState, TStateActions } from './editor.types'
import { useState } from 'react'
import { AiOutlineArrowRight, AiOutlineArrowLeft} from 'react-icons/ai'
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
  const [isExpanded, setExpanded] = useState(true)

    return (
        <div className={`flex flex-col justify-between absolute top-0 bottom-0 left-0 ${isExpanded ? 'w-36' : 'w-7'} transition-all`}>
            {
              isExpanded ? 
            <div className='flex flex-row justify-between items-center'>
              <UndoRedo threadState={tState} actions={tActions}/>
              <AiOutlineArrowLeft size={30}  className='button-active' onClick={() => setExpanded(false)} />
            </div>
            :
            <AiOutlineArrowRight size={30}  className='button-active' onClick={() => setExpanded(true)}  />
            }
            <ThreadEdit threadState={tState} actions={tActions} isExpanded={isExpanded} />
            {isExpanded 
             && <WievEdit tState={tState} tActions={tActions} />
            }
        </div>
    )
}

export const RightSide = ({tState, tActions} : TStateActions) => {
  const [isExapaded, setExpanded] = useState(true)
  return (
    <div className={`flex flex-col justify-between items-end absolute top-0 bottom-0 right-0 pr-1 ${isExapaded ? 'w-36' : 'w-7'} transition-all`}>
        <div className='self-start'>
        {isExapaded ? <div className='flex flex-row justify-between w-36 pr-3 items-center'>
          <AiOutlineArrowRight className='button-active'  size={30} onClick={() => setExpanded(false)} />
          <Effects tActions={tActions} tState={tState} />
          
        </div> 
        : 
        <AiOutlineArrowLeft className='button-active'  onClick={() => setExpanded(true)}  size={30} />
        }    
      </div>
       {isExapaded &&  <>
            <IroColor />
            <PaintBrush />
          </>
        }
    </div>
  )
}

export default Controls