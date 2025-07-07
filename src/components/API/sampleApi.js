import React, { useEffect, useState } from "react";
const SampleApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPost();
  }, []);
  const getPost = async () => {
    try {
      const API = await fetch("https://jsonplaceholder.typicode.com/posts");
      const res = await API.json();
      setData(res.slice(0,10));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2>API Data</h2>
      {loading ? (
        <p>loading.....</p>
      ) : (
        <ul>
          {data.map((item) => {
            return (
              <li key={item.id}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default SampleApi;
