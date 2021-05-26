
import React, { useEffect, useState } from 'react'
import {
    CRow,
    CCol,
   CButton,
   CCard,
   CCardBody, 
   CCardHeader,
   CModal,
   CModalBody,
   CModalFooter,
   CModalHeader,
   CModalTitle,
   CForm,
   CFormGroup,
   CLabel,
   CInput,
   CFormText,
   CTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios'

const ManageProduct = () => {

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CButton color="primary" onClick={() => setAddPartner(!add_Partner)}>Thêm đối tác</CButton>
                        </CCardHeader>
                        <CCardBody>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col"> Mã </th>
                                            <th scope="col"> Tên </th>
                                            <th scope="col">Mã số thuế</th>
                                            <th scope="col">Số điện thoại</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Địa chỉ</th>
                                            <th scope="col">Ghi chú</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            partners.map((item) => 
                                                <>
                                                    <tr>
                                                        <td scope="row">{item.partner_id}</td>
                                                        <td>{item.partnername}</td>
                                                        <td>{item.taxid}</td>
                                                        <td>{item.phone}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.address}</td>
                                                        <td>{item.desc}</td>
                                                        <td>
                                                            <CButton color="info" onClick={() => {editPartner(item); setEditPartner(!edit_partner)}}>Sửa</CButton>
                                                            <CButton color="danger" onClick={() => {setPartnerSelected(item); setWarning(!warning)}}>Xóa</CButton>
                                                        </td>
                                                    </tr>

                                                </>
                                            )
                                        }
                                        
                                    </tbody>
                                </table>
                        </CCardBody>
                    </CCard>

                </CCol>
            </CRow>
        </>
    )
}

export default ManageProduct