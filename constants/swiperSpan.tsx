import clsx from "clsx"

export const paginationStyle = clsx(
	"custom-episode-pagination",
	"flex justify-center items-center gap-2 min-h-10",
	"[&_.swiper-pagination-bullet]:!w-8 [&_.swiper-pagination-bullet]:!h-8",
	"[&_.swiper-pagination-bullet]:!flex [&_.swiper-pagination-bullet]:!items-center [&_.swiper-pagination-bullet]:!justify-center",
	"[&_.swiper-pagination-bullet]:!bg-white/5 [&_.swiper-pagination-bullet]:!border [&_.swiper-pagination-bullet]:!border-white/10",
	"[&_.swiper-pagination-bullet]:!rounded-xl [&_.swiper-pagination-bullet]:!text-[10px] [&_.swiper-pagination-bullet]:!font-bold",
	"[&_.swiper-pagination-bullet]:!text-gray-500 [&_.swiper-pagination-bullet]:!transition-all [&_.swiper-pagination-bullet]:!cursor-pointer",
	"[&_.swiper-pagination-bullet]:!m-0 [&_.swiper-pagination-bullet]:!opacity-100",

	// Style khi Bullet được ACTIVE
	"[&_.swiper-pagination-bullet-active]:!bg-purple [&_.swiper-pagination-bullet-active]:!text-white",
	"[&_.swiper-pagination-bullet-active]:!border-purple-400 [&_.swiper-pagination-bullet-active]:!w-10",
	"[&_.swiper-pagination-bullet-active]:!shadow-[0_0_20px_rgba(168,85,247,0.4)]",

	// Hover
	"[&_.swiper-pagination-bullet:hover]:!border-purple/50 [&_.swiper-pagination-bullet:hover]:!text-white",
)
