import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Cartnav from './Cartnav'


export default function Header(props){
    // console.log(Math.random())
    const getStorage = () => {
        if (JSON.parse(localStorage.getItem("orderedProduct")) == undefined) return []
        return JSON.parse(localStorage.getItem("orderedProduct")).items
    }
    const [headerStyle, setHeaderStyle] = useState({ background: props.background ||'transparent',color: props.color, top: 0, transition: 'all 0s' });
    const [linkStyle, setLinkStyle] = useState({ color: props.color || 'inherit' });
    const [scrollHeight, setScrollHeight] = useState(window.scrollY);
    const [orderedItem, setOrderedItem] = useState(getStorage())
    const [orderedProduct, setOrderProduct] = useState(orderedItem.length ?? 0)
    const [cartopen, setcartOpen] = useState(true)
    
    useEffect(() => {
        if (scrollHeight >= 518 || props.background != null) {
            setHeaderStyle({ background: 'var(--main-black)', top: 0, transition: 'all 0s', color: 'var(--main-white)' });
            setLinkStyle({ color: 'var(--main-white)' });
        }else{
            setLinkStyle({ color: 'var(--main-black)' });
            setHeaderStyle({ background: 'transparent', top: '20px' });
            
        }
        if (scrollHeight < 518 && props.colorImportant == 'true'){
            setLinkStyle({ color: 'var(--main-white)' });

        }
    }, [scrollHeight])

    useEffect(() => {
        setOrderedItem(getStorage())

    }, [props?.key])
    
    window.addEventListener('scroll', () => {
        setScrollHeight(window.scrollY);
        // console.log(window.scrollY);
        
        
    })
    return (
        <header style={headerStyle}>
            <div className="header-logo" style={linkStyle}>
                Wemall
            </div>
            <nav>
                <div className="menu-bar" style={{top:headerStyle.top}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15">
                        <g id="Group_241" data-name="Group 241" transform="translate(-316 -39)">
                            <rect id="Rectangle_615" data-name="Rectangle 615" style={{fill:linkStyle.color}} width="22" height="2" rx="1" transform="translate(316 39)" />
                            <rect id="Rectangle_616" data-name="Rectangle 616" style={{fill:linkStyle.color}} width="22" height="2" rx="1" transform="translate(316 46)" />
                            <rect id="Rectangle_617" data-name="Rectangle 617" style={{fill:linkStyle.color}} width="22" height="2" rx="1" transform="translate(316 52)" />
                        </g>
                    </svg>


                </div>
                <ul>
                    <li><Link className="header-nav_link"to="/men" style={linkStyle}>Men</Link></li>
                    <li><Link className="header-nav_link" to="/women" style={linkStyle}>Women</Link></li>
                    <li><Link className="header-nav_link" to="/women" style={linkStyle}>Kid</Link></li>
                </ul>
            </nav>
            <div className="header-access_icon" style={linkStyle}>
                <div className="header-cart_icon" onClick={() => {
                    setcartOpen(!cartopen)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                        <g id="noun_cart_2102832_4_" data-name="noun_cart_2102832 (4)" transform="translate(-6 -6)">
                            <path style={{fill:linkStyle.color}} id="Path_5" data-name="Path 5" d="M6.917,7.833H8.448l2.295,10.355a3.289,3.289,0,0,0-1.871,3.042,3.133,3.133,0,0,0,2.962,3.275H23.988a.917.917,0,1,0,0-1.833H11.833A1.332,1.332,0,0,1,10.7,21.231a1.332,1.332,0,0,1,1.128-1.442H23.988a.917.917,0,0,0,.863-.606l3.1-8.591a.917.917,0,0,0-.863-1.227H10.665l-.586-2.646A.916.916,0,0,0,9.184,6H6.917a.917.917,0,0,0,0,1.833ZM25.779,11.2l-2.435,6.758H12.568l-1.5-6.758H25.779Z"/>
                            <path style={{fill:linkStyle.color}} id="Path_6" data-name="Path 6" d="M19.261,50a.917.917,0,0,0,0,1.833h1.164a.917.917,0,1,0,0-1.833Z" transform="translate(-6.687 -23.833)"/>
                            <path style={{fill:linkStyle.color}} id="Path_7" data-name="Path 7" d="M37.713,50a.917.917,0,0,0,0,1.833h1.164a.917.917,0,1,0,0-1.833Z" transform="translate(-16.682 -23.833)"/>
                        </g>
                    </svg>
                    <span className="header-cart_icon_number">{orderedProduct}</span>
                </div>

              </div>
            <Cartnav cartkey={Math.random()} opened={cartopen}></Cartnav>
        </header>
    )
}
