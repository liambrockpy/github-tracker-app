import React from "react"
import { getDateStr } from "../../utils/dates"

const Created = ({ data }) => {
	const renderTime = (date) => {
		return getDateStr(date)
	}

	return (
		<div>
			<h6 style={{ fontSize: "2.5rem", margin: "2rem 0px", color: "cyan" }}>
				{renderTime(data)}
			</h6>
		</div>
	)
}

export default Created
