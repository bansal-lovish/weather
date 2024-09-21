// components/Layout.tsx

import React, { ReactNode } from 'react';
import Navbar from '../Navbar'; // Adjust the path as per your application

type LayoutProps = {
  children: ReactNode; // ReactNode allows any valid React node
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      {/* Additional footer or other global components can go here */}
    </div>
  );
};

export default Layout;
