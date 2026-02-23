'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PopCard } from '@/components/ui/PopCard';

export default function SucessoScreen() {
  const router = useRouter();

  useEffect(() => {
    // Volta pra Home automaticamente em 15s pra liberar o totem pro proximo
    const timer = setTimeout(() => {
      router.push('/');
    }, 15000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col min-h-screen bg-popYellow p-6 justify-center items-center relative overflow-hidden">
      {/* Explosão de Cores no Fundo */}
      <div className="absolute inset-0 bg-halftone opacity-40 animate-pulseBackground z-0 pointer-events-none"></div>
      
      <div className="z-10 flex flex-col items-center max-w-lg w-full">
        <div className="bg-popWhite border-[4px] border-popBlack px-6 py-2 shadow-pop transform -rotate-3 mb-8">
          <h1 className="font-bangers text-[3rem] text-popRed text-pop-stroke">
            PAGAMENTO APROVADO!
          </h1>
        </div>

        <PopCard variant="white" className="w-full flex flex-col items-center p-10 gap-4 mt-8">
          <h2 className="font-bangers text-3xl uppercase tracking-wider text-gray-500">Sua Senha</h2>
          {/* Valor a ser injetado da resposta do OrderService -> ticketNumber */}
          <div className="font-bangers text-[8rem] leading-none text-popRed text-pop-stroke drop-shadow-md animate-bounce pt-4">
            004
          </div>
          <p className="font-nunito font-black text-xl text-center mt-6">
            Acompanhe a sua senha no painel para retirar o pedido!
          </p>
        </PopCard>

        {/* Efeito Retro / Loading */}
        <div className="mt-12 text-center font-bangers text-3xl text-popRed animate-pulse">
          PREPARANDO SUA JORNADA...
        </div>
      </div>
    </main>
  );
}
