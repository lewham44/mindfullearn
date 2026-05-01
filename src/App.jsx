import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import mindfulLearnLogo from "./assets/icon.png";
import {
  Brain,
  Code2,
  Coffee,
  Eye,
  Flame,
  Frown,
  History,
  Laptop,
  Lightbulb,
  Meh,
  Smile,
  Sparkles,
} from "lucide-react";
import LandingPage from "./components/pages/LandingPage";
import LessonsPracticePage from "./components/pages/LessonsPracticePage";
import SessionLogPage from "./components/pages/SessionLogPage";

// ─── Course Data ───────────────────────────────────────────────────────────────

const courses = [
  {
    id: "mt",
    title: "Machine Translation",
    subtitle: "AI & NLP",
    icon: Brain,
    color: "from-violet-500 to-purple-700",
    bg: "bg-violet-50",
    ring: "ring-violet-200",
    textAccent: "text-violet-700",
    lesson: "Neural machine translation uses encoder-decoder architectures and attention mechanisms to convert text from one language into another. The attention layer helps the model focus on important source words while generating each target word, dramatically improving fluency and context-awareness over older rule-based systems.",
    objective: "Explain why attention mechanisms improve translation quality.",
    difficulty: "Intermediate",
    readingTime: 3,
    quiz: {
      question: "What is the main purpose of the attention mechanism in neural machine translation?",
      options: [
        "To remove grammar rules from the training data",
        "To help the decoder focus on relevant source tokens while generating each output word",
        "To translate only individual words literally without context",
        "To replace all word embeddings with dictionary entries",
      ],
      answer: 1,
      explanation: "Attention lets the decoder dynamically weigh different source tokens while producing each translated token. This improves context, fluency, and the handling of long sentences where alignment between source and target is non-trivial.",
      hint: "Think about what a human translator does. They do not read once then forget. They return to specific parts of the source text.",
      challengeQuestion: "How does multi-head attention extend the basic attention mechanism to capture richer representations?",
    },
  },
  {
    id: "web",
    title: "Web Development",
    subtitle: "HTML · CSS · JS",
    icon: Code2,
    color: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-50",
    ring: "ring-cyan-200",
    textAccent: "text-cyan-700",
    lesson: "Modern web development separates structure, presentation, and behavior. HTML defines content semantics, CSS controls visual styling and layout, and JavaScript adds dynamic interactivity. Responsive design techniques ensure that pages remain usable and accessible across devices of all sizes.",
    objective: "Identify how HTML, CSS, and JavaScript work together to build web pages.",
    difficulty: "Beginner",
    readingTime: 2,
    quiz: {
      question: "Which technology is primarily responsible for making a web page interactive?",
      options: ["HTML", "CSS", "JavaScript", "HTTP headers"],
      answer: 2,
      explanation: "JavaScript allows pages to react to user input, dynamically update content, validate forms, and communicate with servers through APIs. This enables the interactive experiences users expect.",
      hint: "Consider what runs when you click a button or submit a form on a webpage.",
      challengeQuestion: "What is the difference between client-side and server-side rendering, and when would you choose each?",
    },
  },
  {
    id: "se2",
    title: "Software Engineering II",
    subtitle: "Process & Design",
    icon: Laptop,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    ring: "ring-emerald-200",
    textAccent: "text-emerald-700",
    lesson: "Software Engineering II focuses on disciplined development practices including requirements analysis, design patterns, testing strategies, and project management. Iterative development models like Agile reduce project risk by delivering usable increments and incorporating continuous feedback from stakeholders.",
    objective: "Describe why iterative development supports software quality and reduces risk.",
    difficulty: "Advanced",
    readingTime: 4,
    quiz: {
      question: "Why is iterative development particularly valuable in software engineering projects?",
      options: [
        "It removes the need for testing and documentation",
        "It prevents end users from giving feedback on the system",
        "It allows gradual improvement through repeated, reviewable increments",
        "It guarantees zero defects in the final product",
      ],
      answer: 2,
      explanation: "Iteration supports continuous stakeholder feedback, incremental risk reduction, and gradual refinement. Each sprint produces a working increment that can be evaluated, tested, and improved before the next cycle begins.",
      hint: "Consider how building in small steps allows teams to catch problems early rather than discovering them at delivery.",
      challengeQuestion: "Compare the waterfall and agile models. In what project contexts might waterfall still be preferable?",
    },
  },
  {
    id: "rizal",
    title: "Life & Works of Rizal",
    subtitle: "Philippine History",
    icon: History,
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    ring: "ring-amber-200",
    textAccent: "text-amber-700",
    lesson: "Jose Rizal channeled his intellect and compassion into novels, essays, letters, and civic work to criticize colonial abuse and promote peaceful reform. Noli Me Tangere and El Filibusterismo exposed social injustice, corruption, and oppression under colonial rule, becoming foundational texts of Filipino nationalist consciousness.",
    objective: "Connect Rizal's literary works to the reform movement and Philippine nationalism.",
    difficulty: "Intermediate",
    readingTime: 3,
    quiz: {
      question: "What was the primary purpose of Rizal's major novels, Noli Me Tangere and El Filibusterismo?",
      options: [
        "To expose colonial social injustices and inspire reform through literature",
        "To document a complete military strategy for independence",
        "To serve as a travel guide for European readers visiting the Philippines",
        "To compile a dictionary of Filipino languages and dialects",
      ],
      answer: 0,
      explanation: "Rizal's novels used narrative fiction to reveal the realities of colonial oppression, corruption, and social injustice. This approach proved more powerful than direct political tracts for awakening national consciousness among Filipinos.",
      hint: "Rizal believed reform could come through enlightenment. Consider what medium best reaches hearts and minds.",
      challengeQuestion: "How did the colonial authorities' reaction to Rizal's novels demonstrate the power of literature as a tool for social change?",
    },
  },
];

