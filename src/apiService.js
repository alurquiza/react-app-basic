import axios from 'axios';

const apiToken = process.env.API_TOKEN_GOREST || 'cefc524e3720de07c7c21ef6c6c0f1304bdba5563c098a745b9505c5cc14ffe8';

const getUsers = async () => {
  try {
    const response = await axios.get("https://gorest.co.in/public/v2/users");
    return response.data;
  }
  catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

const createUser = async (newUser) => {
  try {
    const response = await
    axios.post(`https://gorest.co.in/public/v2/users?access-token=${apiToken}`
      , newUser);

    return response.data;
  }
  catch (error) {
    console.error('Error creating user:',error);
    throw error;
  }
}

const getPosts = async (userId) => {
  try {
    const response =
      await axios.get(`https://gorest.co.in/public/v2/users/${userId}/posts`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching posts:',error);
    throw error;
  }
}

const deleteUser = async (userId) => {
  try {
    const response = await
    axios.delete(`https://gorest.co.in/public/v2/users/${userId}?access-token=${apiToken}`);
  }
  catch (error) {
    console.error('Error deleting user:',error);
    throw error;
  }
}

export { getUsers, createUser, deleteUser, getPosts };