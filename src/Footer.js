import React from 'react'

function Footer() {
  return (
    <footer>
        <section className="subscribe-tomail">
            <article>
                <h2>Subscribe to our newsletter and
receive exclusive offers every week</h2>
            </article>
            <div className="subscribe-form">
                <form>
                    <input type="email" placeholder='Enter your email'/>
                    <button>SUBSCRIBE</button>
                </form>
            </div>
        </section>
        <section className="main_footer">
            <div className="footer_info">
                <div className="footer_info-name">Wemall</div>
                  <div className="footer_info-description">House My Brand designs clothing for the young, the old &
                      everyone in between – but most importantly, for the fashionable</div>
                <div className="footer_info-icons">Wemall</div>
            </div> 
            <nav className="footer_nav">
                <div className="footer_nav-group">
                    <div className="footer_nav-group-header">
                        Shopping online
                    </div>
                    <ul className="footer_nav-link_list">
                        <li><a href="http://jhab.com">Order Status</a></li>
                        <li><a href="http://jhab.com">Shipping and Delivery</a></li>
                        <li><a href="http://jhab.com">Returns</a></li>
                        <li><a href="http://jhab.com">Payment Options</a></li>
                        <li><a href="http://jhab.com">Contact us</a></li>
                    </ul>
                </div>
                <div className="footer_nav-group">
                    <div className="footer_nav-group-header">
                        Information
                    </div>
                    <ul className="footer_nav-link_list">
                        <li><a href="http://jhab.com">Gift card</a></li>
                        <li><a href="http://jhab.com">Find a store</a></li>
                        <li><a href="http://jhab.com">Newsletter</a></li>
                        <li><a href="http://jhab.com">Become a memeber </a></li>
                        <li><a href="http://jhab.com">Site feedback</a></li>
                    </ul>
                </div>
                <div className="footer_nav-group">
                    <div className="footer_nav-group-header">
                        Contact
                    </div>
                    <ul className="footer_nav-link_list">
                        <li><a href="http://jhab.com">store@wemall.com</a></li>
                        <li><a href="http://jhab.com">+2348142574488</a></li>
                        
                    </ul>
                </div>
            </nav> 
            
        </section>
    </footer>
  )
}

export default Footer