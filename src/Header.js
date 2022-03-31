import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

export default function Header(props){
    const [headerStyle, setHeaderStyle] = useState({ background: props.background ||'transparent',color: props.color, top: 0, transition: 'all 0s' });
    const [scrollHeight, setScrollHeight] = useState(window.scrollY);
    
    useEffect(() => {
        if (scrollHeight >= 518 || props.background != null) {
            setHeaderStyle({ background: 'var(--main-black)', top: 0, transition: 'all 0s' });
        }else{
            setHeaderStyle({ background: 'transparent', top: '20px' });

        }
    }, [scrollHeight])
    window.addEventListener('scroll', () => {
        setScrollHeight(window.scrollY);
        // console.log(window.scrollY);
        
        
    })
    return (
        <header style={headerStyle}>
            <div className="header-logo" style={{ color: props.color || 'inherit' }}>
                Wemall
            </div>
            <nav>
                <ul>
                    <li><Link className="header-nav_link"to="/men" style={{color :props.color || 'inherit'}}>Men</Link></li>
                    <li><Link className="header-nav_link" to="/women" style={{color :props.color || 'inherit'}}>Women</Link></li>
                    <li><Link className="header-nav_link" to="/women" style={{color :props.color || 'inherit'}}>Kid</Link></li>
                </ul>
            </nav>
            <div className="header-access_icon" style={{ color: props.color || 'inherit' }}>
                Hello
            </div>
        </header>
    )
}
