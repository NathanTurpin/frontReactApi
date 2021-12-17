import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    getTags();
  }, []);

  function handleName(event) {
    setName(event.target.value);
  }
  function getTags() {
    axios.get("http://localhost:5000/tag").then((res) => {
      setTags(res.data);
    });
  }
  function delTag(id) {
    console.log("tag " + id + "supprimé");
    axios.delete("http://localhost:5000/tag/" + id).then((res) => {
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
    axios.post("http://localhost:5000/tag/", newTag).then((res) => {
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
