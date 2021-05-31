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
   CTextarea,
   CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios'
import useAccount from 'src/useAccount'


const ManageLend = () => {
    const {account, saveAccount} = useAccount()

    const [lendselected, setLendSelected] = useState(false)
    const [lend, setLend] = useState([

    ])
    const [lendpaying, setLendpaying] = useState([

    ])
    const [f5, setF5] = useState(false)
    const [warning, setWarning] = useState(false)
    const [viewLend, setViewLend] = useState([])
    useEffect (() =>
    {
        
        getLend()
       
    } , [f5])

    async function getLend() {
        var rs = await axios.post("/api/getlend")
        var rs = rs.data
        var data = rs.data
        console.log(data)
        setLend(data)
    }
    async function getLendpaying() {
        var ids = lendselected.id
        var rs = await axios.post("/api/getlendpaying")
        var rs = rs.data
        var data = rs.data
        console.log(data)
        setLendpaying(data)
        var datatmp = []
        for(var i=0; i<data.length; i++) {
            
            if (data[i].id == ids) {
                datatmp.push(data[i])
            }
        }
        console.log(datatmp)

        setViewLend(datatmp)

    }
    return(
        <>
        {/* View Lend */}
        <CModal 
              show={viewLend} 
              onClose={() => setViewLend(!viewLend)}
              color="primary"
              size="lg"
              centered
            >
                <CModalBody>

                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="primary" onClick={() => getLendpaying()}>Thêm hóa đơn</CButton>{' '}
                    <CButton color="secondary" onClick={() => setViewLend(!viewLend)}>Hủy</CButton>
              </CModalFooter>
        </CModal>
         {/* Table */}
         <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CButton color="primary">Thêm khoản vay</CButton>
                        </CCardHeader>
                        <CCardBody>
                                <table class="table table-striped text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col"> Mã </th>
                                            <th scope="col"> Bên vay </th>
                                            <th scope="col">Ngày vay</th>
                                            <th scope="col">Hạn trả</th>
                                            <th scope="col">Lãi suất</th>
                                            <th scope="col">Số lượng vay</th>
                                            <th scope="col">Đã trả</th>
                                            <th scope="col">Còn lại</th>
                                           
                                            
                                            <th scope="col">Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            lend.map((item) => 
                                                <>
                                                    <tr>
                                                        <td scope="row">{item.id}</td>
                                                        <td>{item.partnerid.partnername} <br/>
                                                        MST: {item.partnerid.taxid}
                                                        </td>
                                                        <td>{item.time}</td>
                                                        <td>{item.expired}</td>
                                                        <td>{item.interest_rate}</td>
                                                        <td>{item.amount ? item.amount.toLocaleString('en-US')+"VNĐ" : ""} </td>
                                                        <td>{item.remaining ? item.remaining.toLocaleString('en-US')+"VNĐ" : ""} </td>
                                                        <td>{(item.amount - item.remaining).toLocaleString('en-US')+"VNĐ" }</td>
                                                        <td>
                                                            <CButton color="info" onClick={() => {setLendSelected(item); setViewLend(!viewLend)}}>Xem</CButton>
                                                            <CButton color="info" >Sửa</CButton>
                                                            <CButton color="success">Cập nhật</CButton>
                                                            
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

export default ManageLend