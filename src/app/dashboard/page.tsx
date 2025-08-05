import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile with role
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get user's nominations
  const { data: nominations } = await supabase
    .from('nominations')
    .select(`
      *,
      categories(name),
      creators(name, primary_platform)
    `)
    .eq('user_id', user.id)

  return (
    <DashboardClient 
      user={user}
      profile={profile}
      nominations={nominations || []}
    />
  )
}