import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'

import Loading from '../../components/loading'
import { SIGN_OUT_REQUEST, VERIFY_RESET_REQUEST } from '../../store/auth'

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



const VerifyUserContainer = ({ location }) => {
  const [status, setStatus] = React.useState('waiting')
  const [errors, setErrors] = React.useState([])
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)


  React.useEffect(() => {
    const queryString = 'reset_password_token'
    const queryparams = new URLSearchParams(location.search)
    if (queryparams.has(queryString)) {
      isLoggedIn && dispatch(SIGN_OUT_REQUEST())
      dispatch(VERIFY_RESET_REQUEST({
        token: queryparams.get(queryString),
        setErrors,
        setStatus
      }))
    } else {
      const errorMsg = 'Erro ao resetar senha'
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
              <ContainerTitle> Carregando... </ContainerTitle>
              <Loading />
            </>
          ) : status === 'confirmed' ? (
            <>
              <ContainerTitle> Verificação concluída </ContainerTitle>
              <span> Redirecionando para a página de alteração de senha... </span>
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

export default VerifyUserContainer