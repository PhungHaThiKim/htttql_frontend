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
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import moment from 'moment'

const ManageBuyBill = () => {

    const {account, saveAccount} = useAccount() 

    const [f5, setF5] = useState(false)

    const [viewbill, setViewBill] = useState(false)
    const [addbill, setAddbill] = useState(false)
    const [buybillselected, setBuyBillSelected] = useState(null)

    const [partners, setPartners] = useState([])
    const [partner_id, setPartnerId] = useState("")
    const [product_id, setProductId] = useState("")
    const [productchoose, setProductChoose] = useState({})
    const [time, setBillDate] = useState("")
    const [product_price, setProductPrice] = useState(0)
    const [product_num, setProductNum] = useState(0)
    const [productpartner, setProductPartner] = useState([])
    const [list_product, setListProduct] = useState([])
    const [payment, setPayment] = useState("")

    const [buybill, setBuyBill] = useState(
        []
    )
    useEffect (() =>
    {
        getPartner()
        getBuyBill()
    } , [f5]
    )

    async function getBuyBill()
    {
        var rs = await axios.post("/api/getbuybill")
        var rs = rs.data
        var data = rs.data
        
        for(var i=0; i<data.length; i++) {
            var products = data[i].list_product
            var total_price = 0.0
            var total_num = 0
            for (var j=0; j<products.length; j++) {
                total_num += products[j].numinbill
                total_price += (products[j].numinbill*products[j].inprice)
            }
            data[i].total_price = total_price
            data[i].total_num = total_num
        }
        console.log(data)

        setBuyBill(data)

    }

    async function choosePartner(partnerid) {
        if (partnerid != "") {
            setPartnerId(partnerid)
            await getProductPartner(partnerid)
        } else {
            setPartnerId("")
            setProductId("")
            setProductChoose({})
            setProductPartner([])
        }
    }

    async function chooseProduct(product_id) {
        if (product_id != "") {
            setProductId(product_id)
            for (var i=0; i<productpartner.length; i++){
                if (productpartner[i].product_id == product_id) {
                    setProductPrice(productpartner[i].ctrprice)
                    setProductChoose(productpartner[i])
                    break
                }
            }
        } else {
            setProductId("")
            setProductChoose({})
        }
    }

    async function addProductView() {
        var producttmp = [...list_product]  //copy array
        var check = false
        for (var i = 0; i<producttmp.length; i++) {
            if (producttmp[i].product.product_id == productchoose.product_id) {
                check = true
                producttmp[i].number += parseInt(product_num)
                break;
            }
        }
        if (check == false) {
            producttmp.push({
                "product": productchoose,
                "number": parseInt(product_num),
                "price": parseFloat(product_price)
            })
        }
        console.log(producttmp)
        setListProduct(producttmp)
    }

    async function removeProductView(index) {
        var producttmp = []  //copy array
        for (var i=0; i<list_product.length; i++) {
            if (i!=index) {
                producttmp.push(list_product[i])
            }
        }
        setListProduct(producttmp)
    }

    async function getPartner ()
    {
        var rs = await axios.post("/api/getpartners")
        var rs = rs.data
        var data = rs.data // phai nhu nay ms lay dc data
        console.log(rs)
        setPartners(data) // truyen data vao bien
    }

    async function getProductPartner(partnerid) {
        var rq = {
            "partnerid": partnerid
        }
        
        console.log(rq)
        var rs = await axios.post("/api/getproductsbypartner", rq)
        var rs = rs.data
        var data = rs.data // phai nhu nay ms lay dc data
        console.log(data)
        setProductPartner(data) // truyen data vao bien
    }

    const canvasRef = React.useRef(null)

    const exportPDF = (element) => {
        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF()
            pdf.addImage(imgData, 'JPEG', 0, 0)
            pdf.save(`hoadonmua-${buybillselected.documentid.id}.pdf`)
        })
    }

    async function addBuyBill() {
        var rq = {
            "userid": account.user_id,
            "time": moment(time).format("DD/MM/YYYY"),
            "list_product": [],
            "list_price": [],
            "number_product": [],
            "name": "H??a ????n mua",
            "content": "H??a ????n mua",
            "payment": payment
        }

        for (var i=0; i<list_product.length; i++) {
            rq.list_product.push(list_product[i].product.product_id)
            rq.list_price.push(parseFloat(list_product[i].price))
            rq.number_product.push(parseInt(list_product[i].number))
        }

        console.log(rq)
        var rs = await axios.post("/api/addbuybill", rq)
        setBillDate("")
        setListProduct([])
        setPayment("")
        setPartnerId("")
        setProductId("")
        setProductPrice(0)
        setProductNum(0)
        setF5(!f5)

    }

    return (
        <>
            {/* Add bill */}
            <CModal 
              show={addbill} 
              onClose={() => setAddbill(!addbill)}
              color="primary"
              size="lg"
              centered
            >
                <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">Th??m h??a ????n mua</CModalTitle>
              </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow>
                            <CCol>
                                <CFormGroup>
                                    <CLabel>Doi tac</CLabel>
                                    <CSelect value={partner_id} onChange={(e) => choosePartner(e.target.value)}>
                                        <option value="" >Ch???n ?????i t??c</option>
                                        {
                                            partners.map((item) => 
                                                <option value={item.partner_id}>{item.partnername}</option>
                                            )
                                        }
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol>
                                <CFormGroup>
                                    <CLabel>Ng??y mua</CLabel>
                                    <CInput type="date" value={time} onChange={(e) => setBillDate(e.target.value)}></CInput>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="7">
                                <CLabel>S???n ph???m</CLabel>
                            </CCol>
                            <CCol>
                                <CLabel>S??? l?????ng</CLabel>
                            </CCol>
                            
                        </CRow>
                        <CRow>
                            <CCol  xs="7">
                                <CSelect value={product_id} onChange={(e) => chooseProduct(e.target.value)}>
                                    <option value="">Ch???n s???n ph???m</option>
                                    {
                                        productpartner.map((item) => 
                                            <option value={item.product_id}>{item.name}</option>
                                        )
                                    }
                                </CSelect>
                            </CCol>
                            <CCol>
                                <CInput type="number" value={product_num} onChange={(e) => setProductNum(e.target.value)}></CInput>
                            </CCol>
                            {/* <CCol xs="2">
                                <CButton color="success" onClick={(e) => addProductView()}>Th??m</CButton>
                            </CCol> */}
                        </CRow>
                        <br></br>
                        <CRow>
                            <CCol>
                                <CLabel>Gi?? (VN??)</CLabel>
                            </CCol>
                        
                            <CCol>
                                <CLabel>H??nh th???c thanh to??n</CLabel>
                            </CCol>
                            <CCol xs="2">
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CInput type="number" value={product_price} onChange={(e) => setProductPrice(e.target.value)}></CInput>
                            </CCol>
                            <CCol>
                                <CInput type="text-input" value={payment} onChange={(e) => setPayment(e.target.value)}></CInput>
                            </CCol>
                            <CCol xs="2">
                                <CButton color="success" onClick={(e) => addProductView()}>Th??m</CButton>
                            </CCol>
                        </CRow>
                        
                    </CForm>

                    <CRow>
                        <CCol>
                        <table className="table table-striped text-center mt-3">
                            <thead>
                                <th scope="col">  # </th>
                                <th scope="col">  S???n ph???m </th>
                                <th scope="col">  S??? l?????ng s???n ph???m </th>
                                <th scope="col">  Gi?? </th>
                                <th scope="col">  x </th>
                            </thead>
                            <tbody>
                                {
                                    list_product.map((item, idx) => 
                                        <>
                                            <tr>
                                                <td scope="row">{idx+1}</td>
                                                <td>{item.product.name}</td>
                                                <td>{item.number}</td>
                                                <td>{item.price}</td>
                                                <td onClick={() => removeProductView(idx)}><CButton color="danger">x</CButton></td>
                                            </tr>
                                        </>
                                    )
                                }
                            </tbody>
                        </table>
                        </CCol>
                    </CRow>
                   
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="primary" onClick={() => addBuyBill()}>Th??m h??a ????n</CButton>{' '}
                    <CButton color="secondary" onClick={() => setAddbill(!addbill)}>H???y</CButton>
              </CModalFooter>
            </CModal>

            {/* View bill */}
            <CModal 
              show={viewbill} 
              onClose={() => setViewBill(!viewbill)}
              color="primary"
              size="lg"
              centered
            >
                <CModalBody>
                <div class="page-content container">
                    <div class="page-header text-blue-d2">
                        <h1 class="page-title text-secondary-d1">
                            M??: 
                            <small class="page-info">
                                <i class="fa fa-angle-double-right text-80"></i>
                                {buybillselected ? buybillselected.documentid.id: ""}
                            </small>
                        </h1>

                        <div class="page-tools">
                            <div class="action-buttons">
{/*                         
                                <button onClick={() => exportPDF(canvasRef.current)} class="btn btn-success mx-1px text-95" color="success" data-title="PDF">
                                    <i class="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
                                    PDF
                                </button> */}
                                <button onClick={() => setViewBill(!viewbill)} class="btn mx-1px text-95 btn-secondary" href="#" data-title="Print">
                                    <i class="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
                                    H???y
                                </button>
                            </div>
                        </div>
                    </div>
                    <div ref={canvasRef}>
                    <div class="container px-0 pt-2">
                        <div class="row mt-4">
                            <div class="col-12 col-lg-10 offset-lg-1">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="text-center text-150">
                                            <i class="fa fa-book fa-2x text-success-m2 mr-1"></i>
                                            <span class="text-default-d3"> H??A ????N MUA H??NG</span>
                                        </div>
                                    </div>
                                </div>

                                <hr class="row brc-default-l1 mx-n1 mb-4" />

                                <div class="row">
                                    <div class="col-sm-8">
                                        <div>
                                            <span class="text-sm text-grey-m2 align-middle">????n v??? b??n:</span>
                                            <span class="text-600 text-110 text-blue align-middle"> {buybillselected ? buybillselected.list_product[0].partner_id.partnername : ""}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-grey-m2 align-middle">M?? s??? thu???:</span>
                                            <span class="text-600 text-110 text-blue align-middle"> {buybillselected ? buybillselected.list_product[0].partner_id.taxid : ""}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-grey-m2 align-middle">?????a ch???: </span>
                                            <span class="text-600 text-110 text-blue align-middle"> {buybillselected ? buybillselected.list_product[0].partner_id.address: ""}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-grey-m2 align-middle">S??? ??i???n tho???i: </span>
                                            <span class="text-600 text-110 text-blue align-middle"> {buybillselected ? buybillselected.list_product[0].partner_id.phone: ""}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-grey-m2 align-middle">Email: </span>
                                            <span class="text-600 text-110 text-blue align-middle"> {buybillselected ? buybillselected.list_product[0].partner_id.email: ""}</span>
                                        </div>
                                        
                                    </div>

                                    <div class="text-95 col-sm-4 align-self-start d-sm-flex justify-content-end">
                                        <hr class="d-sm-none" />
                                        <div class="text-grey-m2">
                                            <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                                {buybillselected ? buybillselected.documentid.name: ""}
                                            </div>

                                            <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-90">ID:</span>{buybillselected ? buybillselected.documentid.id: ""}</div>

                                            <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-90">Ng??y mua: </span> {buybillselected ? buybillselected.documentid.time : ""}</div>

                                            <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-90">Thanh to??n: </span> <span class="badge badge-warning badge-pill px-25">{buybillselected ? buybillselected.payment : ""}</span></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-4">
                                    <div class="row text-600 text-white bgc-default-tp1 py-25">
                                        <div class="d-none d-sm-block col-1">#</div>
                                        <div class="col-9 col-sm-4">S???n ph???m</div>
                                        <div class="d-none d-sm-block col-4 col-sm-2">S??? l?????ng</div>
                                        <div class="d-none d-sm-block col-sm-2">Gi?? mua</div>
                                        <div class="col-3">T???ng gi??</div>
                                    </div>

                                    <div class="text-95 text-secondary-d3">
                                        <div class="row mb-2 mb-sm-0 py-25">
                                            {
                                                buybillselected ? buybillselected.list_product.map((item, idx) => 
                                                 <>
                                                    <div class="d-none d-sm-block col-1">{idx+1}</div>
                                                    <div class="col-9 col-sm-4">{item.name}</div>
                                                    <div class="d-none d-sm-block text-center col-1">{item.numinbill}</div>
                                                    <div class="d-none d-sm-block text-right col-3 text-95">{item.inprice.toLocaleString('en-US')+"VN??"}</div>
                                                    <div class="col-3 text-right text-secondary-d2">{(item.numinbill * item.inprice).toLocaleString('en-US')+"VN??"}</div>
                                                </> 
                                                ) : ""
                                            }
                                            
                                        </div>
                                    </div>

                                    <div class="row border-b-2 brc-default-l2"></div>

                                    <div class="row mt-3">
                                        <div class="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">
                                            L??u ??: Gi?? s???n ph???m ???? bao g???m thu???
                                        </div>

                                        <div class="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                                    

                                            <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                                                <div class="col-3 text-right">
                                                    T???ng
                                                </div>
                                                <div class="col-9">
                                                    <span class="text-150 text-success-d3 opacity-2">{(buybillselected ? buybillselected.documentid.amount : "").toLocaleString('en-US')+" VN??"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <hr />

                                    <div>
                                        <span class="text-secondary-d1 text-105">Xin ch??n th??nh c???m c??n qu?? kh??ch!</span>
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </CModalBody>
            </CModal>
            {/* Table */}
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CButton color="primary" onClick={() => setAddbill(!addbill)}  >Th??m h??a ????n mua</CButton>
                        </CCardHeader>
                        <CCardBody>
                            <table className="table table-striped text-center">
                                <thead>
                                    <th scope="col">  M?? h??a ????n </th>
                                    <th scope="col">  T??n ?????i t??c </th>
                                    <th scope="col">  S??? l?????ng s???n ph???m </th>
                                    <th scope="col">  T???ng gi?? </th>
                                    <th scope="col">  H??nh th???c thanh to??n </th>
                                    
                                    <th>Ch???c n??ng</th>
                                </thead>
                                <tbody>
                                    {
                                        buybill.map((item) => 
                                        <>
                                            <tr>
                                                <td scope="row">{item.documentid.id}</td>
                                                <td>{item.list_product[0].partner_id.partnername}</td>
                                                <td>{item.total_num}</td>
                                                <td className="text-right">{item.total_price ? item.total_price.toLocaleString('en-US')+"VN??": ""}</td>
                                                <td>{item.payment}</td>
                                                <td>
                                                    <CButton color="info" onClick = { () => { setBuyBillSelected(item); setViewBill(!viewbill)}}>Xem chi ti???t</CButton>
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