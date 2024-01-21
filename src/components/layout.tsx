import { Outlet } from 'react-router-dom';

import { Nav } from './nav';

export default function Layout() {
  return (
    <div className='h-full flex'>
      <Nav />
      <div className='bg-[#FAFAFA] w-full flex flex-col'>
        <div className='w-full min-h-[80px] bg-white px-8 py-2'>Header</div>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
