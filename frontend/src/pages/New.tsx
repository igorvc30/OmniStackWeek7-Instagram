import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./New.css";

declare interface Post {
  author: string;
  place: string;
  description: string;
  hashtags: string;
  image: string | Blob;
  likes: number;
}
const initialPost = {
  author: "",
  place: "",
  description: "",
  hashtags: "",
  image: "",
  likes: 0
};

// @ts-ignore
const New: React.FC = withRouter(({ history }) => {
  const [values, setValues] = React.useState<Post>(initialPost);

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", values.image);
    data.append("author", values.author);
    data.append("place", values.place);
    data.append("description", values.description);
    data.append("hashtags", values.hashtags);

    await axios.post("http://localhost:3333/posts", data);
    history.push("/");
  };

  const handleImageChange = event => {
    setValues(values => ({
      ...values,
      image: event.target.files[0]
    }));
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <form id="new-post" onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} />
      <input
        type="text"
        name="author"
        placeholder="Autor do post"
        onChange={handleChange}
        value={values.author}
      />
      <input
        type="text"
        name="place"
        placeholder="Local do post"
        onChange={handleChange}
        value={values.place}
      />
      <input
        type="text"
        name="description"
        placeholder="Descrição do post"
        onChange={handleChange}
        value={values.description}
      />
      <input
        type="text"
        name="hashtags"
        placeholder="Hashtags do post"
        onChange={handleChange}
        value={values.hashtags}
      />

      <button type="submit">Enviar</button>
    </form>
  );
});

export default New;
