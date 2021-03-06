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
   CButtonGroup,
   CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios'
import useAccount from 'src/useAccount'

const ManageEmployee = () =>
{
    const {account, saveAccount} = useAccount()

    const [viewemployee, setViewEm] = useState(false)
    const [add_employ, setAddEmployee] = useState(false)
    const [edit_employ, setEditEmploy] = useState(false)
    // const [branch_location_select, setBranchLocation_select] = useState(account.branch_location)

    const [f5, setF5] = useState(false)
    const [warning, setWarning] = useState(false)
    // const [viewdetail, setViewDetail] = useState(false)
    const [employselected, setEmploySelected] = useState({})

    const [departments, setDepartments] = useState([])
    const [taxs, setTaxs] = useState([])


    const [employ_id, setEmployId] = useState("")
    const [department_id, setDepartmentId] = useState("")
    const [branch_id, setBranchId] = useState(account.branch ? account.branch.branch_id : "")
    const [branch_phone, setBranchPhone] = useState("")
    const [branch_location, setBranchLocation] = useState("")
    const [department_name, setDepartmentName] = useState("")
    const [department_numofemployees, setDepartNum] = useState(0)
    const [employee_name, setEmployName] = useState("")
    const [taxid, setTaxId] = useState("")
    const [taxtype, setTaxType] = useState("")
    const [percentage, setPercentage] = useState(0)
    const [employee_phone, setEmPhone] = useState("")
    const [employee_email, setEmEmail] = useState("")
    const [employee_address, setEmAddress] = useState("")
    const [employee_sex, setEmploySex] = useState("")
    const [employee_exp, setEmployExp] = useState(0)
    const [employee_salary, setEmploySalary] = useState(0)
    const [employee_coef, setEmployCoef] = useState(0)
    const [bankid, setBankId] = useState("")
    const [bankname, setBankName] = useState("")

    const [employees, setEmployee] = useState(
        [
            
        ]
    )
    const [branchs, setBranchs] = useState([])
    useEffect (() =>
    {
        getBranchs()
        getTaxs()
        // getDepartment()
        getEmployee()
    } , [f5]
    )

    useEffect(() => {
        getDepartment()
    }, [branch_id])

    async function getBranchs() {
        var rs = await axios.post("/api/get_branch")
        var rs = rs.data
        var data = rs.data
        console.log(data)
        setBranchs(data)
    }

    async function getDepartment()
    {

        var rs = await axios.post("/api/get_department")
        var rs = rs.data
        var data = rs.data

        console.log(rs)
        var datatmp = []
        for(var i=0; i<data.length; i++) {
            if (data[i].branch.branch_id == branch_id) {
                datatmp.push(data[i])
            }
        }

        setDepartments(datatmp)
    }
    async function getTaxs()
    {
        var rs = await axios.post("/api/get_tax")
        var rs = rs.data
        var data = rs.data

        console.log(rs)
        setTaxs(data)

    }

    async function getEmployee()
    {
        var rs = await axios.post("/api/get_employee")
        var rs = rs.data
        var data = rs.data

        console.log(rs)

        setEmployee(data)
    }
    async function deleteEmploy({employee_id})
    {
        var data = {
            "employee_id": employee_id}
        var rs = await axios.post("/api/delete_employee", data)
        setF5(!f5)
    }
    async function addEmployee()
    {
        var data ={
            "department_id" : department_id,
            "employee_name": employee_name,
            "taxid": taxid,
            "employee_phone": employee_phone,
            "employee_email": employee_email,
            "bankid" : bankid,
            "bankname" : bankname,
            "employee_address": employee_address,
            "employee_sex": employee_sex,
            "employee_exp": employee_exp,
            "employee_salary": employee_salary,
            "employee_coef": employee_coef
        }
        console.log(data)
        var rs = await axios.post("/api/add_employee", data)
        setDepartmentId("")
        setEmployName("")
        setTaxId("")
        setEmPhone("")
        setEmEmail("")
        setBankId("")
        setBankName("")
        setEmAddress("")
        setEmploySex("")
        setEmployExp(0)
        setEmploySalary(0)
        setEmployCoef(0)

        setF5(!f5)

        
    }
    async function editEmploy (item) {
        
        setEmploySelected(item);
        setEmployId(item.employee_id)
        setEmployName(item.employee_name)
        setTaxId(item.employee_taxid.tax_id)
        setEmPhone(item.employee_phone)
        setEmEmail(item.employee_email)
        setEmAddress(item.employee_address)
        setEmploySex(item.employee_sex)
        setEmploySalary(item.employee_salary)
        setEmployExp(item.employee_exp)
        setEmployCoef(item.employee_coef)
        setBankId(item.bankid)
        setBankName(item.bankname)
        setDepartmentId(item.department_id.department_id)
        
        
        
    }

    async function editEmployeeApi () {
        var data = {
        "department_id": department_id ,
        "employee_name": employee_name,
        "employee_id": employselected.employee_id,
        "taxid": taxid,
        "employee_phone": employee_phone,
        "employee_email": employee_email,
        "bankid" : bankid,
        "bankname" : bankname,
        "employee_address": employee_address,
        "employee_sex": employee_sex,
        "employee_exp": employee_exp,
        "employee_salary": employee_salary,
        "employee_coef": employee_coef}
        var rs = await axios.post("/api/edit_employee", data)
        setF5(!f5)

        console.log(data)
    }


    return (
        <>
            {/* Delete */}
             {/* Confirm Delete */}
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
                    <CButton color="warning" onClick={() => {deleteEmploy(employselected); setWarning(!warning)}}>X??a</CButton>{' '}
                    <CButton color="secondary" onClick={() => setWarning(!warning)}>H???y</CButton>
                </CModalFooter>

            </CModal>

            {/* Edit nhan vien */}
            <CModal 
                show={edit_employ} 
                onClose={() => setEditEmploy(!edit_employ)}
                color="info"
                size="lg"
                centered
                >
                <CModalHeader closeButton className="text-center">
                    <CModalTitle className="w-100 addcustom ">S???a nh??n vi??n</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="form-horizontal">
                        
                            
                            <CFormGroup>
                                <CLabel >T??n nh??n vi??n</CLabel>
                                <CInput id="text-input" name="text-input" value={employee_name} onChange={(e) => setEmployName(e.target.value)} />
                            </CFormGroup>
                            
                       
                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Chi nh??nh</CLabel>
                                {
                                    account.type == "Chiefmanager" ? <>
                                        <CSelect value={branch_id} onChange={(e) => setBranchId(e.target.value)}>
                                            <option value="" >Ch???n chi nh??nh</option>
                                            {
                                                branchs.map((item) => 
                                                    <option value={item.branch_id}>{item.branch_location}</option>
                                                )
                                            }
                                        </CSelect>
                                    </> : <>
                                        <CInput id="text-input" name="text-input" value={account.branch.branch_location} readOnly/>
                                    </>
                                }
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Ten phong ban</CLabel>
                                <CSelect value={department_id} onChange={(e) => setDepartmentId(e.target.value)}>
                                    <option value="">Ch???n ph??ng ban</option>
                                    {
                                        departments.map((item) => 
                                            <option value={item.department_id} >{item.department_name}</option>
                                        )
                                    }
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="2">
                            <CFormGroup>
                                <CLabel >Gi???i t??nh</CLabel>
                                <CInput id="text-input" name="text-input" value={employee_sex} onChange={(e) => setEmploySex(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="4">
                            <CFormGroup>
                                <CLabel >S??? ??i???n tho???i</CLabel>
                                <CInput id="text-input" name="text-input" value={employee_phone} onChange={(e) => setEmPhone(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Email</CLabel>
                                <CInput id="text-input" name="text-input" value={employee_email}  onChange={(e) => setEmEmail(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup>
                            <CLabel >Dia chi</CLabel>
                            <CInput id="text-input" name="text-input"  value={employee_address} onChange={ (e) => setEmAddress(e.target.value)} />
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >L????ng h??ng th??ng </CLabel>
                                <CInput type="number" value={employee_salary} onChange={ (e) => setEmploySalary(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >S??? n??m kinh nghi???m</CLabel>
                                <CInput type="number" value={employee_exp} onChange={ (e) => setEmployExp(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel >Thue</CLabel>
                                <CSelect value={taxid} onChange={(e) => setTaxId(e.target.value)}>
                                    <option value="">Chon thu???</option>
                                    {
                                        taxs.map((item) => 
                                            <option value={item.tax_id} >{item.taxtype}</option>
                                        )
                                    }
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Ng??n h??ng</CLabel>
                                <CInput id="text-input" name="text-input" value={bankname} onChange={ (e) => setBankName(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >M?? th??? ng??n h??ng</CLabel>
                                <CInput id="text-input" name="text-input" value={bankid} onChange={ (e) => setBankId(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="primary" onClick={() => editEmployeeApi()}>
                    S???a
                    </CButton>
                    <CButton color="secondary" onClick={() => setEditEmploy(!edit_employ)}>
                    H???y
                    </CButton>
                </CModalFooter>
                </CModal>


            {/* Add nhan vien */}
            <CModal 
                show={add_employ} 
                onClose={() => setAddEmployee(!add_employ)}
                color="primary"
                size="lg"
                centered
                >
                <CModalHeader closeButton className="text-center">
                    <CModalTitle className="w-100 addcustom ">Th??m nh??n vi??n</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="form-horizontal">
                        
                            
                            <CFormGroup>
                                <CLabel >T??n nh??n vi??n</CLabel>
                                <CInput id="text-input" name="text-input" value={employee_name} onChange={(e) => setEmployName(e.target.value)} />
                            </CFormGroup>
                            
                       
                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Chi nh??nh</CLabel>
                                {
                                    account.type == "Chiefmanager" ? <>
                                        <CSelect value={branch_id} onChange={(e) => setBranchId(e.target.value)}>
                                            <option value="" >Ch???n chi nh??nh</option>
                                            {
                                                branchs.map((item) => 
                                                    <option value={item.branch_id}>{item.branch_location}</option>
                                                )
                                            }
                                        </CSelect>
                                    </> : <>
                                        <CInput id="text-input" name="text-input" value={account.branch.branch_location} readOnly/>
                                    </>
                                }
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >T??n ph??ng ban</CLabel>
                                <CSelect value={department_id} onChange={(e) => setDepartmentId(e.target.value)}>
                                    <option value="">Ch???n ph??ng ban</option>
                                    {
                                        departments.map((item) => 
                                            <option value={item.department_id} >{item.department_name}</option>
                                        )
                                    }
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="2">
                            <CFormGroup>
                                <CLabel >Gi???i t??nh</CLabel>
                                <CInput id="text-input" name="text-input" value={employee_sex} onChange={(e) => setEmploySex(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="4">
                            <CFormGroup>
                                <CLabel >S??? ??i???n tho???i</CLabel>
                                <CInput id="text-input" name="text-input" value={employee_phone} onChange={(e) => setEmPhone(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Email</CLabel>
                                <CInput id="text-input" name="text-input" value={employee_email}  onChange={(e) => setEmEmail(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup>
                            <CLabel >?????a ch???</CLabel>
                            <CInput id="text-input" name="text-input"  value={employee_address} onChange={ (e) => setEmAddress(e.target.value)} />
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >L????ng h???ng th??ng </CLabel>
                                <CInput type="number" value={employee_salary} onChange={ (e) => setEmploySalary(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >S??? n??m kinh nghi???m</CLabel>
                                <CInput type="number" value={employee_exp} onChange={ (e) => setEmployExp(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel >Thu???</CLabel>
                                <CSelect value={taxid} onChange={(e) => setTaxId(e.target.value)}>
                                    <option value="">Ch???n thu???</option>
                                    {
                                        taxs.map((item) => 
                                            <option value={item.tax_id} >{item.taxtype}</option>
                                        )
                                    }
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Ng??n h??ng</CLabel>
                                <CInput id="text-input" name="text-input" value={bankname} onChange={ (e) => setBankName(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >M?? th??? ng??n h??ng</CLabel>
                                <CInput id="number" name="number" value={bankid} onChange={ (e) => setBankId(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="primary" onClick={() => addEmployee()}>
                    Th??m
                    </CButton>
                    <CButton color="secondary" onClick={() => setAddEmployee(!add_employ)}>
                    H???y
                    </CButton>
                </CModalFooter>
                </CModal>

           {/* Xem chi ti???t */}
            <CModal 
                show={viewemployee} 
                onClose={() => setViewEm(!viewemployee)}
                color="success"
                size="lg"
                centered
                >
                <CModalHeader closeButton className="text-center">
                    <CModalTitle className="w-100 addcustom ">Xem chi ti???t nh??n vi??n</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="form-horizontal">
                        <CFormGroup row className="my-0">
                            <CCol xs="4">
                            <CFormGroup>
                                <CLabel >M?? nh??n vi??n</CLabel>
                                <CInput  value={employselected.employee_id} onChange={(e) => setEmployId(e.target.value)} readOnly/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="8">
                            <CFormGroup>
                                <CLabel >T??n nh??n vi??n</CLabel>
                                <CInput value={employselected.employee_name} onChange={(e) => setEmployName(e.target.value)} readOnly/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >T??n ph??ng ban</CLabel>
                                <CInput  value={employselected.department_id ? employselected.department_id.department_name : ""} onChange={(e) => setDepartmentName(e.target.value)} readOnly/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Chi nh??nh</CLabel>
                                <CInput value={employselected.department_id ? employselected.department_id.branch.branch_location: ""} onChange={(e) => setBranchLocation(e.target.value)} readOnly/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="2">
                            <CFormGroup>
                                <CLabel >Gi???i t??nh</CLabel>
                                <CInput  value={employselected.employee_sex} readOnly/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="4">
                            <CFormGroup>
                                <CLabel >S??? ??i???n tho???i</CLabel>
                                <CInput value={employselected.employee_phone}  readOnly/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Email</CLabel>
                                <CInput value={employselected.employee_email}  readOnly/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup>
                            <CLabel >?????a ch???</CLabel>
                            <CInput value={employselected.employee_address} readOnly />
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >L????ng h???ng th??ng (VND) </CLabel>
                                <CInput  value={employselected.employee_salary ? employselected.employee_salary.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : ""}  readOnly/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >S??? n??m kinh nghi???m</CLabel>
                                <CInput value={employselected.employee_exp}readOnly/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Ng??n h??ng</CLabel>
                                <CInput value={employselected.bankname}  readOnly/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >M?? th??? ng??n h??ng</CLabel>
                                <CInput value={employselected.bankid}  readOnly/>
                            </CFormGroup>
                            </CCol>
                            
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Thu???</CLabel>
                                <CInput  value={employselected.employee_taxid ? employselected.employee_taxid.taxtype: ""}  readOnly/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Thu??? su???t (%)</CLabel>
                                <CInput value={employselected.employee_taxid ? employselected.employee_taxid.percentage : ""} readOnly/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel >T???ng thu??? ph???i nh???p</CLabel>
                            <CInput value={ employselected.employee_taxid ? (employselected.employee_salary*employselected.employee_taxid.percentage/100).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : "" } readOnly />
                        </CFormGroup>
                    
                    </CForm>
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="secondary" onClick={() => setViewEm(!viewemployee)}>
                    H???y
                    </CButton>
                </CModalFooter>
                </CModal>

            {/* Table */}
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CButton color="primary" onClick={() => setAddEmployee(!add_employ)} >Th??m nh??n vi??n</CButton>
                        </CCardHeader>
                        <CCardBody>
                            <table className="table table-striped text-center">
                                <thead>
                                    <th scope="col">  M?? nh??n vi??n </th>
                                    <th scope="col">  Ph??ng ban </th>
                                    <th scope="col">  Chi nh??nh</th>
                                    <th scope="col">  T??n nh??n vi??n</th>
                                    <th>Ch???c n??ng</th>
                                </thead>
                                <tbody>
                                    {
                                        employees.map ( (item) => 
                                            <tr>
                                                    <td scope="row">{item.employee_id}</td>
                                                    <td scope="row">{item.department_id.department_name}</td>
                                                    <td scope="row">{item.department_id.branch.branch_location}</td>
                                                    <td scope="row">{item.employee_name}</td>
                                                    <td>
                                                        <CButtonGroup>
                                                            <CButton color="success" onClick = { () => {setEmploySelected(item); setViewEm(!viewemployee)}}>Xem chi ti???t</CButton>
                                                            <CButton color="info"  onClick = { () => {editEmploy(item); setEditEmploy(!edit_employ)}} >S???a</CButton>
                                                            <CButton color="danger" onClick = { () => {setEmploySelected(item); setWarning(!warning)}}>X??a</CButton>
                                                       </CButtonGroup>
                                                    </td>
                                             </tr>
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
export default ManageEmployee