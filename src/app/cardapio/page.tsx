"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PopCard } from "@/components/ui/PopCard";
import { PopButton } from "@/components/ui/PopButton";
import { ArrowLeft, ShoppingBag } from "lucide-react";

// MOCK para testes iniciais de layout
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Original 90s",
    price: 29.9,
    desc: "Pão brioche, blend 150g, queijo prato, maionese da casa.",
    category: "Burgers",
    cover: "🍔",
  },
  {
    id: "2",
    name: "Bacon Blast",
    price: 34.9,
    desc: "Pão australiano, blend 150g, bacon crocante, cheddar.",
    category: "Burgers",
    cover: "🥓",
  },
  {
    id: "3",
    name: "Fritas Crinkle",
    price: 15.0,
    desc: "Batata frita ondulada super crocante.",
    category: "Porções",
    cover: "🍟",
  },
  {
    id: "4",
    name: "Refrigerante Cola",
    price: 6.5,
    desc: "Lata 350ml gelada.",
    category: "Bebidas",
    cover: "🥤",
  },
];

export default function CardapioScreen() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0); // Simplificação inicial

  return (
    <main className="flex flex-col min-h-screen bg-popWhite relative pb-32">
      {/* Header Fixo */}
      <header className="sticky top-0 bg-popYellow border-b-[4px] border-popBlack p-6 shadow-pop z-20 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/identificacao")}
            className="p-3 bg-popWhite rounded-full border-[3px] border-popBlack hover:bg-popRed hover:text-popYellow transition-colors"
          >
            <ArrowLeft size={28} strokeWidth={3} />
          </button>
          <h1 className="font-bangers text-4xl text-popRed text-pop-stroke tracking-wider">
            CARDÁPIO
          </h1>
        </div>
      </header>

      {/* Grid de Produtos */}
      <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
        {MOCK_PRODUCTS.map((prod) => (
          <PopCard
            key={prod.id}
            variant="white"
            className="flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h2 className="font-bangers text-2xl tracking-wide">
                  {prod.name}
                </h2>
                <p className="font-nunito text-sm font-bold text-gray-700 leading-tight mt-1">
                  {prod.desc}
                </p>
                <div className="mt-4 font-bangers text-2xl text-popRed">
                  R$ {prod.price.toFixed(2)}
                </div>
              </div>
              <div className="text-6xl select-none filter drop-shadow-md">
                {prod.cover}
              </div>
            </div>
            <PopButton
              variant="secondary"
              className="mt-6 font-bangers text-xl py-3 border-[3px]"
              onClick={() => setCartCount((c) => c + 1)}
            >
              ADICIONAR +
            </PopButton>
          </PopCard>
        ))}
      </div>

      {/* Footer Carrinho Flutuante (Obriga o cliente a olhar pra finalizar) */}
      <div className="fixed bottom-0 left-0 w-full p-6 z-30 pointer-events-none">
        <div className="bg-popBlack border-[4px] border-[#333] p-4 rounded-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.3)] pointer-events-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-popWhite pl-2">
            <div className="relative">
              <ShoppingBag size={40} />
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-popRed text-popYellow w-8 h-8 rounded-full border-2 border-popWhite flex items-center justify-center font-bangers text-lg">
                  {cartCount}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-bangers text-xl text-gray-300">
                Total do Pedido
              </span>
              <span className="font-bangers text-3xl text-popYellow">
                R$ {(cartCount * 29.9).toFixed(2)}
              </span>
            </div>
          </div>
          <PopButton
            variant="primary"
            className="text-2xl px-8"
            disabled={cartCount === 0}
            onClick={() => router.push("/checkout")}
            style={{ opacity: cartCount === 0 ? 0.5 : 1 }}
          >
            FINALIZAR
          </PopButton>
        </div>
      </div>
    </main>
  );
}
