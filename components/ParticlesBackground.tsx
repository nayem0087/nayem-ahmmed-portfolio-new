export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}