/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { uploadMedia, deleteMedia, type Media } from "@/lib/supabase/posts";
import { Button } from "@/components/ui/button";
import { Trash2, Upload, Copy, Check, Loader2, ImagePlus } from "lucide-react";
import Image from "next/image";

export default function MediaLibrary({ initialMedia }: { initialMedia: Media[] }) {
  const [media, setMedia] = useState<Media[]>(initialMedia);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [altText, setAltText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploaded = await uploadMedia(file, altText || file.name);
      setMedia((prev) => [uploaded, ...prev]);
      setAltText("");
      if (inputRef.current) inputRef.current.value = "";
    } catch (err: any) {
      alert("Erreur upload : " + err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(item: Media) {
    if (!confirm(`Supprimer "${item.filename}" ? Cette action est irréversible.`)) return;
    setDeletingId(item.id);
    try {
      await deleteMedia(item);
      setMedia((prev) => prev.filter((m) => m.id !== item.id));
    } catch (err: any) {
      alert("Erreur suppression : " + err.message);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleCopy(item: Media) {
    await navigator.clipboard.writeText(item.public_url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
    return `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
  }

  return (
    <div className="space-y-6">

      {/* ── Zone d'upload ── */}
      <div className="border border-dashed border-border rounded-2xl p-6 bg-muted/20 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <input
            type="text"
            placeholder="Texte alternatif (accessibilité & SEO)"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="flex-1 h-10 px-3 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <Button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-full gap-2 shrink-0"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Upload en cours…
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Ajouter une image
              </>
            )}
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Formats acceptés : JPG, PNG, WebP, AVIF · Taille max : 5 Mo
        </p>
      </div>

      {/* ── Grille de médias ── */}
      {media.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-2xl">
          <ImagePlus className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Aucun média pour l&apos;instant.</p>
          <p className="text-sm mt-1">Uploadez votre première image ci-dessus.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group relative border border-border rounded-xl overflow-hidden bg-muted/30 hover:shadow-lg transition-all duration-200"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden bg-muted">
                <Image
                  src={item.public_url}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={800}
                  height={800}
                />
              </div>

              {/* Actions au hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleCopy(item)}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
                  title="Copier l'URL"
                >
                  {copiedId === item.id
                    ? <Check className="w-4 h-4" />
                    : <Copy className="w-4 h-4" />
                  }
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  disabled={deletingId === item.id}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-red-500/80 text-white flex items-center justify-center transition-colors"
                  title="Supprimer"
                >
                  {deletingId === item.id
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <Trash2 className="w-4 h-4" />
                  }
                </button>
              </div>

              {/* Infos */}
              <div className="p-2 border-t border-border">
                <p className="text-xs font-medium text-foreground truncate" title={item.filename}>
                  {item.filename}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatSize(item.size_bytes ?? 0)}
                  {item.width && item.height && (
                    <span> · {item.width}×{item.height}</span>
                  )}
                </p>
                {item.alt && (
                  <p className="text-xs text-muted-foreground truncate italic mt-0.5" title={item.alt}>
                    {item.alt}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}