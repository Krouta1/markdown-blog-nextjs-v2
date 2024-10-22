import React from 'react';
import { formatDate, getBlogPosts } from '../../utils';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Container from '@/components/container';
import { BreadcrumbWithCustomSeparator } from '@/components/custom-breadcrumbs';
import CustomMDX from '@/components/mdx';

const Page = ({ params }: { params: { category: string; slug: string } }) => {
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }
  return (
    <>
      <Header>
        <Container>
          <BreadcrumbWithCustomSeparator
            category={params.category}
            slug={params.slug}
          />
          <h1 className='title font-semibold text-2xl tracking-tighter mt-4'>
            {post.metadata.title}
          </h1>
          <div className='flex justify-between items-center mt-2 mb-4 text-sm'>
            <p className='text-sm text-neutral-600 dark:text-neutral-400 mt-2'>
              {formatDate(post.metadata.publishedAt)}
            </p>
          </div>
        </Container>
      </Header>
      <Container>
        <article className='prose'>
          <CustomMDX source={post.content} />
        </article>
      </Container>
    </>
  );
};

export default Page;
