import React from 'react'

function Hero(props) {
    const style = {
        hero : {
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${props.bannerImage})`,


        }
    }
  return (
    <section className="hero-banner" style={style.hero} >
        <div className="header-footer"></div>
    </section>
  )
}

export default Hero