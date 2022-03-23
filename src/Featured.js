import React from 'react'
import { Link } from "react-router-dom";


function Featured(props) {
    const style = {

        fImageStyle: (image = 0) => {
            return {
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${props.fImages[image]})`
            }
        }
    }
  return (
    <section className="Featured">

        <div className="featured_cnt">
            
              <div style={style.fImageStyle(0)} className=" featured_box big-featured_box">
                  <div className="featured_box-txt_cnt">
                      <div className="featured_box-txt">Newly arrived are now in!</div>
                      <div className="featured_box-actionbtn-cnt">
                          <Link className="" to="/women">Show Collections</Link>
                      </div>
                  </div>

            </div>
              <div style={style.fImageStyle(1)} className=" featured_box">
                  <div className="featured_box-txt_cnt">
                      <div className="featured_box-txt">Basic T-shirts $29,99</div>
                      <div className="featured_box-actionbtn-cnt">
                          <Link className="" to="/women">More Details</Link>
                      </div>
                  </div>

            </div>
              <div style={style.fImageStyle(2)} className=" featured_box">
                  <div className="featured_box-txt_cnt">
                      <div className="featured_box-txt">Sales this summer</div>
                      <div className="featured_box-actionbtn-cnt">
                          <Link className="" to="/women">View All</Link>
                      </div>
                  </div>

            </div>

        </div>

    </section>
    
  )
}

export default Featured