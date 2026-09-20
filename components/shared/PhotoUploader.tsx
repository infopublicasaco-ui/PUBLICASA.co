"use client";

import { useRef, useState } from "react";

type PhotoUploaderProps = {
  photos: string[];
  onChange: (photos: string[]) => void;
};

const MAX_SIZE_MB = 4;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function PhotoUploader({ photos, onChange }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dragIndexRef = useRef<number | null>(null);
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function uploadFiles(files: FileList | File[]) {
    setError(null);

    const validFiles = Array.from(files).filter((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Solo se permiten imágenes JPG, PNG o WEBP.");
        return false;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`Cada imagen debe pesar menos de ${MAX_SIZE_MB}MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setUploadingCount((c) => c + validFiles.length);

    const uploaded: string[] = [];
    for (const file of validFiles) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "No se pudo subir la imagen.");
        uploaded.push(data.url as string);
      } catch (err) {
        setError(err instanceof Error ? err.message : "No se pudo subir una imagen.");
      } finally {
        setUploadingCount((c) => c - 1);
      }
    }

    if (uploaded.length > 0) {
      onChange([...photos, ...uploaded]);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDraggingFiles(false);
    if (e.dataTransfer.files?.length) {
      uploadFiles(e.dataTransfer.files);
    }
  }

  function removePhoto(index: number) {
    onChange(photos.filter((_, i) => i !== index));
  }

  function handleThumbDrop(dropIndex: number) {
    const from = dragIndexRef.current;
    dragIndexRef.current = null;
    if (from === null || from === dropIndex) return;
    const next = [...photos];
    const [moved] = next.splice(from, 1);
    next.splice(dropIndex, 0, moved);
    onChange(next);
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingFiles(true);
        }}
        onDragLeave={() => setIsDraggingFiles(false)}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors ${
          isDraggingFiles
            ? "border-brand-blue bg-blue-50"
            : "border-gray-300 hover:border-brand-blue"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) uploadFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <p className="text-sm font-medium text-gray-700">
          Arrastra tus fotos aquí, o haz clic para seleccionarlas
        </p>
        <p className="mt-1 text-xs text-gray-500">
          JPG, PNG o WEBP, máximo {MAX_SIZE_MB}MB por foto
        </p>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {(photos.length > 0 || uploadingCount > 0) && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {photos.map((url, index) => (
            <div
              key={url + index}
              draggable
              onDragStart={() => (dragIndexRef.current = index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleThumbDrop(index)}
              className="group relative aspect-square cursor-move overflow-hidden rounded-lg border border-gray-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              {index === 0 && (
                <span className="absolute left-1 top-1 rounded bg-brand-green px-1.5 py-0.5 text-[10px] font-bold text-white">
                  Portada
                </span>
              )}
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Eliminar foto"
              >
                ×
              </button>
            </div>
          ))}
          {Array.from({ length: uploadingCount }).map((_, i) => (
            <div
              key={`uploading-${i}`}
              className="flex aspect-square animate-pulse items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-xs text-gray-400"
            >
              Subiendo...
            </div>
          ))}
        </div>
      )}

      {photos.length > 1 && (
        <p className="mt-2 text-xs text-gray-500">
          Arrastra las fotos para reordenarlas. La primera es la portada.
        </p>
      )}
    </div>
  );
}
