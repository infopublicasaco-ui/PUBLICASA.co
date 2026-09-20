import { createClient } from "@supabase/supabase-js";

// Cliente con service_role: solo se usa en API routes (Node runtime), nunca
// se expone al cliente. Salta RLS a propósito porque el acceso ya se valida
// con la sesión de NextAuth antes de llamar a esto.
export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export const PROPERTY_PHOTOS_BUCKET = "property-photos";
