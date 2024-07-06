import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'

import Header from 'src/components/Header/Header'
import UsersCell from 'src/components/UsersCell'
const AdminPage = () => {
  return (
    <>
      <Metadata title="Admin" description="Admin page" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Header />
      <h1>AdminPage</h1>
      <UsersCell />
      <Link to={routes.kiosk()} className={'rw-button rw-button-blue'}>
        Kiosk mode
      </Link>
    </>
  )
}

export default AdminPage
