export const formatCurrency = (amount: number) => {
	if (!amount || amount === 0) return "N/A"
	if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B` // Tỷ USD
	if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M` // Triệu USD
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(amount)
}
