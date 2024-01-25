import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Albums from '../components/Albums';

describe('Albums Component', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should fetch and render albums correctly', async () => {
    const albumsData = [
      { userId: 1, id: 1, title: 'Album 1' },
      { userId: 2, id: 2, title: 'Album 2' },
    ];

    mockAxios.onGet('https://jsonplaceholder.typicode.com/albums?_page=1&_limit=10').reply(200, albumsData);

    render(<Albums />);

    // Wait for albums to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText('Album 1')).toBeInTheDocument();
      expect(screen.getByText('Album 2')).toBeInTheDocument();
    });

    // Assert that pagination is rendered
    expect(screen.getByText('1')).toBeInTheDocument();
  });

});
