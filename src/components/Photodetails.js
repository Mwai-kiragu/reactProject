import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Photodetails = () => {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState({});
  const [editedTitle, setEditedTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch photo details
    axios.get(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
      .then(response => {
        setPhoto(response.data);
        setEditedTitle(response.data.title);
      })
      .catch(error => console.error('Error fetching photo details:', error));
  }, [photoId]);

  const handleEditTitle = () => {
    // Send PATCH or PUT request to update the photo title
    axios.patch(`https://jsonplaceholder.typicode.com/photos/${photoId}`, {
      title: editedTitle,
    })
    .then(response => {
      // Update the photo details after successful update
      setPhoto(response.data);
      setIsEditing(false);
    })
    .catch(error => console.error('Error updating photo title:', error));
  };

  return (
    <div className="container mt-5">
      <div className="mb-3 d-flex justify-content-end">
        {/* Use Link to navigate back to Albumdetails */}
        <Link to={`/albums/${photo.albumId}`} className="btn btn-secondary">
          Back to Albumdetails
        </Link>
      </div>

      <h2>Photo Details</h2>
      <img src={photo.url} alt={photo.title} className="img-fluid" />

      <div>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <button onClick={handleEditTitle}>Save</button>
          </div>
        ) : (
          <div>
            <h3>{photo.title}</h3>
            <button onClick={() => setIsEditing(true)}>Edit Title</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Photodetails;
