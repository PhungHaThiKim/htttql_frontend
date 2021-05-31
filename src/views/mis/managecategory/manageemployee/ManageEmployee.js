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
    const [branch_id, setBranchId] = useState("")
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
    useEffect (() =>
    {
        getTaxs()
        getDepartment()
        getEmployee()
    } , [f5]
    )

    async function getDepartment()
    {

        var rs = await axios.post("/api/get_department")
        var rs = rs.data
        var data = rs.data

        console.log(rs)

        setDepartments(data)
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
                    Bạn có chắc chắn muốn xóa?
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="warning" onClick={() => {deleteEmploy(employselected); setWarning(!warning)}}>Xóa</CButton>{' '}
                    <CButton color="secondary" onClick={() => setWarning(!warning)}>Hủy</CButton>
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
                    <CModalTitle className="w-100 addcustom ">Sua nhan vien</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="form-horizontal">
                        
                            
                            <CFormGroup>
                                <CLabel >Tên nhân viên</CLabel>
                                <CInput id="text-input" name="text-input" value={employee_name} onChange={(e) => setEmployName(e.target.value)} />
                            </CFormGroup>
                            
                       
                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Ten phong ban</CLabel>
                                <CSelect value={department_id} onChange={(e) => setDepartmentId(e.target.value)}>
                                    <option value="">Chon phong ban</option>
                                    {
                                        departments.map((item) => 
                                            <option value={item.department_id} >{item.department_name}</option>
                                        )
                                    }
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Chi nhanh</CLabel>
                                <CInput id="text-input" name="text-input" value={account.branch.branch_location} readOnly/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="2">
                            <CFormGroup>
                                <CLabel >Gioi tinh</CLabel>
                                <CInput id="text-input" name="text-input" value={employee_sex} onChange={(e) => setEmploySex(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="4">
                            <CFormGroup>
                                <CLabel >So dien thoai</CLabel>
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
                                <CLabel >Luong hang thang </CLabel>
                                <CInput type="number" value={employee_salary} onChange={ (e) => setEmploySalary(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >So nam kinh nghiem</CLabel>
                                <CInput type="number" value={employee_exp} onChange={ (e) => setEmployExp(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel >Thue</CLabel>
                                <CSelect value={taxid} onChange={(e) => setTaxId(e.target.value)}>
                                    <option value="">Chon thue</option>
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
                                <CLabel >Ngan hang</CLabel>
                                <CInput id="text-input" name="text-input" value={bankname} onChange={ (e) => setBankName(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Ma the ngan hang</CLabel>
                                <CInput id="text-input" name="text-input" value={bankid} onChange={ (e) => setBankId(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="primary" onClick={() => editEmployeeApi()}>
                    Sua
                    </CButton>
                    <CButton color="secondary" onClick={() => setEditEmploy(!edit_employ)}>
                    Hủy
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
                    <CModalTitle className="w-100 addcustom ">Them nhan vien</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="form-horizontal">
                        
                            
                            <CFormGroup>
                                <CLabel >Tên nhân viên</CLabel>
                                <CInput id="text-input" name="text-input" value={employee_name} onChange={(e) => setEmployName(e.target.value)} />
                            </CFormGroup>
                            
                       
                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Ten phong ban</CLabel>
                                <CSelect value={department_id} onChange={(e) => setDepartmentId(e.target.value)}>
                                    <option value="">Chon phong ban</option>
                                    {
                                        departments.map((item) => 
                                            <option value={item.department_id} >{item.department_name}</option>
                                        )
                                    }
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Chi nhanh</CLabel>
                                <CInput id="text-input" name="text-input" value={account.branch.branch_location} readOnly/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="2">
                            <CFormGroup>
                                <CLabel >Gioi tinh</CLabel>
                                <CInput id="text-input" name="text-input" value={employee_sex} onChange={(e) => setEmploySex(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="4">
                            <CFormGroup>
                                <CLabel >So dien thoai</CLabel>
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
                                <CLabel >Luong hang thang </CLabel>
                                <CInput type="number" value={employee_salary} onChange={ (e) => setEmploySalary(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >So nam kinh nghiem</CLabel>
                                <CInput type="number" value={employee_exp} onChange={ (e) => setEmployExp(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel >Thue</CLabel>
                                <CSelect value={taxid} onChange={(e) => setTaxId(e.target.value)}>
                                    <option value="">Chon thue</option>
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
                                <CLabel >Ngan hang</CLabel>
                                <CInput id="text-input" name="text-input" value={bankname} onChange={ (e) => setBankName(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Ma the ngan hang</CLabel>
                                <CInput id="number" name="number" value={bankid} onChange={ (e) => setBankId(e.target.value)}/>
                            </CFormGroup>
                            </CCol>
                            
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="primary" onClick={() => addEmployee()}>
                    Them
                    </CButton>
                    <CButton color="secondary" onClick={() => setAddEmployee(!add_employ)}>
                    Hủy
                    </CButton>
                </CModalFooter>
                </CModal>

           {/* Xem chi tiết */}
            <CModal 
                show={viewemployee} 
                onClose={() => setViewEm(!viewemployee)}
                color="success"
                size="lg"
                centered
                >
                <CModalHeader closeButton className="text-center">
                    <CModalTitle className="w-100 addcustom ">Xem chi tiết nhân viên</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="form-horizontal">
                        <CFormGroup row className="my-0">
                            <CCol xs="4">
                            <CFormGroup>
                                <CLabel >Mã nhân viên</CLabel>
                                <CInput  value={employselected.employee_id} onChange={(e) => setEmployId(e.target.value)} readOnly/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="8">
                            <CFormGroup>
                                <CLabel >Tên nhân viên</CLabel>
                                <CInput value={employselected.employee_name} onChange={(e) => setEmployName(e.target.value)} readOnly/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Ten phong ban</CLabel>
                                <CInput  value={employselected.department_id ? employselected.department_id.department_name : ""} onChange={(e) => setDepartmentName(e.target.value)} readOnly/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Chi nhanh</CLabel>
                                <CInput value={employselected.department_id ? employselected.department_id.branch.branch_location: ""} onChange={(e) => setBranchLocation(e.target.value)} readOnly/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="2">
                            <CFormGroup>
                                <CLabel >Gioi tinh</CLabel>
                                <CInput  value={employselected.employee_sex} readOnly/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="4">
                            <CFormGroup>
                                <CLabel >So dien thoai</CLabel>
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
                            <CLabel >Dia chi</CLabel>
                            <CInput value={employselected.employee_address} readOnly />
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Luong hang thang (VND) </CLabel>
                                <CInput  value={employselected.employee_salary ? employselected.employee_salary.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : ""}  readOnly/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >So nam kinh nghiem</CLabel>
                                <CInput value={employselected.employee_exp}readOnly/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Ngan hang</CLabel>
                                <CInput value={employselected.bankname}  readOnly/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Ma the ngan hang</CLabel>
                                <CInput value={employselected.bankid}  readOnly/>
                            </CFormGroup>
                            </CCol>
                            
                        </CFormGroup>

                        <CFormGroup row className="my-0">
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Thue</CLabel>
                                <CInput  value={employselected.employee_taxid ? employselected.employee_taxid.taxtype: ""}  readOnly/>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel >Thue suat (%)</CLabel>
                                <CInput value={employselected.employee_taxid ? employselected.employee_taxid.percentage : ""} readOnly/>
                            </CFormGroup>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel >Tong thue phai nop</CLabel>
                            <CInput value={ employselected.employee_taxid ? (employselected.employee_salary*employselected.employee_taxid.percentage/100).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : "" } readOnly />
                        </CFormGroup>
                    
                    </CForm>
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="secondary" onClick={() => setViewEm(!viewemployee)}>
                    Hủy
                    </CButton>
                </CModalFooter>
                </CModal>

            {/* Table */}
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CButton color="primary" onClick={() => setAddEmployee(!add_employ)} >Thêm nhân viên</CButton>
                        </CCardHeader>
                        <CCardBody>
                            <table className="table table-striped text-center">
                                <thead>
                                    <th scope="col">  Mã nhân viên </th>
                                    <th scope="col">  Phòng ban </th>
                                    <th scope="col">  Chi nhánh</th>
                                    <th scope="col">  Tên nhân viên</th>
                                    <th>Chức năng</th>
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
                                                            <CButton color="success" onClick = { () => {setEmploySelected(item); setViewEm(!viewemployee)}}>Xem chi tiết</CButton>
                                                            <CButton color="info"  onClick = { () => {editEmploy(item); setEditEmploy(!edit_employ)}} >Sửa</CButton>
                                                            <CButton color="danger" onClick = { () => {setEmploySelected(item); setWarning(!warning)}}>Xóa</CButton>
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