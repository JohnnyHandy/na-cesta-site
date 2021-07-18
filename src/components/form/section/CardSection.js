import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import { InputWrapper, FormLabel } from '../../inputs/input.styles'
import './Styles.css'
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
function CardSection() {
  return (
    <InputWrapper>
    <FormLabel> Informações do cartão </FormLabel>
      <CardElement
        options={CARD_ELEMENT_OPTIONS}
      />
    </InputWrapper>
  );
};
export default CardSection;