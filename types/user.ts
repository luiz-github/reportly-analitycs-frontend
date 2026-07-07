export interface User {
  id: number
  agency_name: string
  email: string
  plan: 'trial' | 'basic' | 'pro' | 'enterprise'
  plan_starts: string | null
  plan_ends: string | null
}