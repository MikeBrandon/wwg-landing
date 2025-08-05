'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import AwardsConfig from './AwardsConfig'

interface Nomination {
  id: string
  reason: string
  created_at: string
  users: { full_name: string; email: string }
  categories: { id: string; name: string }
  creators: { id: string; name: string; primary_platform: string; channel_url: string }
}

interface GroupedNomination {
  creator: {
    id: string
    name: string
    primary_platform: string
    channel_url: string
  }
  category: {
    id: string
    name: string
  }
  votes: number
  nominations: {
    user: { full_name: string; email: string }
    reason: string
  }[]
}

interface Nominee {
  id: string
  is_approved: boolean
  admin_notes: string | null
  categories: { id: string; name: string }
  creators: { id: string; name: string; primary_platform: string; channel_url: string }
}

interface User {
  id: string
  email: string
  full_name: string | null
  role: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'nominations' | 'nominees' | 'users' | 'awards'>('nominations')
  const [nominations, setNominations] = useState<Nomination[]>([])
  const [groupedNominations, setGroupedNominations] = useState<{[key: string]: GroupedNomination[]}>({})
  const [nominees, setNominees] = useState<Nominee[]>([])
  const [groupedNominees, setGroupedNominees] = useState<{[key: string]: Nominee[]}>({})
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [hoveredNominee, setHoveredNominee] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'nominations') {
        const { data } = await supabase
          .from('nominations')
          .select(`
            *,
            users(full_name, email),
            categories(id, name),
            creators(id, name, primary_platform, channel_url)
          `)
          .order('created_at', { ascending: false })
        
        setNominations(data || [])

        // Group nominations by category and creator
        const grouped = (data || []).reduce((acc: {[key: string]: GroupedNomination[]}, nomination) => {
          const categoryId = nomination.categories.id
          
          if (!acc[categoryId]) {
            acc[categoryId] = []
          }

          const existingNomination = acc[categoryId].find(
            n => n.creator.id === nomination.creators.id
          )

          if (existingNomination) {
            existingNomination.votes++
            existingNomination.nominations.push({
              user: nomination.users,
              reason: nomination.reason
            })
          } else {
            acc[categoryId].push({
              creator: nomination.creators,
              category: { id: categoryId, name: nomination.categories.name },
              votes: 1,
              nominations: [{
                user: nomination.users,
                reason: nomination.reason
              }]
            })
          }

          return acc
        }, {})

        setGroupedNominations(grouped)
      } else if (activeTab === 'nominees') {
        const { data } = await supabase
          .from('nominees')
          .select(`
            *,
            categories(id, name),
            creators(name, primary_platform, channel_url)
          `)
          .order('created_at', { ascending: false })
        setNominees(data || [])

        // Group nominees by category
        const grouped = (data || []).reduce((acc: {[key: string]: Nominee[]}, nominee) => {
          const categoryId = nominee.categories.id
          
          if (!acc[categoryId]) {
            acc[categoryId] = []
          }

          acc[categoryId].push(nominee)
          return acc
        }, {})

        setGroupedNominees(grouped)
      } else if (activeTab === 'users') {
        const { data } = await supabase
          .from('users')
          .select('id, email, full_name, role')
          .order('created_at', { ascending: false })
        setUsers(data || [])
      }
    } catch (error) {
      console.error('Error loading data:', error)
      setMessage('Error loading data')
    } finally {
      setLoading(false)
    }
  }

  const approveNomination = async (nomination: GroupedNomination) => {
    try {
      // Check if nominee already exists for this category/creator combination
      const { data: existingNominee } = await supabase
        .from('nominees')
        .select('id')
        .eq('category_id', nomination.category.id)
        .eq('creator_id', nomination.creator.id)
        .single()

      if (existingNominee) {
        setMessage('This creator is already a nominee in this category')
        return
      }

      // Create nominee
      const { error } = await supabase
        .from('nominees')
        .insert({
          category_id: nomination.category.id,
          creator_id: nomination.creator.id,
          is_approved: true
        })

      if (error) throw error

      setMessage('Nomination approved successfully!')
      loadData()
    } catch (error) {
      console.error('Error approving nomination:', error)
      setMessage('Error approving nomination')
    }
  }

  const updateNomineeStatus = async (nomineeId: string, isApproved: boolean, notes?: string) => {
    try {
      const { error } = await supabase
        .from('nominees')
        .update({ 
          is_approved: isApproved,
          admin_notes: notes || null
        })
        .eq('id', nomineeId)

      if (error) throw error

      setMessage('Nominee status updated!')
      loadData()
    } catch (error) {
      console.error('Error updating nominee:', error)
      setMessage('Error updating nominee status')
    }
  }

  const updateUserRole = async (userId: string, role: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', userId)

      if (error) throw error

      setMessage('User role updated!')
      loadData()
    } catch (error) {
      console.error('Error updating user role:', error)
      setMessage('Error updating user role')
    }
  }

  const addManualNominee = async (formData: FormData) => {
    try {
      const name = formData.get('name') as string
      const platform = formData.get('platform') as string
      const channelUrl = formData.get('channelUrl') as string
      const categoryId = formData.get('categoryId') as string

      // First create or find the creator
      const { data: creatorData, error: creatorError } = await supabase
        .from('creators')
        .select('id')
        .eq('name', name)
        .eq('primary_platform', platform)
        .single()

      let creator = creatorData

      if (creatorError) {
        // Create new creator
        const { data: newCreator, error: newCreatorError } = await supabase
          .from('creators')
          .insert({ name, primary_platform: platform, channel_url: channelUrl })
          .select('id')
          .single()

        if (newCreatorError) throw newCreatorError
        creator = newCreator
      }

      // Create nominee
      const { error: nomineeError } = await supabase
        .from('nominees')
        .insert({
          category_id: categoryId,
          creator_id: creator?.id,
          is_approved: true,
          admin_notes: 'Added manually by admin'
        })

      if (nomineeError) throw nomineeError

      setMessage('Manual nominee added successfully!')
      loadData()
    } catch (error) {
      console.error('Error adding manual nominee:', error)
      setMessage('Error adding manual nominee')
    }
  }

  return (
    <div className="flex-1 flex flex-col w-full sm:max-w-md md:max-w-none justify-center gap-2">
      <nav className="bg-background shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-secondary">Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
              <Link href="/dashboard" className="text-secondary hover:text-secondary/80">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-6 sm:px-6 lg:px-8">
        {message && (
          <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-md">
            {message}
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'nominations', label: 'Nominations' },
              { key: 'nominees', label: 'Nominees' },
              { key: 'users', label: 'Users' },
              { key: 'awards', label: 'Awards' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'nominations' | 'nominees' | 'users' | 'awards')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        ) : (
          <div>
            {/* Nominations Tab */}
            {activeTab === 'nominations' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Pending Nominations</h2>
                {Object.keys(groupedNominations).length === 0 ? (
                  <p className="text-gray-500">No nominations found.</p>
                ) : (
                  <div className="space-y-8">
                    {Object.entries(groupedNominations).map(([categoryId, nominations]) => (
                      <div key={categoryId} className="bg-white shadow overflow-hidden sm:rounded-md">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                          <h3 className="text-lg font-medium text-gray-900">{nominations[0].category.name}</h3>
                        </div>
                        <ul className="divide-y divide-gray-200">
                          {nominations.map((nomination) => (
                            <li 
                              key={`${nomination.creator.name}-${categoryId}`} 
                              className="px-6 py-4"
                              onMouseEnter={() => setHoveredNominee(`${nomination.creator.name}-${categoryId}`)}
                              onMouseLeave={() => setHoveredNominee(null)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center">
                                    <div className="flex-1">
                                      <h3 className="text-lg font-medium text-gray-900">
                                        {nomination.creator.name}
                                      </h3>
                                      <p className="text-sm text-gray-500">
                                        {nomination.creator.primary_platform} • {nomination.votes} vote{nomination.votes !== 1 ? 's' : ''}
                                      </p>
                                      {hoveredNominee === `${nomination.creator.name}-${categoryId}` && (
                                        <div className="mt-2 bg-gray-50 p-3 rounded-md">
                                          <h4 className="text-sm font-medium text-gray-700 mb-2">Nominations:</h4>
                                          {nomination.nominations.map((nom, idx) => (
                                            <div key={idx} className="mb-2 last:mb-0">
                                              <p className="text-sm text-gray-600">
                                                <span className="font-medium">{nom.user?.full_name || nom.user?.email || 'Unknown'}</span>
                                              </p>
                                              <p className="text-sm text-gray-500">{nom.reason}</p>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      <a
                                        href={nomination.creator.channel_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-foreground hover:text-foreground/80 text-sm"
                                      >
                                        View Channel →
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="ml-4 self-start">
                                  <button
                                    onClick={() => approveNomination(nomination)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                  >
                                    Approve as Nominee
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Nominees Tab */}
            {activeTab === 'nominees' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Manage Nominees</h2>
                  <button
                    onClick={() => {
                      const modal = document.getElementById('addNomineeModal') as HTMLDialogElement
                      modal?.showModal()
                    }}
                    className="bg-foreground hover:bg-foreground/80 text-background px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Add Manual Nominee
                  </button>
                </div>

                {Object.keys(groupedNominees).length === 0 ? (
                  <p className="text-gray-500">No nominees found.</p>
                ) : (
                  <div className="space-y-8">
                    {Object.entries(groupedNominees).map(([categoryId, nominees]) => (
                      <div key={categoryId} className="bg-white shadow overflow-hidden sm:rounded-md">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                          <h3 className="text-lg font-medium text-gray-900">{nominees[0].categories.name}</h3>
                        </div>
                        <ul className="divide-y divide-gray-200">
                          {nominees.map((nominee) => (
                            <li key={nominee.id} className="px-6 py-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg font-medium text-gray-900">
                                    {nominee.creators.name}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {nominee.creators.primary_platform}
                                  </p>
                                  {nominee.admin_notes && (
                                    <p className="text-sm text-gray-600 mt-1">
                                      <strong>Notes:</strong> {nominee.admin_notes}
                                    </p>
                                  )}
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-2 ${
                                    nominee.is_approved
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {nominee.is_approved ? 'Approved' : 'Not Approved'}
                                  </span>
                                </div>
                                <div className="ml-4 flex space-x-2">
                                  <button
                                    onClick={() => updateNomineeStatus(nominee.id, !nominee.is_approved)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                                      nominee.is_approved
                                        ? 'bg-red-600 hover:bg-red-700 text-white'
                                        : 'bg-green-600 hover:bg-green-700 text-white'
                                    }`}
                                  >
                                    {nominee.is_approved ? 'Remove' : 'Approve'}
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Manage Users</h2>
                {users.length === 0 ? (
                  <p className="text-gray-500">No users found.</p>
                ) : (
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {users.map((user) => (
                        <li key={user.id} className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-medium text-gray-900">
                                {user.full_name || 'No name set'}
                              </h3>
                              <p className="text-sm text-gray-500">{user.email}</p>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-2 ${
                                user.role === 'admin'
                                  ? 'bg-red-100 text-red-800'
                                  : user.role === 'judge'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {user.role}
                              </span>
                            </div>
                            <div className="ml-4">
                              <select
                                value={user.role}
                                onChange={(e) => updateUserRole(user.id, e.target.value)}
                                className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="user">User</option>
                                <option value="judge">Judge</option>
                                <option value="admin">Admin</option>
                              </select>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Awards Tab */}
            {activeTab === 'awards' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Awards Management</h2>
                <AwardsConfig />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Manual Nominee Modal */}
      <dialog id="addNomineeModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Manual Nominee</h3>
          <form action={addManualNominee} className="space-y-4 mt-4">
            <input
              name="name"
              placeholder="Creator Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
            <select
              name="platform"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            >
              <option value="">Select Platform</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="twitch">Twitch</option>
              <option value="other">Other</option>
            </select>
            <input
              name="channelUrl"
              placeholder="Channel URL"
              type="url"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
            <select
              name="categoryId"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            >
              <option value="">Select Category</option>
              {/* This would need to be populated with actual categories */}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  const modal = document.getElementById('addNomineeModal') as HTMLDialogElement
                  modal?.close()
                }}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-foreground text-background rounded-md"
              >
                Add Nominee
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}