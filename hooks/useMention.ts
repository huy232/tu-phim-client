"use client"
import { supabase } from "@/supabase/client"
import { useEffect, useState } from "react"

type MentionUser = {
	id: string
	username: string
	full_name: string | null
	avatar_url: string | null
}

export function useMentions(query: string) {
	const [users, setUsers] = useState<MentionUser[]>([])

	useEffect(() => {
		const fetch = async () => {
			if (!query) return setUsers([])

			const { data } = await supabase
				.from("profiles")
				.select("id, username, full_name, avatar_url")
				.ilike("username", `%${query}%`)
				.limit(5)

			setUsers(data || [])
		}

		fetch()
	}, [query])

	return users
}
