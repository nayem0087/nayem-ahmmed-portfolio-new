export default function GlobalBackground() {
    console.log('why')
  return (
    <div   className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="bg-blob bg-blob-2 absolute w-[45vw] h-[45vw] bg-green-500/50 rounded-full blur-[50px]" />
      <div className="absolute bottom-20 right-20 w-[400px] h-[400px] rounded-full bg-purple-500 opacity-50 blur-[100px]" />
    </div>
  );
}