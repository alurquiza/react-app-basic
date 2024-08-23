import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalNewUser = ({show, setShow,  newUserInfo }) => {

  const handleClose = () => {setShow(false)};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>New User Added</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Name: {newUserInfo.name}</p>
					<p>Email: {newUserInfo.email}</p>
					<p>Gender: {newUserInfo.gender}</p>
					<p>Status: {newUserInfo.status}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default ModalNewUser;