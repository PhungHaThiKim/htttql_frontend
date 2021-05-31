import React, { useEffect, useState } from 'react'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CSelect,
    CLabel,
    CButton,
} from '@coreui/react'
import useAccount from 'src/useAccount';
import axios from 'axios'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


const ReportBranch = () => {
    const {account, saveAccount} = useAccount()

    const [branch_id, setBranchId] = useState(account.branch.branch_id)

    const [reportinouts, setReportInOuts] = React.useState([])
    const [selectreport, setSelectReport] = React.useState("")
    const [report, setReport] = React.useState({})

    const canvasRef = React.useRef(null)

    const exportPDF = (element) => {
        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF()
            pdf.addImage(imgData, 'JPEG', 0, 0)
            pdf.save(`baocaotaichinh-${branch_id}-${selectreport}.pdf`)
        })
    }


    useEffect(() => {
        getInOutByBranch()
    }, [])

    useEffect(() => {
        getReport()
    }, [selectreport])

    async function getReport() {
        var cp = {}
        for(var i=0; i<reportinouts.length; i++) {
            if (reportinouts[i].date == selectreport) {
                cp = {...reportinouts[i]}
                console.log(cp)
                
                break
            }
        }
        setReport(cp)
    }

    async function getInOutByBranch () {
        var rq = {
            branchid: branch_id,
            userid: account.user_id
        }
        var rs = await axios.post("/api/statisticinoutcomebybranch", rq)
        var rs = rs.data
        var data = rs.data
        var reporttmp = [...data.statistic]
        setReportInOuts(reporttmp)
    }

    return (
    <>
        <CRow>
            <CCol>
                <CCard className="m-auto" style={{width: "54%"}}>
                    <CCardHeader>
                        <CRow>
                            <CCol>
                                <CSelect value={selectreport} onChange={(e) => setSelectReport(e.target.value)}>
                                    <option value="">Chon thang</option>
                                    {
                                        reportinouts.map((item) => 
                                            <option value={item.date}>{item.date}</option>
                                        )
                                    }
                                </CSelect>
                            </CCol>
                            <CCol xs="1">
                                <CButton color="success" onClick={() => exportPDF(canvasRef.current)}>PDF</CButton>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <div className="p-5" ref={canvasRef}>
                        <h1 className="text-center">Báo cáo tài chính</h1>
                        <h2 className="text-center">Chi nhánh: {account.branch.branch_location}</h2>
                        <h3 className="text-center font-italic">Tháng: {selectreport}</h3>
                        <table class="table table-striped text-center table-bordered mt-5 h4">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Noi dung</th>
                                    <th scope="col">Ly ke het thang {selectreport}</th>
                                </tr>
                                <tr>
                                    <th colSpan="3" className="text-left">A. Phan Thu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td className="text-left">Ban san pham</td>
                                    <td className="text-right">{report.value ? report.value.sellbill.toLocaleString('en-US')+" VNĐ" : "0"}</td>
                                </tr>
                                <tr className="font-weight-bold">
                                    <td colSpan="2">Tong</td>
                                    <td className="text-right">{report.value ? report.value.sellbill.toLocaleString('en-US')+" VNĐ" : "0"}</td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan="3" className="text-left">B. Phan chi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td className="text-left">Luong nhan vien</td>
                                    <td className="text-right">{report.value ? report.value.salary.toLocaleString('en-US')+" VNĐ" : "0"}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td className="text-left">Chi phi phat sinh</td>
                                    <td className="text-right">{report.value ? report.value.reciept.toLocaleString('en-US')+" VNĐ" : "0"}</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td className="text-left">Mua san pham</td>
                                    <td className="text-right">{report.value ? (0-report.value.buybill).toLocaleString('en-US')+" VNĐ" : "0"}</td>
                                </tr>
                                <tr className="font-weight-bold">
                                    <td colSpan="2">Tong</td>
                                    <td className="text-right">{report.value ? (report.value.salary+report.value.reciept-report.value.buybill).toLocaleString('en-US')+" VNĐ" : "0"}</td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan="3" className="text-left">C. Thue</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td className="text-left">Thue gia tri gia tang</td>
                                    <td className="text-right">{report.value ? report.value.gtgt.toLocaleString('en-US')+" VNĐ" : "0"}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td className="text-left">Thue thu nhap ca nhan</td>
                                    <td className="text-right">{report.value ? report.value.tncn.toLocaleString('en-US')+" VNĐ" : "0"}</td>
                                </tr>
                                <tr className="font-weight-bold">
                                    <td colSpan="2">Tong</td>
                                    <td className="text-right">{report.value ? (report.value.tncn+report.value.gtgt).toLocaleString('en-US')+" VNĐ" : "0"}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr className="font-weight-bold">
                                    <td colSpan="2">D. Quy tien:</td>
                                    <td className="text-right">{report.value ? report.value.interest.toLocaleString('en-US')+" VNĐ" : "0"}</td>
                                </tr>
                                
                            </tbody>
                        </table>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </>
    )
}

export default ReportBranch