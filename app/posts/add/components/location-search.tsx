'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Search, X } from 'lucide-react'
import { findPlaces } from '@/lib/utils'

interface SearchResult {
  id: string
  title: string
}

export default function AdvancedSearchBar({query, setQuery, setFullQuery, handleOnChange, value, ...props} : {query: string, setQuery: (query: string) => void, setFullQuery: (query: any) => void, handleOnChange: (q: any) => void, value: any, props?: any}) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const performSearch = (searchQuery: string) => {
    findPlaces(searchQuery).then((places) => {
        const filteredPlaces = places.map((item: any) => ({
          id: item.id,
          position: { lat: item["Eg"]['location']['lat'], lng: item["Eg"]['location']['lng'] },
          title: item["Eg"]['displayName']
        }));
        setResults(filteredPlaces);
        setShowResults(true)
        });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    handleOnChange(value)
    setQuery(value)
    if (value.length > 0) {
      performSearch(value)
    } else {
      setShowResults(false)
    }
  } 

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.title)
    setFullQuery(result)
    setShowResults(false)
  }

  const clearSearch = () => {
    setQuery('')
    setShowResults(false)
  }

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="w-full max-w-md mx-auto" ref={searchRef}>
      <div className="relative">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
          <Input
            placeholder="Search for a location"
            className="flex-grow border-none focus:ring-0 text-sm pr-10"
            {...props}
            value={query}
            onChange={handleInputChange}
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {showResults && results.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-10 max-h-60 overflow-y-auto">
            {results.map((result) => (
              <li
                key={result.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                onClick={() => handleResultClick(result)}
              >
                {result.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}