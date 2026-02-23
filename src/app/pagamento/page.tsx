"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PopCard } from "@/components/ui/PopCard";
import { PopButton } from "@/components/ui/PopButton";

export default function PagamentoScreen() {
  const router = useRouter();

  useEffect(() => {
    // Simular que após 10 segundos o backend via SSE ou Polling confirmou o pagamento
    const timer = setTimeout(() => {
      router.push("/sucesso");
    }, 10000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col min-h-screen bg-popWhite p-6 justify-center items-center relative overflow-hidden">
      {/* Background animado de retículas bem leve */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none z-0"></div>

      <div className="z-10 flex flex-col items-center max-w-lg w-full">
        <h1 className="font-bangers text-[3.5rem] leading-[1] text-popRed text-pop-stroke text-center mb-8 drop-shadow-md transform -rotate-2">
          PAGUE PELO CELULAR
        </h1>

        <PopCard
          variant="yellow"
          className="w-full flex flex-col items-center p-8 gap-6 animate-in fade-in zoom-in duration-300"
        >
          <div className="bg-white p-4 rounded-xl border-[4px] border-popBlack shadow-pop w-64 h-64 flex items-center justify-center">
            {/* Aqui no lugar da imagem entra a string base64 do Asaas QR Code (pix.encodedImage) */}
            <p className="font-bangers text-gray-400 text-2xl animate-pulse">
              QR CODE AQUI
            </p>
          </div>
          <p className="font-nunito text-lg font-black text-center mt-2">
            Aponte a câmera do seu celular ou app do banco para o código acima.
          </p>
        </PopCard>

        <div className="mt-8 font-nunito font-bold text-gray-500 animate-pulse text-center">
          Aguardando confirmação do pagamento...
        </div>

        {/* Botão para abortar caso o cliente desista (Cancela no Asaas) */}
        <PopButton
          variant="neutral"
          className="mt-8 px-8 py-3 w-full"
          onClick={() => router.push("/cardapio")}
        >
          CANCELAR PEDIDO
        </PopButton>
      </div>
    </main>
  );
}
