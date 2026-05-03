export function WelcomePage() {
  return (
    <section className="page-card hero-card">
      <span className="page-kicker">Ekran 1</span>
      <h1>Strona powitalna</h1>
      <p>
        To miejsce na pierwsze wrazenie, krotki opis projektu i przyciski prowadzące dalej.
      </p>
      <div className="page-grid">
        <article className="info-box">
          <h2>Cel aplikacji</h2>
          <p>Ogólny ekran startowy dla uzytkownika odwiedzajacego aplikacje po raz pierwszy.</p>
        </article>
        <article className="info-box">
          <h2>Miejsce na CTA</h2>
          <p>Tutaj mozesz pozniej dodac logowanie, rejestracje albo przekierowanie do tresci.</p>
        </article>
      </div>
    </section>
  );
}
