'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowLeft } from 'react-icons/fa'

interface Category {
  id: string
  name: string
  description: string
}

interface Creator {
  id: string
  name: string
  primary_platform: string
  channel_url: string
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

export default function NominatePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [creators, setCreators] = useState<Creator[]>([])
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  
  const [formData, setFormData] = useState({
    categoryId: '',
    creatorName: '',
    creatorId: '',
    primaryPlatform: 'youtube' as 'youtube' | 'tiktok' | 'twitch' | 'other',
    channelUrl: '',
    reason: ''
  })

  const router = useRouter()
  const supabase = createClient()

  const loadInitialData = useCallback(async () => {
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

      // Load existing creators for autocomplete
      const { data: creatorsData } = await supabase
        .from('creators')
        .select('*')
        .order('name')

      setCategories(categoriesData || [])
      setCreators(creatorsData || [])
    } catch (error) {
      console.error('Error loading data:', error)
      setMessage('Error loading data. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [router, supabase])

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  const handleCreatorNameChange = (value: string) => {
    setFormData({ ...formData, creatorName: value, creatorId: '' })
    
    if (value.length > 1) {
      const filtered = creators.filter(creator =>
        creator.name.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredCreators(filtered)
    } else {
      setFilteredCreators([])
    }
  }

  const selectExistingCreator = (creator: Creator) => {
    setFormData({
      ...formData,
      creatorName: creator.name,
      creatorId: creator.id,
      primaryPlatform: creator.primary_platform as 'youtube' | 'tiktok' | 'twitch' | 'other',
      channelUrl: creator.channel_url
    })
    setFilteredCreators([])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      let creatorId = formData.creatorId

      // If no existing creator selected, create a new one
      if (!creatorId && formData.creatorName.trim()) {
        const { data: newCreator, error: creatorError } = await supabase
          .from('creators')
          .insert({
            name: formData.creatorName.trim(),
            primary_platform: formData.primaryPlatform,
            channel_url: formData.channelUrl.trim()
          })
          .select()
          .single()

        if (creatorError) {
          // Creator might already exist, try to find them
          const { data: existingCreator } = await supabase
            .from('creators')
            .select('*')
            .eq('name', formData.creatorName.trim())
            .eq('primary_platform', formData.primaryPlatform)
            .single()

          if (existingCreator) {
            creatorId = existingCreator.id
          } else {
            throw creatorError
          }
        } else {
          creatorId = newCreator.id
        }
      }

      if (!creatorId) {
        setMessage('Please select or enter a creator name.')
        return
      }

      // Create the nomination
      const { error: nominationError } = await supabase
        .from('nominations')
        .insert({
          user_id: user.id,
          category_id: formData.categoryId,
          creator_id: creatorId,
          reason: formData.reason.trim()
        })

      if (nominationError) {
        if (nominationError.code === '23505') {
          setMessage('You have already nominated someone in this category.')
        } else {
          throw nominationError
        }
        return
      }

      setMessage('Nomination submitted successfully!')
      
      // Reset form
      setFormData({
        categoryId: '',
        creatorName: '',
        creatorId: '',
        primaryPlatform: 'youtube',
        channelUrl: '',
        reason: ''
      })

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (error) {
      console.error('Error submitting nomination:', error)
      setMessage('Error submitting nomination. Please try again.')
    } finally {
      setSubmitting(false)
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
            <p className="mt-4 text-text-secondary">Loading nomination form...</p>
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
        <div className="max-w-3xl mx-auto px-4 md:px-6">
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

          <motion.div
            variants={itemVariants}
            className="glass rounded-2xl border border-border/30 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-border/20">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Nominate a <span className="text-gradient">Creator</span>
              </h1>
              <p className="text-text-secondary">
                Submit your nomination for the WWG Awards. You can nominate one creator per category.
              </p>
            </div>

          <motion.form 
            onSubmit={handleSubmit} 
            variants={itemVariants}
            className="px-8 py-8 space-y-8"
          >
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl backdrop-blur-sm border ${
                  message.includes('successfully') 
                    ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}
              >
                {message}
              </motion.div>
            )}

            {/* Category Selection */}
            <motion.div variants={itemVariants}>
              <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-2">
                Category *
              </label>
              <select
                id="category"
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full bg-surface/50 backdrop-blur-xl border border-border/30 rounded-xl py-3 px-4 text-text-primary focus:outline-none focus:border-secondary/50 transition-all duration-300 appearance-none cursor-pointer hover:bg-surface/70"
              >
                <option value="" className="bg-surface text-text-primary">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id} className="bg-surface text-text-primary py-2">
                    {category.name}
                  </option>
                ))}
              </select>
              {categories.find(c => c.id === formData.categoryId)?.description && (
                <p className="mt-2 text-sm text-text-secondary">
                  {categories.find(c => c.id === formData.categoryId)?.description}
                </p>
              )}
            </motion.div>

