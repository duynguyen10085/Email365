import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useGetEmails } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';
import EmailList from '../components/EmailList';
import EmailPreview from '../components/EmailPreview';
import { Skeleton } from '@/components/ui/skeleton';
import { EmailCategory, type Email } from '../backend';
import { Badge } from '@/components/ui/badge';

export default function InboxPage() {
  const params = useParams({ from: '/category/$categoryId' });
  const categoryId = params?.categoryId || 'inbox';
  const { data: emails = [], isLoading } = useGetEmails();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterUnread, setFilterUnread] = useState(false);

  const filteredEmails = emails
    .filter((email) => {
      const matchesCategory = email.category === (categoryId as EmailCategory);
      const matchesSearch =
        searchQuery === '' ||
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.sender.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesUnread = !filterUnread || !email.isRead;
      return matchesCategory && matchesSearch && matchesUnread;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return Number(b.timestamp - a.timestamp);
      }
      return a.subject.localeCompare(b.subject);
    });

  return (
    <div className="flex h-screen flex-col">
      {/* Utility Bar */}
      <div className="border-b border-border bg-background p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="subject">Subject</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={filterUnread ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterUnread(!filterUnread)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Unread only
          </Button>
        </div>
      </div>

      {/* Two-pane layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Email List */}
        <div className="w-full border-r border-border md:w-1/2 lg:w-2/5">
          {isLoading ? (
            <div className="space-y-2 p-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : filteredEmails.length === 0 ? (
            <div className="flex h-full items-center justify-center p-8 text-center">
              <div>
                <p className="text-lg font-medium">All caught up!</p>
                <p className="text-sm text-muted-foreground">No emails in this category</p>
              </div>
            </div>
          ) : (
            <EmailList
              emails={filteredEmails}
              selectedEmailId={selectedEmail?.id}
              onSelectEmail={setSelectedEmail}
            />
          )}
        </div>

        {/* Email Preview */}
        <div className="hidden flex-1 md:block">
          {selectedEmail ? (
            <EmailPreview email={selectedEmail} />
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-center">
              <div>
                <p className="text-lg font-medium">Select an email</p>
                <p className="text-sm text-muted-foreground">Choose an email from the list to view its contents</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
