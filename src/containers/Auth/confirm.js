import React from 'react'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'
import http from '../../utils/http'

import Loading from '../../components/loading'

const Container = styled('div')`
  background: rgb(241, 214, 206);
  margin: auto;
  padding: 1em;
  text-align: center;  
`

const ContainerTitle = styled('span')`
  font-size: 2em;
  font-weight: bold;
  color: rgb(26, 67, 80);
`

const InnerContainer=styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`

const confirmUserRequest = token => {
  const confirmationUrl = '/auth/confirmation'
  return http
    .get(`${confirmationUrl}?confirmation_token=${token}`)
    .then(res => res)
    .catch(err => err.response)
}

const RegisterContainer = ({ location }) => {
  const [status, setStatus] = React.useState('waiting')
  const [errors, setErrors] = React.useState([])
  const confirmUser = async token => {
    const response = await confirmUserRequest(token)
    if (response.status === 302 || response.status === 200) {
      setStatus('confirmed')
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } else if (response.status === 422) {
      setStatus('already')
    } else {
      const errorMsg = 'Erro ao confirmar conta.'
      !errors.includes(errorMsg) && setErrors(errors.concat(errorMsg))
      setStatus('waiting')
    }
  }

  React.useState(async () => {
    const queryString = 'confirmation_token'
    const queryparams = new URLSearchParams(location.search)
    if (queryparams.has(queryString)) {
      confirmUser(queryparams.get(queryString))
    } else {
      const errorMsg = 'Erro ao confirmar conta'
      !errors.includes(errorMsg) && setErrors(errors.concat(errorMsg))
    }
  }, [])

  return (
      <Container>
        <InnerContainer>
          {errors.map(item => (
            <span key={item} style={{ color: 'red' }}>
              {' '}
              {item}{' '}
            </span>
          ))}
          {status === 'waiting' ? (
            <>
              <ContainerTitle> Confirmando conta... </ContainerTitle>
              <Loading />
            </>
          ) : status === 'confirmed' ? (
            <>
              <ContainerTitle> Conta confirmada com sucesso! </ContainerTitle>
              <span> Redirecionando para a página de login... </span>
            </>
          ) : status === 'already' ? (
            <>
              <ContainerTitle> A conta já foi confirmada. </ContainerTitle>
            </>
          ) : null}
          <span />
        </InnerContainer>
      </Container>
    )
}

export default RegisterContainer