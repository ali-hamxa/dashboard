import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'

function FilterPanel({ filters, setFilters, applyFilters, clearFilters }) {
  const [filterOptions, setFilterOptions] = useState({
    continents: [],
    countries: [],
    states: [],
    cities: [],
  })

  const apiKey = process.env.REACT_APP_API_KEY
  const apiBaseUrl = process.env.REACT_APP_API_SERVER_BASE_URL

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/users/populate_filter_options`, {
          headers: { Authorization: apiKey },
        })
        setFilterOptions(response.data)
      } catch (error) {
        console.error('Error fetching filter options:', error)
      }
    }

    fetchFilterOptions()
  }, [])

  const handleMultiSelectChange = (selectedOptions, key) => {
    const values = selectedOptions ? selectedOptions.map((option) => option.value) : []
    setFilters({ ...filters, [key]: values })
  }

  const handleClearFilters = () => {
    setFilters({
      continents: [],
      countries: [],
      states: [],
      cities: [],
    })
    clearFilters()
  }

  return (
    <aside className="Filter-panel">
      <h2>Filters</h2>

      <div>
        <label>Continent:</label>
        <Select
          isMulti
          options={filterOptions.continents.map((continent) => ({
            value: continent,
            label: continent,
          }))}
          onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'continents')}
          value={filters.continents.map((continent) => ({
            value: continent,
            label: continent,
          }))}
          placeholder="Select Continents"
        />
      </div>

      <div>
        <label>Country:</label>
        <Select
          isMulti
          options={filterOptions.countries.map((country) => ({
            value: country,
            label: country,
          }))}
          onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'countries')}
          value={filters.countries.map((country) => ({
            value: country,
            label: country,
          }))}
          placeholder="Select Countries"
        />
      </div>

      <div>
        <label>State:</label>
        <Select
          isMulti
          options={filterOptions.states.map((state) => ({
            value: state,
            label: state,
          }))}
          onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'states')}
          value={filters.states.map((state) => ({
            value: state,
            label: state,
          }))}
          placeholder="Select States"
        />
      </div>

      <div>
        <label>City:</label>
        <Select
          isMulti
          options={filterOptions.cities.map((city) => ({
            value: city,
            label: city,
          }))}
          onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'cities')}
          value={filters.cities.map((city) => ({
            value: city,
            label: city,
          }))}
          placeholder="Select Cities"
        />
      </div>

      <button onClick={() => applyFilters(filters)}>Apply Filters</button>
      <button onClick={handleClearFilters}>Clear Filters</button>
    </aside>
  )
}

export default FilterPanel
