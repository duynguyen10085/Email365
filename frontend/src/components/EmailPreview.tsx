import { type Email } from '../backend';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Star, Archive, Trash2, Reply, Forward, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface EmailPreviewProps {
  email: Email;
}

export default function EmailPreview({ email }: EmailPreviewProps) {
  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString();
  };

  const getInitials = (emailAddr: string) => {
    const parts = emailAddr.split('@')[0].split('.');
    return parts
      .map((p) => p[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAction = (action: string) => {
    toast.success(`${action} action triggered`);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{email.subject}</h2>
          <Badge variant="secondary">{email.category}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/assets/generated/avatar-placeholder.dim_64x64.png" />
              <AvatarFallback>{getInitials(email.sender)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{email.sender}</p>
              <p className="text-xs text-muted-foreground">{formatTimestamp(email.timestamp)}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => handleAction('Reply')}>
              <Reply className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleAction('Forward')}>
              <Forward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleAction('Star')}>
              <Star className={`h-4 w-4 ${email.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleAction('Archive')}>
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleAction('Delete')}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction('Mark as unread')}>Mark as unread</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction('Move to spam')}>Move to spam</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction('Create rule')}>Create rule</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Body */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p>{email.snippet}</p>
            <Separator className="my-6" />
            <p className="text-muted-foreground">
              This is a preview of the email content. In a real application, the full email body would be displayed
              here with proper formatting, images, and attachments.
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
