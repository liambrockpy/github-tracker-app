import React from "react"
import Card from "../Cards"

const AvatarCard = ({ name, avatar, bio, blog }) => {
	return (
		<Card title={name}>
			<img src={avatar} alt="User Avatar" className="avatar" />
			{bio && <p>{bio}</p>}
			{blog && <a href={blog}>{blog}</a>}
		</Card>
	)
}

export default AvatarCard
