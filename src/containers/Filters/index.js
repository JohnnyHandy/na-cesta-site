import React from 'react'

import Checkbox from '../../components/inputs/checkbox/'

export const FiltersContainer = () => {
    return(
        <div
            style={{
                display: '-webkit-flex',
                flexDirection: 'column'
            }}
        >
            <span style={{ alignSelf: 'center', padding: '1vh 1vw' }} >Filtros</span>
            <div
                style={{
                    backgroundColor: '#DE6E52',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1vh 1vw',
                    fontFamily: 'Quicksand'
                }}
            >
                <div
                    style={{
                        alignSelf: 'center',
                        width: '15vw',
                        textAlign: 'center'
                    }}
                >
                    <span>Tamanhos</span>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '45% 45%',
                           justifyContent: 'space-between'
                        }}
                    >
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
                    </div>
                </div>
                <div
                    style={{
                        alignSelf: 'center',
                        width: '80%',
                        textAlign: 'center'
                    }}
                >
                    <span>Preços</span>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'auto',
                        }}
                    >
                        <Checkbox
                            label='R$ 0 - 50'
                        />
                        <Checkbox
                            label='R$ 50 - 75'
                        />
                        <Checkbox
                            label='R$ 75 - 100'
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FiltersContainer