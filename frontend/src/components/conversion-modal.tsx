"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";

interface ConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  title?: string;
  documentType?: string;
}

export default function ConversionModal({
  isOpen,
  onClose,
  onDownload,
  title = "Your document is ready!",
  documentType = "documents",
}: ConversionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#141414] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 mb-4 font-bold text-xl">
                ✦
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
              <p className="text-gray-400 text-sm">
                Get a free AddInvoices account to:
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                `Save this and all future ${documentType}`,
                "Send directly to clients by email",
                "Track payment status automatically",
                "Remove the AddInvoices watermark",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-left">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <a
                href="https://app.addinvoicesai.com/register"
                className="block w-full py-4 btn-ad-primary rounded-xl font-bold text-center shadow-lg transition-all hover:-translate-y-0.5"
              >
                Create free account
              </a>
              <button
                onClick={() => {
                  onDownload();
                  onClose();
                }}
                className="block w-full text-center text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                or <span className="underline underline-offset-4 decoration-gray-700">Download with watermark</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
