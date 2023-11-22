import React from 'react'
import "./Style.css"
function Announcement() {
    const mystyle = {
        width: "30%",
        height: "21.25rem",
      }
      const mystyle1 = {
        width: "68%",
        height: "21.25rem",
      }
  return (
    <>
      <section className='annocument background'>
        <div className='container annocument-main-div'>
          <div className='annocument-one'>
            <img src='./images/banner-1.png' width='100%' height='100%' alt=''/>
          </div>
          <div className='annocument-two'>
            <img src='./images/banner-2.png' width='100%' height='100%' alt=''/>
            
          </div>
        </div>
      </section>
    </>
  )
}

export default Announcement
