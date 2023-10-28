export interface Frame{
    isFilled : boolean
}
export interface Thread{
    index : number,
    isActive : boolean,
    activeFrame : number,
    isPlaying : boolean,
    fps : number,
    degreeOfOrigin : number,
    frames : Frame[]
} 

export interface ThreadState {
    threads : Thread[],
    activeThread : number,
    isPlayAll : boolean
}

export interface Actions {
    pushThread : (thread : Thread) => void,
    popThread : (index? : number) => void,
    setFps : (action : 'increase' | 'decrease', index : number) => void,
    playThread : (index : number) => void,
    pauseThread : (index : number) => void,
    setActiveThread : (value : number) => void,
    setActiveFrame : (threadIndex : number, value : number) => void,
    setDegreeOfOrigin : (value : number, index : number) => void,
    reOrderThreads : (threads : Thread[]) => void
    playAll : () => void,
    pauseAll : () => void,
    pushFrame : (threadIndex : number) => void,
    popFrame : (threadIndex : number) => void,
    fillFrame : (tIndex : number, fIndex : number) => void,
    unfillFrame : (threadIndex : number) => void,
    getState : () => ThreadState
}

export interface TStateActions{
    tState : ThreadState,
    tActions : Actions
}