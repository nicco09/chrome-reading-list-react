import React from 'react'
import './Button.css'

const Button = ({ type, disabled, onClick, children }) => {
  const handleOnClick = params => {
    onClick(params)
  }

  return (
    <button
      style={{ margin: '5px', width: '500px' }}
      type={type}
      disabled={disabled}
      onClick={handleOnClick}
      className="primary"
    >
      {children}
    </button>
  )
}

export default Button
