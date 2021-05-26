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


const ManageDepartment = () => {

    const [f5, setF5] = useState(false)
    const [warning, setWarning] = useState(false)
    const [departselected, setDepartSelected] = useState({})
    const [add_depart, setAddDepart] = useState(false)
    const [edit_depart, setEditDepart] = useState(false)

    const [depart_name, setDepartName] = useState("")
    

    const [departs, setDepartments] = useState(
       [ {
            department_id: "10000000",
            branch_id: "10000000",
            department_name: "Spider man",
            department_numofemployees: 0
        }, 
        {
            department_id: "10000000",
            branch_id: "10000000",
            department_name: "Spider man",
            department_numofemployees: 10
        } ]
    )

    useEffect (() =>
    {
        getDepartment()
    } , [f5]
    )

    async function getDepartment ()
    {
        var rs = await axios.get("/api/get_department")
        var rs = rs.data
        var data = rs.data

        console.log(rs)

        setDepartments(data)
    }
    async function deleteDepartment({department_id})
    {
        var data = {
            "department_id" : department_id
        }
        var rs = await axios.post("/api/delete_department", data)
        setF5(true)
    }

    async function addDepartment () {
        var data = {
            "department_name": depart_name,
            

            
        }
        var rs = await axios.post("/api/add_department", data)
        setDepartName("")
       

        setF5(!f5)
    }

    async function editDepart (item) {
        setDepartSelected(item);
        setDepartName(item.department_name)
        
    }

    async function editDepartApi () {
        var data = {
            "department_id": departselected.department_id,
            "department_name": depart_name,
            
            
        }
        var rs = await axios.post("/api/edit_department", data)
        setF5(!f5)
    }

    return(
        <>
        {/* Confirm Delete */}
            <CModal
                show={warning} 
                onClose={() => setWarning(!warning)}
                color="warning"
                centered
                >
                
                <CModalBody>
                    Bạn có chắc chắn muốn xóa?
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="warning" onClick={() => {deleteDepartment(departselected); setWarning(!warning)}}>Xóa</CButton>{' '}
                    <CButton color="secondary" onClick={() => setWarning(!warning)}>Hủy</CButton>
                </CModalFooter>

            </CModal>

        {/* Add Department */}
            <CModal 
              show={add_depart} 
              onClose={() => setAddDepart(!add_depart)}
              color="primary"
              size="lg"
              centered
            >
              <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">Thêm phòng ban</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="form-horizontal">
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Tên phòng ban</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={depart_name} onChange={(e) => setDepartName(e.target.value)}/>
                            
                        </CCol>
                    </CFormGroup>
                   
                </CForm>
              </CModalBody>
              <CModalFooter className="justify-content-center">
                <CButton color="primary" onClick={() => addDepartment()}>
                  Thêm
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setAddDepart(!add_depart)}>
                  Hủy
                </CButton>
              </CModalFooter>
            </CModal>

        {/* Edit Department */}
        <CModal 
              show={edit_depart} 
              onClose={() => setAddDepart(!edit_depart)}
              color="primary"
              size="lg"
              centered
            >
              <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">Sửa phòng ban</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="form-horizontal">
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Tên phòng ban</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={depart_name} onChange={(e) => setDepartName(e.target.value)}/>
                            
                        </CCol>
                    </CFormGroup>
                    
                </CForm>
              </CModalBody>
              <CModalFooter className="justify-content-center">
                <CButton color="primary" onClick={() => editDepartApi()}>
                  Thêm
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setEditDepart(!edit_depart)}>
                  Hủy
                </CButton>
              </CModalFooter>
            </CModal>

        {/* Table */}
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CButton color="primary" onClick = {() => setAddDepart(!add_depart)} >Thêm phòng ban</CButton>
                        </CCardHeader>
                        <CCardBody>
                            <table className="table table-striped">
                                <thead>
                                    <th scope="col">  Mã phòng ban </th>
                                    <th scope="col">  Tên phòng ban </th>
                                    <th scope="col">  So lượng nhân viên </th>
                                    <th>Chức năng</th>
                                </thead>
                                <tbody>
                                    {
                                        departs.map((item) => 
                                        <>
                                            <td scope="row">{item.department_id}</td>
                                            <td>{item.department_name}</td>
                                            <td>{item.department_numofemployees}</td>
                                            <td>
                                                <CButton color="info" onClick={ () => {editDepart(item); setEditDepart(!edit_depart) }}>Sửa</CButton>
                                                <CButton color="danger" onClick={ ()=> {setDepartSelected(item); setWarning(!warning)}}>Xóa</CButton>
                                            </td>
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

export default ManageDepartment
