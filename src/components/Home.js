import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';

import { getUsers, createUser, deleteUser } from "../apiService";
import AddUserForm from "./AddUserForm";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isActiveAddUserForm, setIsActiveAddUserForm] = useState(false);
  const [newUserCreated, setNewUserInfo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const newUsers = await getUsers();

      if(newUsers)
        setUsers(newUsers);
    }

    fetchData();
  }, [])

  const addUser = async (newUser) => {
    const newUserWithId = await createUser(newUser);
    setUsers([...users, newUserWithId]);
    setNewUserInfo(true);

    // setNewUserInfo(newUserWithId);
    // handleShow();
  }

  const removeUser = async (userId) => {
    const response = await deleteUser(userId);
    const newUsers = users.filter(user => user.id !== userId);
    setUsers(newUsers);
  }

  return (
    <div className="mx-4">
      <h3 className="mt-2">Users:</h3>
      {users.length === 0 ? (
        <ListGroupItem>Loading users...</ListGroupItem>
      ) : (
      <ListGroup>
        {users.map((user) => (
          <ListGroupItem key={user.id}>
            <div className="d-flex justify-content-between align-items-center">
              <Link to={`/posts/${user.id}`}>
                {user.name}
              </Link>
              <Button variant="danger" onClick={() => removeUser(user.id)}>
                Delete
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>)}
      <div className="mt-3 d-flex justify-content-center">
        <Button
          onClick={() => setIsActiveAddUserForm(!isActiveAddUserForm)}
        >
          Add User
        </Button>
      </div>

      {isActiveAddUserForm && <AddUserForm addUser={addUser} />}
    </div>
  )
}

export default Home;