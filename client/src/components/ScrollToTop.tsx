import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop(): null {
  const { pathname } = useLocation()

  useEffect(() => {
    // Ensure each route change starts at the top of the page
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}


