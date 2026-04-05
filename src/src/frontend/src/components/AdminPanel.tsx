import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Project } from "../backend";
import {
  useCreateProject,
  useDeleteProject,
  useGetAllProjects,
  useGetSubmissions,
  useUpdateProject,
} from "../hooks/useQueries";
import { useStorageUpload } from "../hooks/useStorageUpload";

interface AdminPanelProps {
  onClose: () => void;
}

const CATEGORIES = ["Residential buildings", "Interior", "Public", "Villas"];

interface ProjectFormData {
  title: string;
  category: string;
  year: string;
  concept: string;
  process: string;
  coverImageFile: File | null;
  galleryImageFiles: File[];
  existingCoverImageId: string;
  existingGalleryImageIds: string[];
}

const emptyForm = (): ProjectFormData => ({
  title: "",
  category: CATEGORIES[0],
  year: new Date().getFullYear().toString(),
  concept: "",
  process: "",
  coverImageFile: null,
  galleryImageFiles: [],
  existingCoverImageId: "",
  existingGalleryImageIds: [],
});

function ProjectFormDialog({
  open,
  onOpenChange,
  editingProject,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProject: Project | null;
}) {
  const [form, setForm] = useState<ProjectFormData>(() =>
    editingProject
      ? {
          title: editingProject.title,
          category: editingProject.category,
          year: editingProject.year,
          concept: editingProject.concept,
          process: editingProject.process,
          coverImageFile: null,
          galleryImageFiles: [],
          existingCoverImageId: editingProject.coverImageId,
          existingGalleryImageIds: editingProject.galleryImageIds,
        }
      : emptyForm(),
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const { uploadFile } = useStorageUpload();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      setForm(
        editingProject
          ? {
              title: editingProject.title,
              category: editingProject.category,
              year: editingProject.year,
              concept: editingProject.concept,
              process: editingProject.process,
              coverImageFile: null,
              galleryImageFiles: [],
              existingCoverImageId: editingProject.coverImageId,
              existingGalleryImageIds: editingProject.galleryImageIds,
            }
          : emptyForm(),
      );
      setUploadProgress(0);
    }
    onOpenChange(val);
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!form.category) {
      toast.error("Category is required");
      return;
    }

    const needsCover = !form.existingCoverImageId && !form.coverImageFile;
    if (needsCover) {
      toast.error("Cover image is required");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      let coverImageId = form.existingCoverImageId;
      if (form.coverImageFile) {
        setUploadProgress(5);
        coverImageId = await uploadFile(form.coverImageFile, (pct) => {
          setUploadProgress(Math.round(pct * 0.5));
        });
      }

      let galleryImageIds = [...form.existingGalleryImageIds];
      if (form.galleryImageFiles.length > 0) {
        const newGalleryUrls: string[] = [];
        for (let i = 0; i < form.galleryImageFiles.length; i++) {
          const url = await uploadFile(form.galleryImageFiles[i], (pct) => {
            const base = 50 + (i / form.galleryImageFiles.length) * 45;
            setUploadProgress(
              Math.round(base + (pct * 45) / form.galleryImageFiles.length),
            );
          });
          newGalleryUrls.push(url);
        }
        galleryImageIds = [...galleryImageIds, ...newGalleryUrls];
      }

      setUploadProgress(95);

      if (editingProject) {
        await updateProject.mutateAsync({
          id: editingProject.id,
          title: form.title,
          category: form.category,
          year: form.year,
          concept: form.concept,
          process: form.process,
          coverImageId,
          galleryImageIds,
        });
        toast.success("Project updated");
      } else {
        await createProject.mutateAsync({
          title: form.title,
          category: form.category,
          year: form.year,
          concept: form.concept,
          process: form.process,
          coverImageId,
          galleryImageIds,
        });
        toast.success("Project created");
      }

      setUploadProgress(100);
      handleOpenChange(false);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save project",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="bg-white border-stone-200 text-stone-900 max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        data-ocid="admin.project.dialog"
      >
        <DialogHeader className="border-b border-stone-200 pb-4">
          <DialogTitle className="font-serif text-xl text-stone-900">
            {editingProject ? "Edit Project" : "Add Project"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label className="text-stone-700 text-xs tracking-widest uppercase font-semibold">
              Title *
            </Label>
            <Input
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="Project title"
              className="bg-white border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-600 focus-visible:ring-0"
              data-ocid="admin.project.input"
            />
          </div>

          {/* Category + Year row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-stone-700 text-xs tracking-widest uppercase font-semibold">
                Category *
              </Label>
              <Select
                value={form.category}
                onValueChange={(val) =>
                  setForm((f) => ({ ...f, category: val }))
                }
              >
                <SelectTrigger
                  className="bg-white border-stone-300 text-stone-900 focus:ring-0 focus:border-stone-600"
                  data-ocid="admin.project.select"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white border-stone-200">
                  {CATEGORIES.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="text-stone-900 focus:bg-stone-100 focus:text-stone-900 cursor-pointer"
                    >
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-stone-700 text-xs tracking-widest uppercase font-semibold">
                Year
              </Label>
              <Input
                value={form.year}
                onChange={(e) =>
                  setForm((f) => ({ ...f, year: e.target.value }))
                }
                placeholder="2024"
                className="bg-white border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-600 focus-visible:ring-0"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="space-y-1.5">
            <Label className="text-stone-700 text-xs tracking-widest uppercase font-semibold">
              Cover Image {!editingProject && "*"}
            </Label>
            {form.existingCoverImageId && !form.coverImageFile && (
              <div className="relative w-24 h-16 rounded overflow-hidden mb-2">
                <img
                  src={form.existingCoverImageId}
                  alt="Current cover"
                  className="w-full h-full object-cover"
                />
                <p className="text-stone-500 text-xs mt-1">
                  Current cover (upload to replace)
                </p>
              </div>
            )}
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setForm((f) => ({ ...f, coverImageFile: file }));
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => coverInputRef.current?.click()}
              className="border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100 hover:text-stone-900 hover:border-stone-400"
              data-ocid="admin.project.upload_button"
            >
              {form.coverImageFile
                ? form.coverImageFile.name
                : "Choose cover image"}
            </Button>
          </div>

          {/* Gallery Images */}
          <div className="space-y-1.5">
            <Label className="text-stone-700 text-xs tracking-widest uppercase font-semibold">
              Gallery Images
            </Label>
            {form.existingGalleryImageIds.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-2">
                {form.existingGalleryImageIds.map((url, i) => (
                  <div key={url} className="relative">
                    <img
                      src={url}
                      alt={`Gallery ${i + 1}`}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          existingGalleryImageIds:
                            f.existingGalleryImageIds.filter((_, j) => j !== i),
                        }))
                      }
                      className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center"
                    >
                      <X size={10} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                setForm((f) => ({
                  ...f,
                  galleryImageFiles: [...f.galleryImageFiles, ...files],
                }));
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => galleryInputRef.current?.click()}
              className="border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100 hover:text-stone-900 hover:border-stone-400"
              data-ocid="admin.project.upload_button"
            >
              Add gallery images
            </Button>
            {form.galleryImageFiles.length > 0 && (
              <p className="text-stone-500 text-xs">
                {form.galleryImageFiles.length} new file(s) selected
              </p>
            )}
          </div>

          {/* Concept */}
          <div className="space-y-1.5">
            <Label className="text-stone-700 text-xs tracking-widest uppercase font-semibold">
              Concept
            </Label>
            <Textarea
              value={form.concept}
              onChange={(e) =>
                setForm((f) => ({ ...f, concept: e.target.value }))
              }
              placeholder="Describe the design concept..."
              rows={4}
              className="bg-white border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-600 focus-visible:ring-0 resize-none"
              data-ocid="admin.project.textarea"
            />
          </div>

          {/* Process */}
          <div className="space-y-1.5">
            <Label className="text-stone-700 text-xs tracking-widest uppercase font-semibold">
              Process
            </Label>
            <Textarea
              value={form.process}
              onChange={(e) =>
                setForm((f) => ({ ...f, process: e.target.value }))
              }
              placeholder="Describe the design process..."
              rows={4}
              className="bg-white border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-600 focus-visible:ring-0 resize-none"
            />
          </div>

          {/* Upload progress */}
          {isSubmitting && (
            <div className="space-y-2" data-ocid="admin.project.loading_state">
              <div className="flex items-center justify-between">
                <p className="text-stone-600 text-xs tracking-widest uppercase">
                  Uploading...
                </p>
                <p className="text-stone-600 text-xs">{uploadProgress}%</p>
              </div>
              <Progress
                value={uploadProgress}
                className="h-1.5 bg-stone-200 [&>div]:bg-stone-900"
              />
            </div>
          )}
        </div>

        <DialogFooter className="gap-3 border-t border-stone-200 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleOpenChange(false)}
            disabled={isSubmitting}
            className="text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200"
            data-ocid="admin.project.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-stone-900 text-white hover:bg-stone-700 font-semibold"
            data-ocid="admin.project.submit_button"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : editingProject ? (
              "Save Changes"
            ) : (
              "Create Project"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const {
    data: submissions,
    isLoading: submissionsLoading,
    isError: submissionsError,
  } = useGetSubmissions();
  const { data: projects, isLoading: projectsLoading } = useGetAllProjects();
  const deleteProject = useDeleteProject();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<bigint | null>(null);

  const handleAddProject = () => {
    setEditingProject(null);
    setDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId === null) return;
    try {
      await deleteProject.mutateAsync(deleteTargetId);
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setDeleteTargetId(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-stone-950 backdrop-blur-md flex flex-col"
      data-ocid="admin.panel"
    >
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/20">
        <div>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/50 mb-1">
            Admin
          </p>
          <h1 className="font-serif text-xl md:text-2xl text-white tracking-wide">
            Dashboard
          </h1>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors p-2"
          aria-label="Close admin panel"
          data-ocid="admin.close_button"
        >
          <X size={20} />
        </button>
      </header>

      {/* Tabs */}
      <div className="flex-1 overflow-hidden px-4 md:px-8 py-6">
        <Tabs defaultValue="projects" className="h-full flex flex-col">
          <TabsList
            className="bg-white/10 border border-white/20 mb-6 w-fit"
            data-ocid="admin.tab"
          >
            <TabsTrigger
              value="projects"
              className="font-sans text-xs tracking-widest uppercase text-white/60 data-[state=active]:bg-white data-[state=active]:text-stone-950 data-[state=active]:font-semibold"
              data-ocid="admin.tab"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="font-sans text-xs tracking-widest uppercase text-white/60 data-[state=active]:bg-white data-[state=active]:text-stone-950 data-[state=active]:font-semibold"
              data-ocid="admin.tab"
            >
              Submissions
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="flex-1 overflow-hidden mt-0">
            <div className="flex items-center justify-between mb-5">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/50">
                {projects?.length ?? 0} project(s)
              </p>
              <Button
                type="button"
                size="sm"
                onClick={handleAddProject}
                className="bg-white text-stone-950 hover:bg-stone-100 font-semibold gap-2"
                data-ocid="admin.project.primary_button"
              >
                <Plus size={14} />
                Add Project
              </Button>
            </div>

            {projectsLoading && (
              <div
                className="flex items-center justify-center py-20 gap-3 text-white/50"
                data-ocid="admin.project.loading_state"
              >
                <Loader2 size={18} className="animate-spin" />
                <span className="font-sans text-sm tracking-widest uppercase">
                  Loading...
                </span>
              </div>
            )}

            {!projectsLoading && (!projects || projects.length === 0) && (
              <div
                className="flex flex-col items-center justify-center py-20 gap-3"
                data-ocid="admin.project.empty_state"
              >
                <p className="font-sans text-sm tracking-[0.2em] uppercase text-white/50">
                  No projects yet
                </p>
                <p className="font-sans text-xs text-white/30">
                  Click "Add Project" to create your first project.
                </p>
              </div>
            )}

            {!projectsLoading && projects && projects.length > 0 && (
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="space-y-px" data-ocid="admin.project.list">
                  {projects.map((project, i) => (
                    <div
                      key={project.id.toString()}
                      className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 transition-colors group rounded"
                      data-ocid={`admin.project.item.${i + 1}`}
                    >
                      {project.coverImageId ? (
                        <img
                          src={project.coverImageId}
                          alt={project.title}
                          className="w-16 h-12 object-cover rounded flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-12 bg-white/10 rounded flex-shrink-0" />
                      )}

                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-white text-base truncate">
                          {project.title}
                        </p>
                        <p className="font-sans text-xs text-white/50 tracking-wide">
                          {project.category} · {project.year}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => handleEditProject(project)}
                          className="p-2 text-white/60 hover:text-white transition-colors"
                          aria-label="Edit project"
                          data-ocid={`admin.project.edit_button.${i + 1}`}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTargetId(project.id)}
                          className="p-2 text-white/60 hover:text-red-400 transition-colors"
                          aria-label="Delete project"
                          data-ocid={`admin.project.delete_button.${i + 1}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent
            value="submissions"
            className="flex-1 overflow-hidden mt-0"
          >
            {submissionsLoading && (
              <div
                className="flex items-center justify-center h-full gap-3 text-white/50"
                data-ocid="admin.loading_state"
              >
                <Loader2 size={20} className="animate-spin" />
                <span className="font-sans text-sm tracking-widest uppercase">
                  Loading...
                </span>
              </div>
            )}

            {submissionsError && (
              <div
                className="flex items-center justify-center h-full"
                data-ocid="admin.error_state"
              >
                <p className="font-sans text-sm text-red-400 tracking-wide">
                  Failed to load submissions. You may not have admin access.
                </p>
              </div>
            )}

            {!submissionsLoading &&
              !submissionsError &&
              submissions &&
              submissions.length === 0 && (
                <div
                  className="flex flex-col items-center justify-center h-full gap-4"
                  data-ocid="admin.empty_state"
                >
                  <p className="font-sans text-sm tracking-[0.2em] uppercase text-white/50">
                    No submissions yet
                  </p>
                </div>
              )}

            {!submissionsLoading &&
              !submissionsError &&
              submissions &&
              submissions.length > 0 && (
                <ScrollArea className="h-full">
                  <div className="overflow-x-auto" data-ocid="admin.table">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/20 hover:bg-transparent">
                          <TableHead className="font-sans text-xs tracking-[0.2em] uppercase text-white/60 w-[60px]">
                            #
                          </TableHead>
                          <TableHead className="font-sans text-xs tracking-[0.2em] uppercase text-white/60">
                            Name
                          </TableHead>
                          <TableHead className="font-sans text-xs tracking-[0.2em] uppercase text-white/60">
                            Email
                          </TableHead>
                          <TableHead className="font-sans text-xs tracking-[0.2em] uppercase text-white/60">
                            Phone
                          </TableHead>
                          <TableHead className="font-sans text-xs tracking-[0.2em] uppercase text-white/60">
                            Message
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {submissions.map((sub, i) => (
                          <TableRow
                            key={sub.id.toString()}
                            className="border-white/10 hover:bg-white/5"
                            data-ocid={`admin.row.item.${i + 1}`}
                          >
                            <TableCell className="font-sans text-xs text-white/50">
                              {i + 1}
                            </TableCell>
                            <TableCell className="font-sans text-sm text-white font-medium">
                              {sub.name}
                            </TableCell>
                            <TableCell className="font-sans text-sm text-white/70">
                              <a
                                href={`mailto:${sub.email}`}
                                className="hover:text-white transition-colors"
                              >
                                {sub.email}
                              </a>
                            </TableCell>
                            <TableCell className="font-sans text-sm text-white/70">
                              {sub.phone || "—"}
                            </TableCell>
                            <TableCell className="font-sans text-sm text-white/70 max-w-xs">
                              <p className="line-clamp-2">{sub.message}</p>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
              )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Project form dialog */}
      <ProjectFormDialog
        open={dialogOpen}
        onOpenChange={(val) => {
          setDialogOpen(val);
          if (!val) setEditingProject(null);
        }}
        editingProject={editingProject}
      />

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={deleteTargetId !== null}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
      >
        <AlertDialogContent
          className="bg-white border-stone-200 text-stone-900 shadow-2xl"
          data-ocid="admin.project.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-stone-900 text-lg">
              Delete Project
            </AlertDialogTitle>
            <AlertDialogDescription className="text-stone-600">
              Are you sure you want to delete this project? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200 hover:text-stone-900"
              data-ocid="admin.project.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white border-0"
              data-ocid="admin.project.delete_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
