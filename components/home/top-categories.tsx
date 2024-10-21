import { categories } from '@/lib/placeholder-data';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const TopCategories = () => {
  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2'>
      {categories.map((category) => (
        <Button
          key={category}
          className='capitalize hover:scale-110 transition-all'
          variant={'secondary'}
          asChild
        >
          <Link href={`/category/${category}`}>{category}</Link>
        </Button>
      ))}
    </div>
  );
};

export default TopCategories;
