import React from 'react'
import "./ProgressBar.css";


function ProgressBar({status}) {
    console.log(status);
  return (
    <section className="step-wizard">
        <ul className="step-wizard-list" style={{color:status === "canceled" ? "red" : ""}}>
            <li className={`step-wizard-item`} style={{color:status === "canceled" ? "red" : ""}}>
                <span className="progress-count">1</span>
                <span className="progress-label">{status !== "canceled" ? "Order Conformed" : ""}</span>
            </li>
            {status !== "canceled" ? 
            <li className={`step-wizard-item ${status==="Order Confirmed" ? "current-item" : ""}`}>
                <span className="progress-count">2</span>
                <span className="progress-label">{status !== "canceled" ? "Shipped" :"" }</span>
            </li> : "" }
            {status !== "canceled" ? 
            <li className={`step-wizard-item ${status==="Shipped" ? "current-item" : ""}`}>
                <span className="progress-count">3</span>
                <span className="progress-label">{status !== "canceled" ? "Out for delivery" : "" }</span>
            </li> : "" }
            <li className="step-wizard-item">
                <span className="progress-count">4</span>
                <span className="progress-label">{status !== "canceled" ? "Delivered" : status }</span>
            </li>
        </ul>
    </section>
  )
}

export default ProgressBar
