import { type Email } from '../backend';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailListProps {
  emails: Email[];
  selectedEmailId?: string;
  onSelectEmail?: (email: Email) => void;
  isDemo?: boolean;
}

export default function EmailList({ emails, selectedEmailId, onSelectEmail, isDemo = false }: EmailListProps) {
  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getInitials = (email: string) => {
    const parts = email.split('@')[0].split('.');
    return parts
      .map((p) => p[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ScrollArea className="h-full">
      <div className="divide-y divide-border">
        {emails.map((email) => (
          <button
            key={email.id}
            onClick={() => !isDemo && onSelectEmail?.(email)}
            className={cn(
              'w-full p-4 text-left transition-colors hover:bg-muted/50',
              selectedEmailId === email.id && 'bg-muted',
              !email.isRead && 'font-medium'
            )}
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src="/assets/generated/avatar-placeholder.dim_64x64.png" />
                <AvatarFallback>{getInitials(email.sender)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm">{email.sender}</span>
                  <span className="flex-shrink-0 text-xs text-muted-foreground">
                    {formatTimestamp(email.timestamp)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm">{email.subject}</p>
                  {email.isStarred && <Star className="h-3 w-3 flex-shrink-0 fill-yellow-400 text-yellow-400" />}
                  {email.hasAttachments && <Paperclip className="h-3 w-3 flex-shrink-0 text-muted-foreground" />}
                </div>
                <p className="truncate text-xs text-muted-foreground">{email.snippet}</p>
                <div className="flex gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {email.category}
                  </Badge>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
