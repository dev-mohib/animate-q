import React, { FC, SVGProps } from 'react'

export const FileExportIcon : FC<SVGProps<SVGSVGElement>>  = (props) => {
  return (
    <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" 
     height="23" width="23" xmlns="http://www.w3.org/2000/svg">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
      <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"></path>
    </svg>
  )
}
