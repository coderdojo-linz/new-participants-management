import { Link, routes } from '@redwoodjs/router'
import { Toaster, toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'

const Header = () => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()

  const currentUserRoles: string[] = []
  if (currentUser) {
    currentUser?.roles.forEach((item) => {
      currentUserRoles.push(item.name)
    })
    toast(
      'User has admin:' +
        hasRole('admin') +
        '; roles: ' +
        currentUserRoles.join(', ')
    )
  }
  //
  return (
    <header>
      <Toaster
        toastOptions={{ className: 'rw-toast', duration: 6000 }}
      ></Toaster>
      <div className="flex-between">
        <h1>
          <Link to={routes.home()}>CoderDojo Login System</Link>
        </h1>
        <div>
          {isAuthenticated ? (
            <div>
              <span>
                Logged in as{' '}
                {(function (): string {
                  if (currentUser) return currentUser.email
                  else return 'NaN'
                })()}
              </span>
              <button type="button" onClick={logOut}>
                Logout
              </button>
            </div>
          ) : (
            <Link to={routes.login()}>Login</Link>
          )}
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <Link to={routes.home()}>Home</Link>
          </li>
          {isAuthenticated && hasRole('admin') ? (
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
