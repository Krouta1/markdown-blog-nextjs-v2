import Container from '@/components/container';
import LatestPost from '@/components/home/latest-posts';
import PopularPosts from '@/components/home/popular-posts';
import TopCategories from '@/components/home/top-categories';
import { MainNav } from '@/components/main-nav';

export default function Home() {
  return (
    <Container>
      <MainNav />
      <div className='flex flex-col items-start justify-evenly mt-16 md:flex-row'>
        <div>
          <LatestPost />
        </div>
        <div className='h-screen'>
          <div>
            <h1 className=' font-bold mb-4'>TOP CATEGORIES</h1>
            <TopCategories />
          </div>
          {/* To apply sticky parent must have height */}
          <div className='mt-10 sticky top-0'>
            <h1 className=' font-bold mb-4'>POPULAR POSTS</h1>
            <PopularPosts />
          </div>
        </div>
      </div>
    </Container>
  );
}
