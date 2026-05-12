export function WelcomePage() {
  return (
    <section className="page-card hero-card">
      <span className="page-kicker">Welcome Page</span>
      <h1>Strona powitalna</h1>
      <p>To miejsce na pierwsze wrazenie i szybkie przejscie do logowania albo lekcji.</p>
      <div className="page-grid">
        <article className="info-box">
          <h2>Co dalej?</h2>
          <p>W kolejnym kroku mozesz przejsc do logowania lub bezposrednio do strony lekcji.</p>
        </article>
        <article className="info-box">
          <h2>Nawigacja</h2>
          <p>W gornym menu znajdziesz gotowe przejscia do kazdej przygotowanej sekcji.</p>
        </article>
      </div>
    </section>
  );
}
