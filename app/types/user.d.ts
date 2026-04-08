interface UserTitle {
	name: string
	color_code?: string
	effect_type?: string // Ví dụ: 'glow', 'shimmer', 'none'
}

interface UserProfile {
	id: string
	username: string
	full_name: string | null
	avatar_url: string | null
	level: number
	exp: number
	rank_title: string
	comment_count: number
	equippedFrame?: string | null
	equippedBadge?: string | null
	equippedTitles?: UserTitle[]
	equippedFrameMask?: string | null
}

interface LevelConfig {
	level: number
	required_exp: number
	rank_title: string
	color_code: string
}

interface Asset {
	id: string
	type: "frame" | "badge" | "title"
	name: string
	image_url: string | null
	description?: string
	required_level: number
	metadata?: AssetMetadata
}

interface FullProfile extends UserProfile {
	equippedFrame: string | null
	equippedBadge: string | null
	equippedTitles: Asset[]

	user_assets?: {
		is_equipped: boolean
		assets: Asset
	}[]
}

interface UserProgress {
	id: string
	episode_slug: string | null
	episode_name: string | null
	percent_complete: number
	film: SupabaseFilm
	current_time_seconds: number
	duration_seconds: seconds
	updated_at: Date
	film_id: string
}

interface ProfileHeaderProps {
	profile: FullProfile
	levels: LevelConfig[]
}

interface RawProfile extends UserProfile {
	user_assets: {
		is_equipped: boolean
		assets: Asset
	}[]
}

interface AssetMetadata {
	color?: string
	effect?: string
	css?: string
	mask_url?: string
}

interface Asset {
	id: string
	type: "frame" | "badge" | "title"
	name: string
	image_url: string | null
	description: string | null
	required_level: number
	metadata: AssetMetadata
	created_at?: string
}

interface UserAssetLink {
	is_equipped: boolean
	user_id?: string
	assets: Asset
}

interface RawProfile {
	id: string
	username: string
	full_name: string
	avatar_url: string
	level: number
	exp: number
	gold: number
	rank_title: string
	user_assets: UserAssetLink[]
}

interface FullProfile extends Omit<RawProfile, "user_assets"> {
	equippedFrame: string | null
	equippedBadge: string | null
	equippedTitles: Asset[]
	user_assets: UserAssetLink[]
	equippedFrameMask: string | null
}
