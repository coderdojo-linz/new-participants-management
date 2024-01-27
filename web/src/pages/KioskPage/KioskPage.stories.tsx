import type { Meta, StoryObj } from '@storybook/react'

import KioskPage from './KioskPage'

const meta: Meta<typeof KioskPage> = {
  component: KioskPage,
}

export default meta

type Story = StoryObj<typeof KioskPage>

export const Primary: Story = {}
