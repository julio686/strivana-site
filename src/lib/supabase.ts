// Supabase client configuration - MOCK ONLY (no real Supabase client)
// This prevents any Supabase initialization errors when env vars are missing

// Mock flag - always false since we don't use real Supabase
export const isSupabaseConfigured = false

// Create a mock query builder that supports chaining and returns proper promise
class MockQueryBuilder {
  eq() { return this }
  order() { return this }
  select() { return this }
  insert() { return this }
  match() { return this }
  
  // Return a proper promise for await
  async then<T>(onFulfilled: (value: { data: null; error: null }) => T | PromiseLike<T>): Promise<T> {
    return Promise.resolve({ data: null, error: null }).then(onFulfilled)
  }
}

// Mock Supabase client - NEVER creates a real Supabase client
export const supabase = {
  from: () => new MockQueryBuilder(),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
} as any

// Job listing type matching Supabase schema
export interface JobListing {
  id: number
  title: string
  location: string
  salary: string
  type: string
  description: string
  requirements: string[]
  is_active: boolean
  created_at?: string
}

// Application type for submissions
export interface JobApplication {
  name: string
  email: string
  phone?: string
  position: string
  country: string
  english_level: string
  experience: string
  message?: string
  resume_url?: string
}

// Ghost Agent types for future SEO/GEO/digital marketing automation
export interface GhostAgentTask {
  id: string
  task_type: 'seo' | 'geo' | 'content' | 'social' | 'analytics'
  status: 'pending' | 'running' | 'completed' | 'failed'
  prompt: string
  result?: string
  created_at: string
  completed_at?: string
}

export interface SEOTask extends GhostAgentTask {
  task_type: 'seo'
  target_keywords: string[]
  page_url: string
}

export interface GEOTask extends GhostAgentTask {
  task_type: 'geo'
  ai_platforms: ('perplexity' | 'chatgpt' | 'claude' | 'gemini')[]
  visibility_goal: string
}
