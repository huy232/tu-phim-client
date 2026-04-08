"use client"
import { motion } from "framer-motion"
import Link from "next/link"

const LoginButton = () => {
	return (
		<div className="py-2 mx-4 flex items-center justify-center">
			<Link href="/dang-nhap">
				<motion.button
					whileHover={{
						scale: 1.05,
						boxShadow: "0 0 10px rgba(168,85,247,0.3)",
					}}
					whileTap={{ scale: 0.95 }}
					className="text-xs bg-purple-600 hover:bg-purple-700 text-white font-bold py-1.5 px-4 rounded-full transition-all cursor-pointer"
				>
					Đăng nhập
				</motion.button>
			</Link>
		</div>
	)
}

export default LoginButton