            {/* Creator Name with Autocomplete */}
            <motion.div variants={itemVariants} className="relative">
              <label htmlFor="creatorName" className="block text-sm font-medium text-text-primary mb-2">
                Creator Name *
              </label>
              <input
                id="creatorName"
                type="text"
                required
                value={formData.creatorName}
                onChange={(e) => handleCreatorNameChange(e.target.value)}
                placeholder="Start typing creator name..."
                className="w-full bg-surface/50 backdrop-blur-xl border border-border/30 rounded-xl py-3 px-4 text-text-primary placeholder-text-secondary/60 focus:outline-none focus:border-secondary/50 transition-all duration-300"
              />
              
              {/* Autocomplete Dropdown */}
              {filteredCreators.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-10 mt-2 w-full glass rounded-xl border border-border/30 backdrop-blur-xl max-h-60 overflow-auto shadow-lg"
                >
                  {filteredCreators.map((creator) => (
                    <div
                      key={creator.id}
                      onClick={() => selectExistingCreator(creator)}
                      className="cursor-pointer select-none relative py-3 px-4 hover:bg-secondary/20 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl border-b border-border/10 last:border-0"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium block truncate text-text-primary">
                          {creator.name}
                        </span>
                        <span className="text-text-secondary ml-2 text-sm px-2 py-1 rounded-full bg-surface/50">
                          {creator.primary_platform}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Primary Platform */}
            <motion.div variants={itemVariants}>
              <label htmlFor="platform" className="block text-sm font-medium text-text-primary mb-2">
                Primary Platform *
              </label>
              <select
                id="platform"
                required
                value={formData.primaryPlatform}
                onChange={(e) => setFormData({ ...formData, primaryPlatform: e.target.value as 'youtube' | 'tiktok' | 'twitch' | 'other' })}
                className="w-full bg-surface/50 backdrop-blur-xl border border-border/30 rounded-xl py-3 px-4 text-text-primary focus:outline-none focus:border-secondary/50 transition-all duration-300 appearance-none cursor-pointer hover:bg-surface/70"
              >
                <option value="youtube" className="bg-surface text-text-primary py-2">YouTube</option>
                <option value="tiktok" className="bg-surface text-text-primary py-2">TikTok</option>
                <option value="twitch" className="bg-surface text-text-primary py-2">Twitch</option>
                <option value="other" className="bg-surface text-text-primary py-2">Other</option>
              </select>
            </motion.div>

            {/* Channel URL */}
            <motion.div variants={itemVariants}>
              <label htmlFor="channelUrl" className="block text-sm font-medium text-text-primary mb-2">
                Channel/Profile URL *
              </label>
              <input
                id="channelUrl"
                type="url"
                required
                value={formData.channelUrl}
                onChange={(e) => setFormData({ ...formData, channelUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-surface/50 backdrop-blur-xl border border-border/30 rounded-xl py-3 px-4 text-text-primary placeholder-text-secondary/60 focus:outline-none focus:border-secondary/50 transition-all duration-300"
              />
            </motion.div>

            {/* Reason */}
            <motion.div variants={itemVariants}>
              <label htmlFor="reason" className="block text-sm font-medium text-text-primary mb-2">
                Why should this creator win? *
              </label>
              <textarea
                id="reason"
                required
                rows={4}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Tell us why this creator deserves to win this award..."
                className="w-full bg-surface/50 backdrop-blur-xl border border-border/30 rounded-xl py-3 px-4 text-text-primary placeholder-text-secondary/60 focus:outline-none focus:border-secondary/50 transition-all duration-300 resize-none"
              />
              <p className="mt-2 text-sm text-text-secondary text-right">
                {formData.reason.length}/500 characters
              </p>
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-between gap-4 pt-4"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center bg-surface/50 hover:bg-surface/70 text-text-primary font-medium py-3 px-6 rounded-xl transition-all duration-300 border border-border/30"
                >
                  Cancel
                </Link>
              </motion.div>
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 btn-glow"
              >
                {submitting ? 'Submitting...' : 'Submit Nomination'}
              </motion.button>
            </motion.div>
          </motion.form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}