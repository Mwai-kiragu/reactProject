import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Albumdetails = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState({});
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch album details
    axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
      .then(response => setAlbum(response.data))
      .catch(error => console.error('Error fetching album details:', error));

    // Fetch album photos
    axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then(response => setPhotos(response.data))
      .catch(error => console.error('Error fetching album photos:', error));
  }, [albumId]);

  return (
    <div className="container mt-5">
      <div className="mb-3 d-flex justify-content-end">
        {/* Use Link to navigate back to Userdetails */}
        <Link to={`/users/${album.userId}`} className="btn btn-secondary">
          Back to Userdetails
        </Link>
      </div>

      <h2>{album.title}</h2>

      <div className="row">
        {photos.map((photo, index) => (
          <div key={photo.id} className="col-md-4 mb-4">
            <div className="card">
              <Link to={`/photos/${photo.id}`}>
                <img src={photo.thumbnailUrl} alt={photo.title} className="card-img-top displayImage" />
              </Link>
              <div className="card-body">
                <p className="card-text">{photo.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Albumdetails;
