import React from "react";
// import api from "../services/api";
import axios from "axios";
import io from "socket.io-client";
import { MdMoreHoriz } from "react-icons/md";
import { IoIosSend, IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import "./Feed.css";

declare interface Post {
  _id: string;
  author: string;
  place: string;
  description: string;
  hashtags: string;
  image: string;
  likes: number;
}

const Feed: React.FC = () => {
  const [feed, setFeed] = React.useState<Post[]>([]);

  React.useEffect(() => {
    function fetchData() {
      fetch("http://localhost:3333/posts", {
        method: "GET"
      })
        .then(response => response.json())
        .then(response => {
          setFeed(response);
        });
    }
    fetchData();
  }, []);

  (() => {
    const socket = io("http://localhost:3333");

    socket.on("post", newPost => {
      setFeed([newPost, ...feed]);
    });

    socket.on("like", likedPost => {
      setFeed(
        feed.map(post => (post._id === likedPost._id ? likedPost : post))
      );
    });
  })();

  const handleLike = id => {
    axios.post(`http://localhost:3333/posts/${id}/like`);
  };

  return (
    <div>
      <section id="post-list">
        {feed.map(post => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>
              <MdMoreHoriz />
            </header>
            <img
              src={`http://localhost:3333/files/${post.image}`}
              alt="Post upload"
            />
            <footer>
              <div className="actions">
                <button onClick={() => handleLike(post._id)}>
                  <IoMdHeartEmpty size="1.5em" />
                </button>

                <FaRegComment size="1.5em" />
                <IoIosSend size="1.5em" />
              </div>
              <strong>{post.likes} curtidas</strong>
              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Feed;
