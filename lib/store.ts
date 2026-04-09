import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type SetState<T> = T | ((prev: T) => T)

interface PlayerSettingsState {
	isTheaterMode: boolean
	isDimmed: boolean
	autoNext: boolean
	autoNextOffset: number
	skipIntroOffset: number

	hasHydrated: boolean // 👈 thêm cái này

	setIsTheaterMode: (v: SetState<boolean>) => void
	setIsDimmed: (v: SetState<boolean>) => void
	setAutoNext: (v: SetState<boolean>) => void
	setAutoNextOffset: (v: SetState<number>) => void
	setSkipIntroOffset: (v: SetState<number>) => void

	setHasHydrated: (v: boolean) => void
}

export const usePlayerSettings = create<PlayerSettingsState>()(
	persist(
		(set) => ({
			isTheaterMode: false,
			isDimmed: false,
			autoNext: false,
			autoNextOffset: 10,
			skipIntroOffset: 90,

			hasHydrated: false,

			setHasHydrated: (v) => set({ hasHydrated: v }),

			setIsTheaterMode: (v) =>
				set((s) => ({
					isTheaterMode: typeof v === "function" ? v(s.isTheaterMode) : v,
				})),

			setIsDimmed: (v) =>
				set((s) => ({
					isDimmed: typeof v === "function" ? v(s.isDimmed) : v,
				})),

			setAutoNext: (v) =>
				set((s) => ({
					autoNext: typeof v === "function" ? v(s.autoNext) : v,
				})),

			setAutoNextOffset: (v) =>
				set((s) => ({
					autoNextOffset: typeof v === "function" ? v(s.autoNextOffset) : v,
				})),

			setSkipIntroOffset: (v) =>
				set((s) => ({
					skipIntroOffset: typeof v === "function" ? v(s.skipIntroOffset) : v,
				})),
		}),
		{
			name: "tuphim-player-settings",
			storage: createJSONStorage(() => localStorage),

			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true) // 👈 đây là key fix
			},
		},
	),
)
