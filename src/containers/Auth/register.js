import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFormValues, isValid } from 'redux-form'
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';

import RegisterForm from '../../components/form/register'


const poolData = {
  UserPoolId: 'sa-east-1_w8GoQjxii',
  ClientId: 'upi8cm4s4jgj9m6c2jklo4jcs'
}
const userPool = new CognitoUserPool(poolData)
let attributeList = [];
const dataEmail = {
  Name: 'email',
  Value: 'example@email.com'
}
const attributeEmail = new CognitoUserAttribute(dataEmail)
const dataAddress = {
  Name: 'address',
  Value: 'Rua exemplo da silva'
}
const attributeAddress = new CognitoUserAttribute(dataAddress)

const dataGender = {
  Name: 'gender',
  Value: 'male'
}

const attributeGender = new CognitoUserAttribute(dataGender)

const dataName = {
  Name: 'name',
  Value: 'Fulano'
}

const attributeName = new CognitoUserAttribute(dataName)

const dataPhone = {
  Name: 'phone_number',
  Value: '+5583987655678'
}

const attributePhone = new CognitoUserAttribute(dataPhone)
attributeList.push(attributeEmail, attributeAddress, attributeGender, attributeName, attributePhone)
const RegisterContainer = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const formValues = getFormValues('register')(state)
  const isFormValid = isValid('register')(state)
  const registerUserMethod = () => {
    userPool.signUp('example@email.com', 'senha123', attributeList, null, function(err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      var cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
    })
  }
  return (
    <>
    <RegisterForm
      dispatch={dispatch}
      formValues={formValues}
      isFormValid={isFormValid}
    />
    <button onClick={() => registerUserMethod()}> Register User </button>
    </>
  )
}

export default RegisterContainer