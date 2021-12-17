import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    getTags();
    console.log(process.env.REACT_APP_API_URL);
  }, []);

  function handleName(event) {
    setName(event.target.value);
  }
  function getTags() {
    axios.get(process.env.REACT_APP_API_URL + "/tag").then((res) => {
      setTags(res.data);
    });
  }
  function delTag(id) {
    console.log("tag " + id + "supprimé");
    axios.delete(process.env.REACT_APP_API_URL + "/tag/" + id).then((res) => {
      console.log(res);
      getTags();
    });
  }

  function addTagSubmit(event) {
    event.preventDefault();
    console.log("J'ai soumis le formulaire");

    const newTag = {
      name: name,
    };
    console.log(newTag);
    axios.post(process.env.REACT_APP_API_URL + "/tag/", newTag).then((res) => {
      console.log(res);
      getTags();
    });
    // setComments([...comments, newComment]);
  }
  return (
    <div className="App">
      <h1>Add tag</h1>
      <form onSubmit={addTagSubmit}>
        <label htmlFor=""> Name</label>
        <input type="text" value={name} onChange={handleName} />
        <button type="submit">ok</button>
      </form>
      <h1> Liste des tags xx</h1>

      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            {tag.name} <button onClick={() => delTag(tag.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
