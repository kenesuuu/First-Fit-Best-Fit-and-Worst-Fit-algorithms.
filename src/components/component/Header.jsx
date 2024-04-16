import React from 'react';

const Header = () => {
 return (
    <header className="bg-black py-4">
      <h1 className="text-center text-white font-bold text-2xl">Memory Allocation Algorithms</h1>
      <nav className="flex justify-center space-x-4">
        <ul className="flex space-x-4">
          <li className="text-white font-bold">First-Fit</li>
          <li className="text-white font-bold">Best-Fit</li>
          <li className="text-white font-bold">Worst-Fit</li>
        </ul>
      </nav>
    </header>
 );
};

export default Header;
