import React from 'react'
import Filters from '../Filters'
import Products from '../Products'

const StoreContainer = (props) => {
    return(
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '30% 60%',
                justifyContent: 'space-between',
                padding: '3vh 0'
            }}
        >
            <Filters />
            <Products />
        </div>
    )
}

export default StoreContainer