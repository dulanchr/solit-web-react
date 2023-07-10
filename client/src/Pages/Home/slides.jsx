import React from 'react';
import CoursesLink from './CoursesLink';

const slides = [
  { imageUrl: 'https://source.unsplash.com/78A265wPiO4' },
  { imageUrl: 'https://source.unsplash.com/eOpewngf68w' },
  { imageUrl: 'https://source.unsplash.com/ndN00KmbJ1c' },
];

export default function App() {
  return (
    <div>
      <CoursesLink slides={slides} />
    </div>
  );
}
