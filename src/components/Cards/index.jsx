import React from "react"
// import "./style.css"

const Card = ({ title, isProfile, children }) => {
	function renderMarkup(text) {
		return { __html: text }
	}

	return (
		<>
			<div className="card">
				<h2>{title}</h2>
				{isProfile ? (
					<div dangerouslySetInnerHTML={renderMarkup(children)}></div>
				) : (
					<div>{children}</div>
				)}
			</div>
		</>
	)
}

export default Card
