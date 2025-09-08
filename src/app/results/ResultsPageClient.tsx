'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { calculateFinalScores, saveFinalScores, getResultsWithDetails, CategoryResults } from '@/utils/scoring'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaTrophy } from 'react-icons/fa'
import { User } from '@supabase/supabase-js'

interface ResultsData {
  id: string
  vote_points: number
  judge_points: number
  total_points: number
  rank: number
  nominees: {
    id: string
    categories: { id: string; name: string }
    creators: { id: string; name: string; primary_platform: string; channel_url: string }
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0
  }
}

export default function ResultsPageClient() {
  const [results, setResults] = useState<ResultsData[]>([])
  const [, setCategoryResults] = useState<CategoryResults[]>([])
  const [loading, setLoading] = useState(true)
  const [calculating, setCalculating] = useState(false)
  const [message, setMessage] = useState('')
  const [, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const supabase = createClient()

  const checkUserRole = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const { data: profile } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single()
        
        setIsAdmin(profile?.role === 'admin')
      }
    } catch (error) {
      console.error('Error checking user role:', error)
    }
  }, [supabase])

  const loadResults = useCallback(async () => {
    try {
      const resultsData = await getResultsWithDetails()
      setResults(resultsData)
    } catch (error) {
      console.error('Error loading results:', error)
      setMessage('Error loading results')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadResults()
    checkUserRole()
  }, [loadResults, checkUserRole])

  const handleCalculateScores = async () => {
    setCalculating(true)
    setMessage('')

    try {
      // Calculate scores
      const calculatedResults = await calculateFinalScores()
      setCategoryResults(calculatedResults)
      
      // Save to database
      await saveFinalScores(calculatedResults)
      
      // Reload results
      await loadResults()
      
      setMessage('Final scores calculated and saved successfully!')
    } catch (error) {
      console.error('Error calculating scores:', error)
      setMessage('Error calculating final scores')
    } finally {
      setCalculating(false)
    }
  }

  const groupResultsByCategory = (results: ResultsData[]) => {
    const grouped: { [key: string]: { category: { id: string; name: string }; results: ResultsData[] } } = {}
    
    results.forEach(result => {
      const categoryId = result.nominees.categories.id
      if (!grouped[categoryId]) {
        grouped[categoryId] = {
          category: result.nominees.categories,
          results: []
        }
      }
      grouped[categoryId].results.push(result)
    })

    // Sort results within each category by rank
    Object.values(grouped).forEach(group => {
      group.results.sort((a, b) => a.rank - b.rank)
    })

    return grouped
  }

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `#${rank}`
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 2: return 'bg-gray-100 text-gray-800 border-gray-200'
      case 3: return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-surface to-surface-2"></div>
        </div>
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-secondary mx-auto"></div>
            <p className="mt-4 text-text-secondary">Loading results...</p>
          </div>
        </div>
      </motion.div>
    )
  }

  const groupedResults = groupResultsByCategory(results)

  return (
    <motion.div
      variants={containerVariants}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-surface to-surface-2"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-background/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          >
            <div>
              <Link 
                href="/" 
                className="inline-flex items-center text-text-primary hover:text-secondary transition-colors text-sm md:text-base group mb-4"
              >
                <motion.div
                  whileHover={{ x: -4 }}
                  className="flex items-center"
                >
                  <FaArrowLeft className="mr-2 group-hover:text-secondary" />
                  Back to Home
                </motion.div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <motion.button
                  onClick={handleCalculateScores}
                  disabled={calculating}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-glow disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 btn-glow"
                >
                  {calculating ? 'Calculating...' : 'Recalculate Scores'}
                </motion.button>
              )}
            </div>
          </motion.div>

          {message && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-xl backdrop-blur-sm border ${
                message.includes('successfully') 
                  ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}
            >
              {message}
            </motion.div>
          )}

          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <FaTrophy className="inline-block mr-4 text-yellow-500" />
              <span className="text-gradient">WWG Awards 2024</span> Results
            </motion.h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
              Final rankings based on community votes and judge scores
            </p>
          </motion.div>

          <div className="space-y-8">

            {Object.keys(groupedResults).length === 0 ? (
              <motion.div 
                variants={itemVariants}
                className="glass rounded-2xl border border-border/30 backdrop-blur-xl p-12 text-center"
              >
                <FaTrophy className="text-6xl text-text-secondary/30 mx-auto mb-4" />
                <p className="text-text-secondary text-lg mb-2">No results available yet.</p>
                {isAdmin && (
                  <p className="text-sm text-text-secondary/70">
                    Click &quot;Recalculate Scores&quot; to generate results from current votes and judge scores.
                  </p>
                )}
              </motion.div>
            ) : (
              Object.entries(groupedResults).map(([categoryId, group], categoryIndex) => (
                <motion.div 
                  key={categoryId}
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="glass rounded-2xl border border-border/30 backdrop-blur-xl overflow-hidden"
                >
                  <div className="px-8 py-6 bg-gradient-to-r from-secondary/20 to-background/20 border-b border-border/20">
                    <h3 className="text-2xl font-bold text-text-primary">
                      {group.category.name}
                    </h3>
                  </div>

                  <div className="divide-y divide-border/20">
                    {group.results.map((result, index) => (
                      <motion.div 
                        key={result.id} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                        className="px-8 py-6 hover:bg-surface/20 transition-colors duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <motion.div 
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className={`flex items-center justify-center w-16 h-16 rounded-full border-2 ${getRankColor(result.rank)}`}
                            >
                              <span className="text-xl font-bold">
                                {getRankEmoji(result.rank)}
                              </span>
                            </motion.div>
                            <div>
                              <h4 className="text-xl font-bold text-text-primary mb-1">
                                {result.nominees.creators.name}
                              </h4>
                              <p className="text-sm text-text-secondary capitalize mb-2">
                                {result.nominees.creators.primary_platform}
                              </p>
                              <a
                                href={result.nominees.creators.channel_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-secondary hover:text-secondary/80 text-sm font-medium transition-colors"
                              >
                                View Channel →
                              </a>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-3xl font-bold text-gradient mb-1">
                              {result.total_points.toFixed(1)}
                            </div>
                            <div className="text-sm text-text-secondary">
                              {result.vote_points} vote pts + {result.judge_points.toFixed(1)} judge pts
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}

            {/* Scoring Explanation */}
            <motion.div
              variants={itemVariants}
              className="glass rounded-2xl border border-border/30 backdrop-blur-xl p-8"
            >
              <h3 className="text-2xl font-bold text-text-primary mb-6">How Scoring Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-secondary mb-4 text-lg">Vote Points</h4>
                  <ul className="text-text-secondary space-y-2">
                    <li className="flex justify-between">
                      <span><strong>1st Place in Votes:</strong></span>
                      <span className="text-gradient font-bold">5 points</span>
                    </li>
                    <li className="flex justify-between">
                      <span><strong>2nd Place in Votes:</strong></span>
                      <span className="text-gradient font-bold">4 points</span>
                    </li>
                    <li className="flex justify-between">
                      <span><strong>3rd Place in Votes:</strong></span>
                      <span className="text-gradient font-bold">3 points</span>
                    </li>
                    <li className="flex justify-between">
                      <span><strong>4th Place in Votes:</strong></span>
                      <span className="text-gradient font-bold">2 points</span>
                    </li>
                    <li className="flex justify-between">
                      <span><strong>5th+ Place in Votes:</strong></span>
                      <span className="text-gradient font-bold">1 point</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-secondary mb-4 text-lg">Judge Points</h4>
                  <ul className="text-text-secondary space-y-2">
                    <li className="flex justify-between">
                      <span><strong>Consistency:</strong></span>
                      <span className="text-gradient font-bold">1-3 points</span>
                    </li>
                    <li className="flex justify-between">
                      <span><strong>Influence:</strong></span>
                      <span className="text-gradient font-bold">1-3 points</span>
                    </li>
                    <li className="flex justify-between">
                      <span><strong>Engagement:</strong></span>
                      <span className="text-gradient font-bold">1-3 points</span>
                    </li>
                    <li className="flex justify-between">
                      <span><strong>Quality:</strong></span>
                      <span className="text-gradient font-bold">1-3 points</span>
                    </li>
                    <li className="flex justify-between border-t border-border/30 pt-2 mt-2">
                      <span><strong>Maximum Total:</strong></span>
                      <span className="text-gradient font-bold text-lg">12 points</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
