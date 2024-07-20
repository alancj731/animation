'use client';

import Link from 'next/link';
import { useState } from 'react';
import { NextLogoDark } from '@/ui/next-logo';

const links = [
  { href: '/pacman', label: 'Pacman Progress' },
  { href: '/starfield', label: 'Star Field' },
  { href: '/movingpic', label: 'Moving Picture' },
  { href: '/panelpic', label: 'Panel Picture' },
  { href: '/floatingbubble', label: 'Floating Bubble' },
  
];


export function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div className="fixed top-8 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-gray-800">
      <div className="flex h-14 items-center px-4 py-4 lg:h-auto">
        <Link
          href="/"
          className="group flex w-full items-center gap-x-2.5"
          onClick={close}
        >
          <div className="h-7 w-7 rounded-full">
            <NextLogoDark />
          </div>

          <h3 className="font-semibold tracking-wide text-gray-400 group-hover:text-gray-50">
            Animation Components
          </h3>
        </Link>
      </div>
      <div className="flex flex-col p-4">
        {links.map(({ href, label }) => (
          <Link 
          key={href}
          href={href}
          className="mt-2 p-2 text-gray-400 hover:text-gray-50 hover:bg-gray-800 rounded"
          onClick={close}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
