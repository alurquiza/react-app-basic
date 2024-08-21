import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { getUsers, createUser, deleteUser } from "../apiService";

import AddUserForm from "./AddUserForm";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isActiveAddUserForm, setIsActiveAddUserForm] = useState(false);

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
  }

  const removeUser = async (userId) => {
    const response = await deleteUser(userId);
    const newUsers = users.filter(user => user.id !== userId);
    setUsers(newUsers);
  }

  return (
    <div>
      <ul>
        {users.map(user => {
          return (
            <li key={user.id}>
              <Link to={`/posts/${user.id}`}>
                {user.name}
              </Link>
              <button onClick={() => removeUser(user.id)}>Delete</button>
            </li>
          )
        })}
      </ul>
      <button onClick={() => setIsActiveAddUserForm(!isActiveAddUserForm)}>Add</button>

      {isActiveAddUserForm && <AddUserForm addUser={addUser}/>}
    </div>
  )
}

export default Home;