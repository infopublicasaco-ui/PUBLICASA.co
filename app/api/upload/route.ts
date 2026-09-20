import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { auth } from "@/lib/auth";
import { getSupabaseAdmin, PROPERTY_PHOTOS_BUCKET } from "@/lib/supabase/server";

// Vercel limita el body de las funciones serverless a ~4.5MB, así que el
// límite real de subida es ese, no los 10MB que sí permite el bucket.
const MAX_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Debes iniciar sesión." }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No se recibió ninguna imagen." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Solo se permiten imágenes JPG, PNG o WEBP." },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "La imagen supera el tamaño máximo de 4MB." },
      { status: 400 }
    );
  }

  const extension = EXTENSION_BY_TYPE[file.type];
  const path = `${session.user.id}/${randomUUID()}.${extension}`;

  const supabase = getSupabaseAdmin();
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(PROPERTY_PHOTOS_BUCKET)
    .upload(path, buffer, { contentType: file.type });

  if (error) {
    console.error("Error subiendo a Supabase Storage:", error);
    return NextResponse.json({ error: "No se pudo subir la imagen." }, { status: 500 });
  }

  const { data } = supabase.storage.from(PROPERTY_PHOTOS_BUCKET).getPublicUrl(path);

  return NextResponse.json({ url: data.publicUrl });
}
