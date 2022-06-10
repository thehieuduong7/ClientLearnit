import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";
const AddPostModal = () => {
	const { addState, setAddState, addPost, setShowToast } =
		useContext(PostContext);
	const [formState, setFormState] = useState({
		title: "",
		description: "",
		password: "",
	});
	const handleChange = (e) => {
		setFormState((pre) => {
			return { ...pre, [e.target.name]: e.target.value };
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const post = await addPost({ post: formState });
		console.log(post);
		setShowToast({
			show: true,
			message: post.message,
			type: post.success ? "success" : "danger",
		});
		handleClose();
	};
	const handleClose = () => {
		setAddState((pre) => {
			return {
				...pre,
				show: false,
			};
		});
	};
	useEffect(() => {
		setFormState({
			title: "",
			description: "",
			password: "",
		});
	}, [addState]);
	return (
		<Modal show={addState.show} backdrop="static" onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>What do you want to learn?</Modal.Title>
			</Modal.Header>
			<Form className="d-flex flex-column g-3" onSubmit={handleSubmit}>
				<Modal.Body>
					<Form.Group className="my-3">
						<Form.Control
							type="text"
							placeholder="Title"
							required
							aria-describedby="title-help"
							name="title"
							value={formState.title}
							onChange={handleChange}
						></Form.Control>
						<Form.Text id="Title-help" muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group className="my-3">
						<Form.Control
							as="textarea"
							name="description"
							value={formState.description}
							onChange={handleChange}
							placeholder="Description"
							rows={3}
							required
						/>
					</Form.Group>
					<Form.Group className="my-3">
						<Form.Control
							type="text"
							placeholder="URL"
							name="url"
							value={formState.name}
							onChange={handleChange}
							required
						></Form.Control>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="primary" type="submit">
						Learn It!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default AddPostModal;
