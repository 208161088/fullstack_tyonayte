import React from 'react'
import User from './User'
const UserList = ({ users }) => (
  <div>
    <h2>users</h2>
    <table>
      <tbody>
        <tr><td></td><td>blogs added</td></tr>
        {users.map(user =>
          <User key={user._id} user={user} />
        )}
      </tbody>
    </table>
  </div>
)
export default UserList