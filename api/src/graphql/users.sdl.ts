export const schema = gql`
  type User {
    id: Int!
    email: String!
    roles: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    webAuthnChallenge: String
  }

  type Query {
    users: [User!]! @requireAuth(roles: ["admin"])
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    roles: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    webAuthnChallenge: String
  }

  input UpdateUserInput {
    email: String
    roles: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    webAuthnChallenge: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth(roles: ["admin"])
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth(roles: ["admin"])
    deleteUser(id: Int!): User! @requireAuth(roles: ["admin"])
  }
`
