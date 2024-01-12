import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const HomePage = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return (
    <>
      <Metadata title="Home" description="Home page" />
      <header>
        <div className="flex-between">
          <h1>
            <Link to={routes.home()}>Redwood Blog</Link>
          </h1>
          {isAuthenticated ? (
            <div>
              <span>Logged in as {currentUser.email}</span>{' '}
              <button type="button" onClick={logOut}>
                Logout
              </button>
            </div>
          ) : (
            <Link to={routes.login()}>Login</Link>
          )}
        </div>
        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
    </>
  )
}

export default HomePage
