import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";
const UpdatePostModal = () => {
	const { updateState, setUpdateState, updatePost, setShowToast } =
		useContext(PostContext);
	const [formState, setFormState] = useState(updateState.post);
	useEffect(() => {
		setFormState(updateState.post);
	}, [updateState]);
	const handleChange = (e) => {
		setFormState((pre) => {
			return { ...pre, [e.target.name]: e.target.value };
		});
	};
	const handleClose = () => {
		setUpdateState((pre) => {
			return {
				...pre,
				show: false,
			};
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await updatePost({ post: formState });
		setShowToast({
			show: true,
			message: response.message,
			type: response.success ? "success" : "danger",
		});
		handleClose();
	};
	return (
		<Modal show={updateState.show} backdrop="static" onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Update learnit?</Modal.Title>
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
							value={formState.url}
							onChange={handleChange}
							required
						></Form.Control>
					</Form.Group>
					<Form.Group className="my-3">
						<Form.Select
							name="status"
							value={formState.status}
							onChange={handleChange}
						>
							<option value="TO LEARN">TO LEARN</option>
							<option value="LEARNING">LEARNING</option>
							<option value="LEARNED">LEARNED</option>
						</Form.Select>
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

export default UpdatePostModal;
