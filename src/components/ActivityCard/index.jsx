import React from "react"
import Lottie from "lottie-react"
import timeAnim from "../../assets/lottie-hourglass-girl.json"
import Card from "../Cards"
import { calcTimeToNow } from "../../utils/dates"

const ActivityCard = ({ data }) => {
	const renderTime = (time) => {
		let [_pre, num, scale] = time.split(" ")
		return `${num} ${scale} ago`
	}

	return (
		<Card title={"Last Active"}>
			<div>
				<Lottie
					animationData={timeAnim}
					// loop={false}
					style={{ height: "200px" }}
				/>
				<h6 style={{ fontSize: "2.5rem", margin: "2rem 0px" }}>
					{renderTime(calcTimeToNow(data.created_at))}
				</h6>
			</div>
		</Card>
	)
}

export default ActivityCard
