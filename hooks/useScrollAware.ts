import { useState, useEffect } from 'react'

export function useScrollAware() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY

        if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsVisible(true)
        } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // Scrolling down and past the threshold
          setIsVisible(false)
        }

        // Update last scroll position
        setLastScrollY(currentScrollY)
      }
    }

    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(controlNavbar, 200)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)

      // Cleanup
      return () => {
        window.removeEventListener('scroll', handleScroll)
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
      }
    }
  }, [lastScrollY])

  return isVisible
}

