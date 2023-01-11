import axios from "axios"
import { useState } from "react"
import "./App.css"
import SearchBar from "./components/SearchBar"
import { calcLanguages, calcCommits, calcTopRepo } from "./utils/dataFuncs"
import { Octokit, App as OctokitApp } from "octokit"
import Showdown from "showdown"
import Languages from "./components/LanguagesData"
import Card from "./components/Cards"
import TopRepo from "./components/TopRepo"
import Activity from "./components/Activity"
import Created from "./components/Created"

const converter = new Showdown.Converter()

function App() {
	const [langs, setLangs] = useState(null)
	const [user, setUser] = useState(null)

	// const []

	const getUserInfo = async (user) => {
		const userInfo = await axios.get(`https://api.github.com/users/${user}`)
		// username: userInfo.data.login, avatar: userInfo.data.avatar_url
		console.log(userInfo.data)

		const repoInfo = await axios.get(
			`https://api.github.com/users/${user}/repos`
		)

		// console.log(repoInfo)

		// Number of Languages used
		const languages = calcLanguages(repoInfo.data.map((repo) => repo.language))

		const text = await axios
			.get(`https://raw.githubusercontent.com/${user}/${user}/main/README.md`)
			.then()
			.catch((err) => {
				return null
			})

		let convertedReadMe = null
		// if user does not have a profile README skip
		text
			? (convertedReadMe = converter.makeHtml(text.data))
			: (convertedReadMe = null)

		// Total Commit Count
		// const repoCommits = repoInfo.data.map(
		// 	(n) => n.commits_url.split("{/sha}")[0]
		// )
		// const totalCommits = calcCommits(
		// 	await axios.all(repoCommits.map((url) => axios.get(url)))
		// )

		//top repo
		const top = calcTopRepo(repoInfo.data)
		// console.log("calc: ", top)

		const publicEvents = await axios.get(
			`https://api.github.com/users/${user}/events/public`
		)
		const lastActivity = publicEvents.data[0]

		setUser({
			name: userInfo.data.login,
			avatar: userInfo.data.avatar_url,
			bio: userInfo.data.bio,
			blog: userInfo.data.blog,
			// commits: totalCommits,
			languages: languages,
			topRepo: top,
			created: userInfo.data.created_at,
			lastActivity: lastActivity,
			profile: convertedReadMe,
		})

		// const octokit = new Octokit({
		// 	auth: "x",
		// })

		// Most Collabs with? Does not work for all users, only user assigned to auth token
		// const collab = await octokit.request(
		// 	"GET /repos/JLP2000/preVent/collaborators"
		// )
		// console.log(collab)
	}

	const onSubmitHandler = (value) => {
		getUserInfo(value)
	}

	return (
		<div className="App">
			<SearchBar onSubmit={onSubmitHandler} />

			{user && (
				<>
					<Card title={user.name}>
						<img src={user.avatar} alt="User Avatar" className="avatar" />
						{user.bio ? <p>{user.bio}</p> : void 0}
						{user.blog ? <a href={user.blog}>{user.blog}</a> : void 0}
					</Card>
					{user.profile && (
						<Card title={"Profile Introduction"} isProfile={true}>
							{user.profile}
						</Card>
					)}
					<div id="container">
						{user.topRepo && (
							<Card title={"Top Repository"}>
								<TopRepo data={user.topRepo} />
							</Card>
						)}
						{user.languages && (
							<Card title={"Languages"}>
								<Languages data={user.languages} />
							</Card>
						)}
						{user.created && (
							<Card title={"Github Created"}>
								<Created data={user.created} />
							</Card>
						)}
						{user.lastActivity && (
							<Card title={"Last Active"}>
								<Activity data={user.lastActivity} />
							</Card>
						)}
						{/* <Card title={"Total Commits"}>
								<h3>{user.commits}</h3>
							</Card> */}
					</div>
				</>
			)}
		</div>
	)
}

export default App
