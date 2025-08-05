'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaTrophy, FaVoteYea, FaCog, FaGavel, FaChartBar } from 'react-icons/fa'
import { User } from '@supabase/supabase-js'
import { User as DatabaseUser } from '@/types/database'

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

interface DashboardClientProps {
  user: User | null
  profile: DatabaseUser | null
  nominations: {
    id: string
    categories: { id: string; name: string }
    creators: { id: string; name: string; primary_platform: string; channel_url: string }
  }[]
}

export default function DashboardClient({ user, profile, nominations }: DashboardClientProps) {
  const [signingOut, setSigningOut] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    setSigningOut(true)
    await supabase.auth.signOut()
    router.push('/login')
  }

  const quickActions = [
    {
      title: 'Nominate a Creator',
      description: 'Submit your nominations for the awards',
      href: '/nominate',
      icon: FaTrophy,
      color: 'from-secondary to-secondary/80',
      available: true
    },
    {
      title: 'Vote on Nominees',
      description: 'Cast your votes for the best creators',
      href: '/vote',
      icon: FaVoteYea,
      color: 'from-primary to-primary/80',
      available: true
    },
    {
      title: 'View Results',
      description: 'See the current standings and winners',
      href: '/results',
      icon: FaChartBar,
      color: 'from-background to-background/80',
      available: true
    }
  ]

  const adminActions = [
    ...(profile?.role === 'admin' ? [{
      title: 'Admin Dashboard',
      description: 'Manage nominations and system settings',
      href: '/admin',
      icon: FaCog,
      color: 'from-red-500 to-red-600',
      available: true
    }] : []),
    ...(profile?.role === 'judge' || profile?.role === 'admin' ? [{
      title: 'Judge Dashboard',
      description: 'Score nominees and provide feedback',
      href: '/judge',
      icon: FaGavel,
      color: 'from-purple-500 to-purple-600',
      available: true
    }] : [])
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8">
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
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
              <h1 className="text-3xl md:text-5xl font-bold mb-2">
                Welcome, <span className="text-gradient">{profile?.full_name || user?.email?.split('@')[0]}!</span>
              </h1>
              <p className="text-text-secondary">
                Your WWG Awards dashboard - nominate, vote, and celebrate great creators
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 text-sm rounded-full ${
                profile?.role === 'admin' 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : profile?.role === 'judge'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}>
                {profile?.role || 'user'}
              </span>
              <motion.button
                onClick={handleSignOut}
                disabled={signingOut}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-text-secondary hover:text-text-primary transition-colors disabled:opacity-50"
              >
                {signingOut ? 'Signing out...' : 'Sign out'}
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Quick Actions */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-bold mb-6 text-text-primary">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <motion.div
                      key={action.title}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="group"
                    >
                      <Link href={action.href}>
                        <div className={`glass rounded-2xl p-6 border border-border/30 backdrop-blur-xl h-full bg-gradient-to-br ${action.color} text-white transition-all duration-300 group-hover:shadow-glow`}>
                          <Icon className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300" />
                          <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                          <p className="text-white/80 text-sm">{action.description}</p>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Admin/Judge Actions */}
              {adminActions.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 text-text-primary">Administrative</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {adminActions.map((action) => {
                      const Icon = action.icon
                      return (
                        <motion.div
                          key={action.title}
                          whileHover={{ y: -4, scale: 1.02 }}
                          className="group"
                        >
                          <Link href={action.href}>
                            <div className={`glass rounded-2xl p-6 border border-border/30 backdrop-blur-xl h-full bg-gradient-to-br ${action.color} text-white transition-all duration-300 group-hover:shadow-glow`}>
                              <Icon className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300" />
                              <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                              <p className="text-white/80 text-sm">{action.description}</p>
                            </div>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* My Nominations */}
              <motion.div
                variants={itemVariants}
                className="glass rounded-2xl p-6 border border-border/30 backdrop-blur-xl"
              >
                <h3 className="text-xl font-bold mb-4 text-text-primary">My Nominations</h3>
                {nominations && nominations.length > 0 ? (
                  <div className="space-y-3">
                    {nominations.map((nomination) => (
                      <div key={nomination.id} className="border-l-4 border-secondary pl-3 py-2">
                        <p className="font-medium text-text-primary">
                          {nomination.creators?.name}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {nomination.categories?.name} • {nomination.creators?.primary_platform}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-text-secondary text-sm mb-2">No nominations yet</p>
                    <Link
                      href="/nominate"
                      className="text-secondary hover:text-secondary/80 text-sm font-medium"
                    >
                      Make your first nomination →
                    </Link>
                  </div>
                )}
              </motion.div>

              {/* Awards Status */}
              <motion.div
                variants={itemVariants}
                className="glass rounded-2xl p-6 border border-border/30 backdrop-blur-xl"
              >
                <h3 className="text-xl font-bold mb-4 text-text-primary">Awards Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Nominations</span>
                    <span className="px-3 py-1 text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
                      Open
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Voting</span>
                    <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Judging</span>
                    <span className="px-3 py-1 text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full">
                      In Progress
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="glass rounded-2xl p-6 border border-border/30 backdrop-blur-xl"
              >
                <h3 className="text-xl font-bold mb-4 text-text-primary">Your Activity</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">{nominations?.length || 0}</div>
                    <div className="text-sm text-text-secondary">Nominations Made</div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  )
}