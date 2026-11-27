/** Former employers set as type, not logos: quieter, and no borrowed brand art. */
export function CompanyList({ companies, label = "Worked with" }: { companies: string[]; label?: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
      <span className="text-sm text-muted">{label}</span>
      <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
        {companies.map((c) => (
          <li key={c} className="font-serif text-xl text-ink/70">{c}</li>
        ))}
      </ul>
    </div>
  );
}
