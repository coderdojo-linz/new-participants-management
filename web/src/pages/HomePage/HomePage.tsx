import { Metadata } from '@redwoodjs/web'

import Header from 'src/components/Header/Header'
const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />
      <Header></Header>
      <h1>HomePage</h1>
    </>
  )
}

export default HomePage
