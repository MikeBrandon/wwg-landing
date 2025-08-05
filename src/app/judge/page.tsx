import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import JudgeDashboard from '@/components/JudgeDashboard'

export default async function JudgePage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user is a judge
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'judge' && profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  return <JudgeDashboard />
}