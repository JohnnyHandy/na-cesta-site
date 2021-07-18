import React from 'react'
import { reduxForm } from 'redux-form'
import CardSection from './section/CardSection'

import { InputsContainer, FormButton, FormComponent } from './form.styles'

const CheckoutForm = ({ onSubmit, handleSubmit, stripe }) => {
  return (
    <FormComponent
      onSubmit={handleSubmit(onSubmit)}
      style={{
        margin: '0'
      }}
    >
      <InputsContainer>
        <CardSection />
      </InputsContainer>
      <FormButton disabled={!stripe}> Finalizar compra </FormButton>
    </FormComponent>
  )
}

export default reduxForm({ form: 'checkoutForm' })(CheckoutForm)