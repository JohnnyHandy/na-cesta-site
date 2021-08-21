import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isValid } from 'redux-form'

import EditPasswordForm from '../../components/form/EditPassword'
import Loading from '../../components/loading'
import { PASSWORD_RESET_REQUEST, SIGN_OUT_REQUEST } from '../../store/auth'
import { FormContainer, FormArea, FormTitle, FormErrorSpan } from '../../components/form/form.styles'
import { navigate } from 'gatsby'

const ResetPasswordContainer = ({ location }) => {
  const [status, setStatus] = React.useState('waiting')
  const [errors, setErrors] = React.useState([])
  const [headers, setHeaders] = React.useState({})
  const state = useSelector(state => state)
  const isFormValid = isValid('editUserPassword')(state)
  const dispatch = useDispatch()
  const queryparams = new URLSearchParams(location.search)

  React.useEffect(() => {
    if(state.auth.isLoggedIn){
      dispatch(SIGN_OUT_REQUEST())
    }
    const newHeaders = {}
    const acceptedHeaders = [
      'access-token',
      'client',
      'expiry',
      'uid'
    ]
   acceptedHeaders.forEach(header => {
      if(queryparams.has(header) && queryparams.get(header) !== ''){
        newHeaders[header] = queryparams.get(header)
      }
    })
    setHeaders(newHeaders)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      reset_password_token: queryparams.get('reset_password_token')
    }
    dispatch(PASSWORD_RESET_REQUEST({ data: formattedData, setErrors, setStatus, headers: headers }))
  }

  return(
    <FormContainer>
      <FormArea>
        {
          status === 'waiting'
          ? (
            <>
            <FormTitle> Alterar senha </FormTitle>
            <EditPasswordForm
              onSubmit={onSubmit}
              isFormValid={isFormValid}
              reset={true}
            />
            {errors.map(error => (
              <FormErrorSpan
                key={error}
              >
                {error}
              </FormErrorSpan>
            ))}
          </>
          )
          : status === 'loading'
          ? (
            <Loading />
          ) : null
          }
      </FormArea>
    </FormContainer>
  )
}

export default ResetPasswordContainer