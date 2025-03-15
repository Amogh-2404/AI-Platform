import React from 'react';

function Footer() {
  return (
    <footer className="bg-white shadow mt-8">
      <div className="container mx-auto px-4 py-4 text-center text-gray-600">
        © {new Date().getFullYear()} AI-Enhanced Service Platform. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;