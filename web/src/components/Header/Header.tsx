import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
const Header = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  function test(user) {
    return user.email
  }
  try {
    test(currentUser)
  } catch (e) {
    logOut()
  }
  return (
    <header>
      <div className="flex-between">
        <h1>
          <Link to={routes.home()}>CoderDojo Login System</Link>
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
          {isAuthenticated && currentUser.roles === 'admin' ? (
            <li>
              <Link to={routes.admin()}>Admin Dashboard</Link>
            </li>
          ) : (
            ''
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
