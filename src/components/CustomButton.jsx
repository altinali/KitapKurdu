import React from 'react'

const CustomButton = ({title,onClick,type}) => {
  return (
    <div>
      <button onClick={onClick} className={`btn ${type}`} >{title}</button>
    </div>
  )
}

export default CustomButton
