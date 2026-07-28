// Shown while a page waits on its Supabase content. Content is never rendered
// from bundled defaults, so every content-driven page passes through here first.
export function PageLoader() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div
        role="status"
        aria-label="Loading page content"
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
      ></div>
    </div>
  );
}

export function PageLoadError({ onRetry }) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-margin-page">
      <div className="text-center max-w-md space-y-stack-sm">
        <span className="material-symbols-outlined text-outline text-5xl">cloud_off</span>
        <h1 className="font-headline-md text-headline-md text-primary">Content unavailable</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          We couldn&apos;t load this page right now. Please check your connection and try again.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 bg-primary text-on-primary px-6 py-2.5 rounded-lg font-subhead-sm hover:bg-primary-container hover:text-on-primary-container transition-colors cursor-pointer"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
