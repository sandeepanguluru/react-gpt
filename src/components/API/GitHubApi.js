import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

export const GitHubApi = () => {
  // 📦 State variables
  const [userName, setUserName] = useState("");      // User input for GitHub username
  const [error, setError] = useState("");            // Error message
  const [data, setData] = useState(null);            // User profile data
  const [repos, setRepos] = useState([]);            // User's repositories
  const [loading, setLoading] = useState(false);     // Loading indicator

  // 🧠 useEffect to auto-load last searched username from localStorage on initial mount
  useEffect(() => {
    const savedUser = localStorage.getItem("lastUser"); // Load from localStorage
    if (savedUser) {
      setUserName(savedUser);  // Set username state
      fetchUser(savedUser);    // Auto-fetch profile & repos
    }
  }, []);

  // 🔍 Function to fetch user profile and repositories from GitHub API
  const fetchUser = async (usernameToSearch) => {
    if (usernameToSearch.trim() === "") {
      setError("Username is required");
      return;
    }

    // 🧼 Reset previous data before making new request
    setLoading(true);
    setError("");
    setData(null);
    setRepos([]);

    try {
      // 1️⃣ Fetch user profile
      const res = await fetch(`https://api.github.com/users/${usernameToSearch}`);
      if (!res.ok) throw new Error("User not found");  // Handle 404 or bad responses
      const userData = await res.json();
      setData(userData);  // Save user profile to state

      // 💾 Save username to localStorage
      localStorage.setItem("lastUser", usernameToSearch);

      // 2️⃣ Fetch user repositories
      const repoRes = await fetch(`https://api.github.com/users/${usernameToSearch}/repos`);
      const repoData = await repoRes.json();

      // ⏬ Show top 5 repos (latest or first 5 in the list)
      setRepos(repoData.slice(0, 5));
    } catch (err) {
      setError(err.message); // Show error message
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // 🔘 Handle search button click
  const handleSearch = () => {
    fetchUser(userName);
  };

  // ⌨️ Allow "Enter" key to trigger search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <h2>GitHub Profile Search</h2>

      {/* 🔍 Input field to enter GitHub username */}
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter GitHub username"
      />

      {/* 🔍 Search button */}
      <Button onClick={handleSearch}>Search</Button>

      {/* ❌ Error display */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ⏳ Loading message */}
      {loading && <p>Loading...</p>}

      {/* 👤 Show GitHub profile if available */}
      {data && (
        <div>
          <img src={data.avatar_url} alt="avatar" width={100} />
          <h3>{data.name}</h3>
          <p>{data.bio}</p>
          <p>Public Repos: {data.public_repos}</p>
          <p>Followers: {data.followers}</p>
        </div>
      )}

      {/* 📦 Show top 5 repositories if available */}
      {repos.length > 0 && (
        <>
          <h4>Top 5 Public Repos:</h4>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
