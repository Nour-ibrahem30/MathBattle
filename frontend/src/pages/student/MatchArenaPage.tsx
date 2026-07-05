import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, Swords } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore } from '@/stores/appStore';
import type { CardColor, Question } from '@/types';
import { CARD_CONFIG } from '@/types';

const CARD_COLORS: Record<CardColor, string> = {
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
};

const MATCH_TIME_SECONDS = 120;

function checkAnswer(question: Question, answer: string): boolean {
  if (question.questionType === 'multiple_choice') {
    return question.options?.find((o) => o.text === answer)?.isCorrect ?? false;
  }
  if (question.questionType === 'true_false') {
    return answer.toLowerCase() === question.correctAnswer?.toLowerCase();
  }
  return answer.trim().toLowerCase() === question.correctAnswer?.trim().toLowerCase();
}

export default function MatchArenaPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user)!;
  const data = useAppStore((s) => s.data);
  const getMatch = useAppStore((s) => s.getMatch);
  const submitMatchAnswer = useAppStore((s) => s.submitMatchAnswer);
  const completeMatch = useAppStore((s) => s.completeMatch);

  const match = id ? getMatch(id) : undefined;
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(MATCH_TIME_SECONDS);
  const simulatedRef = useRef<Set<number>>(new Set());

  const isPlayer1 = match?.player1UserId === user.id;
  const myScore = isPlayer1 ? match?.player1Score ?? 0 : match?.player2Score ?? 0;
  const oppScore = isPlayer1 ? match?.player2Score ?? 0 : match?.player1Score ?? 0;
  const opponentId = isPlayer1 ? match?.player2UserId : match?.player1UserId;
  const opponentName = isPlayer1 ? match?.player2Name : match?.player1Name;

  const simulateOpponent = useCallback(
    (cardIndex: number) => {
      if (!match || !opponentId || simulatedRef.current.has(cardIndex)) return;
      simulatedRef.current.add(cardIndex);
      const card = match.cards[cardIndex];
      if (!card) return;
      const question = data.questions.find((q) => q.id === card.questionId);
      if (!question) return;

      setTimeout(() => {
        const currentMatch = getMatch(match.id);
        if (!currentMatch || currentMatch.status === 'completed') return;
        const c = currentMatch.cards[cardIndex];
        if (!c || (isPlayer1 ? c.player2Answer : c.player1Answer)) return;

        const options = question.options ?? [{ text: question.correctAnswer ?? 'true', isCorrect: true }];
        const pickRandom = Math.random() > 0.35;
        const answer = pickRandom
          ? options.find((o) => o.isCorrect)?.text ?? options[0]!.text
          : options.find((o) => !o.isCorrect)?.text ?? options[0]!.text;
        const correct = checkAnswer(question, answer);
        submitMatchAnswer(match.id, opponentId, cardIndex, answer, correct);
      }, 800 + Math.random() * 1500);
    },
    [match, opponentId, data.questions, getMatch, isPlayer1, submitMatchAnswer],
  );

  useEffect(() => {
    if (!match || match.status === 'completed') return;
    match.cards.forEach((_, i) => simulateOpponent(i));
  }, [match, simulateOpponent]);

  useEffect(() => {
    if (!match || match.status === 'completed') return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          completeMatch(match.id);
          navigate(`/matches/${match.id}/result`);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [match, completeMatch, navigate]);

  useEffect(() => {
    if (!match) return;
    const allAnswered = match.cards.every((c) =>
      isPlayer1 ? c.player1Answer !== undefined : c.player2Answer !== undefined,
    );
    if (allAnswered && match.status === 'active') {
      completeMatch(match.id);
      navigate(`/matches/${match.id}/result`);
    }
  }, [match, isPlayer1, completeMatch, navigate, data.matches]);

  if (!match) {
    return (
      <EmptyState
        title="Match not found"
        description="This match does not exist or has expired."
        actionLabel="Back to lobby"
        onAction={() => navigate('/matches')}
      />
    );
  }

  if (match.status === 'completed') {
    navigate(`/matches/${match.id}/result`, { replace: true });
    return null;
  }

  const activeCard = match.cards[activeCardIndex];
  const question = data.questions.find((q) => q.id === activeCard?.questionId);
  const alreadyAnswered = isPlayer1
    ? activeCard?.player1Answer !== undefined
    : activeCard?.player2Answer !== undefined;

  const handleSubmit = () => {
    if (!selectedAnswer || !question || alreadyAnswered) return;
    const correct = checkAnswer(question, selectedAnswer);
    submitMatchAnswer(match.id, user.id, activeCardIndex, selectedAnswer, correct);
    setSelectedAnswer(null);
    const nextUnanswered = match.cards.findIndex((c, i) =>
      i > activeCardIndex && (isPlayer1 ? c.player1Answer === undefined : c.player2Answer === undefined),
    );
    if (nextUnanswered >= 0) setActiveCardIndex(nextUnanswered);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const renderOptions = () => {
    if (!question) return null;
    if (question.questionType === 'true_false') {
      return ['True', 'False'].map((opt) => (
        <button
          key={opt}
          type="button"
          disabled={alreadyAnswered}
          onClick={() => setSelectedAnswer(opt.toLowerCase())}
          className={`rounded-xl border px-4 py-3 text-left transition ${
            selectedAnswer === opt.toLowerCase() ? 'border-primary bg-primary-fixed' : 'border-outline-variant hover:border-primary/50'
          } ${alreadyAnswered ? 'opacity-50' : ''}`}
        >
          {opt}
        </button>
      ));
    }
    return question.options?.map((opt) => (
      <button
        key={opt.text}
        type="button"
        disabled={alreadyAnswered}
        onClick={() => setSelectedAnswer(opt.text)}
        className={`rounded-xl border px-4 py-3 text-left transition ${
          selectedAnswer === opt.text ? 'border-primary bg-primary-fixed' : 'border-outline-variant hover:border-primary/50'
        } ${alreadyAnswered ? 'opacity-50' : ''}`}
      >
        {opt.text}
      </button>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Swords className="h-6 w-6 text-primary" />
          <h1 className="text-headline-md font-bold">Live Match</h1>
        </div>
        <Badge variant="warning" className="normal-case">
          <Clock className="mr-1 inline h-3.5 w-3.5" />
          {formatTime(timeLeft)}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <Avatar name={user.fullName} />
            <div>
              <p className="font-semibold">You</p>
              <p className="text-headline-md font-bold text-primary">{myScore} pts</p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <Avatar name={opponentName ?? 'Opponent'} />
            <div>
              <p className="font-semibold">{opponentName}</p>
              <p className="text-headline-md font-bold text-secondary">{oppScore} pts</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
        {match.cards.map((card, i) => {
          const answered = isPlayer1 ? card.player1Answer !== undefined : card.player2Answer !== undefined;
          const correct = isPlayer1 ? card.player1Correct : card.player2Correct;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveCardIndex(i)}
              className={`relative flex h-16 flex-col items-center justify-center rounded-xl border-2 transition ${
                i === activeCardIndex ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant/60'
              } ${answered ? (correct ? 'bg-success-container/30' : 'bg-error-container/30') : 'bg-surface-container-low'}`}
            >
              <div className={`h-2 w-full rounded-t-lg ${CARD_COLORS[card.cardColor]}`} />
              <span className="mt-1 text-label-sm font-bold">{CARD_CONFIG[card.cardColor]}pt</span>
              <span className="text-label-sm text-on-surface-variant">{i + 1}</span>
            </button>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="!text-body-lg">Card {activeCardIndex + 1}</CardTitle>
            <Badge className={`normal-case text-white ${CARD_COLORS[activeCard?.cardColor ?? 'green']}`}>
              {activeCard ? CARD_CONFIG[activeCard.cardColor] : 0} points
            </Badge>
          </div>
        </CardHeader>
        <p className="mb-4 text-body-md">{question?.questionText}</p>
        <div className="grid gap-3 sm:grid-cols-2">{renderOptions()}</div>
        {!alreadyAnswered && (
          <Button className="mt-4 w-full" disabled={!selectedAnswer} onClick={handleSubmit}>
            Submit Answer
          </Button>
        )}
        {alreadyAnswered && (
          <p className="mt-4 text-center text-label-md text-on-surface-variant">
            Answer submitted — select another card
          </p>
        )}
      </Card>
    </div>
  );
}
