/**
 * In the 'Issues list' we want the issue.title with
 * link features, but styled from Radix to maintain 
 * consistency. This file is the wrap the 'RadixLink'
 * with a 'NextLink' and keep the client-side 
 * navigation.
 */
'use client';

import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
}

const Link = ({ href, children}: Props) => {
  return (
    <RadixLink asChild weight='medium'>
      <NextLink href={href}>
        {children}
      </NextLink>
    </RadixLink>
  )
}

export default Link;