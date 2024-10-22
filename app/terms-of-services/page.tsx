import Container from '@/components/container';
import { getTermsOfServices } from '../blog/utils';
import { MainNav } from '@/components/main-nav';

import { Metadata } from 'next';
import CustomMDX from '@/components/mdx';

export const metadata: Metadata = {
  title: 'Terms Of Services',
  description: 'This page explains the terms of use of the site.',
};

export default function Page() {
  const post = getTermsOfServices().find(
    (post) => post.slug === 'terms-of-services'
  );

  return (
    <Container>
      <MainNav />
      <article className='prose'>
        <CustomMDX source={post?.content} />
      </article>
    </Container>
  );
}
