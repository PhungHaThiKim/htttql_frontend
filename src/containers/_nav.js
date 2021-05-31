import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý tài khoản']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tài khoản nhân viên',
    to: '/accountaccountant',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tài khoản quản lý',
    to: '/accountmanager',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tài khoản quản lý trưởng',
    to: '/accountchiefmanager',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý chi nhánh']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý chi nhánh',
    to: '/managebranch',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý danh mục']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý thông tin đối tác',
    to: '/managepartner',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý phòng ban',
    to: '/managedepartment',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý sản phẩm',
    to: '/manageproduct',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý thuế',
    to: '/managetax',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý nhân viên',
    to: '/manageemployee',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý hóa đơn']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý hóa đơn mua',
    to: '/managebuybill',
    icon: 'cil-drop',
  },


  
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
