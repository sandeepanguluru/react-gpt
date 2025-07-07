import React, { useState } from "react";

const JsonApiExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // start with false

  const hitAPi = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const res = await response.json();

      // simulate delay (optional)
      setTimeout(() => {
        setData(res);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Post List</h1>
      <button onClick={hitAPi}>Hit API</button>

      {loading && <p>Loading....</p>}
      {!loading && data.length === 0 && <p>No data found. Click the button to load.</p>}

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <b>{item.title}</b>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default JsonApiExample;
