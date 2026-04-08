import { Loader2 } from "lucide-react"
import Link from "next/link"
import { WEB_URL } from "@/constants"
import { ReactNode } from "react"
import { User } from "@supabase/supabase-js"

interface CommentAuthGuardProps {
	loading: boolean
	user: User | null | undefined
	children: ReactNode
}

const CommentAuthGuard = ({
	loading,
	user,
	children,
}: CommentAuthGuardProps) => {
	if (loading) {
		return (
			<div className="flex items-center justify-center p-10 bg-white/[0.02] rounded-3xl border border-white/5 animate-pulse">
				<Loader2 className="animate-spin text-purple-500/50" size={24} />
			</div>
		)
	}

	if (!user) {
		return (
			<div className="p-8 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
				<p className="text-sm text-gray-500">
					Bạn cần{" "}
					<Link
						href={`${WEB_URL}/dang-nhap`}
						className="text-purple-400 font-bold hover:underline"
					>
						đăng nhập
					</Link>{" "}
					để thảo luận.
				</p>
			</div>
		)
	}

	return <>{children}</>
}

export default CommentAuthGuard
