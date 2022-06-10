import React, { useContext } from "react";
import { Toast } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";

const ToastPost = () => {
	const { showToast, setShowToast } = useContext(PostContext);
	return (
		<>
			<Toast
				show={showToast.show}
				className={`text-white bg-${showToast.type}`}
				style={{ position: "fixed", top: "20px", right: "10px" }}
				onClose={() => {
					setShowToast({ show: false, message: "", type: null });
				}}
				delay={3000}
				autohide={true}
			>
				<Toast.Header>
					<strong className="me-auto">Action post</strong>
					<small>11 mins ago</small>
				</Toast.Header>
				<Toast.Body style={{ textTransform: "uppercase" }}>
					{showToast.message}
				</Toast.Body>
			</Toast>
		</>
	);
};

export default ToastPost;
