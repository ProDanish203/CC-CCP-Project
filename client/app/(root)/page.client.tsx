"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import {
  createDataEntry,
  getDataEntries,
  updateDataEntry,
  deleteDataEntry,
  type DataEntry,
  type DataEntriesResponse,
} from "@/API/dataEntry.api";
import { SearchBar, Pagination } from "@/components/helpers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IPagination } from "@/types/types";
import { useAuth } from "@/store/AuthProvider";

export const RootPageClient = () => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DataEntry | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["dataEntries", page, search],
    queryFn: () => getDataEntries(page, search),
  });

  const entriesResponse = data?.success
    ? (data.response as DataEntriesResponse)
    : null;
  const entries = entriesResponse?.data || [];
  const pagination: IPagination | null = entriesResponse?.pagination || null;

  const createMutation = useMutation({
    mutationFn: createDataEntry,
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Data entry created successfully");
        queryClient.invalidateQueries({ queryKey: ["dataEntries"] });
        setIsDialogOpen(false);
        resetForm();
      } else {
        toast.error(result.response as string);
      }
    },
    onError: () => {
      toast.error("Failed to create data entry");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, params }: { id: string; params: any }) =>
      updateDataEntry(id, params),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Data entry updated successfully");
        queryClient.invalidateQueries({ queryKey: ["dataEntries"] });
        setIsDialogOpen(false);
        resetForm();
      } else {
        toast.error(result.response as string);
      }
    },
    onError: () => {
      toast.error("Failed to update data entry");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDataEntry,
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Data entry deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["dataEntries"] });
      } else {
        toast.error(result.response as string);
      }
    },
    onError: () => {
      toast.error("Failed to delete data entry");
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      value: "",
      image: null,
    });
    setImagePreview(null);
    setEditingEntry(null);
  };

  const handleOpenDialog = (entry?: DataEntry) => {
    if (entry) {
      setEditingEntry(entry);
      setFormData({
        title: entry.title,
        description: entry.description || "",
        value: entry.value.toString(),
        image: null,
      });
      setImagePreview(entry.image);
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.value || isNaN(Number(formData.value))) {
      toast.error("Value must be a valid number");
      return;
    }

    const params = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      value: Number(formData.value),
      image: formData.image || undefined,
    };

    if (editingEntry) {
      await updateMutation.mutateAsync({ id: editingEntry._id, params });
    } else {
      await createMutation.mutateAsync(params);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const isOwner = (entry: DataEntry) => {
    return user && entry.createdBy._id === user._id;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground dark:text-darkText">
            Data Entries
          </h1>
          <p className="text-muted-foreground mt-1">Manage your data entries</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto max-sm:flex-col">
          <SearchBar />
          <Button
            onClick={() => handleOpenDialog()}
            className="bg-primaryCol text-darkText hover:bg-primaryCol/90 max-sm:w-full"
          >
            <Plus className="size-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
                <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2 mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : entries.length === 0 ? (
        <Card className="p-12 text-center">
          <CardContent>
            <p className="text-muted-foreground text-lg">
              No data entries found. Create your first entry!
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {entries.map((entry) => (
              <Card
                key={entry._id}
                className="bg-card dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-shadow"
              >
                {entry.image && (
                  <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={entry.image}
                      alt={entry.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-foreground dark:text-darkText">
                    {entry.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Value: <span className="font-semibold">{entry.value}</span>
                  </CardDescription>
                </CardHeader>
                {entry.description && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {entry.description}
                    </p>
                  </CardContent>
                )}
                <CardFooter className="flex justify-between items-center pt-2">
                  <div className="text-xs text-muted-foreground">
                    <p>By: {entry.createdBy.name}</p>
                    <p>{new Date(entry.createdAt).toLocaleDateString()}</p>
                  </div>
                  {isOwner(entry) && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(entry)}
                        className="h-8 w-8"
                      >
                        <Edit className="size-4 text-foreground dark:text-darkText" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(entry._id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <Pagination data={pagination} />
          )}
        </>
      )}

      {/* Create/Update Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="bg-background dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <DialogHeader>
            <DialogTitle className="text-foreground dark:text-darkText">
              {editingEntry ? "Update Data Entry" : "Create Data Entry"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {editingEntry
                ? "Update the details of your data entry"
                : "Fill in the details to create a new data entry"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-foreground dark:text-darkText"
                >
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter title"
                  className="bg-background dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-foreground dark:text-darkText"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-foreground dark:text-darkText"
                >
                  Description
                </Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter description"
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-background dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-foreground dark:text-darkText"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="value"
                  className="text-foreground dark:text-darkText"
                >
                  Value <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="value"
                  type="number"
                  step="any"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                  placeholder="Enter value"
                  className="bg-background dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-foreground dark:text-darkText"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="image"
                  className="text-foreground dark:text-darkText"
                >
                  Image
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="bg-background dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-foreground dark:text-darkText"
                  />
                  {imagePreview && (
                    <div className="relative w-20 h-20 rounded-md overflow-hidden border border-neutral-200 dark:border-neutral-700">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 max-sm:w-full">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                className="border-neutral-200 dark:border-neutral-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="bg-primaryCol text-darkText hover:bg-primaryCol/90"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : editingEntry
                  ? "Update"
                  : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
