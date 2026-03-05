/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  createPost,
  updatePost,
  toSlug,
  CATEGORY_LABELS,
  type Post,
  type PostCategory,
  type CreatePostInput,
} from "@/lib/supabase/posts";
import ImageUpload from "@/components/admin/ImageUpload";
import {
  Bold, Italic, Heading2, Heading3,
  List, ListOrdered, Quote, Undo, Redo,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────

type FormValues = {
  title: string;
  slug: string;
  excerpt: string;
  category: PostCategory;
  status: "draft" | "published";
  author_name: string;
  read_time_min: number;
  cover_image_id: string | null;
  meta_title: string;
  meta_description: string;
};

// ── Barre d'outils Tiptap ─────────────────────────────────────

function Toolbar({ editor }: { editor: any }) {
  if (!editor) return null;

  const tools = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold"), title: "Gras" },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic"), title: "Italique" },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }), title: "Titre 2" },
    { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }), title: "Titre 3" },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList"), title: "Liste" },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList"), title: "Liste numérotée" },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote"), title: "Citation" },
    { icon: Undo, action: () => editor.chain().focus().undo().run(), active: false, title: "Annuler" },
    { icon: Redo, action: () => editor.chain().focus().redo().run(), active: false, title: "Rétablir" },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-muted/30">
      {tools.map(({ icon: Icon, action, active, title }) => (
        <button
          key={title}
          type="button"
          onClick={action}
          title={title}
          className={`p-1.5 rounded-md transition-colors ${
            active
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
}

// ── Composant principal ────────────────────────────────────────

export default function PostEditor({ post }: { post?: Post }) {
  const router = useRouter();
  const isEditing = !!post;
  const [saving, setSaving] = useState(false);
  const [slugLocked, setSlugLocked] = useState(isEditing);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      excerpt: post?.excerpt ?? "",
      category: post?.category ?? "isolation",
      status: post?.status ?? "draft",
      author_name: post?.author_name ?? "Laura Bornert",
      read_time_min: post?.read_time_min ?? 5,
      cover_image_id: post?.cover_image_id ?? null,
      meta_title: post?.meta_title ?? "",
      meta_description: post?.meta_description ?? "",
    },
  });

  const titleValue = watch("title");

  // Auto-génère le slug depuis le titre si non verrouillé
  useEffect(() => {
    if (!slugLocked && titleValue) {
      setValue("slug", toSlug(titleValue));
    }
  }, [titleValue, slugLocked, setValue]);

  // Éditeur Tiptap
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Rédigez votre article ici…" }),
    ],
    content: post?.content ?? "",
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none p-4 min-h-[400px] focus:outline-none",
      },
    },
  });

  async function onSubmit(values: FormValues, submitStatus?: "draft" | "published") {
    setSaving(true);
    try {
      const payload: CreatePostInput = {
        title: values.title,
        slug: values.slug,
        excerpt: values.excerpt,
        content: editor?.getJSON() ?? {},
        category: values.category,
        status: submitStatus ?? values.status,
        published_at:
          (submitStatus ?? values.status) === "published"
            ? post?.published_at ?? new Date().toISOString()
            : null,
        cover_image_id: values.cover_image_id,
        read_time_min: Number(values.read_time_min),
        author_name: values.author_name,
        meta_title: values.meta_title || null,
        meta_description: values.meta_description || null,
      };

      if (isEditing) {
        await updatePost(post.id, payload);
      } else {
        await createPost(payload);
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err: any) {
      alert("Erreur : " + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit((v) => onSubmit(v))} className="space-y-8">

      {/* ── En-tête avec actions ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? "Modifier l'article" : "Nouvel article"}
          </h1>
        </div>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            disabled={saving}
            onClick={handleSubmit((v) => onSubmit(v, "draft"))}
          >
            Enregistrer brouillon
          </Button>
          <Button
            type="button"
            className="rounded-full"
            disabled={saving}
            onClick={handleSubmit((v) => onSubmit(v, "published"))}
          >
            {saving ? "Enregistrement…" : "Publier"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-start">

        {/* ── Colonne principale ── */}
        <div className="space-y-6">

          {/* Titre */}
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              placeholder="Titre de l'article"
              className={`text-lg h-12 ${errors.title ? "border-destructive" : ""}`}
              {...register("title", { required: "Le titre est requis" })}
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 border border-border rounded-md px-3 bg-muted/30">
                <span className="text-sm text-muted-foreground shrink-0">/blog/</span>
                <input
                  id="slug"
                  className="flex-1 bg-transparent text-sm py-2 focus:outline-none font-mono"
                  disabled={slugLocked}
                  {...register("slug", { required: true })}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="shrink-0"
                onClick={() => setSlugLocked((v) => !v)}
              >
                {slugLocked ? "Modifier" : "Verrouiller"}
              </Button>
            </div>
          </div>

          {/* Extrait */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">
              Extrait *{" "}
              <span className="text-muted-foreground font-normal text-xs">
                ({watch("excerpt")?.length ?? 0}/200 caractères)
              </span>
            </Label>
            <Textarea
              id="excerpt"
              placeholder="Résumé affiché dans les listes d'articles…"
              className={`resize-none ${errors.excerpt ? "border-destructive" : ""}`}
              rows={3}
              {...register("excerpt", {
                required: "L'extrait est requis",
                maxLength: { value: 200, message: "200 caractères maximum" },
              })}
            />
            {errors.excerpt && <p className="text-xs text-destructive">{errors.excerpt.message}</p>}
          </div>

          {/* Éditeur Tiptap */}
          <div className="space-y-2">
            <Label>Contenu *</Label>
            <div className="border border-border rounded-lg overflow-hidden">
              <Toolbar editor={editor} />
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* SEO */}
          <Card className="border-border">
            <CardContent className="pt-5 space-y-4">
              <p className="text-sm font-semibold">SEO</p>
              <div className="space-y-2">
                <Label htmlFor="meta_title" className="text-sm font-normal">
                  Meta title{" "}
                  <span className="text-muted-foreground">(laissez vide pour utiliser le titre)</span>
                </Label>
                <Input id="meta_title" {...register("meta_title")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta_description" className="text-sm font-normal">
                  Meta description{" "}
                  <span className="text-muted-foreground">
                    ({watch("meta_description")?.length ?? 0}/160)
                  </span>
                </Label>
                <Textarea
                  id="meta_description"
                  rows={2}
                  className="resize-none"
                  {...register("meta_description", {
                    maxLength: { value: 160, message: "160 caractères maximum" },
                  })}
                />
                {errors.meta_description && (
                  <p className="text-xs text-destructive">{errors.meta_description.message}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-5">

          {/* Catégorie */}
          <div className="space-y-2">
            <Label>Catégorie *</Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisissez…" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Auteur */}
          <div className="space-y-2">
            <Label htmlFor="author_name">Auteur</Label>
            <Input id="author_name" {...register("author_name")} />
          </div>

          {/* Temps de lecture */}
          <div className="space-y-2">
            <Label htmlFor="read_time_min">Temps de lecture (min)</Label>
            <Input
              id="read_time_min"
              type="number"
              min={1}
              max={60}
              {...register("read_time_min", { valueAsNumber: true })}
            />
          </div>

          {/* Image de couverture */}
          <div className="space-y-2">
            <Label>Image de couverture</Label>
            <Controller
              name="cover_image_id"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </div>
    </form>
  );
}