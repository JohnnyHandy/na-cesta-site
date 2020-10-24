import React from 'react'
import styled from '@emotion/styled'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

const CheckboxContainer = styled('div')`
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const Checkbox = ({ label }) => {
    const [checked, setChecked] = React.useState(false)
    const handleCheckboxClick = () => {
        setChecked(!checked)
    }
    const CheckboxComponent = React.useCallback((props) => (
            checked
            ? <MdCheckBox {...props} />
            : <MdCheckBoxOutlineBlank {...props} /> 
    ), [checked])
    return (
        <CheckboxContainer
        >
        <label htmlFor={label}>
            {label}
        </label>
        <CheckboxComponent
            onClick={handleCheckboxClick}
            size='2vw'
            style={{ cursor: 'pointer' }}
        />
        </CheckboxContainer>
    )
}

export default Checkbox