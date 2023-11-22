import React from 'react'
import NewArraivalCard from './NewArraivalCard'


function Newarraivals({products}) {
    return (
        <>
            <section className='NewArrivals background'>
                <div className='container'>
                    <div className='heading d_flex'>
                        <div className='heading-left row  f_flex'>
                            <img src='https://img.icons8.com/glyph-neue/64/26e07f/new.png' alt=''/>
                            <h2>New Arrivals </h2>
                        </div>
                        <div className='heading-right row '>
                            <span>View all</span>
                            <i class="fas fa-caret-right"></i>
                        </div>
                    </div>
                <NewArraivalCard products={products}/>
                </div>
            </section>
        </>
    )
}

export default Newarraivals
