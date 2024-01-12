# new-participants-management

Digital badge collection platform for the 'offline' coderdojos in Linz

## redwood.js

Redwood is the full-stack web framework designed to help you grow from side project to startup. Redwood features an end-to-end development workflow that weaves together the best parts of React, GraphQL, Prisma, TypeScript, Jest, and Storybook. For full inspiration and vision, see Redwood's README.
from the <[official redwood.js docs](https://redwoodjs.com/docs/introduction)>

### How to work with a redwood.js project

- Redwood requires Node.js (=18.x) and Yarn (>=1.22.21)
- `yarn create redwood-app my-redwood-project --typescript` to initialize a new project (remove the `--typescript` for a javascript procect)
- `> yarn install` to install dependecies
- `> yarn redwood dev` to start the dev server

### The database

There is a `api/db/schema.prisma` file. Here you can create and edit your database tables
You have to `yarn rw prisma migrate dev`
