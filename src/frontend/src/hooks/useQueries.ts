import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Project } from "../backend";
import { createActorWithConfig } from "../config";
import { useActor } from "./useActor";

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      // Use existing actor or create an anonymous one on-demand
      const resolvedActor = actor ?? (await createActorWithConfig());
      await resolvedActor.submitForm(name, email, phone, message);
    },
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      category: string;
      year: string;
      concept: string;
      process: string;
      coverImageId: string;
      galleryImageIds: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.createProject(
        data.title,
        data.category,
        data.year,
        data.concept,
        data.process,
        data.coverImageId,
        data.galleryImageIds,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      category: string;
      year: string;
      concept: string;
      process: string;
      coverImageId: string;
      galleryImageIds: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.updateProject(
        data.id,
        data.title,
        data.category,
        data.year,
        data.concept,
        data.process,
        data.coverImageId,
        data.galleryImageIds,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      await actor.deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
