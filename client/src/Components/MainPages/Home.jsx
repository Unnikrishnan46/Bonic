import React from 'react'
import Categories from './Categories'
import Slider from './Slider'
import "./Home.css"



function Home({userData}) {
  return (
    <>
      <section className='home'>
        <div className="container home-container" >
          <Categories/>
          <Slider/>
        </div>
      </section>
    </>
  )
}

export default Home
