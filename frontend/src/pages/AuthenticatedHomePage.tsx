import { useGetHomepageToggleState, useToggleHomepageState } from '../hooks/useQueries';

export default function AuthenticatedHomePage() {
  const { data: isActive = false, isLoading } = useGetHomepageToggleState();
  const toggleState = useToggleHomepageState();

  const handleToggle = () => {
    if (!toggleState.isPending) {
      toggleState.mutate();
    }
  };

  const isDisabled = isLoading || toggleState.isPending;

  return (
    <div className="flex min-h-screen items-center justify-center p-8 md:pl-40 lg:pl-56 xl:pl-64">
      <div className="flex w-full max-w-4xl flex-col items-center space-y-12">
        {/* Branding Section - Above Toggle Box - Logo Enlarged, Company Name Normal */}
        <div className="flex flex-col items-center space-y-6">
          <img
            src="/assets/generated/logo-transparent.dim_200x200.png"
            alt="Email365 Logo"
            className="h-56 w-56 object-contain"
          />
          <h1 className="text-4xl font-bold text-foreground tracking-tight">Email365</h1>
        </div>

        {/* Bordered Box Section */}
        <div className="w-full rounded-2xl border-2 border-border bg-card p-12 shadow-lg">
          <div className="flex flex-col items-center space-y-8">
            {/* Custom VPN-style Toggle Button - Longer and More Prominent */}
            <button
              onClick={handleToggle}
              disabled={isDisabled}
              className={`relative h-40 w-80 rounded-full transition-all duration-500 ease-in-out focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed ${
                isActive
                  ? 'bg-blue-600 shadow-2xl shadow-blue-600/40'
                  : 'bg-muted-foreground/20 shadow-lg'
              }`}
              aria-label={isActive ? 'Turn off email sorting' : 'Turn on email sorting'}
              aria-pressed={isActive}
            >
              {/* Toggle Thumb (Large White Circle) */}
              <div
                className={`absolute top-2.5 h-35 w-35 rounded-full bg-white shadow-2xl transition-all duration-500 ease-in-out ${
                  isActive ? 'translate-x-[11.25rem]' : 'translate-x-2.5'
                }`}
                style={{ width: '8.75rem', height: '8.75rem' }}
              />
            </button>

            {/* Status Text */}
            <div className="text-center">
              <div
                className={`text-5xl font-bold transition-colors duration-300 ${
                  isActive ? 'text-blue-600' : 'text-muted-foreground'
                }`}
              >
                {isActive ? 'ON' : 'OFF'}
              </div>
              <p className="mt-3 text-base text-muted-foreground">
                {isActive
                  ? 'Email sorting is currently active'
                  : 'Email sorting is currently inactive'}
              </p>
            </div>

            {toggleState.isPending && (
              <div className="text-sm text-muted-foreground animate-pulse">
                Updating...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
