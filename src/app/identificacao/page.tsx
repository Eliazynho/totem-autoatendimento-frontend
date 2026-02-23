"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PopCard } from "@/components/ui/PopCard";
import { PopButton } from "@/components/ui/PopButton";
import { ChevronRight, SkipForward, ArrowLeft } from "lucide-react";

export default function IdentificationScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");

  const handleNext = () => {
    // Salvamos na sessão/estado global aqui pra mandar pro ASaaS dps
    if (typeof window !== "undefined") {
      sessionStorage.setItem("totem_customer_name", name || "Cliente Totem");
      sessionStorage.setItem("totem_customer_cpf", cpf);
    }
    router.push("/cardapio");
  };

  const handleSkip = () => {
    sessionStorage.removeItem("totem_customer_name");
    sessionStorage.removeItem("totem_customer_cpf");
    router.push("/cardapio");
  };

  return (
    <main className="flex flex-col min-h-screen bg-popWhite p-6 relative">
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 p-4 rounded-full border-[3px] border-popBlack hover:bg-popYellow transition-colors z-10"
      >
        <ArrowLeft size={32} />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full gap-8 z-10">
        <h1 className="font-bangers text-[4rem] text-popRed text-pop-stroke text-center leading-[1.1]">
          Como podemos
          <br />
          chamar você?
        </h1>

        <PopCard variant="white" className="w-full flex flex-col gap-6 p-8">
          <div>
            <label className="font-bangers text-2xl tracking-wide uppercase">
              Seu Nome (Opcional)
            </label>
            <input
              type="text"
              className="w-full mt-2 p-4 text-2xl font-nunito font-bold border-[3px] border-popBlack rounded-xl bg-gray-50 focus:outline-none focus:bg-popYellow/20 transition-colors"
              placeholder="Digite seu nome..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="font-bangers text-2xl tracking-wide uppercase">
              Seu CPF na nota? (Opcional)
            </label>
            <input
              type="text"
              className="w-full mt-2 p-4 text-2xl font-nunito font-bold border-[3px] border-popBlack rounded-xl bg-gray-50 focus:outline-none focus:bg-popYellow/20 transition-colors"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <p className="font-nunito text-sm font-bold mt-2 text-gray-500">
              O CPF é usado exclusivamente para emissão de nota e recebimento
              PIX.
            </p>
          </div>
        </PopCard>

        {/* Action Buttons fixed bottom if we want, or layout relative */}
        <div className="flex flex-col gap-4 w-full mt-4">
          <PopButton
            variant="primary"
            fullWidth
            className="text-2xl h-20"
            onClick={handleNext}
          >
            CONFIRMAR DADOS <ChevronRight size={32} />
          </PopButton>

          <PopButton
            variant="neutral"
            fullWidth
            className="text-xl h-16 opacity-80"
            onClick={handleSkip}
          >
            PULAR ETAPA <SkipForward size={24} />
          </PopButton>
        </div>
      </div>
    </main>
  );
}
