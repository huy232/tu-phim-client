export const SpoilerPlaceholder = () => (
	<div className="flex flex-col items-center gap-2 p-6">
		<div className="flex items-center gap-2 text-orange-500/80">
			<div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
			<span className="text-[10px] font-black uppercase tracking-widest">
				Spoiler Alert
			</span>
		</div>
		<p className="text-gray-500 text-[11px] italic">Bấm để xem nội dung</p>
	</div>
)
