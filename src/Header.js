import { useState } from 'react'
import { Link } from "react-router-dom";

export default function Header(){
    return (
        <header>
            <div className="header-logo">
                Wemall
            </div>
            <nav>
                <ul>
                    <li><Link className="header-nav_link"to="/men">Men</Link></li>
                    <li><Link className="header-nav_link" to="/women">Women</Link></li>
                    <li><Link className="header-nav_link" to="/women">Kid</Link></li>
                </ul>
            </nav>
            <div className="header-access_icon">
                Hello
            </div>
        </header>
    )
}
