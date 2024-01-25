import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(10); // Number of photos per page

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  // Get current photos based on pagination
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  // Pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(photos.length / photosPerPage); i++) {
    pageNumbers.push(i);
  }

  let pagination;
  if (pageNumbers.length <= 5) {
    pagination = pageNumbers;
  } else if (currentPage <= 3) {
    pagination = [...pageNumbers.slice(0, 4), '...', pageNumbers.length];
  } else if (currentPage > pageNumbers.length - 2) {
    pagination = [1, '...', ...pageNumbers.slice(-4)];
  } else {
    pagination = [1, '...', ...pageNumbers.slice(currentPage - 2, currentPage + 1), '...', pageNumbers.length];
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h2>Photos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Photo ID</th>
            <th>Photo Title</th>
          </tr>
        </thead>
        <tbody>
          {currentPhotos.map((photo) => (
            <tr key={photo.id}>
              <td>{photo.id}</td>
              <td>
                <Link to={`/photos/${photo.id}`}>
                  {photo.title}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <nav className="mt-3">
        <ul className="pagination d-flex justify-content-center">
          {pagination.map((number, index) => (
            <li key={index} className={`page-item ${number === currentPage ? 'active' : ''}`}>
              <button
                onClick={() => typeof number === 'number' && paginate(number)}
                className="page-link"
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Photos;
