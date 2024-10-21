import React from 'react';
import { getBlogPosts } from '../utils';
import { notFound } from 'next/navigation';
import Container from '@/components/container';
import Link from 'next/link';
import CardCategory from '@/components/card-category';

const BlogCategoryPage = ({ params }: { params: { category: string } }) => {
  //filter posts properly
  const posts = getBlogPosts().filter(
    (post) => post.metadata.category === params.category
  );

  if (!posts.length) {
    notFound(); //this generates a 404 page in next.js you must define it
  }

  const sortedPosts = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return (
    <>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
          {sortedPosts.map((post) => (
            <Link
              href={`/blog/${post.metadata.category}/${post.slug}`}
              key={post.slug}
            >
              <CardCategory
                title={post.metadata.title}
                summary={post.metadata.summary}
                date={post.metadata.publishedAt}
              />
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
};

export default BlogCategoryPage;
