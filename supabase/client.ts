import { createBrowserClient } from "@supabase/ssr"

// export const supabase = createBrowserClient(
// 	process.env.NEXT_PUBLIC_SUPABASE_URL!,
// 	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// )

export const supabase = createBrowserClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	// {
	// 	auth: {
	// 		lock: async (name, _timeout, callback) => {
	// 			if (typeof navigator !== "undefined" && navigator.locks) {
	// 				return navigator.locks.request(name, callback)
	// 			}
	// 			return callback()
	// 		},
	// 	},
	// },
)
