import React from 'react'
import { reduxForm } from 'redux-form'

import { FormComponent, InputsContainer, FormButton } from './form.styles'
import AddressFields from './Address'


let AddressForm = (props) => {
  const { formValues, isFormValid, onSubmit, handleSubmit, initialValues } = props
  return (      
        <FormComponent
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputsContainer>
            <AddressFields formName='address' initialValues={initialValues} formValues={formValues} />
          </InputsContainer>
          <FormButton
            type='submit'
            disabled={!isFormValid}
          >
            Enviar
          </FormButton>
        </FormComponent>
  )
}

AddressForm = reduxForm({ form: 'address' })(AddressForm)

export default AddressForm