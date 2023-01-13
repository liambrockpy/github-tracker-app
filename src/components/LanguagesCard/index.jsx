import React, { useEffect, useMemo, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { colours } from "../../utils/colours"
import Card from "../Cards"

ChartJS.register(ArcElement, Tooltip, Legend)

const LanguagesCard = ({ data }) => {
	const values = Object.values(data)
	const keys = Object.keys(data)
	const [bgColours, setBgColours] = useState(Object.values(colours))

	return (
		<Card title={"Languages"}>
			<div
				style={{ height: "300px", display: "flex", justifyContent: "center" }}
			>
				<Doughnut
					options={{
						color: "white",
					}}
					data={{
						labels: keys,
						datasets: [
							{
								label: "Number of repositories",
								data: values,
								backgroundColor: bgColours,
								borderWidth: 1,
								hoverBackgroundColor: bgColours,
							},
						],
					}}
				/>
			</div>
		</Card>
	)
}

export default LanguagesCard
