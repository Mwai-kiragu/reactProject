import '@testing-library/jest-dom'; 
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Users link', async () => {
  render(<App />);
  const linkElement = await screen.findAllByText(/Users/i);
  expect(linkElement).toHaveLength(3); // Check the length of the array
});

test('renders Albums link', async () => { 
  render(<App />);
  const linkElement = screen.getByRole('link', { name: /Album/i });
  expect(linkElement).toHaveAttribute('href', '/albums'); // Check that the link has the correct "href" attribute
});

test('renders Photos component', async () => {
  render(<App />);
  const photoTitleElements = screen.getAllByRole('link');
  expect(photoTitleElements).toBeTruthy(); // Check that photo title links are rendered
});
