export interface Frame {
    isFilled : boolean
}
export interface Thread {
    activeFrame : number
    fps : number,
    isPlaying : boolean,
    frames : Frame[],
    degreeOfOrigin : number
}

export interface Actions {
    pushFrame : (frame : Frame) => void,
    popFrame : () => void,
    startPlaying : () => void,
    stopPlaying : () => void,
    setFps  : (value : number) => void,
    setFrameFilled : (frameIndex : number ) => void,
    setFrameEmpty : (frameIndex : number) => void
}

export interface FrameActions {
    pushFrame : (frame : Frame) => void,
    popFrame : () => void,
    setFrameFilled : (frameIndex : number ) => void,
    setFrameEmpty : (frameIndex : number) => void
}