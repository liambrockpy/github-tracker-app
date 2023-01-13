import React from "react"
import Card from "../Cards"

const ProfileCard = ({ profile }) => {
	return (
		<Card title={"Profile Introduction"} isProfile={true}>
			{profile}
		</Card>
	)
}

export default ProfileCard
