import { createBrowserClient } from "@supabase/ssr"

export const supabase = createBrowserClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	{
		auth: {
			lock: async (_name, _acquireTimeout, fn) => {
				return await fn()
			},
		},
	},
)
