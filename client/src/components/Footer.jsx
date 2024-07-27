import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='flex flex-col gap-5'>
      <Link to='/about' className='text-lg font-sm'>
        About Unifind
      </Link>
      <footer className='text-xs'>
        <p>&copy; 2024 Unifind. All rights reserved.</p>
      </footer>
    </div>
  )
}
