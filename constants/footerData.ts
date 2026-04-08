export interface FooterItem {
	name: string
	slug: string
}

export interface FooterSection {
	footerHeading: string
	footerDetail: FooterItem[]
}

export const FOOTER_DATA: FooterSection[] = [
	{
		footerHeading: "Khám phá",
		footerDetail: [
			{ name: "Phim Chiếu Rạp", slug: "/danh-sach/phim-chieu-rap" },
			{ name: "Phim Lẻ", slug: "/danh-sach/phim-le" },
			{ name: "Phim Bộ", slug: "/danh-sach/phim-bo" },
			{ name: "Phim Mới Cập Nhật", slug: "/danh-sach/phim-moi" },
		],
	},
	{
		footerHeading: "Danh mục",
		footerDetail: [
			{ name: "Phim Hành Động", slug: "/the-loai/hanh-dong" },
			{ name: "Phim Tình Cảm", slug: "/the-loai/tinh-cam" },
			{ name: "Phim Viễn Tưởng", slug: "/the-loai/vien-tuong" },
			{ name: "Phim Âm Nhạc", slug: "/the-loai/am-nhac" },
			{ name: "Phim Học Đường", slug: "/the-loai/hoc-duong" },
			{ name: "Phim Hài Hước", slug: "/the-loai/hai-huoc" },
		],
	},
	{
		footerHeading: "Thông tin",
		footerDetail: [
			{ name: "Pháp lý", slug: "/phap-ly" },
			{ name: "Hỏi Đáp", slug: "/hoi-dap" },
			{ name: "Chính sách bảo mật", slug: "/chinh-sach-bao-mat" },
			{ name: "Điều khoản sử dụng", slug: "/dieu-khoan-su-dung" },
			{ name: "Giới thiệu", slug: "/gioi-thieu" },
		],
	},
]
