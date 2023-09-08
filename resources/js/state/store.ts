import { configureStore  } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { editorSlice, editorActions } from './slices/editorSlice'
import { uiActions,uiSlice } from './slices/uiSlice'

export const store = configureStore({
  reducer : {
      editorSlice : editorSlice.reducer,
      uiSlice : uiSlice.reducer
    },
    
  })
  // Dispatch Hook
  
  export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
  // useSelector Hook, similar to useSelector with typescript
  export const useAppSelector : TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector 
  
  export default store

  export {
    editorActions,
    uiActions
  }