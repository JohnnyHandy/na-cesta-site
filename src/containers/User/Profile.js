import React from 'react'
import { useSelector } from 'react-redux'

import UserTemplate from '../../templates/UserTemplate'
import { navigate } from 'gatsby'
import { Container, Wrapper , spanCss, spanTitleCss, Button} from './UserContainer.styles'

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

const UserProfileContainer = (props) => {
  const { user } = useSelector(state => state.auth)
  const birthdayDate = new Date(user.birthday)
  const year = birthdayDate.getFullYear();
  let month = birthdayDate.getMonth()+1;
  let dt = birthdayDate.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return (
    <UserTemplate {...props}>
      <Container>
        <Wrapper>
          <span css={spanTitleCss} > Dados Pessoais </span>
          <span css={spanCss} > Nome: {user.name} </span>
          <span css={spanCss} > Telefone: { user.phone } </span>
          <span css={spanCss} > Gênero: {genderOptions.find(gender => gender.value === user.gender)['label']} </span>
          <span css={spanCss} > Data de nascimento: {year+'-' + month + '-'+dt} </span>
          <span css={spanCss} > CPF: {user.document} </span>
          <button css={Button} onClick={() => navigate('/user/edit/personal')} >Alterar dados pessoais</button>
        </Wrapper>
        <Wrapper>
          <span css={spanTitleCss} > Dados de acesso </span>
          <span css={spanCss} >Email: {user.email} </span>
          <button css={Button} onClick={() => navigate('/user/edit/email')}>Alterar Email</button>
          <button css={Button} onClick={() => navigate('/user/edit/password')}>Alterar senha</button>
        </Wrapper>
      </Container>
    </UserTemplate>
  )
}

export default UserProfileContainer