// ─── Emotion Config ────────────────────────────────────────────────────────────

const EMOTION_CONFIG = {
  engaged: {
    label: "Engaged",
    icon: Smile,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    ring: "ring-emerald-200",
    barColor: "bg-emerald-500",
    headerBg: "bg-emerald-600",
    tone: "Strong focus detected",
    description: "You're showing strong focus and accurate responses, a good signal for deeper learning.",
    recommendation: "Keep the momentum going. Try the challenge question to push your understanding further.",
    strategy: "Challenge mode",
    score: 92,
    supportAction: "challenge",
    actionLabel: "Unlock Challenge Question",
  },
  neutral: {
    label: "Neutral",
    icon: Meh,
    color: "text-blue-600",
    bg: "bg-blue-50",
    ring: "ring-blue-200",
    barColor: "bg-blue-500",
    headerBg: "bg-blue-600",
    tone: "Stable learning state",
    description: "You're progressing steadily. A brief example or analogy might help solidify the concept.",
    recommendation: "Re-read the key sentence in the lesson before moving on. Small pauses improve retention.",
    strategy: "Guided example",
    score: 68,
    supportAction: "reread",
    actionLabel: "Highlight Key Concept",
  },
  confused: {
    label: "Confused",
    icon: Eye,
    color: "text-amber-600",
    bg: "bg-amber-50",
    ring: "ring-amber-200",
    barColor: "bg-amber-500",
    headerBg: "bg-amber-600",
    tone: "Possible confusion detected",
    description: "This concept may need more time. Confusion is a normal part of learning, and it means you are at your edge.",
    recommendation: "Read the hint below, then re-approach the question. Breaking it into smaller parts helps.",
    strategy: "Scaffolded hint",
    score: 41,
    supportAction: "hint",
    actionLabel: "Show Hint",
  },
  frustrated: {
    label: "Frustrated",
    icon: Frown,
    color: "text-rose-600",
    bg: "bg-rose-50",
    ring: "ring-rose-200",
    barColor: "bg-rose-500",
    headerBg: "bg-rose-600",
    tone: "Frustration risk detected",
    description: "Repeated errors suggest emotional strain. A short reset often makes a real difference.",
    recommendation: "Take a brief break, then review the lesson once more before retrying.",
    strategy: "Recovery mode",
    score: 24,
    supportAction: "break",
    actionLabel: "Take a Recovery Break",
  },
};

