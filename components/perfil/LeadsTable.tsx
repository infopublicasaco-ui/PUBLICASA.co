"use client";

import { useState } from "react";
import { ContactRequestStatus } from "@prisma/client";
import { formatCOP } from "@/lib/format";

export interface Lead {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  estado: ContactRequestStatus;
  leida: boolean;
  createdAt: Date;
  property: {
    id: string;
    titulo: string;
  };
}

const STATUS_LABELS: Record<ContactRequestStatus, { label: string; color: string }> = {
  NUEVO: { label: "Nuevo", color: "bg-blue-100 text-blue-800" },
  CONTACTADO: { label: "Contactado", color: "bg-purple-100 text-purple-800" },
  EN_NEGOCIACION: { label: "En negociación", color: "bg-orange-100 text-orange-800" },
  CERRADO: { label: "Cerrado", color: "bg-green-100 text-green-800" },
  DESCARTADO: { label: "Descartado", color: "bg-gray-100 text-gray-800" },
};

export function LeadsTable({ leads: initialLeads }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (leadId: string, newStatus: ContactRequestStatus) => {
    setUpdating(leadId);
    setError(null);

    try {
      const res = await fetch("/api/contacto", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: newStatus }),
        credentials: "include",
      });

      // Nota: El endpoint espera ?id=... pero vamos a ajustar
      const resWithId = await fetch(`/api/contacto?id=${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: newStatus }),
        credentials: "include",
      });

      if (!resWithId.ok) {
        throw new Error("No se pudo actualizar el estado");
      }

      setLeads(leads.map((l) => (l.id === leadId ? { ...l, estado: newStatus, leida: true } : l)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setUpdating(null);
    }
  };

  if (leads.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No tienes contactos aún</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nombre</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Contacto</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Propiedad</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Estado</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Fecha</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className={`hover:bg-gray-50 ${!lead.leida ? "bg-blue-50" : ""}`}
            >
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium text-gray-900">{lead.nombre}</p>
                  {!lead.leida && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-200 text-blue-800 rounded">
                      Nuevo
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                <p>{lead.email}</p>
                <p>{lead.telefono}</p>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{lead.property.titulo}</td>
              <td className="px-4 py-3">
                <select
                  value={lead.estado}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value as ContactRequestStatus)}
                  disabled={updating === lead.id}
                  className={`text-xs font-medium px-2 py-1 rounded cursor-pointer border-0 ${
                    STATUS_LABELS[lead.estado].color
                  } ${updating === lead.id ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {Object.entries(STATUS_LABELS).map(([value, { label }]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {new Date(lead.createdAt).toLocaleDateString("es-CO")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
