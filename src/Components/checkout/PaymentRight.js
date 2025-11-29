
import Movingpayment from './Movingpayment'
import ServicePayment from './ServicePayment'

function PaymentRight(props){
    const {det,detdata,type}=props
return(
    <>
        <div >
            {type==='Moving'?
        <Movingpayment
            det={det}
            detdata={detdata}
            type={type}
            />
            :
            type==='Plumbers'||type==='Carpet Cleaning'||type==='Electricians'||type==='Pressure Washing'?
            <ServicePayment
            det={det}
            detdata={detdata}
            type={type}
            />
            :null
}
</div>
    </>
)
}
export default PaymentRight
