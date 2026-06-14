export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto mt-10 max-w-2xl px-5">
      <h2 className="text-xl">{title}</h2>
      <div className="mt-3 whitespace-pre-line text-base leading-relaxed text-ink-700">
        {children}
      </div>
    </section>
  );
}
