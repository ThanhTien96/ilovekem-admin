import clsx from 'clsx';
import React from 'react'

type WrapperLayoutProps = {
    children: React.ReactNode;
    className?: string;
}   

const WrapperLayout: React.FC<WrapperLayoutProps> = ({children, className}) => {
  return (
    <section className={clsx(`relative container py-8 max-[767px]:max-w-full`, className)}>
    {children}
  </section>
  )
}

export default WrapperLayout