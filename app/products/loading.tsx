import { Container } from '@/components/layout/container';
import { Skeleton } from '@/components/ui/skeleton';

/** Streaming fallback matching the products grid rhythm. */
export default function ProductsLoading() {
  return (
    <Container className="py-12">
      <span className="sr-only" role="status">
        Loading products
      </span>
      <div className="flex flex-col gap-4 border-b border-border pb-10">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-full max-w-xl" />
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {Array.from({ length: 7 }, (_, index) => (
          <Skeleton key={index} className="h-11 w-28 rounded-pill" />
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <Skeleton key={index} className="h-80 w-full rounded-lg" />
        ))}
      </div>
    </Container>
  );
}
