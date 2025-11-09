import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  useGetCallerUserProfile,
  useSaveCallerUserProfile,
  useGetSuggestedCategories,
  useGetPreferredCategories,
  useUpdatePreferredCategories,
  useGetGoogleLinkState,
  useToggleGoogleLinkState,
} from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';
import { X, Plus, Check } from 'lucide-react';
import { SiGoogle } from 'react-icons/si';

export default function SettingsPage() {
  const { data: userProfile, isLoading } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const { theme, setTheme } = useTheme();

  const { data: suggestedCategories = [], isLoading: loadingSuggested } = useGetSuggestedCategories();
  const { data: preferredCategories = [], isLoading: loadingPreferred } = useGetPreferredCategories();
  const updatePreferredCategories = useUpdatePreferredCategories();

  const { data: isGoogleLinked = false, isLoading: loadingGoogleLink } = useGetGoogleLinkState();
  const toggleGoogleLink = useToggleGoogleLinkState();

  const [name, setName] = useState(userProfile?.name || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [emailNotifications, setEmailNotifications] = useState(
    userProfile?.preferences.notificationSettings.emailNotifications ?? true
  );
  const [pushNotifications, setPushNotifications] = useState(
    userProfile?.preferences.notificationSettings.pushNotifications ?? false
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState('');

  // Auto-save timers
  const [nameTimer, setNameTimer] = useState<NodeJS.Timeout | null>(null);
  const [emailTimer, setEmailTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setEmail(userProfile.email);
      setEmailNotifications(userProfile.preferences.notificationSettings.emailNotifications);
      setPushNotifications(userProfile.preferences.notificationSettings.pushNotifications);
    }
  }, [userProfile]);

  useEffect(() => {
    if (preferredCategories.length > 0) {
      setSelectedCategories(preferredCategories);
    }
  }, [preferredCategories]);

  // Auto-save name with debounce
  useEffect(() => {
    if (!userProfile || name === userProfile.name) return;

    if (nameTimer) clearTimeout(nameTimer);

    const timer = setTimeout(() => {
      saveProfile.mutate({
        ...userProfile,
        name,
        email: userProfile.email,
      });
    }, 1000);

    setNameTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [name]);

  // Auto-save email with debounce
  useEffect(() => {
    if (!userProfile || email === userProfile.email) return;

    if (emailTimer) clearTimeout(emailTimer);

    const timer = setTimeout(() => {
      saveProfile.mutate({
        ...userProfile,
        name: userProfile.name,
        email,
      });
    }, 1000);

    setEmailTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [email]);

  // Auto-save notification settings
  useEffect(() => {
    if (!userProfile) return;

    const currentEmailNotif = userProfile.preferences.notificationSettings.emailNotifications;
    const currentPushNotif = userProfile.preferences.notificationSettings.pushNotifications;

    if (emailNotifications !== currentEmailNotif || pushNotifications !== currentPushNotif) {
      saveProfile.mutate({
        ...userProfile,
        preferences: {
          ...userProfile.preferences,
          notificationSettings: {
            emailNotifications,
            pushNotifications,
          },
        },
      });
    }
  }, [emailNotifications, pushNotifications]);

  const handleAddSuggestedCategory = (categoryName: string) => {
    if (!selectedCategories.includes(categoryName)) {
      const newCategories = [...selectedCategories, categoryName];
      setSelectedCategories(newCategories);
      updatePreferredCategories.mutate(newCategories);
    }
  };

  const handleAddCustomCategory = () => {
    const trimmed = customCategory.trim();
    if (trimmed && !selectedCategories.includes(trimmed)) {
      const newCategories = [...selectedCategories, trimmed];
      setSelectedCategories(newCategories);
      setCustomCategory('');
      updatePreferredCategories.mutate(newCategories);
    } else if (selectedCategories.includes(trimmed)) {
      toast.error('Category already exists');
    }
  };

  const handleRemoveCategory = (categoryName: string) => {
    const newCategories = selectedCategories.filter((cat) => cat !== categoryName);
    setSelectedCategories(newCategories);
    updatePreferredCategories.mutate(newCategories);
  };

  const handleGoogleLinkToggle = () => {
    toggleGoogleLink.mutate();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl space-y-6 p-8">
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="categories">Categories & Labels</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Update your account information - changes are saved automatically</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  {saveProfile.isPending && name !== userProfile?.name && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      Saving...
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  {saveProfile.isPending && email !== userProfile?.email && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      Saving...
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <Label>Link Account</Label>
                <p className="text-sm text-muted-foreground">
                  Connect your Google account for seamless integration
                </p>
                {loadingGoogleLink ? (
                  <Skeleton className="h-12 w-32" />
                ) : isGoogleLinked ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-lg border border-green-500/50 bg-green-500/10 px-4 py-2">
                      <SiGoogle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">
                        Google Account Linked
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGoogleLinkToggle}
                      disabled={toggleGoogleLink.isPending}
                    >
                      {toggleGoogleLink.isPending ? 'Unlinking...' : 'Unlink'}
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={handleGoogleLinkToggle}
                    disabled={toggleGoogleLink.isPending}
                    className="inline-flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 transition-all hover:bg-accent hover:border-accent-foreground/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Link Google account"
                  >
                    <SiGoogle className="h-6 w-6 text-[#4285F4]" />
                    <span className="text-sm font-medium">
                      {toggleGoogleLink.isPending ? 'Linking...' : 'Link Google Account'}
                    </span>
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Email Categories</CardTitle>
              <CardDescription>
                Manage your preferred email categories - changes are saved automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {loadingPreferred || loadingSuggested ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Your Categories</Label>
                      {updatePreferredCategories.isPending && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="animate-spin">⏳</span> Saving...
                        </span>
                      )}
                    </div>
                    {selectedCategories.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedCategories.map((category) => (
                          <Badge key={category} variant="secondary" className="px-3 py-1.5 text-sm">
                            {category}
                            <button
                              onClick={() => handleRemoveCategory(category)}
                              className="ml-2 hover:text-destructive"
                              aria-label={`Remove ${category}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No categories selected. Add categories from the suggestions below or create your own.
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label>Suggested Categories</Label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {suggestedCategories.map((category) => {
                        const isSelected = selectedCategories.includes(category.name);
                        return (
                          <div
                            key={category.id}
                            className="flex items-start justify-between rounded-lg border p-3 transition-colors hover:bg-accent"
                          >
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium">{category.name}</p>
                              <p className="text-xs text-muted-foreground">{category.description}</p>
                            </div>
                            <Button
                              size="sm"
                              variant={isSelected ? 'outline' : 'default'}
                              onClick={() => handleAddSuggestedCategory(category.name)}
                              disabled={isSelected || updatePreferredCategories.isPending}
                              className="ml-2"
                            >
                              {isSelected ? (
                                <>
                                  <Check className="mr-1 h-3 w-3" />
                                  Added
                                </>
                              ) : (
                                'Add'
                              )}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="custom-category">Add Custom Category</Label>
                    <div className="flex gap-2">
                      <Input
                        id="custom-category"
                        placeholder="Enter category name"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCustomCategory();
                          }
                        }}
                        disabled={updatePreferredCategories.isPending}
                      />
                      <Button
                        onClick={handleAddCustomCategory}
                        disabled={!customCategory.trim() || updatePreferredCategories.isPending}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Choose how you want to be notified - changes are saved automatically</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <div className="flex items-center gap-2">
                  {saveProfile.isPending && (
                    <span className="text-xs text-muted-foreground">Saving...</span>
                  )}
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    disabled={saveProfile.isPending}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                </div>
                <div className="flex items-center gap-2">
                  {saveProfile.isPending && (
                    <span className="text-xs text-muted-foreground">Saving...</span>
                  )}
                  <Switch
                    id="push-notifications"
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                    disabled={saveProfile.isPending}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the app looks - changes are applied immediately</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex gap-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    onClick={() => setTheme('light')}
                    className="flex-1"
                  >
                    Light
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    onClick={() => setTheme('dark')}
                    className="flex-1"
                  >
                    Dark
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'default' : 'outline'}
                    onClick={() => setTheme('system')}
                    className="flex-1"
                  >
                    System
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your data and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your data is stored securely on the Internet Computer blockchain. We never share your information with
                third parties.
              </p>
              <Button variant="destructive" onClick={() => toast.info('Account deletion coming soon')}>
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
