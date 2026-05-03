export function AboutPage() {
  return (
    <section className="page-card">
      <span className="page-kicker">Ekran 3</span>
      <h1>O stronie</h1>
      <p>
        Tu mozna opisac autorow, zalozenia projektu, technologie i sposob rozwoju aplikacji.
      </p>
      <div className="page-grid">
        <article className="info-box">
          <h2>Stack</h2>
          <p>Frontend React + Router, backend REST, baza danych uzytkownikow i dalsze moduly.</p>
        </article>
        <article className="info-box">
          <h2>Rozwoj projektu</h2>
          <p>To dobre miejsce na roadmapę, changelog lub dokumentacje architektury.</p>
        </article>
      </div>
    </section>
  );
}
