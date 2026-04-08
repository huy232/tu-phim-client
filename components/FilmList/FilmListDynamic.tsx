"use client"
import dynamic from "next/dynamic"
import FilmListSkeleton from "../FilmListSkeleton"

const FilmListWrapper = dynamic(() => import("@/components/FilmList"), {
	ssr: false,
	loading: () => <FilmListSkeleton />,
})

export default FilmListWrapper
