import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { InputsContainer, FormButton, FormComponent } from './form.styles'
import { required, validEmail } from './validation'
import InputComponent from '../inputs/text/InputComponent'

let EmailFormComponent = (props) => {
  const { isFormValid, onSubmit, handleSubmit } = props
  return (
        <FormComponent
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputsContainer>
            <Field
              type='text'
              placeholder='Email'
              name='email'
              component={InputComponent} 
              validate={[required, validEmail]}
            />
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

EmailFormComponent = reduxForm({ form: 'emailForm' })(EmailFormComponent)

export default EmailFormComponent