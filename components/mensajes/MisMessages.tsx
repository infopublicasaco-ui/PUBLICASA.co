"use client";

import { useState, useRef, useEffect } from "react";
import type { User, Message, Property } from "@prisma/client";

interface MessageWithRelations extends Message {
  remitente: User;
  destinatario: User;
  property: Property | null;
}

export function MisMessages({
  currentUser,
  conversations,
  initialMessages,
}: {
  currentUser: User;
  conversations: User[];
  initialMessages: MessageWithRelations[];
}) {
  const [selectedUser, setSelectedUser] = useState<User | null>(conversations[0] || null);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const currentMessages = selectedUser
    ? messages.filter(
        (m) =>
          (m.remitente_id === currentUser.id && m.destinatario_id === selectedUser.id) ||
          (m.remitente_id === selectedUser.id && m.destinatario_id === currentUser.id)
      )
    : [];

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    setSending(true);
    try {
      const res = await fetch("/api/mensajes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contenido: newMessage,
          destinatario_id: selectedUser.id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessages([...messages, data]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Columna 1: Conversaciones */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-lg font-bold text-gray-900">Mis Mensajes</h2>
          <p className="text-xs text-gray-500 mt-1">{conversations.length} conversaciones</p>
        </div>

        <div className="divide-y divide-gray-100">
          {conversations.map((user) => {
            const lastMsg = messages
              .filter(
                (m) =>
                  (m.remitente_id === currentUser.id && m.destinatario_id === user.id) ||
                  (m.remitente_id === user.id && m.destinatario_id === currentUser.id)
              )
              .pop();

            return (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition ${
                  selectedUser?.id === user.id ? "bg-brand-green/10" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-gray-900 text-sm">{user.nombre}</p>
                  {!lastMsg?.leido && lastMsg?.destinatario_id === currentUser.id && (
                    <span className="w-2 h-2 bg-brand-green rounded-full"></span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {lastMsg?.contenido || "Sin mensajes"}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Columna 2: Chat */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedUser ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-brand-green to-emerald-600 text-white">
              <h3 className="font-bold">{selectedUser.nombre}</h3>
              <p className="text-xs opacity-90">+{selectedUser.telefono}</p>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p className="text-sm">Inicia una conversación</p>
                </div>
              ) : (
                currentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.remitente_id === currentUser.id ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.remitente_id === currentUser.id
                          ? "bg-brand-green text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{msg.contenido}</p>
                      <p className={`text-xs mt-1 ${
                        msg.remitente_id === currentUser.id ? "opacity-75" : "text-gray-500"
                      }`}>
                        {new Date(msg.createdAt).toLocaleTimeString("es-CO", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={sending || !newMessage.trim()}
                  className="bg-brand-green text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 text-sm"
                >
                  Enviar
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Selecciona una conversación</p>
          </div>
        )}
      </div>

      {/* Columna 3: Detalles (opcional - puede ser info del inmueble) */}
      <div className="w-64 bg-gray-50 border-l border-gray-200 p-4 hidden lg:block overflow-y-auto">
        <h4 className="font-bold text-gray-900 mb-4">Información</h4>
        {selectedUser && (
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-600">Nombre</p>
              <p className="font-semibold text-gray-900">{selectedUser.nombre}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold text-gray-900 break-all">{selectedUser.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Teléfono</p>
              <p className="font-semibold text-gray-900">+{selectedUser.telefono}</p>
            </div>
            <div>
              <p className="text-gray-600">Rol</p>
              <p className="font-semibold text-gray-900">{selectedUser.rol}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
