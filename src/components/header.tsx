import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface NavItem {
  label: string
  path: string
}

const navItems: NavItem[] = [
  { label: 'new', path: '/newest' },
  { label: 'ask', path: '/ask' },
  { label: 'show', path: '/show' },
  { label: 'jobs', path: '/jobs' },
]

const Nav = ({ activePath }: { activePath: string }) => (
  <nav>
    {navItems.map(({ label, path }, i) => (
      <React.Fragment key={label}>
        <Link
          href={path}
          className={`sm:text-xs ${activePath === path ? 'text-white' : ''}`}
        >
          {label}
        </Link>
        {i < navItems.length - 1 && <span className='whitespace-pre'> | </span>}
      </React.Fragment>
    ))}
  </nav>
)

const Logo = () => (
  <Link href='/' className='shrink-0'>
    <Image
      src='/y18.gif'
      alt='logo'
      width={20}
      height={20}
      className='border border-solid border-white'
    />
  </Link>
)

export default function Header() {
  const { asPath } = useRouter()

  return (
    <header className='flex items-center gap-x-1 bg-[#ff6600] p-0.5'>
      <Logo />

      <div className='flex gap-x-2.5 leading-3 text-black sm:mx-[5px] sm:my-[3px] sm:flex-col sm:leading-tight'>
        <Link href='/news' className='font-bold sm:text-[15px]'>
          Hacker News
        </Link>
        <Nav activePath={asPath.split('?')[0]} />
      </div>
    </header>
  )
}
