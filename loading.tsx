import { Container } from '@/components/layout/container';
import { Skeleton } from '@/components/ui/skeleton';

/** Route-level streaming fallback. Mirrors the standard page header rhythm. */
export default function Loading() {
  return (
    <Container className="py-12">
      <span className="sr-only" role="status">
        Loading
      </span>
      <div className="flex flex-col gap-4 border-b border-border pb-10">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-9 w-2/3 max-w-md" />
        <Skeleton className="h-5 w-full max-w-xl" />
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-44 w-full rounded-lg" />
        ))}
      </div>
    </Container>
  );
}
