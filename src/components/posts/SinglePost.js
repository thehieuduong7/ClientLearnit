import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import ActionButtons from "./ActionButtons";
import styled from "@emotion/styled";
const SinglePost = ({ post: { _id, status, title, description, url } }) => {
	return (
		<WrapperPost>
			<Card
				className="shadow mx-3 px-3"
				border={
					status === "LEARNED"
						? "success"
						: status === "LEARNING"
						? "warning"
						: "danger"
				}
				style={{
					borderRadius: "20px",
					height: "250xp",
					minWidth: "200px",
					overflow: "hidden",
				}}
			>
				<Card.Body>
					<Card.Title style={{ height: "70px" }}>
						<Row>
							<Col>
								<p style={{ textTransform: "uppercase", overflow: "hidden" }}>
									{title}
								</p>
								<Badge
									pill
									bg={
										status === "LEARNED"
											? "success"
											: status === "LEARNING"
											? "warning"
											: "danger"
									}
								>
									{status}
								</Badge>
							</Col>
							<Col className="d-flex text-end justify-content-end">
								<ActionButtons post={{ _id, url }} />
							</Col>
						</Row>
					</Card.Title>
					<Card.Text
						style={{
							height: "150px",
							overflow: "auto",
						}}
					>
						{description}
					</Card.Text>
				</Card.Body>
			</Card>
		</WrapperPost>
	);
};
const WrapperPost = styled.div`
	&:hover {
		transform: scale(1.02);
	}
`;

export default SinglePost;
