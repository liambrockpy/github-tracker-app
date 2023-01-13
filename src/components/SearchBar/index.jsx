import React, { useEffect, useState } from "react"
import { useSpring, animated } from "@react-spring/web"

const SearchBar = ({ onSubmit }) => {
	const [user, setUser] = useState("")
	const [springs, api] = useSpring(() => ({
		from: { y: 0 },
	}))

	const onChangeHandler = (e) => {
		setUser(e.target.value)
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		onSubmit(user)
		setUser("")
		// api.start({
		// 	from: {
		// 		y: 0,
		// 	},
		// 	to: {
		// 		y: -200,
		// 	},
		// })
	}

	return (
		<animated.div style={{ ...springs }}>
			<form class="searchBar" onSubmit={onSubmitHandler}>
				<label htmlFor="githubUsername">Enter Github Username:</label>
				<input type="text" value={user} onChange={onChangeHandler} />
				<input type="Submit" />
			</form>
		</animated.div>
	)
}

export default SearchBar
