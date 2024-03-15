import React from 'react'
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cartslice';

export default function Cart() {
    const cartItems = useSelector(state=> state.cart.productsList);
    const totalPrice = useSelector(state=> state.cart.totalPrice);
    const dispatch = useDispatch();

    const addToCart = (prodid,name,quantity, price,stock,url) => {
        dispatch(cartActions.addToCart({
            id: prodid,
            name: name,
            price: price,
            quantity: quantity,
            stock: stock,
            url: url
        }));
    };
    const removeFromCart = (prodid,name,quantity,price,stock,url) => {
        dispatch(cartActions.removeFromCart({
            id: prodid,
            name: name,
            price: price,
            quantity: quantity,
            stock: stock,
            url: url
        }));
    };
    const deleteItemFromCart = (prodid) => {
        dispatch(cartActions.deleteItemFromCart({
            id: prodid,
        }));
    };
    return (
    <div>
        <Navbar />
        <div className='container mt-5'>
        {cartItems.length>0 ? 
            <div>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {cartItems.map(item => {
                        const itemTotalPrice = item.quantity * item.price;
                        return(
                        <tr key={item.id}>
                            <th scope="row" style={{display: "flex", flexDirection: "column", alignItems: "center"}} >
                                
                                <img src={`/assets/${item.url}`} alt="product" style={{height: "250px", width: "250px", marginBottom: "5%"}} />
                                <div >
                                    <p>{item.name}</p>
                                </div>
                            </th>
                            <td>${item.price}</td>
                            <td>
                                <div>
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="d-flex justify-content-center align-items-center mb-3">
                                                <div class="input-group-prepend mr-3">
                                                    <button onClick={()=>removeFromCart(item.id,item.name,1,item.price,item.stock,item.url)} class="btn btn-dark btn-sm" id="minus-btn"><i class="fa fa-minus"></i></button>
                                                </div>
                                                <input type="text" class="form-control form-control-sm" value={item.quantity} min="1" max={`${item.stock}`} disabled/>
                                                <div class="input-group-append ml-3">
                                                    <button onClick={()=>addToCart(item.id,item.name,1,item.price,item.stock,item.url)} class="btn btn-dark btn-sm" id="plus-btn"><i class="fa fa-plus"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>${itemTotalPrice}</td>
                            <td className="text-center align-middle">
                                <div>
                                    <button onClick={()=>deleteItemFromCart(item.id)} class="btn btn-sm" style={{backgroundColor: "#c3c3c3"}} id="cross-btn" data-toggle="tooltip" data-placement="bottom" title="Remove product">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>)
                        })
                    }
                    
                </tbody>
            </table>

            <div class="card border-light mt-3 mb-3" style={{maxWidth:  "30rem", marginLeft: "auto"}}>
                <div className='card-body row fw-bold' style={{fontSize: "20px"}}>
                    <div className='col-md-8'>
                        <div class="card-text">Total</div>
                    </div>
                    <div className='col-md-4'>
                        <div class="card-text">{totalPrice}$</div>
                    </div>
                </div>
                <div className='card-body row' style={{fontSize: "15px"}}>
                    <div className='col-md-8'>
                        <div class="card-text">Shipping</div>
                    </div>
                    <div className='col-md-4'>
                        <div class="card-text">0$</div>
                    </div>
                </div>
                
                <div className='card-body row' style={{fontSize: "15px"}}>
                    <div className='col-md-12'>
                        
                        <div className="row">
                        <button 
                            type="button" 
                            className="btn btn-dark btn-block" 
                            style={{ 
                                display: 'block', 
                                width: '100%', 
                                padding: '10px', 
                                fontSize: '16px', 
                                textAlign: 'center'
                            }}
                        >
                            Checkout
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
                : <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    
                    <img src="/assets/empty-cart.svg" alt="Empty cart" style={{ width: "400px", height: "400px" }} />
                    <p class="font-weight-bold">Your cart is empty</p>
                    <p class="text-secondary">Looks like you haven't selected anything yet!</p>
                  </div>
            }

        </div>

        
    </div>
    )
}
