import React from 'react'
import styled from '@emotion/styled'
import { BiDownArrow, BiUpArrow } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

import Checkbox from '../../components/inputs/checkbox/'
import FilterCollapse from '../../components/filters/filterCollapse'
import { DesktopBreakpoint, PhoneBreakpoint } from '../../components/responsive/devices'
import { clearProductsList, filterProductsRequest, setFilters } from '../../store/products'

const FiltersWrapper = styled('div')`
    display: -webkit-flex;
    flex-direction: column;
    width: 100%;
`

const FiltersArea = styled('div')`
    background-color: #DE6E52;
    display: flex;
    flex-direction: column;
    font-family: Quicksand;
`

const FilterBox = styled('div')`
    align-self: center;
    margin: 1em 0;
    text-align: center;
`
const SizesCheckboxContainer = styled('div')`
    display: grid;
    justify-content: space-between;
`

const PricesCheckboxContainer = styled('div')`
    display: grid;
    grid-template-columns: auto;
`

export const Filters = () => {
  const filters = useSelector(state => state.products.filters)
    const sizeFilters = filters['size']
    const priceFilters = filters['price']
    const dispatch = useDispatch()

    const handleFilterChange = (type, value) => {
        if(type === 'size') {
            let newSizeFilter
            sizeFilters.includes(value)
            ? newSizeFilter = sizeFilters.filter(item => item !== value)
            : newSizeFilter = sizeFilters.concat(value)
            dispatch(setFilters({value: newSizeFilter, filter: 'size'}))
            // setSizeFilters(newSizeFilter)
        } else if(type === 'price') {
            let newPriceFilter
            priceFilters.includes(value)
            ? newPriceFilter = priceFilters.filter(item => item !== value)
            : newPriceFilter = priceFilters.concat(value)
            dispatch(setFilters({value: newPriceFilter, filter: 'price'}))
            // setPriceFilters(newPriceFilter)
        }
    }
    return(
        <FiltersWrapper>
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
                            label= 'U'
                            value= 'U'
                            type='size'
                            checkedValue={sizeFilters.includes('U')}
                            handleFilterChange={handleFilterChange}
                        />
                        <Checkbox
                            label='P'
                            value = 'P'
                            type='size'
                            checkedValue={sizeFilters.includes('P')}
                            handleFilterChange={handleFilterChange}
                        />
                        <Checkbox
                            label='M'
                            value = 'M'
                            type='size'
                            checkedValue={sizeFilters.includes('M')}
                            handleFilterChange={handleFilterChange}
                        />
                        <Checkbox
                            label='G'
                            type='size'
                            value='M'
                            checkedValue={sizeFilters.includes('G')}
                            handleFilterChange={handleFilterChange}
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
                            value='0-50'
                            type='price'
                            checkedValue={priceFilters.includes('0-50')}
                            handleFilterChange={handleFilterChange}
                        />
                        <Checkbox
                            type='price'
                            value='50-75'
                            checkedValue={priceFilters.includes('50-75')}
                            handleFilterChange={handleFilterChange}                        
                            label='R$ 50 - 75'
                        />
                        <Checkbox
                            label='R$ 75 - 100'
                            type='price'
                            value='75-100'
                            checkedValue={priceFilters.includes('75-100')}
                            handleFilterChange={handleFilterChange}                        
                        />
                    </PricesCheckboxContainer>
                </FilterCollapse>
                </FilterCollapse>
            </PhoneBreakpoint>
            <DesktopBreakpoint>
            <FiltersArea>
                <FilterBox>
                    <span>Tamanhos</span>
                    <SizesCheckboxContainer>
                    <Checkbox
                        label= 'U'
                        value= 'U'
                        type='size'
                        checkedValue={sizeFilters.includes('U')}
                        handleFilterChange={handleFilterChange}
                    />
                    <Checkbox
                        label='P'
                        value = 'P'
                        type='size'
                        checkedValue={sizeFilters.includes('P')}
                        handleFilterChange={handleFilterChange}
                    />
                    <Checkbox
                        label='M'
                        value = 'M'
                        type='size'
                        checkedValue={sizeFilters.includes('M')}
                        handleFilterChange={handleFilterChange}
                    />
                    <Checkbox
                        label='G'
                        type='size'
                        value='M'
                        checkedValue={sizeFilters.includes('G')}
                        handleFilterChange={handleFilterChange}
                    />
                    </SizesCheckboxContainer>
                </FilterBox>
                <FilterBox>
                    <span>Preços</span>
                    <PricesCheckboxContainer>
                    <Checkbox
                        label='R$ 0 - 50'
                        value='0-50'
                        type='price'
                        checkedValue={priceFilters.includes('0-50')}
                        handleFilterChange={handleFilterChange}
                    />
                    <Checkbox
                        type='price'
                        value='50-75'
                        checkedValue={priceFilters.includes('50-75')}
                        handleFilterChange={handleFilterChange}                        
                        label='R$ 50 - 75'
                    />
                    <Checkbox
                        label='R$ 75 - 100'
                        type='price'
                        value='75-100'
                        checkedValue={priceFilters.includes('75-100')}
                        handleFilterChange={handleFilterChange}                        
                    />
                    </PricesCheckboxContainer>
                </FilterBox>
            </FiltersArea>
            </DesktopBreakpoint>
        </FiltersWrapper>
    )
}

export default Filters