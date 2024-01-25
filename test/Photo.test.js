import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Photos from '../components/Photos';

jest.mock('axios');

describe('Photos component', () => {
  it('renders photos correctly', async () => {
    const photosData = [
      { id: 1, title: 'Photo 1', thumbnailUrl: 'https://via.placeholder.com/150' },
      { id: 2, title: 'Photo 2', thumbnailUrl: 'https://via.placeholder.com/150' },
      { id: 3, title: 'Photo 3', thumbnailUrl: 'https://via.placeholder.com/150' }
    ];

    axios.get.mockResolvedValue({ data: photosData });

    render(<Photos />);

    await waitFor(() => {
      const photoElements = screen.getAllByRole('img');
      expect(photoElements).toHaveLength(3); // Assuming 3 photos are rendered
    });
  });
});
