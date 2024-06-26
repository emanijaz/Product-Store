import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../store/cartslice';
import { useDispatch } from 'react-redux';

export default function Navbar() {
  const totalQuantity = useSelector(state=> state.cart.totalQuantity);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const scrollToProducts = (event) => {
  //   event.preventDefault(); // Prevent the default anchor link behavior
    
  //   const productsElement = document.getElementById('products');
  //   if (productsElement) {
  //     productsElement.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target element
  //   }
  // };
  const scrollToContacts = (event) => {
    event.preventDefault(); // Prevent the default anchor link behavior
    navigate('/');
    const contactsElement = document.getElementById('contacts');
    if (contactsElement) {
      contactsElement.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target element
    }
  };
  const signOut = async () => {
    await logout();
    dispatch(cartActions.resetCart());

    setTimeout(() => {
      navigate('/register'); // Redirect to homepage after 2 seconds
      }, 5000);

  }
  
  return(
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm py-3">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="/#">ShopCart</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/product-lists">Products</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#contacts" onClick={scrollToContacts}>Contact</a>
              </li>
            
            </ul>
            <Link to="/cart">
              <button style={{fontSize: "20px"}} type="button" className="btn btn-light">
                
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                
              </button>
              <span className="position-absolute translate-middle badge rounded-pill bg-danger">
                  {totalQuantity}
              </span>
            </Link>
            <Link to="/account">
              <button style={{fontSize: "20px"}} type="button" className="btn btn-light"><i class="fa fa-solid fa-user" aria-hidden="true"></i></button>
            </Link>
            <button style={{fontSize: "20px"}} type="button" className="btn btn-light" onClick={signOut}><i className="fa fa-sign-out" aria-hidden="true"></i></button>
            
          </div>
        </div>
      </nav>
    </>
  );
}