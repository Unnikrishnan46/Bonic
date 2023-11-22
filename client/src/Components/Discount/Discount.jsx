import React from 'react'
import Dcard from './Dcard'

function Discount({products}) {
    return (
        <>
            <section className='Discount background NewArrivals'>
                <div className='container'>
                    <div className='heading d_flex'>
                        <div className='heading-left row  f_flex'>
                            <img src='https://img.icons8.com/windows/32/fa314a/gift.png' alt=''/>
                            <h2>Big Discounts</h2>
                        </div>
                        <div className='heading-right row '>
                            <span>View all</span>
                            <i class="fas fa-caret-right"></i>
                        </div>
                    </div>
                    <Dcard products={products}/>
                </div>
            </section>
        </>
    )
}

export default Discount
