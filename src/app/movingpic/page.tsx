import MovingPic from "@/components/movingpic/MovingPic";

export default function PackmanProgress() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MovingPic src='/images/dog.jpg' width='628' height='628' />
    </main>
  );
}
