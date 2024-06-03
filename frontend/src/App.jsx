import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import { useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import Login from './components/Login.tsx'
import Cart from './components/Cart.jsx'
import Home from './components/Home.jsx'
import Faves from './components/Faves.jsx'
import Sort from './components/Sort.jsx'
import { Image } from 'react-bootstrap'
import ProductPage from './components/ProductPage.jsx'
import Footer from './components/Footer.jsx'
import './App.css'
import { BsShopWindow } from "react-icons/bs"
import { BsBasket } from "react-icons/bs"
import { GoPerson } from "react-icons/go"
import { FaRegHeart } from "react-icons/fa"
import "@fontsource/roboto-mono"
import LoginForReal from './components/LoginForReal.tsx'
import ThankYou from './components/ThankYou.jsx'

import {
  createHashRouter,
  Outlet,
  RouterProvider
} from 'react-router-dom'



function Root() {

    const [collapsed, setCollapsed] = useState(true)

    const toggleNavbar = () => {
      setCollapsed(!collapsed)
    }

  return (
    <>
  <Navbar collapseOnSelect expand="lg" static="top" bg="light" data-bs-theme="light">
  <Container fluid className="px-4">
  <Navbar.Brand as={Link} to="/" className="me-auto"style={{ marginLeft: '2vh' }}>
          <Image fluid src="/logga.png" style={{ width: '150px', height: 'auto' }} />
        </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggleNavbar} />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link className='Headerlink' style={{ padding: '3vh' }} as={Link} to="/sort">
          <BsShopWindow />
          {!collapsed && <span className="nav-icon-title">Shop</span>}
        </Nav.Link>
        <Nav.Link className='Headerlink' style={{ padding: '3vh' }} as={Link} to="/login">
          <GoPerson />
          {!collapsed && <span className="nav-icon-title">Login</span>}
        </Nav.Link>
        <Nav.Link className='Headerlink' style={{ padding: '3vh' }} as={Link} to="/faves">
          <FaRegHeart />
          {!collapsed && <span className="nav-icon-title">Favorites</span>}
        </Nav.Link>
        <Nav.Link className='Headerlink' style={{ padding: '3vh' }} as={Link} to="/cart">
          <BsBasket />
          {!collapsed && <span className="nav-icon-title">Cart</span>}
        </Nav.Link>
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
      path: '/',
      element: <Root />,
      children: [
        { element: <Home />, path: '/' },
        { element: <Sort />, path: '/sort' },
        { element: <Login />, path: '/login' },
        { element: <Cart />, path: '/cart' },
        { element: <Faves />, path: '/faves' },
        { element: <ProductPage />, path: '/productpage/:id' },
        { element: <LoginForReal />, path: '/LoginForReal'},
        { element: <ThankYou />, path: '/ThankYou'}
      ]
    }
  ]);

  return (

    <RouterProvider router={router} />

  )
}

export default App
