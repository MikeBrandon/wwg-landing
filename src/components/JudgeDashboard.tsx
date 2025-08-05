'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User } from '@supabase/supabase-js'

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
}

interface JudgeScore {
  id?: string
  nominee_id: string
  consistency_score: number
  influence_score: number
  engagement_score: number
  quality_score: number
  total_score: number
}

export default function JudgeDashboard() {
  const [categories, setCategories] = useState<Category[]>([])
  const [nominees, setNominees] = useState<Nominee[]>([])
  const [judgeScores, setJudgeScores] = useState<Map<string, JudgeScore>>(new Map())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const supabase = createClient()

  const loadJudgingData = useCallback(async () => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setCurrentUser(user)

      // Load categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name')

      setCategories(categoriesData || [])

      // Select first category by default
      if (categoriesData && categoriesData.length > 0) {
        setSelectedCategory(categoriesData[0].id)
      }

    } catch (error) {
      console.error('Error loading judging data:', error)
      setMessage('Error loading judging data. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const loadNomineesAndScores = useCallback(async () => {
    try {
      // Load approved nominees for the selected category
      const { data: nomineesData } = await supabase
        .from('nominees')
        .select(`
          id,
          categories!inner(id, name),
          creators!inner(id, name, primary_platform, channel_url)
        `)
        .eq('category_id', selectedCategory)
        .eq('is_approved', true)

      setNominees((nomineesData as unknown as Nominee[]) || [])

      // Load existing judge scores for these nominees
      const { data: scoresData } = await supabase
        .from('judge_scores')
        .select('*')
        .eq('judge_id', currentUser?.id)
        .in('nominee_id', (nomineesData || []).map(n => n.id))

      const scoresMap = new Map<string, JudgeScore>()
      scoresData?.forEach(score => {
        scoresMap.set(score.nominee_id, score)
      })

      // Initialize scores for nominees without scores
      nomineesData?.forEach(nominee => {
        if (!scoresMap.has(nominee.id)) {
          scoresMap.set(nominee.id, {
            nominee_id: nominee.id,
            consistency_score: 1,
            influence_score: 1,
            engagement_score: 1,
            quality_score: 1,
            total_score: 4
          })
        }
      })

      setJudgeScores(scoresMap)

    } catch (error) {
      console.error('Error loading nominees and scores:', error)
      setMessage('Error loading nominees and scores.')
    }
  }, [selectedCategory, currentUser, supabase])

  useEffect(() => {
    loadJudgingData()
  }, [loadJudgingData])

  useEffect(() => {
    if (selectedCategory && currentUser) {
      loadNomineesAndScores()
    }
  }, [selectedCategory, currentUser, loadNomineesAndScores])

  const updateScore = (nomineeId: string, criterion: string, value: number) => {
    setJudgeScores(prev => {
      const newScores = new Map(prev)
      const current = newScores.get(nomineeId) || {
        nominee_id: nomineeId,
        consistency_score: 1,
        influence_score: 1,
        engagement_score: 1,
        quality_score: 1,
        total_score: 4
      }

      const updated = { ...current, [criterion]: value }
      updated.total_score = updated.consistency_score + updated.influence_score + 
                          updated.engagement_score + updated.quality_score

      newScores.set(nomineeId, updated)
      return newScores
    })
  }

  const saveScore = async (nomineeId: string) => {
    setSaving(true)
    setMessage('')

    try {
      const score = judgeScores.get(nomineeId)
      if (!score) return

      const scoreData = {
        judge_id: currentUser?.id,
        nominee_id: nomineeId,
        consistency_score: score.consistency_score,
        influence_score: score.influence_score,
        engagement_score: score.engagement_score,
        quality_score: score.quality_score
      }

      let error
      if (score.id) {
        // Update existing score
        const result = await supabase
          .from('judge_scores')
          .update(scoreData)
          .eq('id', score.id)
        error = result.error
      } else {
        // Insert new score
        const result = await supabase
          .from('judge_scores')
          .insert(scoreData)
          .select()
          .single()
        
        if (!result.error && result.data) {
          // Update local state with the returned ID
          setJudgeScores(prev => {
            const newScores = new Map(prev)
            const updated = { ...score, id: result.data.id }
            newScores.set(nomineeId, updated)
            return newScores
          })
        }
        error = result.error
      }

      if (error) throw error

      setMessage('Score saved successfully!')
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000)

    } catch (error) {
      console.error('Error saving score:', error)
      setMessage('Error saving score. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const saveAllScores = async () => {
    setSaving(true)
    setMessage('')

    try {
      const scoresToSave = Array.from(judgeScores.values()).map(score => ({
        judge_id: currentUser?.id,
        nominee_id: score.nominee_id,
        consistency_score: score.consistency_score,
        influence_score: score.influence_score,
        engagement_score: score.engagement_score,
        quality_score: score.quality_score
      }))

      // Use upsert to handle both inserts and updates
      const { error } = await supabase
        .from('judge_scores')
        .upsert(scoresToSave, { 
          onConflict: 'judge_id,nominee_id',
          ignoreDuplicates: false 
        })

      if (error) throw error

      setMessage('All scores saved successfully!')
      loadNomineesAndScores() // Reload to get updated data with IDs

    } catch (error) {
      console.error('Error saving all scores:', error)
      setMessage('Error saving scores. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const ScoreInput = ({ 
    label, 
    description, 
    value, 
    onChange 
  }: {
    label: string
    description: string
    value: number
    onChange: (value: number) => void
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">{label}</label>
      <p className="text-xs text-text-secondary">{description}</p>
      <div className="flex space-x-2">
        {[1, 2, 3].map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            className={`w-10 h-10 rounded-full border-2 text-sm font-medium transition-colors ${
              value === score
                ? 'border-blue-500 bg-blue-500 text-white'
                : 'border-border text-text-primary hover:border-blue-500/50'
            }`}
          >
            {score}
          </button>
        ))}
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-text-secondary">Loading judging panel...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="min-h-screen bg-primary"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-secondary">Judge Dashboard</h1>
            </div>
            <div className="flex items-center">
              <Link href="/dashboard" className="text-secondary hover:text-text-primary transition-colors">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {message && (
          <div className={`mb-4 p-4 rounded-md ${
            message.includes('successfully') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
          }`}>
            {message}
          </div>
        )}

        <motion.div 
          variants={itemVariants}
          className="glass rounded-2xl border border-border/30 backdrop-blur-xl"
        >
          <div className="px-6 py-4 border-b border-border">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-text-primary">Judge Scoring Panel</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Score nominees on a scale of 1-3 for each criterion. Higher scores are better.
                </p>
              </div>
              <button
                onClick={saveAllScores}
                disabled={saving}
                className="bg-blue-500 hover:bg-blue-500/80 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                {saving ? 'Saving...' : 'Save All Scores'}
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="border-b border-border">
            <nav className="flex space-x-8 px-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'border-blue-500 text-blue-500'
                      : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Scoring Section */}
          <div className="p-6">
            {nominees.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text-secondary">No approved nominees in this category yet.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {nominees.map((nominee) => {
                  const score = judgeScores.get(nominee.id)
                  if (!score) return null

                  return (
                    <motion.div 
                      key={nominee.id} 
                      variants={itemVariants}
                      className="glass rounded-2xl border border-border/30 backdrop-blur-xl p-6"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-xl font-semibold text-text-primary">
                            {nominee.creators.name}
                          </h3>
                          <p className="text-sm text-text-secondary capitalize mb-2">
                            {nominee.creators.primary_platform}
                          </p>
                          <a
                            href={nominee.creators.channel_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-500/80 text-sm"
                          >
                            View Channel →
                          </a>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-500">
                            {score.total_score}/12
                          </div>
                          <div className="text-sm text-text-secondary">Total Score</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ScoreInput
                          label="Consistency"
                          description="Regular content uploads and reliable posting schedule"
                          value={score.consistency_score}
                          onChange={(value) => updateScore(nominee.id, 'consistency_score', value)}
                        />
                        
                        <ScoreInput
                          label="Influence"
                          description="Impact on their audience and the creator community"
                          value={score.influence_score}
                          onChange={(value) => updateScore(nominee.id, 'influence_score', value)}
                        />
                        
                        <ScoreInput
                          label="Engagement"
                          description="Community interaction and audience connection"
                          value={score.engagement_score}
                          onChange={(value) => updateScore(nominee.id, 'engagement_score', value)}
                        />
                        
                        <ScoreInput
                          label="Quality"
                          description="Production value and content excellence"
                          value={score.quality_score}
                          onChange={(value) => updateScore(nominee.id, 'quality_score', value)}
                        />
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => saveScore(nominee.id)}
                          disabled={saving}
                          className="bg-blue-500 hover:bg-blue-500/80 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                          Save Score
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </motion.div>

          {/* Scoring Guidelines */}
          <motion.div
            variants={itemVariants}
            className="glass rounded-2xl border border-border/30 backdrop-blur-xl p-8 mt-8"
          >
            <h3 className="text-2xl font-bold text-text-primary mb-6">Scoring Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <h4 className="font-bold text-blue-500 text-lg mb-3">Consistency (1-3)</h4>
                <ul className="text-text-secondary space-y-2">
                  <li className="flex items-center"><span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">3</span> Highly consistent posting</li>
                  <li className="flex items-center"><span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">2</span> Mostly consistent</li>
                  <li className="flex items-center"><span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">1</span> Irregular posting</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-blue-500 text-lg mb-3">Influence (1-3)</h4>
                <ul className="text-text-secondary space-y-2">
                  <li className="flex items-center"><span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">3</span> Major industry influence</li>
                  <li className="flex items-center"><span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">2</span> Notable influence</li>
                  <li className="flex items-center"><span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">1</span> Limited influence</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-blue-500 text-lg mb-3">Engagement (1-3)</h4>
                <ul className="text-text-secondary space-y-2">
                  <li className="flex items-center"><span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">3</span> Exceptional engagement</li>
                  <li className="flex items-center"><span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">2</span> Good engagement</li>
                  <li className="flex items-center"><span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">1</span> Basic engagement</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-blue-500 text-lg mb-3">Quality (1-3)</h4>
                <ul className="text-text-secondary space-y-2">
                  <li className="flex items-center"><span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">3</span> Outstanding quality</li>
                  <li className="flex items-center"><span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">2</span> High quality</li>
                  <li className="flex items-center"><span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">1</span> Acceptable quality</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
  )
}