import Pacman from '@/components/pacman/Pacman';

export default function PackmanProgress() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Pacman animationTime='6s' animationDelay='0.5s'/>
    </main>
  );
}
