import Container from '@/components/container';
import LatestPost from '@/components/home/latest-posts';
import { MainNav } from '@/components/main-nav';

export default function Home() {
  return (
    <Container>
      <MainNav />
      <main>
        <div>
          <LatestPost />
        </div>
      </main>
    </Container>
  );
}
