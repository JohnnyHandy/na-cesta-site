import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFormValues, isValid, submit } from 'redux-form'

import { signUp } from '../../store/auth/services'
import RegisterForm from '../../components/form/register'

const SignUpErrorMsgs = {
  email: {
    blank: {
      value: "Email can't be blank",
      label: 'Email não pode estar vazio'
    },
    taken: {
      value: 'Email is being used already',
      label: 'Email já está sendo usado.'
    }
  },
  document_number: {
    blank: {
      value: "Document number can't be blank",
      label: 'Número do documento não pode estar em branco'
    },
    taken: {
      value: 'Document number is being used already',
      label: 'Numero do documento já está sendo usado'
    }
  },
  document_type: {
    blank: {
      value: "Document type can't be blank",
      label: 'Tipo do documento não pode estar em branco.'
    }
  },
  password: {
    short: {
      value: 'Password must have at least 6 characters',
      label: 'Senha tem que ter no mínimo 6 caracteres'
    }
  }
}


const RegisterContainer = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const formValues = getFormValues('register')(state)
  const isFormValid = isValid('register')(state)
  const [status, setStatus] = React.useState('waiting')
  const [errors, setErrors] = React.useState([])

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
    }
    setStatus('loading')
    await signUp(formattedData).then(res => {
      if(res.status === 200 || res.status === 201){
        setStatus('confirmed')
      } 
    }).catch(res => {
      if (res.response.status === 422) {
        setStatus('waiting')
        const { response: {data: { errors: resError }} } = res
        const errorMessages = Object.keys(resError).filter(item => Object.keys(SignUpErrorMsgs).includes(item)).reduce((ac, item) => {
          let newError = ac
          console.log('item', item)
          Object.keys(SignUpErrorMsgs).forEach(key => {
            if (item === key) {
              Object.keys(SignUpErrorMsgs[key]).forEach(msg => {
                console.log('msg', msg)
                 resError[item].forEach(errorMsg => {
                   console.log('errorMsg', errorMsg)
                  if(errorMsg.includes(msg)){
                    newError =
                    !errors.includes(SignUpErrorMsgs[key][msg]['label']) &&
                    newError.concat(SignUpErrorMsgs[key][msg]['label'])
                  }
                })
              })
            }
          })
          return newError
        }, [])
        setErrors(errorMessages)
      }
    })
  }
  errors.length && console.log('erorrs', errors);
  return (
    <RegisterForm
      dispatch={dispatch}
      formValues={formValues}
      isFormValid={isFormValid}
      onSubmit={onSubmit}
      errors={errors}
      status={status}
    />
  )
}

export default RegisterContainer