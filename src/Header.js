import React, { useState, useEffect } from 'react'
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
    const [cartopen, setcartOpen] = useState(false)
    
    useEffect(() => {
        if (scrollHeight >= 518 || props.background != null) {
            setHeaderStyle({ background: 'var(--main-black)', top: 0, transition: 'all 0s', color: 'var(--main-white)' });
            setLinkStyle({ color: 'var(--main-white)', fill:'var(--main-white)' });
        }else{
            setLinkStyle({ color: 'var(--main-black)', fill:'var(--main-black)' });
            setHeaderStyle({ background: 'transparent', top: '20px' });
            
        }
        if (scrollHeight < 518 && props.colorImportant == 'true'){
            setLinkStyle({ color: 'var(--main-white)', fill:'var(--main-white)' });

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
                <Link to={"../../../"} style={linkStyle}>Wemall</Link>
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
                
            <Cartnav cartkey={Math.random()} opened={cartopen}></Cartnav>

              </div>
        </header>
    )
}
