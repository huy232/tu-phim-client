import Image from "next/image"
import Link from "next/link"

const particles = [
	{ left: "10%", top: "20%", delay: "0s" },
	{ left: "30%", top: "40%", delay: "1s" },
	{ left: "50%", top: "10%", delay: "2s" },
	{ left: "70%", top: "60%", delay: "0.5s" },
	{ left: "85%", top: "30%", delay: "1.5s" },
]

export default function NotFound() {
	return (
		<div className="relative h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center">
			<div className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl animate-float-slow hidden md:block" />

			<div className="hidden md:block">
				{particles.map((p, i) => (
					<span
						key={i}
						className="absolute w-[2px] h-[2px] bg-white/70 rounded-full animate-particle"
						style={{
							left: p.left,
							top: p.top,
							animationDelay: p.delay,
						}}
					/>
				))}
			</div>
			<Image
				src="/img/not-found/left-side.gif"
				alt="Not found anime girl"
				width={208}
				height={208}
				className="absolute left-2 bottom-2 sm:left-4 sm:bottom-4 w-28 sm:w-40 md:w-52 h-auto opacity-90 pointer-events-none select-none animate-float"
			/>

			{/* ✨ Content */}
			<div className="text-center z-10 px-4">
				<h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold mb-4 tracking-wider bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
					404
				</h1>

				<p className="text-gray-300 text-sm sm:text-base md:text-xl mb-6 max-w-md mx-auto">
					Trang này đã lạc vào một chiều không gian khác...
				</p>

				<Link
					href="/"
					className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 shadow-lg shadow-purple-500/20 active:scale-95"
				>
					🚀 Quay về trang chủ
				</Link>
			</div>

			<div className="absolute inset-0 bg-black/50 pointer-events-none" />
		</div>
	)
}
