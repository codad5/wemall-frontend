import react from 'react';
import { Link } from 'react-router-dom'

export default function Cartnav(){
    return (
        <aside className="cart-container">
            <div className="cart-header">
                Cart

            </div>
            <div className="cart-item-body">
                <div className="cart-item-box">
                    <div className="cart-productImage"></div>
                    <div className="cart-item-description">
                        <div className="cart-product-name">
                            Joes
                        </div>
                        <div className="cart-item-prices">
                            <span>$100</span> <span className="cart-item-total">$1000</span>
                        </div>
                        <div className="cart-item-action-btns">
                            <Link to={{
                                pathname:'../view/hiagdfiub'
                            }}>Edit</Link>
                            <button type="submit">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}