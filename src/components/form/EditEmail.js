import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { InputsContainer, FormButton, FormComponent } from './form.styles'
import { required, validEmail } from './validation'
import InputComponent from '../inputs/text/InputComponent'

let EditEmailComponent = (props) => {
  const { isFormValid, onSubmit, handleSubmit } = props
  return (
        <FormComponent
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputsContainer>
            <Field
              type='text'
              placeholder='Novo email'
              name='email'
              component={InputComponent} 
              validate={[required, validEmail]}
            />
          </InputsContainer>
          <FormButton
            type='submit'
            disabled={!isFormValid}
          >
            Salvar
          </FormButton>
        </FormComponent>
  )
}

EditEmailComponent = reduxForm({ form: 'editUserEmail' })(EditEmailComponent)

export default EditEmailComponent