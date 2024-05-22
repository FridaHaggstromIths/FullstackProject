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


import {
  createHashRouter,
  Outlet,
  RouterProvider
} from 'react-router-dom';

function Root() {
  return (
    <>
    <Navbar static="top"  bg="light" data-bs-theme="light">
        <Container>
        <Navbar.Brand as={Link} to="/">Fruktkorg {/* <img src="/public/Kvalitetskontroll.jpg" alt="test"/> */}</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/sort">S</Nav.Link>
            <Nav.Link as={Link} to="/login">L</Nav.Link>
            <Nav.Link as={Link} to="/faves">F</Nav.Link>
            <Nav.Link as={Link} to="/cart">V</Nav.Link>
            {/* <NavBarImage /> */}
          </Nav>
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
        { element: <ProductPage />, path: '/productpage' }

      ],

      element: <Root  />

    }
  ])

  return <RouterProvider router={router} />
}

export default App
