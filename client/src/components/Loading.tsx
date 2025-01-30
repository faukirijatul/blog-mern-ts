import React from 'react'
import { ImSpinner } from "react-icons/im";

const Loading : React.FC = () => {
  return (
    <div className='flex items-center justify-center h-screen w-full bg-gray-100'>
      <ImSpinner className='animate-spin text-5xl text-blue-500' />
    </div>
  )
}

export default Loading