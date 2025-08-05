import { createClient } from '@/utils/supabase/client'

export interface ScoreData {
  nominee_id: string
  vote_count: number
  judge_total: number
  final_score: number
  rank: number
  category_id: string
}

export interface CategoryResults {
  category_id: string
  category_name: string
  results: ScoreData[]
}

/**
 * Calculate final scores and rankings for all categories
 * Voting contributes to placement points (5 points for 1st place, 4 for 2nd, etc.)
 * Judge scores are added directly to the final score
 */
export async function calculateFinalScores(): Promise<CategoryResults[]> {
  const supabase = createClient()
  
  try {
    // Get all active categories
    const { data: categories } = await supabase
      .from('categories')
      .select('id, name')
      .eq('is_active', true)

    if (!categories) return []

    const categoryResults: CategoryResults[] = []

    for (const category of categories) {
      // Get all approved nominees for this category
      const { data: nominees } = await supabase
        .from('nominees')
        .select(`
          id,
          creators(name)
        `)
        .eq('category_id', category.id)
        .eq('is_approved', true)

      if (!nominees || nominees.length === 0) continue

      const scoresData: ScoreData[] = []

      // Calculate scores for each nominee
      for (const nominee of nominees) {
        // Get vote count
        const { count: voteCount } = await supabase
          .from('votes')
          .select('*', { count: 'exact', head: true })
          .eq('nominee_id', nominee.id)

        // Get average judge score
        const { data: judgeScores } = await supabase
          .from('judge_scores')
          .select('total_score')
          .eq('nominee_id', nominee.id)

        const averageJudgeScore = judgeScores && judgeScores.length > 0
          ? judgeScores.reduce((sum, score) => sum + score.total_score, 0) / judgeScores.length
          : 0

        scoresData.push({
          nominee_id: nominee.id,
          vote_count: voteCount || 0,
          judge_total: Math.round(averageJudgeScore * 100) / 100, // Round to 2 decimal places
          final_score: 0, // Will be calculated after ranking
          rank: 0, // Will be calculated after sorting
          category_id: category.id
        })
      }

      // Sort by vote count to determine voting ranks
      const sortedByVotes = [...scoresData].sort((a, b) => b.vote_count - a.vote_count)
      
      // Assign voting placement points (5 for 1st, 4 for 2nd, etc., minimum 1)
      sortedByVotes.forEach((item, index) => {
        const votePoints = Math.max(1, Math.min(5, 5 - index))
        const scoreItem = scoresData.find(s => s.nominee_id === item.nominee_id)
        if (scoreItem) {
          scoreItem.final_score = votePoints + scoreItem.judge_total
        }
      })

      // Sort by final score to determine final rankings
      scoresData.sort((a, b) => b.final_score - a.final_score)
      
      // Assign final ranks
      scoresData.forEach((item, index) => {
        item.rank = index + 1
      })

      categoryResults.push({
        category_id: category.id,
        category_name: category.name,
        results: scoresData
      })
    }

    return categoryResults
  } catch (error) {
    console.error('Error calculating final scores:', error)
    throw error
  }
}

/**
 * Save calculated scores to the final_scores table
 */
export async function saveFinalScores(categoryResults: CategoryResults[]): Promise<void> {
  const supabase = createClient()

  try {
    // Clear existing final scores
    await supabase.from('final_scores').delete().neq('id', '')

    // Insert new final scores
    const finalScoresData = categoryResults.flatMap(category =>
      category.results.map(result => ({
        nominee_id: result.nominee_id,
        vote_points: result.final_score - result.judge_total,
        judge_points: result.judge_total,
        rank: result.rank
      }))
    )

    if (finalScoresData.length > 0) {
      const { error } = await supabase
        .from('final_scores')
        .insert(finalScoresData)

      if (error) throw error
    }
  } catch (error) {
    console.error('Error saving final scores:', error)
    throw error
  }
}

/**
 * Get current results with nominee details
 */
export async function getResultsWithDetails() {
  const supabase = createClient()

  try {
    const { data: results } = await supabase
      .from('final_scores')
      .select(`
        *,
        nominees(
          id,
          categories(id, name),
          creators(id, name, primary_platform, channel_url)
        )
      `)
      .order('rank', { ascending: true })

    return results || []
  } catch (error) {
    console.error('Error getting results:', error)
    throw error
  }
}