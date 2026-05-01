import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCheck,
  CheckCircle2,
  Flame,
  MessageCircle,
  Sparkles,
  Target,
} from "lucide-react";

export default function LandingPage({
  totalCorrect,
  totalAttempted,
  accuracy,
  sessionStreak,
  emotion,
  ProgressBar,
  ActiveIcon,
  activeCourse,
  setActivePage,
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-violet-950 shadow-lg"
      >
        <div className="relative flex flex-col gap-4 px-8 py-5 md:flex-row md:items-center md:justify-between">
          <div className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-violet-600/15 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-cyan-500/10 blur-2xl" />

          <div className="relative max-w-lg space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white">
              Mindful Academic Coaching
            </p>
            <h1 className="text-xl font-bold leading-snug text-white drop-shadow-[0_1px_8px_rgba(15,23,42,0.45)]">
              Mindful Learning
            </h1>
            <p className="text-sm leading-relaxed text-white">
              Your partner in academic growth and learner well-being. Detects your emotions: engaged, neutral, confused, or frustrated, from mood, quiz behavior, attempts, and focus time. Delivers the right support in real time.
            </p>
          </div>

          <div className="relative hidden shrink-0 items-center gap-5 rounded-xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm xl:flex">
            {[
              { label: "Correct", value: totalCorrect, icon: CheckCheck },
              { label: "Accuracy", value: `${accuracy}%`, icon: Target },
              { label: "Attempted", value: totalAttempted, icon: BookOpen },
              { label: "Streak", value: sessionStreak, icon: Flame },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon className="mx-auto mb-1 h-3.5 w-3.5 text-violet-400" />
                <p className="text-base font-bold text-white">{value}</p>
                <p className="text-[10px] text-slate-500">{label}</p>
              </div>
            ))}
            <div className="ml-1 w-px self-stretch bg-white/10" />
            <div className="min-w-[100px] space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Readiness</span>
                <span className="font-semibold text-white">{emotion.score}%</span>
              </div>
              <ProgressBar value={emotion.score} colorClass={emotion.barColor} thin />
              <p className="text-[10px] text-slate-500">{emotion.tone}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Mindful learning</p>
          <h2 className="mt-2 text-2xl font-bold landing-title">Your learning path, tuned in real time.</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            MindfulLearn blends lesson content with emotion-aware coaching. Students move through lessons,
            practice checks, and support prompts that adapt to focus and confidence.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Lessons", desc: "Guided reading and objectives", icon: BookOpen },
              { label: "Practice", desc: "Knowledge checks with feedback", icon: CheckCircle2 },
              { label: "Mood Signals", desc: "Self-report + focus patterns", icon: MessageCircle },
              { label: "Coaching", desc: "Hints, challenges, recovery", icon: Sparkles },
            ].map(({ label, desc, icon: Icon }) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <Icon className="h-4 w-4 text-slate-500" />
                <p className="mt-2 text-sm font-semibold text-slate-800">{label}</p>
                <p className="mt-1 text-xs text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setActivePage("lessons")}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Start lessons
            </button>
            <button
              onClick={() => setActivePage("practice")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Jump into practice
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Active course</p>
            <div className="mt-2 flex items-center gap-3">
              <div className={`rounded-lg bg-gradient-to-br ${activeCourse.color} p-2 text-white shadow-sm`}>
                <ActiveIcon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{activeCourse.title}</p>
                <p className="text-xs text-slate-400">{activeCourse.subtitle}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600">{activeCourse.objective}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Session snapshot</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                { label: "Correct", value: totalCorrect },
                { label: "Accuracy", value: `${accuracy}%` },
                { label: "Attempted", value: totalAttempted },
                { label: "Streak", value: sessionStreak },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-center">
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="text-base font-bold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
