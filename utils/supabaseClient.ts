import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'
import { CookieOptions } from '@supabase/ssr'

export const createClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${name}=`))
            ?.split('=')[1] || ''
        },
        set(name: string, value: string, options: CookieOptions) {
          document.cookie = `${name}=${value}; path=${options.path}${options.maxAge ? `; max-age=${options.maxAge}` : ''}`
        },
        remove(name: string, options: CookieOptions) {
          document.cookie = `${name}=; path=${options.path}; expires=Thu, 01 Jan 1970 00:00:01 GMT`
        },
      },
    }
  )
}

export const supabase = createClient()