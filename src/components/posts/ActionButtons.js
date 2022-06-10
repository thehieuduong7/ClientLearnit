import React, { useContext } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";

const ActionButtons = ({ post: { _id, url } }) => {
	const { deletePost, setShowToast, setUpdateState, selectPost } =
		useContext(PostContext);
	const handleDelete = async () => {
		const response = await deletePost({ _id });
		setShowToast({
			show: true,
			message: response.message,
			type: response.success ? "success" : "danger",
		});
	};
	const handleUpdate = () => {
		setUpdateState({
			show: true,
			post: selectPost({ _id }),
		});
	};

	return (
		<Row className=" text-end justify-content-end">
			<Col lg={3} md={12}>
				<Button variant="outline-primary mx-1" href={url} target="_blank">
					<span>
						<i className="fa fa-internet-explorer"></i>
					</span>
				</Button>
			</Col>
			<Col lg={3} md={12}>
				<Button variant="outline-warning mx-1" onClick={handleUpdate}>
					<span>
						<i className="fa fa-pencil-square-o"></i>
					</span>
				</Button>
			</Col>
			<Col lg={3} md={12}>
				<Button variant="outline-danger mx-1" onClick={handleDelete}>
					<span>
						<i className="fa fa-trash-o"></i>
					</span>
				</Button>
			</Col>
		</Row>
	);
};

export default ActionButtons;
