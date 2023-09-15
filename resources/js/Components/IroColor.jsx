import React, { useEffect, useState } from 'react'
import iro from '@jaames/iro'
import { useAppDispatch, useAppSelector, editorActions } from '../state/store'

const IroColor = () => {
    const { currentControl } = useAppSelector(s => s.uiSlice)
    const [ currentColor, setCurrentColor] = useState('#374151')

    const dispatch = useAppDispatch()
    useEffect(() => {
        var colorPicker = new iro.ColorPicker('#iroColor',{
            width : 100,
            color : '#374152',
            layoutDirection : 'horizontal',
            // wheelLightness : false,
            wheelAngle : 60,
            layout: [
                { 
                  component: iro.ui.Wheel,
                  
                },
                { 
                  component: iro.ui.Slider,
                },
              ]
        })
        colorPicker.on('color:change', function(color) {
            setCurrentColor(color.hexString)
          });
        return () => {
            colorPicker = null
        }
    },[])
    useEffect(() => {
        if(currentControl == 'Wieve Edit')
          dispatch(editorActions.setBgColor(currentColor))
        else 
          dispatch(editorActions.setBrushColor(currentColor))
    },[currentColor])
  return (
    <div className='self-end -mb-56' >
        <div id='iroColor'></div>
    </div>
  )
}

export default IroColor