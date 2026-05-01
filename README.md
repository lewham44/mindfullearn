# MindfulLearn

MindfulLearn is a simple e-learning prototype that demonstrates emotion-aware, adaptive support. It pairs short lessons and quizzes with learner self-reporting and basic behavioral signals to classify emotional state and adjust the learning response.

## What the app does

- Offers four mock courses: Machine Translation, Web Development, Software Engineering II, and Life & Works of Rizal.
- Presents a lesson capsule, learning objective, and a short quiz for each course.
- Collects learner mood, quiz correctness, number of attempts, and simulated focus time.
- Classifies the learner as engaged, neutral, confused, or frustrated using rule-based logic.
- Delivers adaptive guidance based on the detected emotion.
- Records a session log with course, emotion, correctness, strategy, and time.

## How emotion-aware support works

MindfulLearn uses transparent, non-invasive signals instead of camera-based emotion detection. The learner selects a mood and answers a quiz; the system combines that with attempts and a focus-time slider to determine an emotional state.

Rules are intentionally simple and explainable:

- Frustrated: self-reported frustration or repeated incorrect attempts.
- Confused: self-reported confusion or an incorrect answer after a single attempt.
- Engaged: self-reported engagement, correct answer, and sufficient focus time.
- Neutral: fallback when none of the above conditions are met.

Each emotional state is linked to a learning response:

- Engaged: challenge mode (deeper practice or continued pace).
- Neutral: guided example to build clarity and motivation.
- Confused: scaffolded hints and simpler explanations.
- Frustrated: recovery mode with encouragement, a break suggestion, and easier review.

## Why this matters

Learning is both cognitive and emotional. MindfulLearn shows how an e-learning interface can respond to engagement, confusion, or frustration instead of treating every learner the same way. The goal is not to replace teachers, but to demonstrate a student-centered interface that supports persistence and adapts to emotional needs.

## Architecture overview

- Single-page React app with three main areas: course selection, lesson/quiz, and adaptive coach.
- Rule-based emotion classification for clarity and easy adjustment.
- Session logging to review learner interactions and outcomes.

## Limitations

- Emotion detection is simplified and based on self-report plus basic signals.
- Focus time is simulated; real attention tracking is not implemented.
- Courses are short, each with one quiz item, and there are no user accounts.

## Run locally

```bash
npm install
npm run dev
```
