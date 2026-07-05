import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAppStore } from '@/stores/appStore';
import { getDefaultRoute } from '@/config/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('student1@demo.mathbattle.io');
  const [password, setPassword] = useState('Demo1234!');
  const [error, setError] = useState('');
  const login = useAppStore((s) => s.login);
  const isLoading = useAppStore((s) => s.isLoading);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.ok) {
      const user = useAppStore.getState().user;
      if (user) navigate(getDefaultRoute(user.role));
    } else {
      setError(result.error ?? 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-primary-container p-12 text-white lg:flex">
        <div>
          <h1 className="text-headline-xl font-bold">MathBattle</h1>
          <p className="mt-2 text-body-lg text-white/80">Where learning meets mastery.</p>
        </div>
        <div className="space-y-8">
          {[
            { icon: Sparkles, title: 'AI-Assisted Learning', desc: 'Personalized practice that adapts to each student.' },
            { icon: TrendingUp, title: 'Measurable Progress', desc: 'Curriculum-aligned paths with clear outcomes.' },
            { icon: Shield, title: 'Safe for K–12', desc: 'COPPA-compliant, privacy-first design.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-white/70">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-white/50">© 2026 MathBattle. Education first.</p>
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-8 inline-block text-headline-md font-bold text-primary lg:hidden">
            MathBattle
          </Link>
          <h2 className="text-headline-lg font-semibold text-on-surface">Welcome back</h2>
          <p className="mt-2 text-body-md text-on-surface-variant">Sign in to continue your learning journey.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
            {error && <p className="rounded-lg bg-error-container px-4 py-3 text-label-md text-error" role="alert">{error}</p>}
            <Button type="submit" className="w-full" size="lg" loading={isLoading}>
              Sign in
            </Button>
          </form>
          <div className="mt-8 rounded-xl border border-outline-variant/60 bg-surface-container-low p-4">
            <p className="mb-2 text-label-sm font-semibold uppercase text-on-surface-variant">Demo accounts</p>
            <div className="space-y-1 text-label-md text-on-surface-variant">
              <p>Student: student1@demo.mathbattle.io</p>
              <p>Teacher: teacher@demo.mathbattle.io</p>
              <p>Admin: admin@demo.mathbattle.io</p>
              <p className="font-medium text-on-surface">Password: Demo1234!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
