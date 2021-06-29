import React from 'react'
import { css } from '@emotion/core'
import { useSelector } from 'react-redux'

import UserTemplate from '../../templates/UserTemplate'
import { colors } from '../../utils/colors'

const genderOptions = [
  {
    label: 'Masculino',
    value: 'M'
  },
  {
    label: 'Feminino',
    value: 'F'
  },
  {
    label: 'Outro',
    value: 'O'
  }
  
]

const spanCss = css`
  font-size: 1em;
  margin: 0.2em 0;
  padding: 0.2em;
`

const spanTitleCss = css`
font-size: 1.5em;
margin: 0.5em 0;
padding: 0.5em;

`

const Button = css`
  background: ${colors.veranoBlue};
  border: none;
  color: white;
  cursor: pointer;
  font-family: Quicksand;
  font-size: 1.5em;
  font-weight: bold;
  margin: 1em auto;
  padding: 0.5em;
  & :hover {
    color: ${colors.veranoBlue};
    background: white
  }

`

const UserProfileContainer = (props) => {
  const { user } = useSelector(state => state.auth)
  const birthdayDate = new Date(user.birthday)
  const year = birthdayDate.getFullYear();
  const month = birthdayDate.getMonth()+1;
  let dt = birthdayDate.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return (
    <UserTemplate {...props}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex'
        }}
      >
        <div
          style={{ margin: 'auto', display: 'grid', padding: '1em' }}
        >
          <span css={spanTitleCss} > Dados Pessoais </span>
          <span css={spanCss} > Nome: {user.name} </span>
          <span css={spanCss} > Telefone: { user.phone } </span>
          <span css={spanCss} > Gênero: {genderOptions.find(gender => gender.value === user.gender)['label']} </span>
          <span css={spanCss} > Data de nascimento: {year+'-' + month + '-'+dt} </span>
          <span css={spanCss} > CPF: {user.document} </span>
          <button css={Button}>Alterar dados pessoais</button>
        </div>
        <div
          style={{ display: 'grid', padding: '1em' }}
        >
          <span css={spanTitleCss} > Dados de acesso </span>
          <span css={spanCss} >Email: {user.email} </span>
          <button css={Button}>Alterar Email</button>
          <button css={Button}>Alterar senha</button>
        </div>

      </div>
    </UserTemplate>
  )
}

export default UserProfileContainer