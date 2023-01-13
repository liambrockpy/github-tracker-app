import axios from "axios"
import { useState } from "react"
import "./App.css"
import SearchBar from "./components/SearchBar"
import { calcLanguages, calcCommits, calcTopRepo } from "./utils/dataFuncs"
import Showdown from "showdown"
import LanguagesCard from "./components/LanguagesCard"
import TopRepoCard from "./components/TopRepoCard"
import ActivityCard from "./components/ActivityCard"
import CreatedCard from "./components/CreatedCard"
import ProfileCard from "./components/ProfileCard"
import AvatarCard from "./components/AvatarCard"
import Repos from "./components/Repos"

const converter = new Showdown.Converter()

function App() {
	const [user, setUser] = useState(null)

	const getUserInfo = async (user) => {
		const githubApi = `https://api.github.com/users`

		const { data: userInfo } = await axios.get(`${githubApi}/${user}`)
		const { data: reposInfoArr } = await axios.get(`${githubApi}/${user}/repos`)
		const { data: publicEventsArr } = await axios.get(
			`${githubApi}/${user}/events/public`
		)
		// console.log(userInfo)
		console.log(reposInfoArr)

		// * Most recent activity
		const lastActivity = publicEventsArr[0]

		// * Number of Languages used
		const languages = calcLanguages(reposInfoArr.map((repo) => repo.language))

		// * Profile readme
		let convertedReadMe = null
		await axios
			.get(`https://raw.githubusercontent.com/${user}/${user}/main/README.md`)
			.then(({ data }) => (convertedReadMe = converter.makeHtml(data)))
			.catch((err) => {
				console.warn(err)
			})

		// * Total Commit Count
		// ! Not used due to rate limits
		// const repoCommits = reposInfoArr.map(
		// 	(n) => n.commits_url.split("{/sha}")[0]
		// )
		// const totalCommits = calcCommits(
		// 	await axios.all(repoCommits.map((url) => axios.get(url)))
		// )

		// * Top repo (stargazers)
		const top = calcTopRepo(reposInfoArr)
		// console.log("calc: ", top)

		setUser({
			name: userInfo.login,
			avatar: userInfo.avatar_url,
			bio: userInfo.bio,
			blog: userInfo.blog,
			languages: languages,
			topRepo: top,
			created: userInfo.created_at,
			lastActivity: lastActivity,
			profile: convertedReadMe,
			repos: reposInfoArr,
		})
	}

	const onSubmitHandler = (value) => {
		getUserInfo(value)
	}

	return (
		<div className="App">
			<SearchBar onSubmit={onSubmitHandler} />

			{user && (
				<>
					<AvatarCard
						name={user.name}
						avatar={user.avatar}
						bio={user.bio}
						blog={user.blog}
					/>

					{user.profile && <ProfileCard profile={user.profile} />}

					{user.repos && <Repos data={user.repos} />}
					<div id="container">
						{user.topRepo && <TopRepoCard data={user.topRepo} />}

						{user.languages && <LanguagesCard data={user.languages} />}

						<CreatedCard data={user.created} />

						{user.lastActivity && <ActivityCard data={user.lastActivity} />}
					</div>
				</>
			)}
		</div>
	)
}

export default App
