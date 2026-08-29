"use client";

import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl border border-indigo-500/20 bg-zinc-950 p-6 shadow-2xl md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Modal Title */}
        <h3 className="text-xl font-bold text-zinc-100 mb-4 pr-6">{title}</h3>

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
