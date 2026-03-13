/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { uploadMedia, type Media } from "@/lib/supabase/posts";
import { supabase } from "@/lib/supabase/client"
import { ImagePlus, X, Loader2 } from "lucide-react";
import Image from "next/image";

export default function ImageUpload({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (id: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<Media | null>(null);
  const [uploading, setUploading] = useState(false);
  const [altText, setAltText] = useState("");

  // Charge le média existant si on édite un article
  useEffect(() => {
    if (!value) return;
    supabase
      .from("mr_media")
      .select("*")
      .eq("id", value)
      .single()
      .then(({ data }) => {
        if (data) setMedia(data as Media);
      });
  }, [value]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploaded = await uploadMedia(file, altText || file.name);
      setMedia(uploaded);
      onChange(uploaded.id);
    } catch (err: any) {
      alert("Erreur lors de l'upload : " + err.message);
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    setMedia(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  if (media) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-border group">
        <Image
          src={media.public_url}
          alt={media.alt}
          className="w-full aspect-video object-cover"
          width={800}
          height={800}
        />
        <button
          type="button"
          onClick={handleRemove}
          className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        <div className="px-3 py-2 bg-muted/50 border-t border-border">
          <p className="text-xs text-muted-foreground truncate">{media.filename}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Texte alternatif (accessibilité)"
        value={altText}
        onChange={(e) => setAltText(e.target.value)}
        className="w-full text-sm border border-border rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="w-full aspect-video rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground"
      >
        {uploading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm">Upload en cours…</span>
          </>
        ) : (
          <>
            <ImagePlus className="w-6 h-6" />
            <span className="text-sm">Cliquer pour choisir une image</span>
            <span className="text-xs opacity-70">JPG, PNG, WebP · Max 5 Mo</span>
          </>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}