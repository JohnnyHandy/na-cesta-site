import React from 'react'
import styled from '@emotion/styled'

const Label = styled('div')`
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 90%;
`

const ChildrenComponentWrapper = styled('div') `
    margin: 1vh auto;
    width: 90%
`

const FilterCollapse = ({ label, children, initialState = false, icons, style }) => {
    const [collapse, setCollapse] = React.useState(initialState)
    const IconComponent = () => collapse ?  <>{ icons[1] }</> : <>{ icons[0] }</>
    const ChildrenComponent = React.useCallback(() => collapse && (
        <ChildrenComponentWrapper
            style={{
                width: '90%'
            }}
        >
            {children}
        </ChildrenComponentWrapper>
    ), [collapse])
    return (
        <div
            style={style}
        >
            <Label
                onClick={() => setCollapse(!collapse)}
            >
                <span>
                    {label}
                </span>
                <IconComponent />
            </Label>
            <ChildrenComponent  />
        </div>
    )
}

export default FilterCollapse