import React from 'react'

const CustomRadio = ({ label }) => {
  const [checked, setChecked] = React.useState(false)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
    <div
      onClick={() => setChecked(!checked)}
      onKeyDown={() => setChecked(!checked)}
      role='checkbox'
      aria-checked={checked}
      tabIndex={0}
      style={{
        alignItems: 'center',
        border: '1px solid',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        height: '20px',
        justifyContent: 'center',
        width: '20px',
      }}
    >
      {
        checked && (
          <div
            style={{ borderRadius: '50%', background: 'black', width: '10px', height: '10px' }}
          />
        )
      }
    </div>
      <span> {label} </span>
    </div>
  )
}

export default CustomRadio