"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PopCard } from "@/components/ui/PopCard";
import { PopButton } from "@/components/ui/PopButton";
import {
  ArrowLeft,
  Trash2,
  QrCode,
  UserCircle,
  Plus,
  Minus,
} from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/i18n";

export default function CheckoutScreen() {
  const router = useRouter();
  const { t } = useI18n();

  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedCart = sessionStorage.getItem("totem_current_cart");
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      if (parsed.items && Array.isArray(parsed.items)) {
        setItems(parsed.items);
      }
    }
  }, []);

  const total = items.reduce((acc, item) => acc + item.price * item.qtd, 0);

  const updateQuantity = (id: string, delta: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQtd = Math.max(1, item.qtd + delta);
          return { ...item, qtd: newQtd };
        }
        return item;
      }),
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handlePayment = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

      const response = await fetch(`${backendUrl}/orders/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name || "Cliente Totem",
          customerCpf: cpf || "00000000000",
          items: items.map((i) => ({
            saiposId: i.id, // codigo_saipos — integration_code na Saipos
            name: i.name || i.id, // nome real do produto
            quantity: i.qtd,
            price: i.price,
          })),
        }),
      });

      if (!response.ok) throw new Error("Erro ao gerar pedido");

      const data = await response.json();
      sessionStorage.setItem("totem_current_order", JSON.stringify(data));
      router.push("/pagamento");
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="flex flex-col min-h-screen bg-popWhite items-center justify-center p-6">
        <h1 className="font-bangers text-[5rem] text-popRed text-pop-stroke">
          {t.checkout.empty}
        </h1>
        <PopButton
          variant="primary"
          className="mt-8 text-3xl px-12 py-6"
          onClick={() => router.push("/cardapio")}
        >
          {t.checkout.backToMenu}
        </PopButton>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen bg-popWhite relative overflow-hidden flex-row">
      <div className="absolute inset-0 bg-halftone opacity-[0.05] pointer-events-none z-0"></div>

      <section className="w-1/2 flex flex-col h-screen border-r-[6px] border-popBlack bg-gray-50 z-10 shadow-[10px_0_20px_rgba(0,0,0,0.1)] relative">
        <header className="p-8 pb-4 flex items-center gap-6">
          <button
            onClick={() => router.back()}
            className="p-4 bg-popWhite rounded-full border-[4px] border-popBlack hover:bg-popYellow transition-colors"
          >
            <ArrowLeft size={36} strokeWidth={3} />
          </button>
          <h1 className="font-bangers text-5xl text-popRed text-pop-stroke tracking-wider">
            {t.checkout.title}
          </h1>
        </header>

        <div className="flex-1 overflow-y-auto px-8 pb-8 flex flex-col gap-4 mt-6">
          {items.map((item) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              key={item.id}
            >
              <PopCard
                variant="white"
                className="flex items-center justify-between p-6"
              >
                <div className="flex-1">
                  <h3 className="font-bangers text-3xl mb-1 text-popBlack">
                    Item #{item.id}
                  </h3>
                  <p className="font-bangers text-2xl text-popRed">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-6 bg-gray-100 p-2 rounded-2xl border-[3px] border-popBlack">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-3 bg-white rounded-xl border-2 border-popBlack hover:bg-gray-200"
                  >
                    <Minus size={24} />
                  </button>
                  <span className="font-bangers text-3xl w-8 text-center">
                    {item.qtd}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-3 bg-popYellow rounded-xl border-2 border-popBlack hover:bg-yellow-300"
                  >
                    <Plus size={24} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-4 ml-6 bg-red-100 text-popRed rounded-2xl border-[3px] border-popRed hover:bg-popRed hover:text-white transition-colors"
                >
                  <Trash2 size={32} />
                </button>
              </PopCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="w-1/2 flex flex-col h-screen p-10 bg-popYellow z-10 justify-between">
        <div className="flex flex-col gap-6 w-full max-w-lg mx-auto mt-8">
          <div className="flex items-center gap-4 mb-4">
            <UserCircle size={48} className="text-popBlack" />
            <h2 className="font-bangers text-[3.5rem] leading-none text-popBlack">
              {t.checkout.identification} <br />
              <span className="text-2xl text-gray-700 font-nunito font-bold">
                {t.checkout.optional}
              </span>
            </h2>
          </div>

          <PopCard variant="white" className="w-full flex flex-col gap-6 p-8">
            <div>
              <label className="font-bangers text-2xl tracking-wide uppercase">
                {t.checkout.nameLabel}
              </label>
              <input
                type="text"
                className="w-full mt-2 p-5 text-2xl font-nunito font-bold border-[3px] border-popBlack rounded-xl bg-gray-50 focus:outline-none focus:bg-popYellow/20 transition-colors"
                placeholder={t.checkout.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="font-bangers text-2xl tracking-wide uppercase">
                {t.checkout.cpfLabel}
              </label>
              <input
                type="text"
                className="w-full mt-2 p-5 text-2xl font-nunito font-bold border-[3px] border-popBlack rounded-xl bg-gray-50 focus:outline-none focus:bg-popYellow/20 transition-colors"
                placeholder={t.checkout.cpfPlaceholder}
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </div>
          </PopCard>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-lg mx-auto pb-8">
          <div className="bg-popBlack border-[6px] border-white p-6 rounded-3xl flex justify-between items-center shadow-[6px_6px_0px_#000] text-popWhite mt-8">
            <span className="font-bangers text-3xl tracking-widest uppercase">
              {t.checkout.totalToPay}
            </span>
            <span className="font-bangers text-5xl text-popYellow">
              R$ {total.toFixed(2)}
            </span>
          </div>

          <PopButton
            variant="primary"
            fullWidth
            className="text-4xl h-28 mt-4 animate-in zoom-in duration-300 relative overflow-hidden group"
            disabled={items.length === 0 || isProcessing}
            onClick={handlePayment}
          >
            {isProcessing ? (
              t.checkout.generatingPix
            ) : (
              <div className="flex items-center justify-center gap-4 w-full h-full">
                <QrCode
                  size={48}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>{t.checkout.payWithPix}</span>
              </div>
            )}
          </PopButton>
        </div>
      </section>
    </main>
  );
}
