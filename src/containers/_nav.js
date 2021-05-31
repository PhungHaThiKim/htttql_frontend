import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý tài khoản'],
    roles: ['Admin']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tài khoản nhân viên',
    to: '/accountaccountant',
    icon: 'cil-drop',
    roles: ['Admin']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tài khoản quản lý',
    to: '/accountmanager',
    icon: 'cil-drop',
    roles: ['Admin']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tài khoản quản lý trưởng',
    to: '/accountchiefmanager',
    icon: 'cil-drop',
    roles: ['Admin']
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý chi nhánh'],
    // roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý chi nhánh',
    to: '/managebranch',
    icon: 'cil-drop',
    // roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý danh mục'],
    // roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý thông tin đối tác',
    to: '/managepartner',
    icon: 'cil-drop',
    // roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý phòng ban',
    to: '/managedepartment',
    icon: 'cil-drop',
    // roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý sản phẩm',
    to: '/manageproduct',
    icon: 'cil-drop',
    // roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý thuế',
    to: '/managetax',
    icon: 'cil-drop',
    // roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý nhân viên',
    to: '/manageemployee',
    icon: 'cil-drop',
    // roles: ["Manager", "Chiefmanager"]
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
    _tag: 'CSidebarNavItem',
    name: 'Quản lý hóa đơn bán',
    to: '/managesellbill',
    icon: 'cil-drop',
  },



  
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
