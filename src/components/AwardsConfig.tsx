'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'

interface Award {
  id: string
  name: string
  description: string
  is_active: boolean
  nomination_start_date: string | null
  nomination_end_date: string | null
  voting_start_date: string | null
  voting_end_date: string | null
  judging_start_date: string | null
  judging_end_date: string | null
}

interface Category {
  id: string
  award_id: string
  name: string
  description: string
  is_active: boolean
}

export default function AwardsConfig() {
  const [awards, setAwards] = useState<Award[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState<'awards' | 'categories'>('awards')
  const [editingAward, setEditingAward] = useState<Award | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const supabase = createClient()

  const loadData = useCallback(async () => {
    try {
      const [awardsResult, categoriesResult] = await Promise.all([
        supabase.from('awards').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name')
      ])

      setAwards(awardsResult.data || [])
      setCategories(categoriesResult.data || [])
    } catch (error) {
      console.error('Error loading data:', error)
      setMessage('Error loading awards data')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    loadData()
  }, [loadData])

  const saveAward = async (award: Partial<Award>) => {
    setSaving(true)
    setMessage('')

    try {
      if (editingAward?.id) {
        // Update existing award
        const { error } = await supabase
          .from('awards')
          .update(award)
          .eq('id', editingAward.id)
        
        if (error) throw error
        setMessage('Award updated successfully!')
      } else {
        // Create new award
        const { error } = await supabase
          .from('awards')
          .insert(award)
        
        if (error) throw error
        setMessage('Award created successfully!')
      }

      setEditingAward(null)
      loadData()
    } catch (error) {
      console.error('Error saving award:', error)
      setMessage('Error saving award')
    } finally {
      setSaving(false)
    }
  }

  const saveCategory = async (category: Partial<Category>) => {
    setSaving(true)
    setMessage('')

    try {
      if (editingCategory?.id) {
        // Update existing category
        const { error } = await supabase
          .from('categories')
          .update(category)
          .eq('id', editingCategory.id)
        
        if (error) throw error
        setMessage('Category updated successfully!')
      } else {
        // Create new category
        const { error } = await supabase
          .from('categories')
          .insert(category)
        
        if (error) throw error
        setMessage('Category created successfully!')
      }

      setEditingCategory(null)
      loadData()
    } catch (error) {
      console.error('Error saving category:', error)
      setMessage('Error saving category')
    } finally {
      setSaving(false)
    }
  }

  const deleteAward = async (id: string) => {
    if (!confirm('Are you sure you want to delete this award? This will also delete all associated categories.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('awards')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      setMessage('Award deleted successfully!')
      loadData()
    } catch (error) {
      console.error('Error deleting award:', error)
      setMessage('Error deleting award')
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      setMessage('Category deleted successfully!')
      loadData()
    } catch (error) {
      console.error('Error deleting category:', error)
      setMessage('Error deleting category')
    }
  }

  const AwardForm = ({ award, onSave, onCancel }: {
    award?: Award | null
    onSave: (award: Partial<Award>) => void
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState({
      name: award?.name || '',
      description: award?.description || '',
      is_active: award?.is_active ?? true,
      nomination_start_date: award?.nomination_start_date || '',
      nomination_end_date: award?.nomination_end_date || '',
      voting_start_date: award?.voting_start_date || '',
      voting_end_date: award?.voting_end_date || '',
      judging_start_date: award?.judging_start_date || '',
      judging_end_date: award?.judging_end_date || ''
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const submitData: Partial<Award> = {
        ...formData,
        nomination_start_date: formData.nomination_start_date || null,
        nomination_end_date: formData.nomination_end_date || null,
        voting_start_date: formData.voting_start_date || null,
        voting_end_date: formData.voting_end_date || null,
        judging_start_date: formData.judging_start_date || null,
        judging_end_date: formData.judging_end_date || null
      }
      onSave(submitData)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Award Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Active</label>
            <select
              value={formData.is_active.toString()}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nomination Start</label>
            <input
              type="datetime-local"
              value={formData.nomination_start_date}
              onChange={(e) => setFormData({ ...formData, nomination_start_date: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nomination End</label>
            <input
              type="datetime-local"
              value={formData.nomination_end_date}
              onChange={(e) => setFormData({ ...formData, nomination_end_date: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Voting Start</label>
            <input
              type="datetime-local"
              value={formData.voting_start_date}
              onChange={(e) => setFormData({ ...formData, voting_start_date: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Voting End</label>
            <input
              type="datetime-local"
              value={formData.voting_end_date}
              onChange={(e) => setFormData({ ...formData, voting_end_date: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judging Start</label>
            <input
              type="datetime-local"
              value={formData.judging_start_date}
              onChange={(e) => setFormData({ ...formData, judging_start_date: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Judging End</label>
            <input
              type="datetime-local"
              value={formData.judging_end_date}
              onChange={(e) => setFormData({ ...formData, judging_end_date: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : (award ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    )
  }

  const CategoryForm = ({ category, onSave, onCancel }: {
    category?: Category | null
    onSave: (category: Partial<Category>) => void
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState({
      award_id: category?.award_id || (awards[0]?.id || ''),
      name: category?.name || '',
      description: category?.description || '',
      is_active: category?.is_active ?? true
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSave(formData)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Award</label>
            <select
              required
              value={formData.award_id}
              onChange={(e) => setFormData({ ...formData, award_id: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select an award</option>
              {awards.map(award => (
                <option key={award.id} value={award.id}>{award.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Active</label>
            <select
              value={formData.is_active.toString()}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : (category ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-4 rounded-md ${
          message.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('awards')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'awards'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Awards
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'categories'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Categories
          </button>
        </nav>
      </div>

      {/* Awards Tab */}
      {activeTab === 'awards' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Awards Management</h3>
            <button
              onClick={() => setEditingAward({} as Award)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              Create New Award
            </button>
          </div>

          {editingAward !== null && (
            <AwardForm
              award={editingAward}
              onSave={saveAward}
              onCancel={() => setEditingAward(null)}
            />
          )}

          <div className="space-y-4">
            {awards.map(award => (
              <div key={award.id} className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium">{award.name}</h4>
                    <p className="text-gray-600">{award.description}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                      award.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {award.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingAward(award)}
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAward(award.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Categories Management</h3>
            <button
              onClick={() => setEditingCategory({} as Category)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              Create New Category
            </button>
          </div>

          {editingCategory !== null && (
            <CategoryForm
              category={editingCategory}
              onSave={saveCategory}
              onCancel={() => setEditingCategory(null)}
            />
          )}

          <div className="space-y-4">
            {categories.map(category => {
              const award = awards.find(a => a.id === category.award_id)
              return (
                <div key={category.id} className="bg-white border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium">{category.name}</h4>
                      <p className="text-gray-600">{category.description}</p>
                      <p className="text-sm text-gray-500">Award: {award?.name}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                        category.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {category.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="text-indigo-600 hover:text-indigo-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}