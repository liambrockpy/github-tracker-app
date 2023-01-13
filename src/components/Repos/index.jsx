import React, { useState } from "react"
import Card from "../Cards"
import { getDateStr } from "../../utils/dates"
import "./style.css"

const Repos = ({ data }) => {
	return (
		<Card title={"User Repositories"}>
			<table>
				<tr>
					<th>Repository Name</th>
					<th>Created on</th>
					<th>Forks</th>
					<th>Stars</th>
					<th>Watchers</th>
					<th>Issues</th>
				</tr>
				{data.map((r) => (
					<>
						<tr>
							<td>{r.name}</td>
							<td>{getDateStr(r.created_at)}</td>
							<td>{r.forks_count}</td>
							<td>{r.stargazers_count}</td>
							<td>{r.watchers_count}</td>
							<td>{r.open_issues_count}</td>
						</tr>
					</>
				))}
			</table>
		</Card>
	)
}

export default Repos
