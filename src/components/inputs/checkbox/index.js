import React from 'react'
import styled from '@emotion/styled'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { PhoneBreakpoint, DesktopBreakpoint } from '../../responsive/devices'

const CheckboxContainer = styled('div')`
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const CheckboxLabelPortrait = styled('span')`
    font-size: 5vw
`

const CheckboxLabelLandscape = styled('span')`
    font-size: 2vw
`

const Checkbox = ({ label, checkedValue = false, handleFilterChange, type, value }) => {
    // const [checked, setChecked] = React.useState(checkedValue)
    const handleCheckboxClick = () => {
        handleFilterChange(type, value)
    }
    const CheckboxComponent = React.useCallback((props) => (
            checkedValue
            ? <MdCheckBox {...props} />
            : <MdCheckBoxOutlineBlank {...props} /> 
    ), [checkedValue])
    return (
        <CheckboxContainer>
            <PhoneBreakpoint>
                <CheckboxLabelPortrait>
                    {label}
                </CheckboxLabelPortrait>
                <CheckboxComponent
                onClick={handleCheckboxClick}
                size='6vw'
                style={{ cursor: 'pointer' }}
            />
            </PhoneBreakpoint>
            <DesktopBreakpoint>
            <CheckboxLabelLandscape>
                    {label}
                </CheckboxLabelLandscape>
                <CheckboxComponent
                onClick={handleCheckboxClick}
                size='4vw'
                style={{ cursor: 'pointer' }}
            />
            </DesktopBreakpoint>
        </CheckboxContainer>
    )
}

export default Checkbox