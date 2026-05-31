export default function Loading() {
  return (
    <div className="flex h-screen bg-[#080B11] overflow-hidden">
      {/* Sidebar skeleton */}
      <div className="hidden lg:flex flex-col w-[72px] border-r border-[#1E2733] p-4 gap-4 shrink-0">
        <div className="skeleton h-8 w-8 rounded-lg mx-auto" />
        <div className="mt-6 flex flex-col gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton h-9 w-9 rounded-lg mx-auto" />
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <div className="skeleton h-4 w-24 rounded" />
              <div className="skeleton h-8 w-64 rounded" />
            </div>
            <div className="skeleton h-10 w-10 rounded-full" />
          </div>

          {/* Bento grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Hero tile */}
            <div className="skeleton col-span-1 md:col-span-2 h-48 rounded-2xl" />

            {/* Stats tile */}
            <div className="skeleton h-48 rounded-2xl" />

            {/* Course tiles */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton h-44 rounded-2xl" />
            ))}

            {/* Activity tile */}
            <div className="skeleton col-span-1 md:col-span-2 h-52 rounded-2xl" />

            {/* Extra tile */}
            <div className="skeleton h-52 rounded-2xl" />
          </div>
        </div>
      </main>
    </div>
  );
}
