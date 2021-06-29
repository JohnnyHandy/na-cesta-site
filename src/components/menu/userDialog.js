import React from 'react'
import { navigate } from 'gatsby'
import Menu, { Item as MenuItem, Divider } from 'rc-menu'
import { css } from '@emotion/core'
import { useDispatch } from 'react-redux'
import Dropdown from 'rc-dropdown'
import { FaUserCircle } from 'react-icons/fa'
import { RiArrowDropDownFill } from 'react-icons/ri'

import 'rc-dropdown/assets/index.css';

import { SIGN_OUT_REQUEST } from '../../store/auth'

const dropdownCss = css`
  cursor: pointer;
`

const MenuItemCss = css`
  cursor: pointer;
`

const UserDialog = ({user}) => {
  const MenuOverlay =  (
    <Menu>
      <MenuItem css={MenuItemCss} onClick={() => navigate('/user/profile')} key="profile">Minha Conta</MenuItem>
      <Divider />
      <MenuItem css={MenuItemCss} onClick={() => navigate('/user/orders')} key="orders">Meus Pedidos</MenuItem>
      <Divider />
      <MenuItem css={MenuItemCss} key="3" onClick={() => dispatch(SIGN_OUT_REQUEST())} > Sair </MenuItem>
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