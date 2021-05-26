import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
  
    CForm,
    CFormGroup,
    CFormText,
    CTextarea,
    CInput,
    
    CInputRadio,
   
    CLabel,
    
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const EditProfile = () => {
    return (
        <div className="editprofile">
            <CCard>
            <CCardHeader>
              <h2 style={{textAlign:'center'}}>Sửa thông tin</h2>
              {/* <small> Elements</small> */}
            </CCardHeader>
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
            <CCardFooter className="editprofile-footer">
              <CButton className="button-editprofile size-button" type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Sửa </CButton>
              {/* <CButton className="button-editprofile" type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton> */}
            </CCardFooter>
          </CCard>
        </div>
    )
}

export default EditProfile