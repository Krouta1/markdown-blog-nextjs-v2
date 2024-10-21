// import { categories } from '@/lib/placeholder-data';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { POSTS } from '@/lib/constants';

const TopCategories = () => {
  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2'>
      {POSTS.map((category) => (
        <Button
          key={category.title}
          className='capitalize hover:scale-110 transition-all'
          variant={'secondary'}
          asChild
        >
          <Link href={`${category.href}`}>{category.title}</Link>
        </Button>
      ))}
    </div>
  );
};

export default TopCategories;
