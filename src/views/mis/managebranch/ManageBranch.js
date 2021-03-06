
import React, { useEffect, useState } from 'react'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CButtonGroup,
    CButton,
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
  
const ManageBranch = () => {
    const [f5, setF5] = useState(false)
    const [warning, setWarning] = useState(false)
    const [branchSelected, setBranchSelected] = useState({})
    const [add_branch, setAddBranch] = useState(false)
    const [edit_branch, setEditBranch] = useState(false)

    const [branch_phone, setBranchPhone] = useState("")
    const [branch_location, setBranchLocation] = useState("")

    const [branchs, setBranchs] = useState(
        []
    )

    useEffect(() => {
        getBranchs()
    }, [f5])

    async function getBranchs() {
        var rs = await axios.post("/api/get_branch")
        var rs = rs.data
        var data = rs.data
        console.log(data)
        setBranchs(data)
    }

    async function deleteBranch( {branch_id} ) {
        var data = {
            "branch_id": branch_id
        }
        var rs = await axios.post("/api/delete_branch", data)
        setF5(!f5)
    }

    async function addBranch () {
        var data = {
            "branch_phone": branch_phone,
            "branch_location": branch_location
        }
        var rs = await axios.post("/api/add_branch", data)
        setBranchPhone("")
        setBranchLocation("")
        setF5(!f5)
    }

    async function editBranch (item) {
        setBranchSelected(item);
        setBranchPhone(item.branch_phone)
        setBranchLocation(item.branch_location)
    }

    async function editBranchApi () {
        var data = {
            "branch_id": branchSelected.branch_id,
            "branch_phone": branch_phone,
            "branch_location": branch_location
        }
        var rs = await axios.post("/api/edit_branch", data)
        setF5(!f5)
    }

    return (
        <>
            <CModal 
              show={warning} 
              onClose={() => setWarning(!warning)}
              color="warning"
              centered
            >
            
              <CModalBody>
                B???n c?? ch???c ch???n mu???n x??a?
              </CModalBody>
              <CModalFooter className="justify-content-center">
                <CButton color="warning" onClick={() => {deleteBranch(branchSelected); setWarning(!warning)}}>X??a</CButton>{' '}
                <CButton color="secondary" onClick={() => setWarning(!warning)}>H???y</CButton>
              </CModalFooter>
            </CModal>

           
            <CModal 
              show={add_branch} 
              onClose={() => setAddBranch(!add_branch)}
              color="primary"
              size="lg"
              centered
            >
              <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">Th??m chi nh??nh</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="form-horizontal">
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>S??? ??i???n tho???i</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={branch_phone} onChange={(e) => setBranchPhone(e.target.value)}/>
                            
                        </CCol>
                    </CFormGroup>
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel >?????a ch???</CLabel>
                        </CCol>
                        <CCol >
                            <CTextarea 
                                name="textarea-input" 
                                id="textarea-input" 
                                rows="2"
                                value={branch_location}
                                onChange={(e) => setBranchLocation(e.target.value)}
                            />
                        </CCol>
                    </CFormGroup>
                </CForm>
              </CModalBody>
              <CModalFooter className="justify-content-center">
                <CButton color="primary" onClick={() => addBranch()}>
                  Th??m
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setAddBranch(!add_branch)}>
                  H???y
                </CButton>
              </CModalFooter>
            </CModal>
           

            
            <CModal 
              show={edit_branch} 
              onClose={() => setEditBranch(!edit_branch)}
              color="info"
              size="lg"
              centered
            >
              <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">S???a chi nh??nh</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="form-horizontal">
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>S??? ??i???n tho???i</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={branch_phone} onChange={(e) => setBranchPhone(e.target.value)}/>
                            
                        </CCol>
                    </CFormGroup>
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel >?????a ch??? chi nh??nh</CLabel>
                        </CCol>
                        <CCol >
                            <CTextarea 
                                name="textarea-input" 
                                id="textarea-input" 
                                rows="2"
                                value={branch_location}
                                onChange={(e) => setBranchLocation(e.target.value)}
                            />
                        </CCol>
                    </CFormGroup>
                </CForm>
              </CModalBody>
              <CModalFooter className="justify-content-center" >
                <CButton color="info" onClick={() => editBranchApi()}>
                  S???a
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setEditBranch(!edit_branch)}>
                  H???y
                </CButton>
              </CModalFooter>
            </CModal>

            <CRow>
                <CCol>
                    <CCard> 
                        <CCardHeader>
                            <CButton color="primary" onClick={() => setAddBranch(!add_branch)}>Th??m chi nh??nh</CButton>
                        </CCardHeader>
                        <CCardBody>
                            <table class="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th scope="col"> M?? chi nh??nh </th>
                                        <th scope="col">S??? ??i???n tho???i</th>
                                        <th scope="col">?????a ch??? chi nh??nh</th>
                                        <th scope="col">Ch???c n??ng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        branchs.map((item) => (<>
                                            <tr>
                                                <th scope="row">{item.branch_id}</th>
                                                <td>{item.branch_phone}</td>
                                                <td>{item.branch_location}</td>
                                                <td>
                                                    <CButtonGroup>
                                                        <CButton color="info" onClick={() => {editBranch(item); setEditBranch(!edit_branch);}}>S???a</CButton>
                                                        <CButton color="danger" onClick={() => {setBranchSelected(item); setWarning(!warning);}}>X??a</CButton>
                                                    </CButtonGroup>
                                                </td>
                                            </tr>
                                        </>))
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



export default ManageBranch