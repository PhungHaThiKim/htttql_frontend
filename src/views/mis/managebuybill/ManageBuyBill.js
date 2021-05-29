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
import useAccount from 'src/useAccount'

const ManageBuyBill = () => {

    const {account, saveAccount} = useAccount() 

    const [f5, setF5] = useState(false)

    const [partner_id, setPartnerId] = useState("")
    
    const [partner, setPartner] = useState(
          {
            "partner_id": "10000000",
            "partnername": "Vmart",
            "taxid": "0965826734",
            "desc": "ar",
            "address": "adg",
            "email": "hathikimphung0612@gmail.com",
            "phone": "0965826734"
          }
    )

    const [buybill, setBuyBill] = useState(
        [
        ]
    )
    useEffect (() =>
    {
        getBuyBill()
    } , [f5]
    )

    async function getBuyBill()
    {
        var rs = await axios.get("/api/getbuybill")
        var rs = rs.data
        var data = rs.data

        

        console.log(data)

        setBuyBill(data)

    }


    return (
        <>
            {/* Table */}
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CButton color="primary"  >Thêm hóa đơn mua</CButton>
                        </CCardHeader>
                        <CCardBody>
                            <table className="table table-striped text-center">
                                <thead>
                                    <th scope="col">  Mã hóa đơn </th>
                                    <th scope="col">  Tên đối tác </th>
                                    <th scope="col">  Số lượng sản phầm </th>
                                    <th scope="col">  Tổng giá </th>
                                    <th scope="col">  Hình thức thanh toán </th>
                                    
                                    <th>Chức năng</th>
                                </thead>
                                <tbody>
                                    {
                                        buybill.map((item) => 
                                        <>
                                            <tr>
                                                <td scope="row">{item.documentid}</td>
                                                <td></td>
                                                <td>{item.department_numofemployees}</td>
                                                <td>
                                                    <CButton color="info" >Xem chi tiết</CButton>
                                                    <CButton color="danger">Xóa</CButton>
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

export default ManageBuyBill