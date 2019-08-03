import React from 'react'
import { Button as SemanticButton } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './Button.css'

const Button = ({ type, disabled, onClick, children }) => {
  const handleOnClick = params => {
    onClick(params)
  }

  return (
    <SemanticButton
      style={{ margin: '5px' }}
      primary
      type={type}
      disabled={disabled}
      onClick={handleOnClick}
      className="Button"
    >
      {children}
    </SemanticButton>
  )
}

export default Button
