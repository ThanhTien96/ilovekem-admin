import clsx from 'clsx';
import React from 'react'

enum ButtonStyle {
    PRIMARY = 'btnPrimary',
}

export type ButtonStyleType = {
    primary: ButtonStyle.PRIMARY
}

type ButtonHtmlType = "button" | "submit" | "reset"

type ButtonAppProps = {
    type?: ButtonStyleType;
    children?: React.ReactNode | string;
    className?: string;
    onClick?: () => void;
    htmlType?: ButtonHtmlType;
}

const ButtonApp: React.FC<ButtonAppProps> = ({htmlType, type, children, className, onClick}) => {
  return (
    <button type={htmlType ?? 'button'} onClick={onClick} className={clsx('btnApp',type, className)}>{children}</button>
  )
}

export default ButtonApp