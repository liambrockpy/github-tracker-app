import React from "react"
import { getDateStr } from "../../utils/dates"
import Card from "../Cards"

const CreatedCard = ({ data }) => {
	const renderTime = (date) => {
		return getDateStr(date)
	}

	return (
		<Card title={"Github Created"}>
			<div>
				<h6 style={{ fontSize: "2.5rem", margin: "2rem 0px", color: "cyan" }}>
					{renderTime(data)}
				</h6>
			</div>
		</Card>
	)
}

export default CreatedCard
