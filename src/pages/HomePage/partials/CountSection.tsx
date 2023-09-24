import React, { useEffect } from 'react'
import { useAppDispatch } from 'reduxStore';


type CountSectionProps = {
    title?: string;
}

const CountSection: React.FC<CountSectionProps> = ({title}) => {


  return (
    <div className='w-full h-[200px] bg-white p-8 rounded-md'>
        <h2>{title}</h2>

    </div>
  )
}

export default CountSection