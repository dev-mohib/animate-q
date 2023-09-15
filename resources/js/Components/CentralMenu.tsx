import { FaPlay, FaPause} from 'react-icons/fa' 
import { CgRecord } from 'react-icons/cg'
import { AiOutlineLogout} from 'react-icons/ai'
import { uiActions, useAppDispatch, useAppSelector } from '../state/store'
import { startRecorder  } from '@/utils/recording'
import { TStateActions } from '@/Pages/Editor/editor.types'
import { Link, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
const CentralMenu = ({tState, tActions} : TStateActions) => {
  const { isRecording } = useAppSelector(s => s.uiSlice)
  const dispatch = useAppDispatch()
  const { auth } = usePage<PageProps>().props

  return (
    <div className='absolute top-0 left-52 right-52 flex justify-center'>
      <div 
        className='flex flex-col items-center justify-center bg-black opacity-40 rounded-xl px-3 paint-brush h-14'
        > 
        <div className='flex flex-row items-center justify-between'>
          {
          tState.threads[0]?.isPlaying?? false ? 
            <FaPause onClick={() => tActions.pauseAll()}  className='cursor-pointer mx-2 button-active'  size={30} />
            :<FaPlay onClick={() => tActions.playAll()}  className='cursor-pointer mx-2 button-active'  size={30} />
          }
          <CgRecord onClick={() => {
            if(!isRecording){
              dispatch(uiActions.startRecording())
              startRecorder()
            }}} 
            className="mx-2 cursor-pointer"
            color={isRecording ? 'gray' : 'red'} size={25} />
            {
              auth.user && 
            <Link href={route('logout')} method="post">  
              <AiOutlineLogout className='text-red-700 mx-2 cursor-pointer'  size={25} />
            </Link>
            }
        </div>
      </div>
    </div>
  )
}

export default CentralMenu