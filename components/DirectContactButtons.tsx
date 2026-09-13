"use client";

import { useEffect, useState } from "react";

interface DirectContactButtonsProps {
  nombre: string;
  whatsapp?: string;
  telefono?: string;
}

export function DirectContactButtons({ nombre, whatsapp, telefono }: DirectContactButtonsProps) {
  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    const checkFormCompletion = () => {
      const nombreInput = document.querySelector('input[placeholder="Nombre y Apellido*"]') as HTMLInputElement;
      const emailInput = document.querySelector('input[placeholder="Email*"]') as HTMLInputElement;
      const telefonoInput = document.querySelector('input[placeholder="Teléfono*"]') as HTMLInputElement;
      const checkboxInput = document.querySelector('input[type="checkbox"]') as HTMLInputElement;

      const isComplete = !!(
        nombreInput?.value &&
        emailInput?.value &&
        telefonoInput?.value &&
        checkboxInput?.checked
      );

      setIsFormComplete(isComplete);
    };

    // Check on mount
    checkFormCompletion();

    // Listen for changes
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener("input", checkFormCompletion);
      form.addEventListener("change", checkFormCompletion);

      return () => {
        form.removeEventListener("input", checkFormCompletion);
        form.removeEventListener("change", checkFormCompletion);
      };
    }
  }, []);

  const handleContactClick = (type: "whatsapp" | "phone") => {
    if (!isFormComplete) {
      alert("Por favor completa el formulario de contacto primero");
      return;
    }

    if (type === "whatsapp" && whatsapp) {
      window.open(`https://wa.me/57${whatsapp.replace(/\D/g, "")}`, "_blank");
    } else if (type === "phone" && telefono) {
      window.location.href = `tel:${telefono}`;
    }
  };

  return (
    <div className="flex gap-2">
      {whatsapp && (
        <button
          onClick={() => handleContactClick("whatsapp")}
          disabled={!isFormComplete}
          className={`flex-1 rounded-lg px-3 py-2 text-center text-sm font-medium text-white flex items-center justify-center gap-1.5 transition-opacity ${
            isFormComplete
              ? "bg-green-600 hover:bg-green-700 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed opacity-50"
          }`}
        >
          <span>💬</span> WhatsApp
        </button>
      )}
      {telefono && (
        <button
          onClick={() => handleContactClick("phone")}
          disabled={!isFormComplete}
          className={`flex-1 rounded-lg px-3 py-2 text-center text-sm font-medium flex items-center justify-center gap-1.5 transition-opacity ${
            isFormComplete
              ? "border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
              : "border border-gray-300 text-gray-400 cursor-not-allowed opacity-50"
          }`}
        >
          <span>📞</span> Llamar
        </button>
      )}
    </div>
  );
}
