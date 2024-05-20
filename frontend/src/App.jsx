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

import {
  createHashRouter,
  Outlet,
  RouterProvider
} from 'react-router-dom';

function Root() {
  return (
    <>
    <Navbar fixed="top"  bg="light" data-bs-theme="light">
        <Container>
        <Navbar.Brand as={Link} to="/">Fruktkorg</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Sortiment</Nav.Link>
            <Nav.Link as={Link} to="/login">Logga in</Nav.Link>
            <Nav.Link as={Link} to="/faves">Favoriter</Nav.Link>
            <Nav.Link as={Link} to="/cart">Varukorg</Nav.Link>
          </Nav>
        </Container>
    </Navbar>
        <main>
          <Outlet />
        </main>
    </>
  )
}

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: '/' },
        { element: <Login />, path: '/login' },
        { element: <Cart />, path: '/cart' },
        { element: <Faves />, path: '/Faves' },
        { element: <Faves />, path: '/Sort' }
      ],

      element: <Root  />

    }
  ])

  return <RouterProvider router={router} />
}

export default App
