import React, { useState,useEffect } from "react";
import {useParams} from "react-router-dom";

import { getPosts } from "../apiService";

const Posts = () => {
  const {userid : userId} = useParams();
  const [message,setMessage] = useState("Loading Posts");
  const [posts, setPosts] = useState([]);

  console.log(posts,userId);

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
    <ul>
      {message === ""
        ? posts.map(post => {
          return (
            <li key={post.id}>
              {post.name}, {post.body}
            </li>)
        })
        : message
      }
    </ul>
  )
}

export default Posts;