import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'


const ProductUnit = () => {
    const data = useStaticQuery(graphql`
    query {
      modelo: file(relativePath: { eq: "modelo.jpeg" }) {
        childImageSharp {
          fixed (width: 150, height: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
    return(
        <div
            style={{
                minHeight: '75vh'
            }}
        >
            <div
               style={{
                   display: 'flex',
                   justifyContent: 'space-between'
               }} 
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '45%'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '30em',
                            margin: 'auto',
                            width: '30%'
                        }}
                    >
                        <div
                            style={{
                                border: '1px solid',
                                height: '6em',
                                margin: 'auto',
                                width: '6em'
                            }}
                        >
                            Foto 1
                        </div>
                        <div
                            style={{
                                border: '1px solid',
                                height: '6em',
                                margin: 'auto',
                                width: '6em'
                            }}
                        >
                            Foto 2
                        </div>
                        <div
                            style={{
                                border: '1px solid',
                                height: '6em',
                                margin: 'auto',
                                width: '6em'
                            }}   
                        >
                            Foto 3
                        </div>
                    </div>
                    <div
                        style={{
                            border: '1px solid',
                            width: '60%'
                        }}
                    >
                        Foto principal
                    </div>
                </div>
                <div
                    style={{
                        border: '1px solid',
                        width: '45%'
                    }}
                >
                    Detalhes
                </div>
            </div>
            <div
                style={{
                    border: '1px solid',
                    marginTop: '2em'
                }}
            >
                Descrição
            </div>
        </div>
    )
}

export default ProductUnit
