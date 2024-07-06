import type { UsersQuery, UpdateUserInput } from 'types/graphql'

import {
  Form,
  FieldError,
  Submit,
  SelectField,
  FormError,
} from '@redwoodjs/forms'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { truncate } from 'src/lib/formatters'

const QUERY = gql`
  query UsersQuery {
    users {
      id
      email
      roles
    }
  }
`

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      roles
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">{'No users yet. '}</div>
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ users }: CellSuccessProps<UsersQuery>) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User updated')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const onSave = (input: UpdateUserInput, id: number) => {
    updateUser({ variables: { id, input } })
    toast('UpdateUser ID: ' + id + ' with ' + JSON.stringify(input))
  }

  const onSaveClick = (id: number) => {
    toast('Save ID: ' + id)
    document.getElementById('saveButton' + id).click()
  }
  const onDeleteClick = (id: number) => {
    if (confirm('Are you sure you want to delete user' + id + ' ?')) {
      deleteUser({ variables: { id } })
    }
  }
  const onSubmit = (id: number) => {
    return (user) => {
      toast('Submit user' + JSON.stringify(user))
      onSave(user, id)
    }
  }
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Roles</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{truncate(user.id)}</td>
              <td>{truncate(user.email)}</td>
              <td>
                <Form id={'userForm'} onSubmit={onSubmit(user.id)}>
                  <FormError error={error}></FormError>
                  <SelectField
                    name="roles"
                    multiple={true}
                    validation={{ required: true }}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                  >
                    <option selected={user.roles.includes('admin')}>
                      admin
                    </option>
                    <option selected={user.roles.includes('mentor')}>
                      mentor
                    </option>
                    <option selected={user.roles.includes('dojokid')}>
                      dojokid
                    </option>
                    <option selected={user.roles.includes('user')}>user</option>
                  </SelectField>
                  <FieldError name="roles" className="rw-field-error" />
                  <Submit
                    className="rw-button rw-button-small rw-button-blue rw-hidden"
                    id={'saveButton' + user.id}
                  >
                    Save
                  </Submit>
                </Form>
              </td>
              <td>
                <nav className="rw-table-actions">
                  <button
                    className="rw-button rw-button-small rw-button-blue"
                    onClick={() => onSaveClick(user.id)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    title={'Delete user ' + user.id}
                    className="rw-button rw-button-small rw-button-red"
                    disabled={loading}
                    onClick={() => onDeleteClick(user.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
