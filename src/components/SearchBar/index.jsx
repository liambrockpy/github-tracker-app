import React, { useEffect, useState } from "react"

const SearchBar = ({ onSubmit }) => {
	const [user, setUser] = useState("")

	const onChangeHandler = (e) => {
		setUser(e.target.value)
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		onSubmit(user)
		setUser("")
	}

	return (
		<>
			<form class="searchBar" onSubmit={onSubmitHandler}>
				<label htmlFor="githubUsername">Enter Github Username:</label>
				<input type="text" value={user} onChange={onChangeHandler} />
				<input type="Submit" />
			</form>
		</>
	)
}

export default SearchBar