function classifyEmotion({ selectedMood, answerCorrect, attempts, focusMinutes }) {
  if (selectedMood === "frustrated" || (!answerCorrect && attempts >= 3)) return "frustrated";
  if (selectedMood === "confused" || (!answerCorrect && attempts >= 1)) return "confused";
  if (selectedMood === "engaged" && answerCorrect && focusMinutes >= 8) return "engaged";
  if (answerCorrect && focusMinutes >= 6) return "engaged";
  if (answerCorrect) return "neutral";
  return selectedMood || "neutral";
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function ProgressBar({ value, colorClass = "bg-slate-800", thin = false }) {
  return (
    <div className={`w-full overflow-hidden rounded-full bg-slate-200 ${thin ? "h-1.5" : "h-2"}`}>
      <motion.div
        className={`h-full rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(2, Math.min(100, value))}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}

function EmotionPulse({ emotionKey, size = "sm" }) {
  const cfg = EMOTION_CONFIG[emotionKey];
  const Icon = cfg.icon;
  const pulseColor = {
    engaged: "rgba(16,185,129,0.25)",
    neutral: "rgba(59,130,246,0.25)",
    confused: "rgba(245,158,11,0.25)",
    frustrated: "rgba(239,68,68,0.25)",
  }[emotionKey];
  const dim = size === "lg" ? 52 : 40;
  const iconSize = size === "lg" ? "h-5 w-5" : "h-4 w-4";
  const pad = size === "lg" ? "p-2.5" : "p-2";

  return (
    <div className="relative inline-flex items-center justify-center">
      <motion.div
        className="absolute rounded-full"
        style={{ width: dim, height: dim, backgroundColor: pulseColor }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className={`relative z-10 rounded-full ${pad} ${cfg.bg} ${cfg.ring} ring-2`}>
        <Icon className={`${iconSize} ${cfg.color}`} />
      </div>
    </div>
  );
}

function FocusTimer({ active, onTick }) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (active) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          const next = s + 1;
          if (next % 60 === 0) onTick(Math.floor(next / 60));
          return next;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [active, onTick]);

  useEffect(() => { if (!active) setSeconds(0); }, [active]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="flex items-center gap-1.5 tabular-nums text-xs font-mono font-semibold text-slate-500">
      <motion.div
        animate={active ? { opacity: [1, 0.2, 1] } : { opacity: 1 }}
        transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}
      >
        <div className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-slate-300"}`} />
      </motion.div>
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </div>
  );
}

function ScoreRing({ score }) {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
      <motion.circle
        cx="36" cy="36" r={r} fill="none" stroke="white" strokeWidth="6"
        strokeLinecap="round" strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transform: "rotate(-90deg)", transformOrigin: "36px 36px" }}
      />
      <text x="36" y="36" textAnchor="middle" dominantBaseline="central"
        fontSize="12" fontWeight="700" fill="white">{score}%</text>
    </svg>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────

