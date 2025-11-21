"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const emailSchema = z.object({
  email: z.string().email("Por favor ingresa un email válido"),
});

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSuccess(false);

    // Validación en el cliente
    const validation = emailSchema.safeParse({ email });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al procesar tu solicitud");
      }

      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al procesar tu solicitud"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-4">
            AddInvoices
          </h2>
          <p className="text-lg text-ad-secondary mb-8 max-w-2xl mx-auto">
            Be the first to know when we launch, get early access to discounts,
            new features and exclusive offers for AddInvoices.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                    setIsSuccess(false);
                  }}
                  className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-ad-primary focus-visible:ring-ad-primary/50"
                  disabled={isLoading || isSuccess}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || isSuccess}
                className="btn-ad-primary h-12 px-8 font-bold shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    ¡Listo!
                  </>
                ) : (
                  "Unirse"
                )}
              </Button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 text-red-400 text-sm justify-center"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </motion.div>
            )}

            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 text-green-400 text-sm justify-center"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  ¡Gracias! Te hemos enviado un correo de confirmación.
                </span>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
