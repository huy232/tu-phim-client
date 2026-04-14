"use client"
import { useAuth } from "@/hooks/useAuth"
import { ReviewForm } from "./ReviewForm"
import { LockKeyhole, Loader2 } from "lucide-react"
import Link from "next/link"

interface ReviewFormWrapperProps {
	film: FilmInfo
	onUpdate: () => Promise<void>
}

export function ReviewFormWrapper({ film, onUpdate }: ReviewFormWrapperProps) {
	const { user, loading } = useAuth()

	if (loading)
		return (
			<div className="w-full h-32 flex items-center justify-center bg-gray-900/50 border border-gray-800 rounded-2xl animate-pulse">
				<Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
			</div>
		)

	if (!user) {
		return (
			<div className="group bg-linear-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 p-8 rounded-2xl my-8 text-center backdrop-blur-sm relative overflow-hidden">
				<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
					<LockKeyhole className="w-12 h-12 text-blue-400" />
				</div>
				<h4 className="text-white font-bold mb-2">Bạn muốn chia sẻ cảm xúc?</h4>
				<p className="text-sm text-blue-300/70 mb-4">
					Vui lòng đăng nhập để bình phẩm.
				</p>
				<Link
					href={`${process.env.NEXT_PUBLIC_URL}/dang-nhap`}
					className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-2 rounded-full transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]"
				>
					Đăng nhập ngay
				</Link>
			</div>
		)
	}

	return <ReviewForm film={film} userId={user.id} onUpdate={onUpdate} />
}
