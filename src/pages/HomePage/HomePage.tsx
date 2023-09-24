import React from 'react'
import CountSection from './partials/CountSection'

const HomePage: React.FC = () => {
    
  return (
    <div>
        <div className='grid grid-cols-12'>
            <div className='col-span-2 p-4'>
                <CountSection title='Tổng số lượng sản phẩm' />
            </div>

            <div className='col-span-2 p-4'>
                <CountSection />
            </div>

            <div className='col-span-2 p-4'>
                <CountSection />
            </div>
        </div>
    </div>
  )
}

export default HomePage