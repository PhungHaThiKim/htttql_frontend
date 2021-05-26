
import React, { useState } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CCardFooter,
  CFormGroup,
  CFormText,
  CInputRadio,
  CLabel,
  CTextarea

} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import usersData from '../../users/UsersData'
const getBadge = status => {
    switch (status) {   
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }
const fields = ['Tên đăng nhập','Mật khẩu', 'Số điện thoại', 'Email', 'Giới tính', 'Địa chỉ', '']
  
const ManageAccount = () => {
    const [account, setAccount] = useState(false)

    return (
        <div>
            <CModal 
              size="lg"
              show={account} 
              onClose={() => setAccount(!account)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Thêm tài khoản</CModalTitle>
              </CModalHeader>
              <CModalBody>
                    <CCard>
                                <CCardBody>
                        <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                            {/* <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Static</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <p className="form-control-static">Username</p>
                            </CCol>
                            </CFormGroup> */}
                            <CFormGroup row>
                            <CCol xs="2">
                                <CLabel htmlFor="text-input">Tên đăng nhập</CLabel>
                            </CCol>
                            <CCol >
                                <CInput id="text-input" name="text-input" placeholder="Text" />
                                <CFormText>This is a help text</CFormText>
                            </CCol>
                            </CFormGroup>
                            
                            <CFormGroup row>
                            <CCol xs="2"> 
                                <CLabel htmlFor="password-input">Mật khẩu</CLabel>
                            </CCol>
                            <CCol>
                                <CInput type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                                <CFormText className="help-block">Please enter a complex password</CFormText>
                            </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                            <CCol xs="2">
                                <CLabel htmlFor="email-input">Email</CLabel>
                            </CCol>
                            <CCol>
                                <CInput type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email"/>
                                <CFormText className="help-block">Please enter your email</CFormText>
                            </CCol>
                            </CFormGroup>

                            
                            <CFormGroup row>
                            <CCol xs="2" >
                                <CLabel>Giới tính</CLabel>
                            </CCol>
                            <CCol>
                                <CFormGroup variant="custom-radio" inline>
                                <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                                <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Nam</CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-radio" inline>
                                <CInputRadio custom id="inline-radio2" name="inline-radios" value="option2" />
                                <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Nữ</CLabel>
                                </CFormGroup>
                            
                            </CCol>
                            </CFormGroup>
                            
                            <CFormGroup row>
                            <CCol xs="2">
                                <CLabel htmlFor="text-input">Địa chỉ</CLabel>
                            </CCol>
                            <CCol>
                                <CTextarea 
                                name="textarea-input" 
                                id="textarea-input" 
                                rows="2"
                                placeholder="Content..." 
                                />
                            </CCol>
                            </CFormGroup>
                            
                        </CForm>
                        </CCardBody>
                        
                    </CCard>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setAccount(!account)}>Hủy</CButton>
                <CButton color="info" onClick={() => setAccount(!account)}>Thêm</CButton>{' '}
              </CModalFooter>
            </CModal>

            <CRow>
                <CCol>
                <CCard>
                    <CCardHeader>
                    <h2>Quản lý tài khoản</h2>
                    <br></br>
                    <CButton className="button-addaccount size-button" type="submit" size="sm" action="/addaccount" color="primary" onClick={() => setAccount(!account)}> Thêm tài khoản </CButton>
                    </CCardHeader>
                    <CCardBody>
                    <CDataTable
                    items={usersData}
                    fields={fields}
                    hover
                    striped
                    bordered
                    size="sm"
                    itemsPerPage={20}
                    pagination
                    scopedSlots = {{
                        'status':
                        (item)=>(
                            <td>
                            <CBadge color={getBadge(item.status)}>
                                {item.status}
                            </CBadge>
                            </td>
                        )
                    }}
                    />
                    </CCardBody>
                </CCard>
                </CCol>
            </CRow>
        
        </div>

    )
}



export default ManageAccount