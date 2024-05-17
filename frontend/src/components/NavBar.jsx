import { Link } from 'react-router-dom'


const Navbar= () =>{
  return (
  <div id="navbar">
    <h2>FRUKTKORG</h2>
    <image src="navbar-kvalite.png" alt="kvalite&FriFrakt"></image>
    <ul>
    <li>
      <Link to="/Fruktkorgar">Fruktkorgar</Link>
    </li>
    <li>
      <Link to="/presentkorgar">Presentkorgar</Link>
    </li>
    <li>
      <Link to="/faves">Hjärta</Link>
    </li>
    <li>
      <Link to="/login">Login</Link>
    </li>
    <li>
      <Link to="/cart">Varukorg</Link>
    </li>
    </ul>
  </div>
  )
}
export default Navbar
