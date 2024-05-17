import Login from './Login'
import Cart from './Cart'
import Home from './Home'
import Faves from './Faves'

import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider
} from 'react-router-dom'

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: '/' },
        { element: <Login />, path: '/login' },
        { element: <Cart />, path: '/cart' },
        { element: <Faves />, path: '/Faves' }
      ],
      element: (
        <>
          <nav>
            <ul>
              <li>
                <Link to="/">Hem</Link>
              </li>
              <li>
                <Link to="/Login">Login</Link>
              </li>
              <li>
                <Link to="/Faves">Favoriter</Link>
              </li>
              <li>
                <Link to="/Cart">Varukorg</Link>
              </li>
            </ul>
          </nav>
          <main>
            <Outlet />
          </main>
        </>
      )
    }
  ])

  return <RouterProvider router={router} />
}

export default App