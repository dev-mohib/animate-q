import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Frame {
    index : number,
    isActive : boolean,
    isFilled : boolean,
    json? : any[],
    [x : string | number] : unknown
}
export interface Thread {
    index : number,
    frames :Frame[],
    isPlaying : boolean,
    fps : number,
    isActive : boolean,
    activeFrame : number,
}

interface EditorSlice  {
    bgColor : string,
    brushColor : string,
    brushWidth : number,
    brushShadow : null | {offsetX : number, offsetY : number, color : string, blur : number},
    activeThread : null | number,
    isAllPlaying : boolean,
    canvasJson : any,
    isFrameForwarding : boolean
}

const initialState : EditorSlice = {
    bgColor : '#2a0052', //'#'+Math.floor(Math.random()*16777215).toString(16),
    brushColor : 'red',
    brushWidth : 30,
    brushShadow : null,
    activeThread : 0,
    isAllPlaying : false,
    canvasJson : null,
    isFrameForwarding : true
}
export const editorSlice = createSlice({
   initialState,
    name : "editor_slice", 
    reducers : {
    setBgColor : ( state, action : PayloadAction<string> ) => {
    state.bgColor = action.payload
    },
    setBrushColor : (state, action : PayloadAction<string>)=> {
        state.brushColor = action.payload
    },
    setActiveThread : (state, action : PayloadAction<number>) => {
        state.activeThread = action.payload
    },
    setBrushWidth : (state, action : PayloadAction<number>) => {
        state.brushWidth = action.payload
    },
    setBrushShadow : (state, action : PayloadAction<null | {offsetX : number, offsetY : number, color : string, blur : number}>) => {
        state.brushShadow = action.payload
    },
    popJsonFromFrame : (state, action : PayloadAction<any>) => {},
    setCanvasJson : (state, action : PayloadAction<any>)=> {
        state.canvasJson = action.payload
    },
   }
})

const { actions : editorActions} = editorSlice
export { editorActions }
// export default counterSlice