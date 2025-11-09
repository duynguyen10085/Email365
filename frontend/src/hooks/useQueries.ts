import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Email, SortingRule, CategoryLabel, HelpQuestion, EmailCategory, SuggestedCategory } from '../backend';
import { toast } from 'sonner';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to save: ${error.message}`);
    },
  });
}

export function useGetEmails() {
  const { actor, isFetching } = useActor();

  return useQuery<Email[]>({
    queryKey: ['emails'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEmails();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveEmails() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (emails: Email[]) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveEmails(emails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
    },
  });
}

export function useUpdateEmailCategory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ emailId, category }: { emailId: string; category: EmailCategory }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateEmailCategory(emailId, category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
      toast.success('Email moved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to move email: ${error.message}`);
    },
  });
}

export function useGetSortingRules() {
  const { actor, isFetching } = useActor();

  return useQuery<SortingRule[]>({
    queryKey: ['sortingRules'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSortingRules();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveSortingRules() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rules: SortingRule[]) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveSortingRules(rules);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sortingRules'] });
      toast.success('Rules saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save rules: ${error.message}`);
    },
  });
}

export function useGetCategories() {
  const { actor, isFetching } = useActor();

  return useQuery<CategoryLabel[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCategories() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categories: CategoryLabel[]) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCategories(categories);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Categories saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save categories: ${error.message}`);
    },
  });
}

export function useGetHelpQuestions() {
  const { actor, isFetching } = useActor();

  return useQuery<HelpQuestion[]>({
    queryKey: ['helpQuestions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHelpQuestions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetDemoData() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['demoData'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDemoData();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSuggestedCategories() {
  const { actor, isFetching } = useActor();

  return useQuery<SuggestedCategory[]>({
    queryKey: ['suggestedCategories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSuggestedCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPreferredCategories() {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['preferredCategories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPreferredCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdatePreferredCategories() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (preferredCategories: string[]) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updatePreferredCategories(preferredCategories);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferredCategories'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to update categories: ${error.message}`);
    },
  });
}

export function useGetHomepageToggleState() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['homepageToggleState'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.getHomepageToggleState();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useToggleHomepageState() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const newState = await actor.toggleHomepageState();
      return newState;
    },
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['homepageToggleState'] });

      // Snapshot the previous value
      const previousState = queryClient.getQueryData<boolean>(['homepageToggleState']);

      // Optimistically update to the toggled value (default to false if undefined)
      const currentState = previousState ?? false;
      queryClient.setQueryData<boolean>(['homepageToggleState'], !currentState);

      // Return a context object with the snapshotted value
      return { previousState: currentState };
    },
    onSuccess: (newState) => {
      // Update with the actual state from the backend
      queryClient.setQueryData<boolean>(['homepageToggleState'], newState);
    },
    onError: (error: Error, _variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousState !== undefined) {
        queryClient.setQueryData<boolean>(['homepageToggleState'], context.previousState);
      }
      toast.error(`Failed to update toggle state: ${error.message}`);
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we're in sync with the server
      queryClient.invalidateQueries({ queryKey: ['homepageToggleState'] });
    },
  });
}

export function useGetGoogleLinkState() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['googleLinkState'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.getGoogleLinkState();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useToggleGoogleLinkState() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const newState = await actor.toggleGoogleLinkState();
      return newState;
    },
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['googleLinkState'] });

      // Snapshot the previous value
      const previousState = queryClient.getQueryData<boolean>(['googleLinkState']);

      // Optimistically update to the toggled value (default to false if undefined)
      const currentState = previousState ?? false;
      queryClient.setQueryData<boolean>(['googleLinkState'], !currentState);

      // Return a context object with the snapshotted value
      return { previousState: currentState };
    },
    onSuccess: (newState) => {
      // Update with the actual state from the backend
      queryClient.setQueryData<boolean>(['googleLinkState'], newState);
      toast.success(newState ? 'Google account linked successfully' : 'Google account unlinked successfully');
    },
    onError: (error: Error, _variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousState !== undefined) {
        queryClient.setQueryData<boolean>(['googleLinkState'], context.previousState);
      }
      toast.error(`Failed to update link state: ${error.message}`);
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we're in sync with the server
      queryClient.invalidateQueries({ queryKey: ['googleLinkState'] });
    },
  });
}
