const isEmpty = value => {
  return (
    value == null || // From standard.js: Always use === - but obj == null is allowed to check null || undefined
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

export const required = value =>
  !isEmpty(value) ? undefined : 'Campo requerido!'
export const minPassLength = value => {
  return value.length >= 8
    ? undefined
    : 'A senha precisa ter pelo menos 8 caracteres.'
}
export const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

export const validEmail = value =>
  emailRegex.test(value) ? undefined : 'Digite um email válido!'

export const minBRPhoneNumberLength = value =>
  value.replace(/[&/\\\s()_-]/g, '').length === 11
    ? undefined
    : 'Número de telefone inválido'

export const minUSPhoneNumberLength = value =>
  value.replace(/[&/\\\s()_-]/g, '').length === 10
    ? undefined
    : 'Invalid phone number'
export const validCep = value => value.replace(/[^0-9]/g, '').length === 8 ? undefined : 'Insira CEP corretamente'

export const validConfirmPassword = (value, allValues) => value === allValues['password'] ? undefined : 'As senhas precisam ser iguais.'