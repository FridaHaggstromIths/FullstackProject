import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
//import { Link, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Login from './components/Login'
import Cart from './components/Cart'
import Home from './components/Home'
import Faves from './components/Faves'
import Sort from './components/Sort'
import ProductPage from './components/ProductPage'
//import NavBarImage from './components/NavBarImage.jsx'
import Footer from './components/Footer'
import './App.css'
//Navbar ikoner
import { BsShopWindow } from "react-icons/bs";
import { BsBasket } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";


import {
  createHashRouter,
  Outlet,
  RouterProvider
} from 'react-router-dom';

function Root() {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" static="top"  bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand className='Navhome' as={Link} to="/">Fruktkorg {/* <img src="/public/Kvalitetskontroll.jpg" alt="test"/> */}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="nav-link" style={{ padding: '3vh'}} as={Link} to="/sort"><BsShopWindow /></Nav.Link>
            <Nav.Link style={{padding:'3vh'}} as={Link} to="/login"><GoPerson /></Nav.Link>
            <Nav.Link style={{padding:'3vh'}} as={Link} to="/faves"><FaRegHeart /></Nav.Link>
            <Nav.Link style={{padding:'3vh'}} as={Link} to="/cart"><BsBasket /></Nav.Link>
            {/* <NavBarImage /> */}
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
        <main>
          <Outlet />
          <Footer />
        </main>

    </>
  )
}

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: '/' },
        { element: <Sort />, path: '/Sort' },
        { element: <Login />, path: '/login' },
        { element: <Cart />, path: '/cart' },
        { element: <Faves />, path: '/Faves' },
        { element: <ProductPage />, path: '/productpage/:id' }

      ],

      element: <Root  />

    }
  ])

  return <RouterProvider router={router} />
}

export default App
