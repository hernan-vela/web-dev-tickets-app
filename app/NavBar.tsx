'use client';

import Link from "next/link";
// import { LuBean } from 'react-icons/lu';
import { usePathname } from 'next/navigation';
import { LuGlasses } from 'react-icons/lu';
import classnames from 'classnames';

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href:'/' },
    { label: 'Issues', href:'/issues/list' }
  ]

  return(
    <nav className='flex space-x-9 border-b-2 text-cyan border-b-cyan-200 mb-5 px-5 h-14 items-center'>
      <Link href='/'><LuGlasses /></Link>
      <ul className='flex space-x-6'>
        {links.map(link => 
        <Link 
        key={link.href}
        className={classnames({
          'text-cyan-600': link.href === currentPath,
          'text-zinc-500': link.href !== currentPath,
          'hover:text-cyan-300 transition-colors': true
        })} 
        href={link.href}>{link.label}</Link>)}
      </ul>
    </nav>
  );
}

export default NavBar;

