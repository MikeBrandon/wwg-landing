export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: 'user' | 'admin' | 'judge'
  created_at: string
  updated_at: string
}

export interface Award {
  id: string
  name: string
  description: string
  is_active: boolean
  nomination_start_date?: string
  nomination_end_date?: string
  voting_start_date?: string
  voting_end_date?: string
  judging_start_date?: string
  judging_end_date?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  award_id: string
  name: string
  description: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Creator {
  id: string
  name: string
  primary_platform: 'youtube' | 'tiktok' | 'twitch' | 'other'
  channel_url: string
  created_at: string
  updated_at: string
}

export interface Nomination {
  id: string
  user_id: string
  category_id: string
  creator_id: string
  reason: string
  created_at: string
  updated_at: string
}

export interface Nominee {
  id: string
  category_id: string
  creator_id: string
  is_approved: boolean
  admin_notes?: string
  created_at: string
  updated_at: string
}

export interface Vote {
  id: string
  user_id: string
  nominee_id: string
  created_at: string
}

export interface JudgeScore {
  id: string
  judge_id: string
  nominee_id: string
  consistency_score: number // 1-3
  influence_score: number // 1-3
  engagement_score: number // 1-3
  quality_score: number // 1-3
  total_score: number // calculated field
  created_at: string
  updated_at: string
}

export interface FinalScore {
  id: string
  nominee_id: string
  vote_points: number
  judge_points: number
  total_points: number
  rank: number
  created_at: string
  updated_at: string
}