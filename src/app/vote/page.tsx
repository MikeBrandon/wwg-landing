'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowLeft } from 'react-icons/fa'

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

interface Category {
  id: string
  name: string
  description: string
}

interface Nominee {
  id: string
  categories: { id: string; name: string }
  creators: { 
    id: string
    name: string
    primary_platform: string
    channel_url: string
  }
  vote_count?: number
  user_voted?: boolean
}

export default function VotePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [nominees, setNominees] = useState<Nominee[]>([])
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [voting, setVoting] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const router = useRouter()
  const supabase = createClient()

  const loadVotingData = useCallback(async () => {
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Load categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name')

      setCategories(categoriesData || [])

      // Load user's existing votes
      const { data: votesData } = await supabase
        .from('votes')
        .select('nominee_id')
        .eq('user_id', user.id)

      if (votesData) {
        setUserVotes(new Set(votesData.map(vote => vote.nominee_id)))
      }

      // Select first category by default
      if (categoriesData && categoriesData.length > 0) {
        setSelectedCategory(categoriesData[0].id)
      }

    } catch (error) {
      console.error('Error loading voting data:', error)
      setMessage('Error loading voting data. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [router, supabase])

  useEffect(() => {
    loadVotingData()
  }, [loadVotingData])

  const loadNomineesForCategory = useCallback(async (categoryId: string) => {
    try {
      // Load approved nominees for the selected category with vote counts
      const { data: nomineesData } = await supabase
        .from('nominees')
        .select(`
          id,
          categories(id, name),
          creators(id, name, primary_platform, channel_url)
        `)
        .eq('category_id', categoryId)
        .eq('is_approved', true)

      if (nomineesData) {
        // Get vote counts for each nominee
        const nomineesWithCounts = await Promise.all(
          nomineesData.map(async (nominee) => {
            const { count } = await supabase
              .from('votes')
              .select('*', { count: 'exact', head: true })
              .eq('nominee_id', nominee.id)

            return {
              ...nominee,
              vote_count: count || 0,
              user_voted: userVotes.has(nominee.id)
            }
          })
        )

        setNominees(nomineesWithCounts as unknown as Nominee[])
      }
    } catch (error) {
      console.error('Error loading nominees:', error)
      setMessage('Error loading nominees for this category.')
    }
  }, [supabase, userVotes])

  useEffect(() => {
    if (selectedCategory) {
      loadNomineesForCategory(selectedCategory)
    }
  }, [selectedCategory, loadNomineesForCategory])

  const handleVote = async (nomineeId: string) => {
    setVoting(true)
    setMessage('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      if (userVotes.has(nomineeId)) {
        // Remove vote
        const { error } = await supabase
          .from('votes')
          .delete()
          .eq('user_id', user.id)
          .eq('nominee_id', nomineeId)

        if (error) throw error

        setUserVotes(prev => {
          const newVotes = new Set(prev)
          newVotes.delete(nomineeId)
          return newVotes
        })

        setMessage('Vote removed successfully!')
      } else {
        // Add vote
        const { error } = await supabase
          .from('votes')
          .insert({
            user_id: user.id,
            nominee_id: nomineeId
          })

        if (error) throw error

        setUserVotes(prev => new Set([...prev, nomineeId]))
        setMessage('Vote cast successfully!')
      }

      // Reload nominees to update vote counts
      if (selectedCategory) {
        loadNomineesForCategory(selectedCategory)
      }

    } catch (error) {
      console.error('Error voting:', error)
      setMessage('Error casting vote. Please try again.')
    } finally {
      setVoting(false)
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
            <p className="mt-4 text-text-secondary">Loading voting data...</p>
          </div>
        </div>
      </motion.div>
    )
  }

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
            className="mb-8"
          >
            <Link 
              href="/dashboard" 
              className="inline-flex items-center text-text-primary hover:text-secondary transition-colors text-sm md:text-base group"
            >
              <motion.div
                whileHover={{ x: -4 }}
                className="flex items-center"
              >
                <FaArrowLeft className="mr-2 group-hover:text-secondary" />
                Back to Dashboard
              </motion.div>
            </Link>
          </motion.div>

          {message && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl backdrop-blur-sm"
            >
              {message}
            </motion.div>
          )}

          <motion.div
            variants={itemVariants}
            className="glass rounded-2xl border border-border/30 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-border/20">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Cast Your <span className="text-gradient">Votes</span>
              </h1>
              <p className="text-text-secondary">
                Vote for your favorite creators in each category. You can vote for multiple nominees per category.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="border-b border-border/20">
              <nav className="flex space-x-8 px-8 overflow-x-auto">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ y: -2 }}
                    className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'border-secondary text-secondary'
                        : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border/50'
                    }`}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Nominees Grid */}
            <motion.div 
              variants={itemVariants}
              className="p-8"
            >
              {nominees.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-text-secondary">No approved nominees in this category yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nominees.map((nominee, index) => (
                    <motion.div
                      key={nominee.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="glass rounded-2xl border border-border/30 backdrop-blur-xl overflow-hidden group"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-text-primary mb-1">
                              {nominee.creators.name}
                            </h3>
                            <p className="text-sm text-text-secondary capitalize mb-2">
                              {nominee.creators.primary_platform}
                            </p>
                            <a
                              href={nominee.creators.channel_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-secondary hover:text-secondary/80 text-sm font-medium transition-colors"
                            >
                              View Channel →
                            </a>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gradient">
                              {nominee.vote_count}
                            </div>
                            <div className="text-xs text-text-secondary">
                              {nominee.vote_count === 1 ? 'vote' : 'votes'}
                            </div>
                          </div>
                        </div>

                        <motion.button
                          onClick={() => handleVote(nominee.id)}
                          disabled={voting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 ${
                            userVotes.has(nominee.id)
                              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-glow'
                              : 'bg-gradient-to-r from-secondary to-secondary/80 text-white hover:shadow-glow'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {voting ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </span>
                          ) : userVotes.has(nominee.id) ? (
                            '✓ Voted - Click to Remove'
                          ) : (
                            'Vote for this Creator'
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Voting Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-8 glass rounded-2xl border border-border/30 backdrop-blur-xl p-8"
          >
            <h3 className="text-xl font-bold text-text-primary mb-6">Your Voting Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">{userVotes.size}</div>
                <div className="text-sm text-text-secondary">Total Votes Cast</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">{categories.length}</div>
                <div className="text-sm text-text-secondary">Categories Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">
                  {nominees.reduce((total, nominee) => total + (nominee.vote_count || 0), 0)}
                </div>
                <div className="text-sm text-text-secondary">Total Votes in Current Category</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}