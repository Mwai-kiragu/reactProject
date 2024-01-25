import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage] = useState(10);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/albums?_page=${currentPage}&_limit=${albumsPerPage}`)
      .then(response => setAlbums(response.data))
      .catch(error => console.error('Error fetching albums:', error));
  }, [currentPage, albumsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h2>Albums</h2>
      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Album ID</th>
            <th>Album Title</th>
          </tr>
        </thead>
        <tbody>
          {albums.map(album => (
            <tr key={album.id}>
              <td>{album.userId}</td>
              <td>{album.id}</td>
              <td>
                <NavLink
                    to={`/albums/${album.id}`}
                    style={{ textDecoration: 'none' }}
                    activestyle={{ textDecoration: 'underline' }}
                    >
                    {album.title}
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(100 / albumsPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Albums;
