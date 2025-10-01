import { Search, X } from "lucide-react"
import React, { useCallback, useEffect, useRef, useState } from "react"
import Input from "../atoms/Input"

function SearchBar({ placeholder = 'Search...', onSearch, className = '' }) {
  const [searchValue, setSearchValue] = useState('')
  const onSearchRef = useRef(onSearch)

  useEffect(() => {
    onSearchRef.current = onSearch
  }, [onSearch])

  const handleChange = useCallback((e) => {
    const value = e.target.value
    setSearchValue(value)
    if (onSearchRef.current) {
      onSearchRef.current(value)
    }
  }, [])

  const handleClear = useCallback(() => {
    setSearchValue('')
    if (onSearchRef.current) {
      onSearchRef.current('')
    }
  }, [])

  return (
    <div className={`relative flex items-center h-full ${className}`}>
      <Search className="absolute left-3 text-gray-400 pointer-events-none" size={15} />
      <Input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="text-[1.6rem] h-full w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      {searchValue && (
        <div
          onClick={handleClear}
          className="absolute right-3 text-gray-400 border-0 outline-none"
        >
          <X size={15} color="gray" />
        </div>
      )}
    </div>
  )
}

export default React.memo(SearchBar)

