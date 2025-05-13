export function PerfumeCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col items-center gap-2 p-4 border rounded-lg shadow-sm bg-white">
      <div className="w-40 h-48 bg-gray-200 rounded-md" />
      <div className="w-40 h-4 bg-gray-200 rounded" />
      <div className="w-40 h-3 bg-gray-200 rounded" />
    </div>
  );
}
