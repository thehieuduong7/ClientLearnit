import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import { Spinner, Card, Button, Row, Col, Toast } from "react-bootstrap";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import styled from "@emotion/styled";
import ToastPost from "../components/posts/ToastPost";
import UpdatePostModal from "../components/posts/UpdatePostModal";
const Dashboard = () => {
	const { postState, loadPosts, setAddState } = useContext(PostContext);
	const { authState } = useContext(AuthContext);
	useEffect(() => {
		loadPosts();
	}, []);
	const handleAdd = () => {
		setAddState((pre) => {
			return {
				...pre,
				show: true,
			};
		});
	};
	let body = null;
	if (postState.postsLoading) {
		body = (
			<div className="d-flex w-100 justify-content-center">
				<Spinner variant="info" animation="border"></Spinner>
			</div>
		);
	} else {
		if (postState.posts.length === 0) {
			body = (
				<WrapperContent>
					<Card className="text-center m-5">
						<Card.Header>Hi {authState.user.username}</Card.Header>
						<Card.Body>
							<Card.Title className="mb-3">Welcome to LearnIt</Card.Title>
							<Card.Text>
								<Button className="rounded" variant="primary">
									Add new coures!
								</Button>
							</Card.Text>
						</Card.Body>
					</Card>
				</WrapperContent>
			);
		} else {
			body = (
				<WrapperContent className="mx-5">
					<Row className="row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4 ">
						{postState.posts.map((e) => (
							<Col key={e._id} className="my-2">
								<SinglePost post={e}></SinglePost>
							</Col>
						))}
					</Row>
					{/* open modal add post */}
				</WrapperContent>
			);
		}
	}
	return (
		<div className="mt-5 mx-2">
			{body}
			<FloatAction>
				<Button
					variant="danger "
					className="rounded-circle btn_add"
					onClick={handleAdd}
				>
					<span>
						<i className="fa fa-plus-circle fa-3x" aria-hidden="true" />
					</span>
				</Button>
			</FloatAction>
			<AddPostModal />
			<UpdatePostModal />
			<ToastPost />
		</div>
	);
};

const FloatAction = styled.div`
	position: fixed;
	bottom: 70px;
	right: 70px;

	&:hover {
		transform: scale(1.1);
	}
	@keyframes circle {
		0% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(360deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.btn_add {
		animation: 7s ease-out 0.7s infinite circle;
		transition: all 0.3s;
	}
`;

const WrapperContent = styled.div`
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	animation: fadeIn 1.2s linear 0s;
`;
export default Dashboard;
