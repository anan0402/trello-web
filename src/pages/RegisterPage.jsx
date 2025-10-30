import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoading, setUser, setError } from '../redux/slices/authSlice'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'
import Link from '../components/atoms/Link'

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      dispatch(setError('Passwords do not match'))
      return
    }

    if (!formData.name || !formData.email || !formData.password) {
      dispatch(setError('Please fill in all fields'))
      return
    }

    dispatch(setLoading(true))

    // Simulate API call
    setTimeout(() => {
      dispatch(setUser({
        id: '1',
        name: formData.name,
        email: formData.email,
      }))
      navigate('/')
    }, 500)
  }, [formData, dispatch, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg)]">
      <div className="w-full max-w-md p-8 bg-[var(--surface)] rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-[var(--fg)]">
          Register
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-[var(--fg)]">
              Name
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 text-[var(--fg)] bg-[var(--bg)] border border-[var(--button-border)] rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-[var(--fg)]">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-[var(--fg)] bg-[var(--bg)] border border-[var(--button-border)] rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-[var(--fg)]">
              Password
            </label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 text-[var(--fg)] bg-[var(--bg)] border border-[var(--button-border)] rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-[var(--fg)]">
              Confirm Password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 text-[var(--fg)] bg-[var(--bg)] border border-[var(--button-border)] rounded-lg"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-2 bg-[var(--link)] text-white hover:bg-[var(--link-hover)] font-medium"
          >
            Register
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-[var(--fg)]">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--link)] hover:text-[var(--link-hover)]">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default React.memo(RegisterPage)

