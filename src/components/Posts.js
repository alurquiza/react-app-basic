import React, { useState,useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import { Button, ListGroup } from 'react-bootstrap';

import { getPosts } from "../apiService";

const Posts = () => {
  const {userid : userId} = useParams();
  const [message,setMessage] = useState("Loading Posts");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const newPosts = await getPosts(userId);
      if(newPosts === null)
        setMessage("Error fetching posts");
      else if(newPosts.length === 0)
        setMessage("This user has no posts")
      else
        setMessage("");
        setPosts(newPosts);
    }

    fetchPosts();
  }, [userId])


  return (
    <div className="mx-4 mt-4">
      <Link to="/">
        <Button variant="outline-primary">Back</Button>
      </Link>
      <h3 className="mt-2">Posts:</h3>
      <ListGroup className="mt-2">
        {message === ""
          ? posts.map(post => (
            <ListGroup.Item key={post.id}>
              <div className="d-flex flex-column">
                <div>{post.name}</div>
                <div className="mt-2">{post.body}</div>
              </div>
            </ListGroup.Item>
          ))
          : <ListGroup.Item>{message}</ListGroup.Item>}
      </ListGroup>
    </div>
  )
}

export default Posts;