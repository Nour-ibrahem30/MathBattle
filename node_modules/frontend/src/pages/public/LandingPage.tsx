import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Swords, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-outline-variant/40 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
          <span className="text-headline-md font-bold text-primary">MathBattle</span>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-label-md text-on-surface-variant hover:text-primary">Features</a>
            <a href="#how" className="text-label-md text-on-surface-variant hover:text-primary">How it works</a>
          </nav>
          <div className="flex gap-3">
            <Link to="/login"><Button variant="ghost">Sign in</Button></Link>
            <Link to="/login"><Button>Get started</Button></Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-content px-6 py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-fixed px-4 py-1.5 text-label-sm font-semibold text-primary">
              <Brain className="h-4 w-4" /> AI-Powered EdTech SaaS
            </p>
            <h1 className="text-headline-xl font-bold tracking-tight text-on-surface lg:text-[3.5rem]">
              Mathematics learning that <span className="text-primary-container">motivates</span> without distracting.
            </h1>
            <p className="mt-6 text-body-lg text-on-surface-variant">
              MathBattle combines curriculum-aligned learning paths, teacher-reviewed AI content, and fair competitive matches — so students build real skills, not just points.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/login"><Button size="lg">Start learning <ArrowRight className="h-5 w-5" /></Button></Link>
              <Link to="/login"><Button size="lg" variant="outline">Teacher demo</Button></Link>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl border border-outline-variant/60 bg-gradient-to-br from-primary-fixed/40 to-secondary-fixed/30 p-8 shadow-elevated">
              <div className="grid gap-4">
                <Card className="!p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container text-white"><BookOpen className="h-5 w-5" /></div>
                    <div><p className="font-semibold">Continue: Adding Fractions</p><p className="text-label-sm text-on-surface-variant">60% complete</p></div>
                  </div>
                </Card>
                <Card className="!p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container text-white"><Swords className="h-5 w-5" /></div>
                    <div><p className="font-semibold">Match invite from Sam</p><p className="text-label-sm text-on-surface-variant">Same grade · Grade 5</p></div>
                  </div>
                </Card>
                <Card className="!p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tertiary-container text-white"><Zap className="h-5 w-5" /></div>
                    <div><p className="font-semibold">5-day streak · Scholar rank</p><p className="text-label-sm text-on-surface-variant">1,240 XP earned</p></div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-outline-variant/40 bg-surface-container-low py-20">
        <div className="mx-auto max-w-content px-6">
          <h2 className="text-center text-headline-lg font-semibold">Built for learning first</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Structured paths', desc: 'Grade-aligned units from lesson to assessment.' },
              { title: 'Teacher-reviewed AI', desc: 'Generate questions fast — publish only what you trust.' },
              { title: 'Fair matches', desc: 'Same-grade 1v1 battles that reinforce skills.' },
            ].map((f) => (
              <Card key={f.title} hover>
                <h3 className="font-semibold text-on-surface">{f.title}</h3>
                <p className="mt-2 text-body-md text-on-surface-variant">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-8 text-center text-label-md text-on-surface-variant">
        © 2026 MathBattle · Education outcomes over engagement metrics
      </footer>
    </div>
  );
}
