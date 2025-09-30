import Link from "next/link";
// import { LuBean } from 'react-icons/lu';
import { LuGlasses } from 'react-icons/lu';

const NavBar = () => {
  const links = [
    { label: 'Dashboard', href:'/' },
    { label: 'Issues', href:'/issues' }
  ]

  return(
    <nav className='flex space-x-9 border-b-2 border-b-cyan-200 mb-5 px-5 h-14 items-center'>
      <Link href='/'><LuGlasses /></Link>
      <ul className='flex space-x-6'>
        {links.map(link => 
        <Link 
        key={link.href}
        className='text-cyan-600 hover:text-cyan-800 transition-colors' 
        href={link.href}>{link.label}</Link>)}
      </ul>
    </nav>
  );
}

export default NavBar;

