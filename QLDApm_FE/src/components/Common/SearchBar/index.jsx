import './SearchBar.scss'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

export default function SearchBar() {
  const [active, setActive] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSearch = () => {
    if (active) {
      console.log(searchValue)
    } else {
      setActive(true)
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      const searchIcon = document.querySelector('.search-icon')
      const element = document.getElementById('search-bar')
      if (
        element &&
        !element.contains(event.target) &&
        searchIcon &&
        !searchIcon.contains(event.target)
      ) {
        setActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={`SearchBar ${active ? 'active' : ''}`}>
      <div className="search-icon" onClick={handleSearch}>
        <Icon icon="mingcute:search-3-line" width={24} height={24} />
      </div>
      <div className="search-bar" id="search-bar">
        <input
          type="text"
          className="search-input"
          value={searchValue}
          onChange={handleInputChange}
        />
        <Icon icon="fa:close" className="close-icon" width={14} height={14} />
      </div>
    </div>
  )
}
