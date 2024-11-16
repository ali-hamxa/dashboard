import React from 'react'

function UserTable({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Continent</th>
          <th>Country</th>
          <th>State</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.continent}</td>
            <td>{user.country}</td>
            <td>{user.state}</td>
            <td>{user.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserTable
