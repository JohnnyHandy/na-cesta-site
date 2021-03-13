import React from 'react'
import styled from '@emotion/styled'
import { BiDownArrow, BiUpArrow } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

import Checkbox from '../../components/inputs/checkbox/'
import FilterCollapse from '../../components/filters/filterCollapse'
import { DesktopBreakpoint, PhoneBreakpoint } from '../../components/responsive/devices'
import { clearProductsList, filterProductsRequest } from '../../store/products'

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
    const [sizeFilters, setSizeFilters] = React.useState([])
    const [priceFilters, setPriceFilters] = React.useState([])
    const dispatch = useDispatch()
    React.useEffect(() => {
        let expressionAttributeNames = {}
        let defaultExpressionAttributeNames = {
            "#NM": "name",
            "#PD": "ProductId",
            "#DP": "dealPrice",
            "#PR": "price",
            "#ID": "isDeal",
            "#IM": 'images'
        }
        let defaultProjectionExpression = "#NM, #PD, #DP, #PR, #ID, #IM"
        let sizeExpressionAttributeValues = {}
        let priceExpressionAttributeValues = {}
        let sizeFilterExpression = ''
        let priceFilterExpression = ''
        let paramAttributes = {}
        if(sizeFilters.length){
            expressionAttributeNames["#AS"] = 'availableSizes'
            sizeFilters.forEach(size => {
                sizeExpressionAttributeValues[`:${size.toLowerCase()}`] = {"S" : size}
                sizeFilterExpression = sizeFilterExpression === ''
                ? `contains(#AS, :${size.toLowerCase()})`
                : sizeFilterExpression.concat(` OR contains(#AS, :${size.toLowerCase()})`)
            })
            paramAttributes["ExpressionAttributeNames"] = {
                ...paramAttributes["ExpressionAttributeNames"],
                ...defaultExpressionAttributeNames,
                ...expressionAttributeNames
            }
            paramAttributes['ExpressionAttributeValues'] = {
                ...paramAttributes['ExpressionAttributeValues'],
                ...sizeExpressionAttributeValues,
            }
            paramAttributes['ProjectionExpression'] = defaultProjectionExpression
        }
        if(priceFilters.length) {
            let defaultBooleanAttributes = {
                ":b1": {
                    "BOOL": true
                  },
                  ":b2": {
                    "BOOL": false
                  }
            }        
            priceFilters.forEach((price, index) => {
                let splitenPrice = price.split('-')
                let minPrice = splitenPrice[0]
                let maxPrice = splitenPrice[1]
                priceExpressionAttributeValues[`:p${index}1`] = { "N": minPrice }
                priceExpressionAttributeValues[`:p${index}2`] = { "N" : maxPrice }
                priceFilterExpression = priceFilterExpression === ''
                    ? `((#ID = :b1) AND ((#DP >= :p${index}1) AND (#DP <= :p${index}2))OR ((#ID = :b2) AND ((#PR >= :p${index}1) AND (#PR <= :p${index}2))))`
                    : priceFilterExpression.concat(` OR ((#ID = :b1) AND ((#DP >= :p${index}1) AND (#DP <= :p${index}2))OR ((#ID = :b2) AND ((#PR >= :p${index}1) AND (#PR <= :p${index}2))))`)    
                
            })

            paramAttributes["ExpressionAttributeNames"] = {
                ...paramAttributes["ExpressionAttributeNames"],
                ...defaultExpressionAttributeNames,
                ...expressionAttributeNames
            }

            paramAttributes['ExpressionAttributeValues'] = {
                ...defaultBooleanAttributes,
                ...paramAttributes['ExpressionAttributeValues'],
                ...priceExpressionAttributeValues,
            }
            paramAttributes['ProjectionExpression'] = defaultProjectionExpression
        }
        paramAttributes['FilterExpression'] = (sizeFilters.length && !priceFilters.length)
        ? sizeFilterExpression
        : (!sizeFilters.length && priceFilters.length)
        ? priceFilterExpression
        : (sizeFilters.length && priceFilters.length)
        ? `${sizeFilterExpression} AND ${priceFilterExpression}`
        : ''
        if(sizeFilters.length || priceFilters.length) {
            dispatch(filterProductsRequest({ paramAttributes }))
        } else {
            dispatch(clearProductsList())
        }
    }, [sizeFilters, priceFilters])
    const handleFilterChange = (type, value) => {
        if(type === 'size') {
            let newSizeFilter
            sizeFilters.includes(value)
            ? newSizeFilter = sizeFilters.filter(item => item !== value)
            : newSizeFilter = sizeFilters.concat(value)
            setSizeFilters(newSizeFilter)
        } else if(type === 'price') {
            let newPriceFilter
            priceFilters.includes(value)
            ? newPriceFilter = priceFilters.filter(item => item !== value)
            : newPriceFilter = priceFilters.concat(value)
            setPriceFilters(newPriceFilter)
        }
    }
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
                <SizesFilter>
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
                </SizesFilter>
                <PricesFilter>
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
                </PricesFilter>
            </FiltersArea>
            </DesktopBreakpoint>
        </FiltersWrapper>
    )
}

export default Filters