import axios from 'axios';
const apiToken = import.meta.env.API_TOKEN_GOREST

const baseUrl = `https://gorest.co.in/public/v2/users`;

const getUsers = async (params = {}) => {
  const page = params.page ? params.page : 1;
  const perPage = params.per_page ? params.per_page : 20;
  const url = `${baseUrl}?page=${page}&per_page=${perPage}`;
  try {
    const response = await axios.get(url);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching users:', error);
    // alert('Error fetching users: ' + error.message);
  }
}

const createUser = async (newUser) => {
  try {
    const response = await
    axios.post(baseUrl + `?access-token=${apiToken}`, newUser);

    return response.data;
  }
  catch (error) {
    console.error('Error creating user:',error);
    alert('Error creating user: ' + error.message);
  }
}

const getPosts = async (userId) => {
  try {
    const response =
      await axios.get(baseUrl + `/${userId}/posts`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching posts:',error);
    // alert('Error fetching posts: ' + error.message);
  }
}

const deleteUser = async (userId) => {
  try {
    await axios.delete(baseUrl + `/${userId}?access-token=${apiToken}`);
  }
  catch (error) {
    console.error('Error deleting user:',error);
    alert('Error deleting user: ' + error.message);
  }
}

export { getUsers, createUser, deleteUser, getPosts };