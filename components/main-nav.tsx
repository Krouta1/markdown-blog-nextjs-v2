'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { POSTS } from '@/lib/constants';
import { ModeToggle } from './mode-toggle';

export function MainNav({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col items-start justify-start md:flex-row md:items-center md:justify-between pt-10 z-50',
        className
      )}
    >
      <Link href={'/'}>
        <div className='flex items-center justify-between w-32'>
          <Icons.logo className='h-6 w-6' />
          <p>Blog v2. </p>
        </div>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                <li className='row-span-3'>
                  <NavigationMenuLink asChild>
                    <a
                      className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                      href='/'
                    >
                      {/* <Icons.logo className='h-6 w-6' /> */}
                      <div className='mb-2 mt-4 text-lg font-medium'>
                        shadcn/ui
                      </div>
                      <p className='text-sm leading-tight text-muted-foreground'>
                        Beautifully designed components that you can copy and
                        paste into your apps. Accessible. Customizable. Open
                        Source.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href='/docs' title='Introduction'>
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href='/docs/installation' title='Installation'>
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href='/docs/primitives/typography' title='Typography'>
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                {POSTS.map((post) => (
                  <ListItem
                    key={post.title}
                    title={post.title}
                    href={post.href}
                  >
                    {post.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/docs' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className='flex items-center justify-between w-20'>
        <ModeToggle />
        <Link href='/rss'>
          <Icons.rss className='h-6 w-6' />
        </Link>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
