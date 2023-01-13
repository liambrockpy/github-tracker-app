import React from "react"
import Lottie from "lottie-react"
import starAnim from "../../assets/lottie-star.json"
import Card from "../Cards"
import "./style.css"

const TopRepoCard = ({ data }) => {
	return (
		<Card title={"Top Repository"}>
			<a href={data.html_url} target="_blank">
				<div style={{ height: "300px" }}>
					<div className="stat-container">
						<h3 className="name">{data.name}</h3>
						<Lottie
							animationData={starAnim}
							loop={false}
							style={{ height: "200px" }}
						/>
						<dt style={{ order: 9999 }}>
							<h3 style={{ margin: 0, color: "salmon" }}>Stargazers</h3>
						</dt>
						<dd
							style={{
								fontSize: "3rem",
								margin: "0.5rem",
								color: "orangered",
								fontWeight: "bolder",
							}}
						>
							{data.stargazers_count}
						</dd>
					</div>
				</div>
			</a>
		</Card>
	)
}

export default TopRepoCard
