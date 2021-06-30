import React from 'react'
import { reduxForm } from 'redux-form'


import { FormComponent, InputsContainer, FormSectionTitle , FormButton } from './form.styles'
import AddressForm from './Address'
import UserDataForm from './UserData'
import AccessDataForm from './AccessData'





let RegisterFormComponent = (props) => {
  const { formValues, isFormValid, onSubmit, handleSubmit } = props
  return (      
        <FormComponent
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            style={{ display: 'flex' }}
          >
          <InputsContainer>
            <FormSectionTitle> Dados de acesso </FormSectionTitle>
            <AccessDataForm />
          </InputsContainer>
          <InputsContainer>
            <FormSectionTitle> Dados Pessoais </FormSectionTitle>
            <UserDataForm />
          </InputsContainer>
          <InputsContainer>
            <FormSectionTitle> Endereço </FormSectionTitle>
            <AddressForm formValues={formValues} />
          </InputsContainer>
          </div>
          <FormButton
            type='submit'
            disabled={!isFormValid}
          >
            Registrar
          </FormButton>
        </FormComponent>
  )
}

RegisterFormComponent = reduxForm({ form: 'register' })(RegisterFormComponent)

export default RegisterFormComponent