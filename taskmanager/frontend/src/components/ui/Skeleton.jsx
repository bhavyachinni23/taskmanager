export const TaskSkeleton = () => (
  <div className="card p-4 space-y-3">
    <div className="flex items-center gap-3">
      <div className="skeleton w-4 h-4 rounded" />
      <div className="skeleton h-4 flex-1 rounded" />
    </div>
    <div className="skeleton h-3 w-3/4 rounded" />
    <div className="flex gap-2">
      <div className="skeleton h-5 w-16 rounded-full" />
      <div className="skeleton h-5 w-20 rounded-full" />
    </div>
  </div>
);

export const StatSkeleton = () => (
  <div className="card p-5 space-y-3">
    <div className="flex justify-between">
      <div className="skeleton h-4 w-24 rounded" />
      <div className="skeleton w-10 h-10 rounded-lg" />
    </div>
    <div className="skeleton h-8 w-16 rounded" />
    <div className="skeleton h-3 w-32 rounded" />
  </div>
);
