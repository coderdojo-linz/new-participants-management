import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import Header from 'src/components/Header/Header'
const AdminPage = () => {
  return (
    <>
      <Metadata title="Admin" description="Admin page" />
      <Header></Header>
      <h1>AdminPage</h1>
      <Link to={routes.users()} className="rw-button rw-button-green">
        Users
      </Link>
      <Link to={routes.kiosk()} className="rw-button rw-button-green">
        Kiosk mode
      </Link>
    </>
  )
}

export default AdminPage