export default function MindfulLearn() {
  const [activePage, setActivePage] = useState("landing");
  const [activeCourse, setActiveCourse] = useState(courses[0]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedMood, setSelectedMood] = useState("neutral");
  const [focusMinutes, setFocusMinutes] = useState(0);
  const [history, setHistory] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const [lessonPhase, setLessonPhase] = useState("lesson");
  const [showHint, setShowHint] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [breakMode, setBreakMode] = useState(false);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [coachOpen, setCoachOpen] = useState(true);
  const [moodMenuOpen, setMoodMenuOpen] = useState(false);

  const answerCorrect = selectedOption === activeCourse.quiz.answer;

  const emotionKey = useMemo(
    () => classifyEmotion({
      selectedMood,
      answerCorrect: submitted ? answerCorrect : false,
      attempts,
      focusMinutes,
    }),
    [selectedMood, answerCorrect, attempts, focusMinutes, submitted]
  );

  const emotion = EMOTION_CONFIG[emotionKey];
  const handleFocusTick = useCallback((mins) => setFocusMinutes(mins), []);

  function startLesson() { setLessonPhase("quiz"); setTimerActive(true); }

  function switchCourse(course) {
    setActiveCourse(course);
    setSelectedOption(null); setAttempts(0); setSubmitted(false);
    setSelectedMood("neutral"); setFocusMinutes(0); setTimerActive(false);
    setLessonPhase("lesson"); setShowHint(false); setShowChallenge(false); setBreakMode(false);
  }

  function submitAnswer() {
    if (selectedOption === null) return;
    const newAttempts = attempts + 1;
    const correct = selectedOption === activeCourse.quiz.answer;
    const detected = classifyEmotion({ selectedMood, answerCorrect: correct, attempts: newAttempts, focusMinutes });
    setAttempts(newAttempts); setSubmitted(true); setTimerActive(false); setLessonPhase("result");
    if (correct) { setSessionStreak(s => s + 1); setTotalCorrect(t => t + 1); } else { setSessionStreak(0); }
    setTotalAttempted(t => t + 1);
    setHistory(prev => [{
      course: activeCourse.title, emotion: EMOTION_CONFIG[detected].label,
      emotionKey: detected, correct, strategy: EMOTION_CONFIG[detected].strategy,
      focusMinutes, attempts: newAttempts,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }, ...prev].slice(0, 8));
  }

  function retryQuiz() {
    setSelectedOption(null); setSubmitted(false); setTimerActive(true);
    setLessonPhase("quiz"); setShowHint(false); setShowChallenge(false);
  }

  function resetLesson() {
    setSelectedOption(null); setAttempts(0); setSubmitted(false);
    setSelectedMood("neutral"); setFocusMinutes(0); setTimerActive(false);
    setLessonPhase("lesson"); setShowHint(false); setShowChallenge(false); setBreakMode(false);
  }

  function handleSupportAction() {
    if (emotionKey === "engaged") setShowChallenge(true);
    else if (emotionKey === "confused" || emotionKey === "neutral") setShowHint(true);
    else if (emotionKey === "frustrated") setBreakMode(true);
  }

  const ActiveIcon = activeCourse.icon;
  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const pages = [
    { id: "landing", label: "Landing" },
    { id: "lessons", label: "Lessons" },
    { id: "practice", label: "Practice" },
    { id: "log", label: "Session Log" },
  ];
  const lessonItems = [
    { id: "l1", title: "Lesson 1", topic: "Foundations of adaptive learning", completed: true },
    { id: "l2", title: "Lesson 2", topic: "Emotion-aware signals", completed: false },
    { id: "l3", title: "Lesson 3", topic: "Feedback loops and coaching", completed: false },
  ];
  const practiceItems = [
    { id: "p1", title: "Practice Quiz 1", lesson: "Lesson 1", status: "Completed" },
    { id: "p2", title: "Practice Quiz 2", lesson: "Lesson 2", status: "Not started" },
    { id: "p3", title: "Practice Quiz 3", lesson: "Lesson 3", status: "Locked" },
  ];

  return (
    <div
      className="min-h-screen bg-[#f5f1ea] text-slate-900"
      style={{ fontFamily: "var(--sans)" }}
    >
      {/* ── Header ── */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-13 max-w-screen-xl items-center justify-between px-6 py-3">
          {/* Brand */}
          <div className="flex items-center gap-1">
            <img
              src={mindfulLearnLogo}
              alt="MindfulLearn logo"
              className="h-8 w-auto"
            />
            <span
              className="text-sm font-bold tracking-tight"
              style={{ fontFamily: "var(--heading)" }}
            >
              MindfulLearn
            </span>
          </div>

          {/* Tabs */}
          <div className="hidden items-center gap-2 text-xs font-semibold text-slate-600 lg:flex">
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    setActivePage(page.id);
                    if (page.id === "landing" || page.id === "log") {
                      setTimerActive(false);
                    }
                    if (page.id === "lessons") {
                      setLessonPhase("lesson");
                    }
                    if (page.id === "practice") {
                      setLessonPhase("quiz");
                      setTimerActive(true);
                    }
                  }}
                  className={`rounded-full px-3 py-1 text-xs transition ${
                    activePage === page.id
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {sessionStreak >= 2 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700"
              >
                <Flame className="h-3.5 w-3.5" /> {sessionStreak} streak
              </motion.div>
            )}
            <div className="relative">
              <button
                onClick={() => setMoodMenuOpen((open) => !open)}
                className="flex items-center gap-1.5 rounded-full bg-transparent p-0.5 text-[11px] font-semibold text-slate-700"
              >
                <EmotionPulse emotionKey={emotionKey} />
              </button>
              <AnimatePresence>
                {moodMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
                  >
                    {Object.entries(EMOTION_CONFIG).map(([key, cfg]) => {
                      const Icon = cfg.icon;
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setSelectedMood(key);
                            setMoodMenuOpen(false);
                          }}
                          className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-semibold transition ${
                            selectedMood === key
                              ? `${cfg.bg} ${cfg.color}`
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span>{cfg.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-screen-xl px-6 py-5">
        {activePage === "landing" && (
          <LandingPage
            totalCorrect={totalCorrect}
            totalAttempted={totalAttempted}
            accuracy={accuracy}
            sessionStreak={sessionStreak}
            emotion={emotion}
            ProgressBar={ProgressBar}
            ActiveIcon={ActiveIcon}
            activeCourse={activeCourse}
            setActivePage={setActivePage}
          />
        )}

        {(activePage === "lessons" || activePage === "practice") && (
          <LessonsPracticePage
            activePage={activePage}
            courses={courses}
            activeCourse={activeCourse}
            switchCourse={switchCourse}
            attempts={attempts}
            focusMinutes={focusMinutes}
            timerActive={timerActive}
            lessonItems={lessonItems}
            practiceItems={practiceItems}
            lessonPhase={lessonPhase}
            startLesson={startLesson}
            ActiveIcon={ActiveIcon}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            submitted={submitted}
            submitAnswer={submitAnswer}
            showHint={showHint}
            setShowHint={setShowHint}
            showChallenge={showChallenge}
            answerCorrect={answerCorrect}
            retryQuiz={retryQuiz}
            resetLesson={resetLesson}
            handleFocusTick={handleFocusTick}
            ProgressBar={ProgressBar}
            FocusTimer={FocusTimer}
            sessionStreak={sessionStreak}
            totalCorrect={totalCorrect}
          />
        )}

        {activePage === "log" && (
          <SessionLogPage history={history} emotionConfig={EMOTION_CONFIG} />
        )}
      </div>

      {/* ── Floating Mindful Coach ── */}
      <AnimatePresence>
        {coachOpen && (
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-20 right-6 z-40 w-[320px] max-w-[90vw] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Mindful Coach</p>
            </div>

            <motion.div
              key={emotionKey}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className={`${emotion.headerBg} px-4 py-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <EmotionPulse emotionKey={emotionKey} size="lg" />
                    <div>
                      <p className="text-[10px] text-white/60">Detected state</p>
                      <p className="text-base font-bold">{emotion.label}</p>
                    </div>
                  </div>
                  <ScoreRing score={emotion.score} />
                </div>
                <p className="mt-2 text-xs text-white/70">{emotion.tone}</p>
              </div>

              <div className="space-y-3 p-4">
                <p className="text-sm leading-relaxed text-slate-600">{emotion.description}</p>

                <div className="rounded-lg bg-slate-50 px-3.5 py-3">
                  <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <Lightbulb className="h-3 w-3" /> Recommendation
                  </p>
                  <p className="text-sm leading-relaxed text-slate-600">{emotion.recommendation}</p>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2">
                  <span className="text-xs text-slate-500">Active strategy</span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-white">
                    {emotion.strategy}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {breakMode ? (
                    <motion.div
                      key="break"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="rounded-lg border border-rose-100 bg-rose-50 p-3 text-center"
                    >
                      <Coffee className="mx-auto mb-1.5 h-5 w-5 text-rose-400" />
                      <p className="text-xs font-semibold text-rose-700">Recovery break active</p>
                      <p className="mt-0.5 text-xs text-rose-500">Step away, breathe, return when ready.</p>
                      <button
                        onClick={() => setBreakMode(false)}
                        className="mt-2.5 w-full rounded-lg bg-rose-600 py-2 text-xs font-semibold text-white hover:bg-rose-700"
                      >
                        I'm ready to continue
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="action"
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
                      onClick={handleSupportAction}
                      className={`w-full rounded-lg py-2.5 text-sm font-semibold transition ${emotion.bg} ${emotion.ring} ring-1 ${emotion.color} hover:opacity-90`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Sparkles className="h-3.5 w-3.5" /> {emotion.actionLabel}
                      </span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      <button
        onClick={() => setCoachOpen((open) => !open)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-lg"
      >
        <Sparkles className="h-3.5 w-3.5" /> {coachOpen ? "Close Coach" : "Mindful Coach"}
      </button>
    </div>
  );
}