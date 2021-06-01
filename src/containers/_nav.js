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
    roles: ["Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý chi nhánh',
    to: '/managebranch',
    icon: 'cil-drop',
    roles: ["Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý danh mục'],
    roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý thông tin đối tác',
    to: '/managepartner',
    icon: 'cil-drop',
    roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý phòng ban',
    to: '/managedepartment',
    icon: 'cil-drop',
    roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý sản phẩm',
    to: '/manageproduct',
    icon: 'cil-drop',
    roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý thuế',
    to: '/managetax',
    icon: 'cil-drop',
    roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý nhân viên',
    to: '/manageemployee',
    icon: 'cil-drop',
    roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Kế toán viên'],
    roles: ["Accountant"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Nhập số dư đầu kỳ',
    to: '/managebalance',
    icon: 'cil-drop',
    roles: ["Accountant"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý hóa đơn mua',
    to: '/managebuybill',
    icon: 'cil-drop',
    roles: ["Accountant"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý hóa đơn bán',
    to: '/managesellbill',
    icon: 'cil-drop',
    roles: ["Accountant"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý chi phí phát sinh',
    to: '/managereciept',
    icon: 'cil-drop',
    roles: ["Accountant"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý lương',
    to: '/managesalary',
    icon: 'cil-drop',
    roles: ["Accountant"]
  },
  
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý vay'],
   roles: [ "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý cho vay',
    to: '/managelend',
    icon: 'cil-drop',
    roles: [ "Chiefmanager"]
  },
  
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Tổng hợp tài chính chi nhánh'],
    roles: [  "Manager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Báo cáo tài chính',
    to: '/reportbranch',
    icon: 'cil-drop',
    roles: [ "Manager"]
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Thống kê thu chi'],
    roles: [  "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Thống kê tài chính',
    to: '/statisticbranch',
    icon: 'cil-drop',
    roles: [ "Chiefmanager"]
  },

  
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
