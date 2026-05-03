import { UsersSummaryCard } from '../features/users/components/UsersSummaryCard';

export function EducationPage() {
  return (
    <section className="page-card">
      <span className="page-kicker">Ekran 2</span>
      <h1>Glowna strona edukacyjna</h1>
      <p>
        Glowny widok na materialy, sekcje kursowe, lekcje albo dashboard edukacyjny.
      </p>
      <div className="page-grid">
        <article className="info-box">
          <h2>Sekcja materialow</h2>
          <p>Miejsce na listy kursow, kategorii, modulow i filtrow REST API.</p>
        </article>
        <UsersSummaryCard />
      </div>
    </section>
  );
}
