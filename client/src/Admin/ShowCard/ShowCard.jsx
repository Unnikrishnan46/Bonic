import React from 'react'
import { useSelector } from "react-redux";
import "./ShowCard.css";
import "../../App.css"

function ShowCard({imageOne}) {

    const adminState = useSelector((state) => state.adminStates);

    return (
        <>
            <div className='prev-box'>
                <div className='product mtop'>
                    <div className='img'>
                        <span className='discount'>{adminState.productDiscount}% Off</span>
                        {imageOne ? <img src={imageOne ? imageOne :""} alt='' /> : "" }
                        <div className='product-like'>
                            <label>{0}</label> <br />
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                    <div className='product-details'>
                        <h3>{adminState.productName}</h3>
                        <div className='rate'>
                            <i className='fa fa-star'></i>
                            <i className='fa fa-star'></i>
                            <i className='fa fa-star'></i>
                            <i className='fa fa-star'></i>
                            <i className='fa fa-star'></i>
                        </div>
                        <div className='price'>
                            <h4>${adminState.productPrice}.00 </h4>
                            <button>
                                <i className='fa fa-plus'></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowCard
