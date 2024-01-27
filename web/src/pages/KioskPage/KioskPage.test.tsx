import { render } from '@redwoodjs/testing/web'

import KioskPage from './KioskPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('KioskPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<KioskPage />)
    }).not.toThrow()
  })
})
