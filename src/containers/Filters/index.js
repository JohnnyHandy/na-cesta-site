import React from 'react'
import styled from '@emotion/styled'
import { BiDownArrow, BiUpArrow } from 'react-icons/bi'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

import Checkbox from '../../components/inputs/checkbox/'
import FilterCollapse from '../../components/filters/filterCollapse'
import { DesktopBreakpoint, PhoneBreakpoint } from '../../components/responsive/devices'

const FiltersWrapper = styled('div')`
    display: -webkit-flex;
    flex-direction: column;
    width: 100%;
`

const FiltersArea = styled('div')`
    background-color: #DE6E52;
    display: flex;
    flex-direction: column;
    padding: 1vh 1vw;
    font-family: Quicksand;
`

const SizesFilter = styled('div')`
    align-self: center;
    text-align: center;
    width: 15vw;
`
const SizesCheckboxContainer = styled('div')`
    display: grid;
    grid-template-columns: 45% 45%;
    justify-content: space-between;
`

const PricesFilter = styled('div')`
    align-self: center;
    width: 80%;
    text-align: center;
`
const PricesCheckboxContainer = styled('div')`
    display: grid;
    grid-template-columns: auto;
`

export const Filters = () => {
    return(
        <FiltersWrapper>
            <DesktopBreakpoint>
                <span style={{ alignSelf: 'center', padding: '1vh 1vw' }} >Filtrar</span>
            </DesktopBreakpoint>
            <PhoneBreakpoint>
                <FilterCollapse
                    icons={[<BiUpArrow />, <BiDownArrow/>]}
                    label='Filtrar'
                    initialState={true}
                    style={{
                        alignItems: 'center',
                        alignSelf: 'center',
                        border: '1px solid',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '1vh 1vw',
                        justifyContent: 'space-between',
                        margin: '1vh 1vw',
                        width: '80%'
                    }}
                >
                <FilterCollapse
                label='Tamanhos'
                icons={[<AiOutlinePlus/>, <AiOutlineMinus />]}
                style={{
                    margin: '1vh auto',
                    width: '90%'
                }}
                >
                    <SizesCheckboxContainer>
                        <Checkbox
                            label='U'
                        />
                        <Checkbox
                            label='P'
                        />
                        <Checkbox
                            label='M'
                        />
                        <Checkbox
                            label='G'
                        />
                    </SizesCheckboxContainer>
                </FilterCollapse>
                <FilterCollapse
                    style={{
                        margin: '1vh auto',
                        width: '90%'
                    }}                
                    label='Preços'
                    icons={[<AiOutlinePlus/>, <AiOutlineMinus />]}
                >
                    <PricesCheckboxContainer>
                        <Checkbox
                            label='R$ 0 - 50'
                        />
                        <Checkbox
                            label='R$ 50 - 75'
                        />
                        <Checkbox
                            label='R$ 75 - 100'
                        />
                    </PricesCheckboxContainer>
                </FilterCollapse>
                </FilterCollapse>
            </PhoneBreakpoint>
            <DesktopBreakpoint>
            <FiltersArea>
                <SizesFilter>
                    <span>Tamanhos</span>
                    <SizesCheckboxContainer>
                        <Checkbox
                            label='U'
                        />
                        <Checkbox
                            label='P'
                        />
                        <Checkbox
                            label='M'
                        />
                        <Checkbox
                            label='G'
                        />
                    </SizesCheckboxContainer>
                </SizesFilter>
                <PricesFilter>
                    <span>Preços</span>
                    <PricesCheckboxContainer>
                        <Checkbox
                            label='R$ 0 - 50'
                        />
                        <Checkbox
                            label='R$ 50 - 75'
                        />
                        <Checkbox
                            label='R$ 75 - 100'
                        />
                    </PricesCheckboxContainer>
                </PricesFilter>
            </FiltersArea>
            </DesktopBreakpoint>
        </FiltersWrapper>
    )
}

export default Filters