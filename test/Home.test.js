import React from 'react'; 
import { render, waitFor, fireEvent } from '@testing-library/react';
import axiosMock from 'axios-mock-adapter';
import Home from '../components/Home';
import axios from 'axios';

describe('Home Component', () => {
  let axiosMockInstance;

  beforeAll(() => {
    axiosMockInstance = new axiosMock(axios);
  });

  afterEach(() => {
    axiosMockInstance.reset();
  });

  afterAll(() => {
    axiosMockInstance.restore();
  });

  it('renders loading state initially', async () => {
    const { getByText } = render(<Home />);
    expect(getByText('Loading Users...')).toBeInTheDocument();
  });

  it('renders users after data is loaded', async () => {
    const users = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ];

    axiosMockInstance.onGet('https://jsonplaceholder.typicode.com/users').reply(200, users);

    const { getByText, getAllByText } = render(<Home />);
    
    await waitFor(() => {
      expect(getByText('User 1')).toBeInTheDocument();
      expect(getByText('User 2')).toBeInTheDocument();
      expect(getAllByText('albums').length).toBe(2); 
    });
  });

  it('handles search input correctly', async () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];

    axiosMockInstance.onGet('https://jsonplaceholder.typicode.com/users').reply(200, users);

    const { getByPlaceholderText, getByText, queryByText } = render(<Home />);

    // Wait for data to load
    await waitFor(() => getByText('Alice'));

    const searchInput = getByPlaceholderText('Search user...');
    fireEvent.change(searchInput, { target: { value: 'Bob' } });

    expect(queryByText('Alice')).not.toBeInTheDocument();
    expect(getByText('Bob')).toBeInTheDocument();
  });
});
