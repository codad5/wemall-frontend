import { useState, useEffect } from 'react'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
import axios from 'axios';
import BaseUrl from './components/BaseUrl';
function PageNotFound(props) {
    
   
    

    return (
        <div>
            <Header color='var(--main-black)'></Header>
            <main style={{ paddingTop: '70px' }}>

                <section className="product_show-hero">
                <div>
                    <div className="product_show-hero-error_msg" style={{color:'var(--main-black)'}}>Error :
                    :( 404 PAGE NOT FOUND
                    </div>
                </div>
              </section>
            </main>  
            
        </div>
        
    )




}

export default PageNotFound