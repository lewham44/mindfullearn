import React from "react";
import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";

export default function SessionLogPage({ history, emotionConfig }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <BarChart2 className="h-3.5 w-3.5" /> Session Log
      </h3>
      {history.length === 0 ? (
        <p className="text-xs leading-relaxed text-slate-400">
          Submit a quiz answer to generate an emotion-aware learning event.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {history.map((item, i) => {
            const cfg = emotionConfig[item.emotionKey];
            return (
              <motion.div
                key={`${item.time}-${i}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-lg border border-slate-100 bg-slate-50 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate text-xs font-semibold text-slate-700">{item.course}</p>
                  <span className="shrink-0 text-[10px] text-slate-400">{item.time}</span>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${cfg.bg} ${cfg.color}`}>
                    {item.emotion}
                  </span>
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${item.correct ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                    {item.correct ? "Correct" : "Incorrect"}
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500">
                  {item.strategy} · {item.focusMinutes}m focus
                </p>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
