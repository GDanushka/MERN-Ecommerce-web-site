import logo from '../../images/logo.png'
import './Navbar.css';
const Navbar = () => {
  return (
    <div className='Header'>
      <div className="sidenav">
         <img src = {logo} alt = "logo" className='logo'/>
      <ul>
        <li>
          <a href="Home">Home</a>
          </li>
          <li>
          <a href="Products">Products</a>
          </li>
          <li>
          <a href="Contact">Contact</a>
          </li>
          <li>
          <a href="about">about</a>
          </li>
          <li>
          <a href="/">.</a>
        </li>
          <li>
          <a href="/Products">Products</a>
        </li>
        <li>
          <a href="/Contact">Contact</a>
        </li>
        <li>
          <a href="/about">about</a>
        </li>
      </ul>
    </div></div>
    
  )
}
export default Navbar