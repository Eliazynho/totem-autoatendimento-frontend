"use client";

import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";
import { PopButton } from "@/components/ui/PopButton";

export default function IdleScreen() {
  const router = useRouter();

  const handleStart = () => {
    // Redireciona para a tela de Identificação
    router.push("/identificacao");
  };

  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen bg-halftone bg-halftone-overlay px-6 cursor-pointer"
      onClick={handleStart}
    >
      {/* Logos flutuantes no fundo (opcional, remetendo às animações do site v1) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] animate-bounce opacity-20 transform -rotate-12">
          🍔
        </div>
        <div className="absolute top-[30%] right-[15%] animate-pulse opacity-30 text-5xl">
          ⚡
        </div>
        <div className="absolute bottom-[20%] left-[20%] animate-spin-slow opacity-20 text-6xl">
          ⭐
        </div>
      </div>

      <div className="z-10 flex flex-col items-center text-center gap-12 w-full max-w-md animate-in fade-in zoom-in duration-500">
        {/* Usando uma Box Brutalista em vez de só texto */}
        <div className="bg-popWhite border-[4px] border-popBlack p-8 shadow-pop rounded-3xl transform -rotate-2">
          <h1 className="font-bangers text-[5rem] leading-[0.9] text-popYellow text-pop-stroke uppercase drop-shadow-md">
            Comece
            <br />
            Sua Jornada
          </h1>
        </div>

        <div className="flex flex-col items-center gap-6 mt-16 animate-pulse">
          <PopButton
            variant="secondary"
            className="text-3xl px-12 py-8 rounded-[2rem] border-[4px]"
            onClick={(e) => {
              e.stopPropagation();
              handleStart();
            }}
          >
            TOQUE NA TELA PARA PEDIR
            <MoveRight size={36} strokeWidth={3} />
          </PopButton>
        </div>
      </div>
    </main>
  );
}
