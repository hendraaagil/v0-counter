'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, ArrowDown } from 'lucide-react'

// Simulated API call
const fetchNumber = async () => {
  // Replace this with your actual API call
  const response = await fetch('/api/number')
  if (!response.ok) {
    throw new Error('Failed to fetch number')
  }
  const data = await response.json()
  console.log(data)

  return data[0]
}

export default function Page() {
  const [number, setNumber] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [trend, setTrend] = useState<'up' | 'down' | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const newNumber = await fetchNumber()
        setTrend(number === null ? null : newNumber > number ? 'up' : 'down')
        setNumber(newNumber)
        setError(null)
      } catch (err) {
        setError('Failed to fetch number')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 2000) // Fetch every 1 seconds

    return () => clearInterval(interval)
  }, [number])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white mb-8">Live Count</h1>
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        {isLoading && number === null ? (
          <p className="text-2xl text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-2xl text-red-500">{error}</p>
        ) : (
          <div className="flex items-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-6xl font-bold text-blue-600"
              >
                {number?.toLocaleString()}
              </motion.span>
            </AnimatePresence>
            {trend && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`ml-4 ${
                  trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {trend === 'up' ? (
                  <ArrowUp size={24} />
                ) : (
                  <ArrowDown size={24} />
                )}
              </motion.div>
            )}
          </div>
        )}
        {/* {!isLoading && !error && (
          <p className="mt-4 text-gray-600">Updates every 1 seconds</p>
        )} */}
      </div>
    </div>
  )
}
