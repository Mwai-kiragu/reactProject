import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Userdetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Fetch user details
    axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user details:', error));

    // Fetch user albums
    axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
      .then(response => setAlbums(response.data))
      .catch(error => console.error('Error fetching user albums:', error));
  }, [userId]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        {/* Use Link to navigate back */}
        <Link to="/" className="btn btn-secondary">
          Back
        </Link>
      </div>

      <h2>{user.name}'s Details</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>

      <h3>Albums</h3>
      <div className="card" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <ul className="list-group list-group-flush">
          {albums.map(album => (
            <li key={album.id} className="list-group-item">
              {/* Use Link to navigate to AlbumDetailsPage */}
              <Link to={`/albums/${album.id}`}>
                {album.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Userdetails;
