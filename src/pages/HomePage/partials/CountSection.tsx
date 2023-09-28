import React from 'react'


type CountSectionProps = {
    title?: string;
    content?: number;
}

const CountSection: React.FC<CountSectionProps> = ({title, content}) => {


  return (
    <div className='w-full h-[200px] bg-white p-8 rounded-md'>
        <h2>{title}</h2>
        <p>{content}</p>
    </div>
  )
}

export default CountSection