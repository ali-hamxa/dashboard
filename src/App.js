import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import FilterPanel from './components/FilterPanel'
import UserTable from './components/UserTable'

function App() {
  const [users, setUsers] = useState([])
  const [filters, setFilters] = useState({
    continents: [],
    countries: [],
    states: [],
    cities: [],
  })
  const [showFilterPanel, setShowFilterPanel] = useState(false)

  const apiKey = process.env.REACT_APP_API_KEY
  const apiBaseUrl = process.env.REACT_APP_API_SERVER_BASE_URL

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/users`, {
        headers: { Authorization: apiKey },
      })
      setUsers(response.data.users)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  const applyFilters = async (filters) => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/users/filter_users`,
        { user: filters },
        {
          headers: { Authorization: apiKey },
        }
      )
      setUsers(response.data.filtered_users)
    } catch (error) {
      console.error('Error applying filters:', error)
    }
  }

  const clearFilters = async () => {
    await fetchAllUsers()
    setFilters({
      continents: [],
      countries: [],
      states: [],
      cities: [],
    })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>User Dashboard</h1>
        <button
          onClick={() => setShowFilterPanel(!showFilterPanel)}
        >
          {showFilterPanel ? 'Close Filter Panel' : 'Open Filter Panel'}
        </button>
      </header>

      {showFilterPanel && (
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />
      )}

      <main>
        <h2>Users</h2>
        <UserTable users={users} />
      </main>
    </div>
  )
}

export default App
