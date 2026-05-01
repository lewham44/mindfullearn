import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Flame,
  GraduationCap,
  Lightbulb,
  HelpCircle,
  MessageCircle,
  PlayCircle,
  RefreshCw,
  Shield,
  Star,
  Timer,
  XCircle,
  Zap,
} from "lucide-react";

export default function LessonsPracticePage({
  activePage,
  courses,
  activeCourse,
  switchCourse,
  attempts,
  focusMinutes,
  timerActive,
  lessonItems,
  practiceItems,
  lessonPhase,
  startLesson,
  ActiveIcon,
  selectedOption,
  setSelectedOption,
  submitted,
  submitAnswer,
  showHint,
  setShowHint,
  showChallenge,
  answerCorrect,
  retryQuiz,
  resetLesson,
  handleFocusTick,
  ProgressBar,
  FocusTimer,
  sessionStreak,
  totalCorrect,
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[236px_1fr] xl:grid-cols-[256px_1fr]">
      <aside className="flex flex-col gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Timer className="h-3.5 w-3.5" /> Focus indicators
          </p>
          <div className="space-y-3.5">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs text-slate-500">Focus time</span>
                <span className="font-mono text-xs font-semibold text-slate-700">
                  {focusMinutes}m{timerActive ? <span className="text-emerald-600"> live</span> : ""}
                </span>
              </div>
              <ProgressBar
                value={Math.min((focusMinutes / 15) * 100, 100)}
                colorClass={focusMinutes >= 8 ? "bg-emerald-500" : focusMinutes >= 4 ? "bg-blue-500" : "bg-amber-400"}
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs text-slate-500">Quiz attempts</span>
                <span className="font-mono text-xs font-semibold text-slate-700">{attempts}</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map(n => (
                  <div
                    key={n}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      attempts >= n
                        ? n === 1 ? "bg-emerald-500" : n === 2 ? "bg-amber-400" : "bg-rose-500"
                        : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Timer starts when you begin the quiz. Attempts increment on each submission.
            </p>
          </div>
        </div>
        <p className="pl-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Courses</p>

        {courses.map((course) => {
          const Icon = course.icon;
          const selected = activeCourse.id === course.id;
          return (
            <motion.button
              key={course.id}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => switchCourse(course)}
              className={`w-full rounded-xl border p-3.5 text-left transition-all ${
                selected
                  ? "border-slate-800 bg-white shadow-md"
                  : "border-slate-200 bg-white/60 hover:border-slate-300 hover:bg-white hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-lg bg-gradient-to-br ${course.color} p-2 text-white shadow-sm`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-sm font-semibold leading-tight ${selected ? "text-slate-900" : "text-slate-700"}`}>
                    {course.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">{course.subtitle}</p>
                </div>
                {selected && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />}
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                  course.difficulty === "Beginner" ? "bg-emerald-100 text-emerald-700"
                  : course.difficulty === "Intermediate" ? "bg-amber-100 text-amber-700"
                  : "bg-rose-100 text-rose-700"
                }`}>{course.difficulty}</span>
                <span className="text-[10px] text-slate-400">{course.readingTime} min read</span>
              </div>
            </motion.button>
          );
        })}

        <div className="mt-1 rounded-xl border border-dashed border-slate-200 bg-white/40 p-3.5">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Shield className="h-3 w-3" /> Detection signals
          </p>
          <div className="mt-2.5 space-y-2">
            {[
              { label: "Self-reported mood", icon: MessageCircle },
              { label: "Quiz correctness", icon: CheckCircle2 },
              { label: "Attempt count", icon: RefreshCw },
              { label: "Focus duration", icon: Timer },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-slate-500">
                <Icon className="h-3 w-3 shrink-0 text-slate-400" /> {label}
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-col gap-4">
        <div className={`rounded-xl bg-gradient-to-r ${activeCourse.color} p-5 text-white shadow-sm`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/20 p-2.5">
                <ActiveIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-white/60">Active course</p>
                <h2 className="text-lg font-bold leading-tight">{activeCourse.title}</h2>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-white/15 px-3 py-2 text-xs backdrop-blur-sm">
              <GraduationCap className="h-3.5 w-3.5" />
              <span className="font-semibold">{activeCourse.difficulty}</span>
            </div>
          </div>
          <div className="mt-3.5 rounded-lg bg-white/10 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Objective</p>
            <p className="mt-1 text-sm leading-relaxed">{activeCourse.objective}</p>
          </div>
        </div>

        {activePage === "lessons" && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800">Course Lessons</h3>
              <span className="text-xs text-slate-400">3 total</span>
            </div>
            <div className="mt-3 space-y-2">
              {lessonItems.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{lesson.title}</p>
                    <p className="text-xs text-slate-500">{lesson.topic}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                    lesson.completed
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-600"
                  }`}>
                    {lesson.completed ? "Finished" : "In progress"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePage === "practice" && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800">Practice Quizzes</h3>
              <span className="text-xs text-slate-400">3 total</span>
            </div>
            <div className="mt-3 space-y-2">
              {practiceItems.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{quiz.title}</p>
                    <p className="text-xs text-slate-500">{quiz.lesson}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                    quiz.status === "Completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : quiz.status === "Not started"
                        ? "bg-slate-200 text-slate-600"
                        : "bg-slate-100 text-slate-400"
                  }`}>
                    {quiz.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {lessonPhase === "lesson" && activePage === "lessons" && (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <PlayCircle className="h-4 w-4 text-slate-400" /> Lesson
                </div>
                <span className="text-xs text-slate-400">~{activeCourse.readingTime} min read</span>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm leading-7 text-slate-600">{activeCourse.lesson}</p>
                <motion.button
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  onClick={startLesson}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r ${activeCourse.color} py-2.5 text-sm font-semibold text-white shadow-sm`}
                >
                  I have read this. Take the quiz <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {(lessonPhase === "quiz" || lessonPhase === "result" || activePage === "practice") && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-slate-400" /> Knowledge Check
                </div>
                <div className="flex items-center gap-3">
                  {attempts > 0 && (
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                      Attempt {attempts}
                    </span>
                  )}
                  <FocusTimer active={timerActive && lessonPhase === "quiz"} onTick={handleFocusTick} />
                </div>
              </div>

              <div className="space-y-4 px-5 py-4">
                <p className="text-sm font-semibold leading-6 text-slate-800">{activeCourse.quiz.question}</p>

                <div className="space-y-2">
                  {activeCourse.quiz.options.map((option, index) => {
                    const sel = selectedOption === index;
                    const isCorrect = activeCourse.quiz.answer === index;
                    const showCorrect = submitted && isCorrect;
                    const showWrong = submitted && sel && !isCorrect;
                    return (
                      <motion.button
                        key={option}
                        whileHover={!submitted ? { x: 3 } : {}}
                        onClick={() => !submitted && setSelectedOption(index)}
                        className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                          showCorrect ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                          : showWrong ? "border-rose-300 bg-rose-50 text-rose-800"
                          : sel ? "border-slate-800 bg-slate-900 text-white"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                            showCorrect ? "bg-emerald-500 text-white"
                            : showWrong ? "bg-rose-500 text-white"
                            : sel ? "bg-white/20 text-white"
                            : "bg-slate-200 text-slate-500"
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="leading-relaxed">{option}</span>
                          {showCorrect && <CheckCircle2 className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />}
                          {showWrong && <XCircle className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-rose-500" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {!submitted && (
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <motion.button
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                      onClick={submitAnswer}
                      disabled={selectedOption === null}
                      className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition ${
                        selectedOption === null
                          ? "cursor-not-allowed bg-slate-300"
                          : `bg-gradient-to-r ${activeCourse.color} shadow-sm`
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" /> Submit Answer
                    </motion.button>
                    {attempts > 0 && !showHint && (
                      <button
                        onClick={() => setShowHint(true)}
                        className="flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-sm font-medium text-amber-700 hover:bg-amber-100"
                      >
                        <HelpCircle className="h-3.5 w-3.5" /> Get a Hint
                      </button>
                    )}
                  </div>
                )}

                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                        <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-amber-700">
                          <Lightbulb className="h-3.5 w-3.5" /> Hint
                        </p>
                        <p className="text-sm leading-relaxed text-amber-900">{activeCourse.quiz.hint}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div className={`rounded-lg border p-4 ${answerCorrect ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
                        <div className="flex items-start gap-3">
                          {answerCorrect
                            ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                            : <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />}
                          <div>
                            <p className={`text-sm font-bold ${answerCorrect ? "text-emerald-800" : "text-rose-800"}`}>
                              {answerCorrect ? "Correct" : "Not quite. Review below"}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-700">
                              {activeCourse.quiz.explanation}
                            </p>
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {showChallenge && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="overflow-hidden"
                          >
                            <div className="rounded-lg border border-violet-200 bg-violet-50 px-4 py-3">
                              <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-violet-700">
                                <Zap className="h-3.5 w-3.5" /> Challenge Question
                              </p>
                              <p className="text-sm leading-relaxed text-violet-900">
                                {activeCourse.quiz.challengeQuestion}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex flex-wrap gap-2">
                        {!answerCorrect && (
                          <button
                            onClick={retryQuiz}
                            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <RefreshCw className="h-3.5 w-3.5" /> Try Again
                          </button>
                        )}
                        <button
                          onClick={resetLesson}
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                          <BookOpen className="h-3.5 w-3.5" /> Re-read Lesson
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {activePage === "practice" && (sessionStreak >= 2 || totalCorrect >= 3) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border border-amber-200 bg-amber-50 p-4"
          >
            <h3 className="mb-2.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-700">
              <Award className="h-3.5 w-3.5" /> Achievements
            </h3>
            <div className="space-y-1.5">
              {sessionStreak >= 2 && (
                <div className="flex items-center gap-2 text-xs text-amber-700">
                  <Flame className="h-3.5 w-3.5 shrink-0" />
                  <span>{sessionStreak}-answer streak</span>
                </div>
              )}
              {totalCorrect >= 3 && (
                <div className="flex items-center gap-2 text-xs text-amber-700">
                  <Star className="h-3.5 w-3.5 shrink-0" />
                  <span>{totalCorrect} correct answers this session</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
