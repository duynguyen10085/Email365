import { useNavigate } from '@tanstack/react-router';
import { useGetDemoData } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, ArrowLeft } from 'lucide-react';
import EmailList from '../components/EmailList';
import { Skeleton } from '@/components/ui/skeleton';

export default function DemoPage() {
  const navigate = useNavigate();
  const { data: demoData, isLoading } = useGetDemoData();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <img src="/assets/generated/logo-transparent.dim_200x200.png" alt="Email365 Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold">Email365</span>
          </button>
          <Button variant="ghost" onClick={() => navigate({ to: '/' })}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="border-b border-border bg-primary/5">
        <div className="container mx-auto px-4 py-3">
          <Alert className="border-primary/20 bg-transparent">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              This is a demo with sample data. Sign in to connect your real inbox and start organizing your emails.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : demoData ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Demo Inbox</h2>
              <p className="text-muted-foreground">See how Email365 automatically organizes your emails</p>
            </div>
            <EmailList emails={demoData.emails} isDemo={true} />
          </div>
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground">No demo data available</p>
          </div>
        )}
      </main>
    </div>
  );
}
