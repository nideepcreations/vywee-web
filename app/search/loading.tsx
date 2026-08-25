import { Container } from '@/components/layout/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchLoading() {
  return (
    <Container className="py-12">
      <span className="sr-only" role="status">
        Searching
      </span>
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-4 h-9 w-96" />
      <Skeleton className="mt-3 h-20 w-full max-w-2xl rounded-lg" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <Skeleton key={i} className="h-80 w-full rounded-lg" />
        ))}
      </div>
    </Container>
  );
}
