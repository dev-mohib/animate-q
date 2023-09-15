import React, { createContext, Dispatch, SetStateAction, useState } from "react"
import { fabric } from 'fabric'

const ctx = new fabric.Canvas('myCanvas2', { isDrawingMode : true })
export const FabricContext = createContext<null | fabric.Canvas>(null)
export const FabricDispatchContext = createContext<null | Dispatch<SetStateAction<fabric.Canvas>>>(null)




const FabricProvider = ({children} : any) => {
  const [canvas, setFabric] = useState(ctx)
  return(
      <FabricContext.Provider value={canvas}>
        <FabricDispatchContext.Provider value={setFabric}>
          {children}
        </FabricDispatchContext.Provider>
      </FabricContext.Provider>
      )
}

export default FabricProvider