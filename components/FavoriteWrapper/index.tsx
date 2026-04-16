"use client"
import { useFavorite } from "@/hooks/useFavorite"
import { ReactNode } from "react"

interface FavoriteWrapperProps {
	film: FilmInfo
	children: (params: {
		isFavorited: boolean
		handleToggle: (e?: React.MouseEvent) => void
		loading: boolean
	}) => ReactNode
}

export const FavoriteWrapper = ({ film, children }: FavoriteWrapperProps) => {
	const { isFavorited, handleToggle, loading } = useFavorite(film)

	const onToggle = (e?: React.MouseEvent) => {
		if (e) {
			e.preventDefault()
			e.stopPropagation()
		}
		handleToggle()
	}

	return <>{children({ isFavorited, handleToggle: onToggle, loading })}</>
}
