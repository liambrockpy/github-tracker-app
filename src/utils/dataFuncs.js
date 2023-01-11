export const calcLanguages = (data) => {
	let languageCount = {}
	data.forEach((lang) => {
		if (lang !== null) {
			languageCount[lang]
				? (languageCount[lang] += 1)
				: (languageCount[lang] = 1)
		}
	})
	return languageCount
}

export const calcCommits = (data) => {
	let commitNumbers = data.map((c) => c.data.length)
	let commitTotal = commitNumbers.reduce((a, b) => a + b)
	return commitTotal
}

export const calcTopRepo = (data) => {
	let reposWithStargazers = data.filter((repo) => repo.stargazers_count)
	if (!reposWithStargazers) return null
	reposWithStargazers.sort((a, b) => b.stargazers_count - a.stargazers_count)
	return reposWithStargazers[0]
}
