import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [albumsCounts, setAlbumsCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const fetchedUsers = response.data;

        setUsers(fetchedUsers);

        // Fetch albums count for each user
        const counts = await Promise.all(
          fetchedUsers.map(user => fetchAlbumsCount(user.id))
        );

        const albumsCountsMap = fetchedUsers.reduce((acc, user, index) => {
          acc[user.id] = counts[index];
          return acc;
        }, {});

        setAlbumsCounts(albumsCountsMap);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchAlbumsCount = async (userId) => {
    try {
      const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const user = userResponse.data;
  
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
  
      const albumsResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
      const albums = albumsResponse.data;
  
      return albums ? albums.length : 0;
    } catch (error) {
      console.error(`Error fetching albums for user ${userId}:`, error);
      return 0;
    }
  };
  

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter users based on the search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="card p-4" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="mb-4">Users</h2>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search user..."
            className="form-control"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {loading ? (
          <p className='d-flex justify-content-center'>Loading Users...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Total Albums</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="3">No user found</td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <NavLink
                        to={`/users/${user.id}`}
                        style={{ textDecoration: 'none' }}
                        activestyle={{ textDecoration: 'underline' }}
                      >
                        {user.name}
                      </NavLink>
                    </td>
                    <td>
                      <span className="badge bg-secondary">{albumsCounts[user.id]} albums</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
