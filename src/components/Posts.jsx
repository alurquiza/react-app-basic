import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, ListGroup, Card, Container } from 'react-bootstrap';

import { getPosts } from "../apiService";

const Posts = () => {
  const { userid: userId } = useParams();
  const [message, setMessage] = useState("Loading Posts");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const newPosts = await getPosts(userId);

      if (!newPosts)
        setMessage("Error fetching posts, please try again later");
      else if (newPosts.length === 0)
        setMessage("This user has no posts")
      else {
        setMessage("");
        setPosts(newPosts);
      }
    }

    fetchPosts();
  }, [userId])

  return (
    <Container className="mt-4">
      <Link to="/">
        <Button variant="outline-primary">Back</Button>
      </Link>
      <h3 className="mt-2">Posts:</h3>
      <ListGroup className="mt-2">
        {message === ""
          ? posts.map(post => (
            <ListGroup.Item key={post.id}>
              <Card className="mb-2">
                <Card.Body>
                  <Card.Title>{post.name}</Card.Title>
                  <Card.Text>{post.body}</Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))
          : <ListGroup.Item>{message}</ListGroup.Item>}
      </ListGroup>
    </Container>
  )
}

export default Posts;