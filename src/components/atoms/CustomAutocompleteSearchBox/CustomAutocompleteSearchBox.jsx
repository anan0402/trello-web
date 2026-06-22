import { memo, useState, useEffect, useCallback } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputAdornment from '@mui/material/InputAdornment'
import { useDebounce } from '@/hooks'
import './CustomAutocompleteSearchBox.css'

/**
 * CustomAutocompleteSearchBox - An autocomplete search box with API or local search support
 * @param {boolean} isSearchApi - If true, uses API search; if false, uses local options (default: true)
 * @param {Function} fetchOptions - Async function to fetch search results from backend (required if isSearchApi is true)
 * @param {Array} localOptions - Array of local options (used if isSearchApi is false)
 * @param {Function} onSelect - Callback when an option is selected
 * @param {string} placeholder - Placeholder text
 * @param {number} debounceDelay - Debounce delay in ms (default: 500, only for API search)
 * @param {Function} getOptionLabel - Function to extract label from option (default: option => option.label)
 * @param {Function} renderOption - Custom render function for options
 */
function CustomAutocompleteSearchBox({
  isSearchApi = true,
  fetchOptions,
  localOptions = [],
  onSelect,
  placeholder = 'Tìm kiếm...',
  debounceDelay = 500,
  getOptionLabel = (option) => option?.label || '',
  renderOption,
  ...props
}) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState(isSearchApi ? [] : localOptions)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  // Use debounce hook for API search
  const debouncedInputValue = useDebounce(inputValue, debounceDelay)

  // Update options when localOptions changes (for non-API mode)
  useEffect(() => {
    if (!isSearchApi) {
      setOptions(localOptions)
    }
  }, [localOptions, isSearchApi])

  const fetchData = useCallback(
    async (query) => {
      if (!isSearchApi) return

      if (!query || query.trim() === '') {
        setOptions([])
        return
      }

      setLoading(true)
      try {
        const results = await fetchOptions(query)
        setOptions(results || [])
      } catch (error) {
        console.error('Error fetching search results:', error)
        setOptions([])
      } finally {
        setLoading(false)
      }
    },
    [fetchOptions, isSearchApi]
  )

  // Fetch data when debounced value changes
  useEffect(() => {
    if (!isSearchApi) return

    if (!debouncedInputValue) {
      setOptions([])
      return
    }

    fetchData(debouncedInputValue)
  }, [debouncedInputValue, fetchData, isSearchApi])

  const handleSelect = (event, value) => {
    if (value && onSelect) {
      onSelect(value)
    }
  }

  return (
    <Autocomplete
      className="custom-autocomplete-search-box"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={options}
      loading={isSearchApi && loading}
      getOptionLabel={getOptionLabel}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      onChange={handleSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          className="custom-autocomplete-input"
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {isSearchApi && loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
      renderOption={renderOption}
      noOptionsText={
        isSearchApi
          ? inputValue
            ? 'Không tìm thấy kết quả'
            : 'Nhập để tìm kiếm'
          : 'Không tìm thấy kết quả'
      }
      {...props}
    />
  )
}

export default memo(CustomAutocompleteSearchBox)
