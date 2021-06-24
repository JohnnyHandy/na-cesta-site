import React from 'react'
import Menu, { Item as MenuItem, Divider } from 'rc-menu'
import { css } from '@emotion/core'
import { useDispatch } from 'react-redux'
import Dropdown from 'rc-dropdown'
import { FaUserCircle } from 'react-icons/fa'
import { RiArrowDropDownFill } from 'react-icons/ri'

import 'rc-dropdown/assets/index.css';

import { SIGN_OUT_REQUEST } from '../../store/auth'

function onSelect({ key }) {
  console.log(`${key} selected`);
}

function onVisibleChange(visible) {
  console.log(visible);
}

const dropdownCss = css`
  cursor: pointer;
`

const UserDialog = ({user}) => {
  const MenuOverlay =  (
    <Menu onSelect={onSelect}>
      <MenuItem key="1">Minha Conta</MenuItem>
      <Divider />
      <MenuItem key="2">Meus Pedidos</MenuItem>
      <Divider />
      <MenuItem key="3" onClick={() => dispatch(SIGN_OUT_REQUEST())} > Sair </MenuItem>
    </Menu>
  );
  const dispatch = useDispatch()
  if(user === null){
    return null
  }
  return (
    <div>
      <Dropdown
        css={dropdownCss}
        trigger={['click']}
        overlay={MenuOverlay}
        animation="slide-up"
        onVisibleChange={onVisibleChange}
      >
        <div>
          <FaUserCircle />
          <span> { user.name } </span>
          <RiArrowDropDownFill />
        </div>
      </Dropdown>
    </div>
  )
}

export default UserDialog