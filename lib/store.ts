import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const usePersistentStore = create(
	persist(
		(set) => ({
			darkMode: false,
			toggleDarkMode: () =>
				set((state: { darkMode: boolean }) => ({ darkMode: !state.darkMode })),
		}),
		{ name: "persistent-store" },
	),
)

export default usePersistentStore
