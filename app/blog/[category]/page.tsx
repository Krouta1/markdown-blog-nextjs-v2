import React from 'react';
import { getBlogPosts } from '../utils';
import { notFound } from 'next/navigation';
import Container from '@/components/container';
import Link from 'next/link';
import CardCategory from '@/components/card-category';
import Header from '@/components/header';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  const categories = new Set(posts.map((post) => post.metadata.category));
  return Array.from(categories).map((category) => ({
    params: { category },
  }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const { category } = params;

  return {
    title: category.toLocaleUpperCase(),
    description: `All articles reagarding ${category}`,
  };
}

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
      <Header>
        <Container>
          <h1 className='title font-semibold text-2xl tracking-wider mt-4 uppercase'>
            {posts[0]?.metadata.category}
          </h1>
        </Container>
      </Header>
      <Container>
        <div className='flex flex-wrap items-center gap-4 mt-10'>
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
