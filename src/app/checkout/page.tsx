"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PopCard } from "@/components/ui/PopCard";
import { PopButton } from "@/components/ui/PopButton";
import { ArrowLeft, Trash2, QrCode } from "lucide-react";

export default function CheckoutScreen() {
  const router = useRouter();

  // Mock simplificado de Itens no carrinho
  const [items, setItems] = useState([
    { id: "1", name: "Original 90s", price: 29.9, qtd: 2 },
    { id: "4", name: "Refrigerante Cola", price: 6.5, qtd: 2 },
  ]);

  const total = items.reduce((acc, item) => acc + item.price * item.qtd, 0);

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handlePayment = () => {
    // Aqui faremos o POST pro backend /orders/checkout e redirecionaremos pro Pagamento PIX
    router.push("/pagamento");
  };

  return (
    <main className="flex flex-col min-h-screen bg-popWhite relative pb-32 p-6">
      <header className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-3 bg-popWhite rounded-full border-[3px] border-popBlack hover:bg-popYellow transition-colors"
        >
          <ArrowLeft size={28} strokeWidth={3} />
        </button>
        <h1 className="font-bangers text-4xl text-popRed text-pop-stroke tracking-wider">
          SEU PEDIDO
        </h1>
      </header>

      <PopCard variant="white" className="flex flex-col gap-4 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-4 last:border-0 last:pb-0"
          >
            <div className="flex-1">
              <h3 className="font-bangers text-2xl">
                {item.qtd}x {item.name}
              </h3>
              <p className="font-nunito text-lg font-bold text-gray-600">
                R$ {(item.price * item.qtd).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="p-3 bg-red-100 text-popRed rounded-xl border-[3px] border-popRed hover:bg-popRed hover:text-white transition-colors"
            >
              <Trash2 size={24} />
            </button>
          </div>
        ))}

        {items.length === 0 && (
          <p className="font-nunito font-bold text-center text-gray-500 py-8">
            Seu carrinho está vazio.
          </p>
        )}
      </PopCard>

      <div className="mt-auto bg-popYellow border-[4px] border-popBlack rounded-3xl p-6 shadow-pop">
        <div className="flex justify-between items-center mb-6">
          <span className="font-bangers text-3xl font-normal">
            TOTAL A PAGAR:
          </span>
          <span className="font-bangers text-5xl text-popRed text-pop-stroke">
            R$ {total.toFixed(2)}
          </span>
        </div>

        <PopButton
          variant="primary"
          fullWidth
          className="text-3xl h-24"
          disabled={items.length === 0}
          onClick={handlePayment}
        >
          <QrCode size={36} /> PAGAR COM PIX
        </PopButton>
        <PopButton
          variant="neutral"
          fullWidth
          className="text-xl h-16 mt-4"
          onClick={() => router.push("/cardapio")}
        >
          ADICIONAR MAIS ITENS
        </PopButton>
      </div>
    </main>
  );
}
