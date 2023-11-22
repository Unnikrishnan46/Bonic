import React,{useState} from 'react'
import "./PaymentPannel.css";
import StripeContainer from '../StripeContainer/StripeContainer';
import CODPannel from '../CODPannel/CODPannel';


function PaymentPannel() {
    const [netBanking,setNetBanking] = useState(true)
    const [cod,setCod] = useState(false)

    const handleNetBankRadio = ()=>{
        setCod(false)
        setNetBanking(true)
    }

    const handleCODRadio = ()=>{
        setNetBanking(false)
        setCod(true)
    }

    return (
        <div className="payment-main-div">
            <div className="edit-address-header blue">
                <p>4</p>
                <h5>PAYMENT OPTIONS</h5>
            </div>
            <div className="payment-selection">
                <div className="net-banking-div">
                    <input type="radio" value="net-banking" checked={netBanking} onClick={()=>handleNetBankRadio()}/>
                    <p>Net Banking</p>
                </div>
                { netBanking ? <StripeContainer/> : "" }

                <div className="cod-div">
                    <input type="radio" value="cod" checked={cod} onClick={()=>handleCODRadio()}/>
                    <p>Cash on Delivery</p>
                </div>

                {cod ? <CODPannel/> : ""}

            </div>
        </div>
    )
}

export default PaymentPannel
