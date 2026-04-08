import { IMAGE_URL } from "@/constants"
import clsx from "clsx"

const Banner = ({ poster_url }: { poster_url: string }) => {
	const backgroundClass = clsx(
		"absolute inset-0 bg-no-repeat transition-opacity duration-1000 ease-in-out z-0",
		"bg-top lg:bg-right bg-cover",
	)

	return (
		<div className="relative w-full h-[40vh] md:h-[45vh] lg:h-[50vh] overflow-hidden">
			<div
				className={backgroundClass}
				style={{
					backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(10, 10, 10, 0.4) 60%, #0a0a0a 100%),
                                  linear-gradient(to right, #0a0a0a 0%, rgba(10, 10, 10, 0.3) 30%, transparent 100%),
                                  url('https://wsrv.nl/?url=${IMAGE_URL}/${poster_url}')`,
				}}
			/>
			<div className="absolute inset-0 z-10 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent" />
		</div>
	)
}

export default Banner
