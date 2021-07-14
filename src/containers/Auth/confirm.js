import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'

import Loading from '../../components/loading'
import { SIGN_OUT_REQUEST, CONFIRM_ACCOUNT_REQUEST } from '../../store/auth'

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

const RegisterContainer = ({ location }) => {
  const [status, setStatus] = React.useState('waiting')
  const [errors, setErrors] = React.useState([])
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)

  React.useEffect(() => {
    isLoggedIn && dispatch(SIGN_OUT_REQUEST())
    const queryString = 'confirmation_token'
    const queryparams = new URLSearchParams(location.search)
    if (queryparams.has(queryString)) {
      dispatch(CONFIRM_ACCOUNT_REQUEST({
        token: queryparams.get(queryString),
        setStatus,
        setErrors
      }))
    } else {
      const errorMsg = 'Erro ao confirmar conta'
      !errors.includes(errorMsg) && setErrors(errors.concat(errorMsg))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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