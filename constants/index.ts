export const API = process.env.NEXT_PUBLIC_API_URI
export const WEB_URL = process.env.NEXT_PUBLIC_URL
export const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL
export const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL

export const ROUTE = {
	THE_LOAI: "the-loai",
	QUOC_GIA: "quoc-gia",
	DANH_SACH: "danh-sach",
}

export const HEADER_CATALOG = [
	{ title: "Trung Hoa đại lục", slug: "/trung-quoc" },
	{ title: "Xứ Hàn Kimchi", slug: "/han-quoc" },
	{ title: "Hoạt hình", slug: "/hoat-hinh" },
]

export const LIST_CATALOG = [
	{ id: "1", name: "Phim mới", slug: "phim-moi" },
	{ id: "2", name: "Phim bộ", slug: "phim-bo" },
	{ id: "3", name: "Phim lẻ", slug: "phim-le" },
	{ id: "4", name: "TV Shows", slug: "tv-shows" },
	{ id: "5", name: "Hoạt hình", slug: "hoat-hinh" },
	{ id: "6", name: "Vietsub", slug: "phim-vietsub" },
	{ id: "7", name: "Phim thuyết minh", slug: "phim-thuyet-minh" },
	{ id: "8", name: "Phim lồng tiếng", slug: "phim-long-tieng" },
	{
		id: "9",
		name: "Phim bộ đang chiếu",
		slug: "/danh-sach/phim-bo-dang-chieu",
	},
	{
		id: "10",
		name: "Phim bộ đã hoàn thành",
		slug: "/danh-sach/phim-bo-hoan-thanh",
	},
	{ id: "11", name: "Phim sắp chiếu", slug: "/danh-sach/phim-sap-chieu" },
	{ id: "12", name: "Phim Sub độc quyền", slug: "/danh-sach/subteam" },
	{ id: "13", name: "Phim chiếu rạp", slug: "/danh-sach/phim-chieu-rap" },
]

export * from "./divideSymbol"
export * from "./film"
export * from "./footerData"
export * from "./gradient"
export * from "./video"
export * from "./actor"
export * from "./tmdb_translation"
export * from "./currency"
export * from "./navigationData"
