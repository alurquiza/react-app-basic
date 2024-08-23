import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';

import { getUsers, createUser, deleteUser } from "../apiService";
import AddUserForm from "./AddUserForm";
import ModalNewUser from "./Modal";

const Home = () => {
  const [message, setMessage] = useState("Loading Users ...");
  const [users, setUsers] = useState([]);
  const [isActiveAddUserForm, setIsActiveAddUserForm] = useState(false);
  const [newUserCreated, setNewUserCreated] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const newUsers = await getUsers({ page });

      if (newUsers) {
        setUsers(newUsers);
        setMessage('');
      }
      else {
        setMessage("Error fetching users, please try again later");
      }
    }

    fetchData();
  }, [page])

  const addUser = async (newUser) => {
    const newUserWithId = await createUser(newUser);

    if (newUserWithId) {
      setUsers([...users, newUserWithId]);

      setNewUserCreated(true);
      setTimeout(() => setNewUserCreated(false), 5000);
    }
  }

  const removeUser = async (userId) => {
    if (window.confirm(`Are you sure you want to delete this user?`)) {
      await deleteUser(userId);
      const newUsers = users.filter(user => user.id !== userId);
      setUsers(newUsers);
    }
  }

  return (
    <div className="mx-4">
      <h3 className="mt-2">Users: page {page}</h3>
      {message !== "" ? (
        <ListGroupItem> {message} </ListGroupItem>
      ) : (
        <>
          <ListGroup>
            {users.map((user) => (
              <ListGroupItem key={user.id}>Loading users...
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
          </ListGroup>

          <div className="mt-3 d-flex justify-content-between">
            <Button disabled={page === 1}
              onClick={() => {
                const newPage = users.length > 0 ? Math.max(1, page - 1) : page;
                setPage(newPage);
              }}
            >
              Prev Page
            </Button>
            <Button
              onClick={() => {
                const newPage = users.length > 0 ? page + 1 : page;
                setPage(newPage);
              }}
            >
              Next Page
            </Button>
          </div>
        </>
      )}
      <div className="my-3 d-flex justify-content-center">
        <Button className="btn-info"
          onClick={() => setIsActiveAddUserForm(!isActiveAddUserForm)}
        >
          Add User
        </Button>
      </div>

      {isActiveAddUserForm && <AddUserForm addUser={addUser} />}

      {newUserCreated
        && <ModalNewUser
          show={newUserCreated}
          setShow={setNewUserCreated}
          newUserInfo={users[users.length - 1]}
        />}
    </div>
  )
}

export default Home;