"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PopCard } from "@/components/ui/PopCard";
import { PopButton } from "@/components/ui/PopButton";
import { motion } from "framer-motion";
import { CheckCircle2, Home } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n";

export default function SucessoScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const [ticketNumber, setTicketNumber] = useState<string>("---");

  useEffect(() => {
    const storedOrder = sessionStorage.getItem("totem_current_order");
    if (storedOrder) {
      const parsed = JSON.parse(storedOrder);
      if (parsed.ticketNumber) {
        setTicketNumber(parsed.ticketNumber);
      }
    }

    sessionStorage.removeItem("totem_current_cart");
    sessionStorage.removeItem("totem_customer_name");
    sessionStorage.removeItem("totem_customer_cpf");

    const timer = setTimeout(() => {
      sessionStorage.removeItem("totem_current_order");
      router.push("/");
    }, 20000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col min-h-screen bg-popYellow p-6 justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none z-0"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", x: Math.random() * 100 + "vw", rotate: 0 }}
            animate={{ y: "-10vh", rotate: 360 }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute text-5xl opacity-20"
          >
            🍔
          </motion.div>
        ))}
      </div>

      <div className="z-10 flex flex-col items-center max-w-2xl w-full">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="bg-popWhite border-[6px] border-popBlack px-10 py-6 shadow-pop transform -rotate-2 mb-12"
        >
          <h1 className="font-bangers text-[4.5rem] text-popRed text-pop-stroke flex items-center gap-4">
            <CheckCircle2 size={64} strokeWidth={4} /> {t.success.approved}
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full"
        >
          <PopCard
            variant="white"
            className="w-full flex flex-col items-center p-12 gap-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-4 bg-popRed opacity-10"></div>

            <h2 className="font-bangers text-4xl uppercase tracking-[0.2em] text-gray-400">
              {t.success.withdrawalPassword}
            </h2>

            <div className="font-bangers text-[12rem] leading-none text-popRed text-pop-stroke drop-shadow-xl py-6 tabular-nums">
              {ticketNumber}
            </div>

            <p className="font-nunito font-black text-2xl text-center mt-4 max-w-md text-popBlack leading-tight">
              {t.success.instruction} <br />
              <span className="text-gray-500 text-lg italic">
                {t.success.readySoon}
              </span>
            </p>
          </PopCard>
        </motion.div>

        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 text-center font-bangers text-3xl text-popRed tracking-widest bg-popBlack text-white px-8 py-2 rounded-full border-[3px] border-white"
        >
          {t.success.sentToKitchen}
        </motion.div>

        <PopButton
          variant="neutral"
          className="mt-16 px-10 py-5 text-2xl flex items-center gap-3 bg-white/80 text-popRed"
          onClick={() => {
            sessionStorage.removeItem("totem_current_order");
            router.push("/");
          }}
        >
          <Home size={28} /> {t.success.backToStart}
        </PopButton>
      </div>

      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 20, ease: "linear" }}
        className="fixed bottom-0 left-0 h-4 bg-popRed/30 z-50"
      />
    </main>
  );
}
