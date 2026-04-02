import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data only once when component mounts (empty dependency array)
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data.slice(0, 10)); // Display only first 10 posts for better UX
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array → runs only once on mount

  // Conditional Rendering
  if (loading) {
    return (
      <div className="container">
        <h1>Posts Feed</h1>
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Posts Feed</h1>
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Posts Feed</h1>
      <p className="subtitle">Fetched from JSONPlaceholder API</p>

      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <small>User ID: {post.userId}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;