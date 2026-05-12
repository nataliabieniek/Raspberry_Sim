export function LoginPage() {
  return (
    <section className="page-card">
      <span className="page-kicker">Login Page</span>
      <h1>Logowanie</h1>
      <p>Tu przygotujesz pozniej formularz logowania i obsluge sesji uzytkownika.</p>
      <div className="page-grid">
        <article className="info-box">
          <h2>Pole na formularz</h2>
          <p>Docelowo: email, haslo, walidacja i obsluga bledow z API.</p>
        </article>
        <article className="info-box">
          <h2>Integracja</h2>
          <p>Ta sekcja jest gotowa pod podpiecie endpointow backendowych.</p>
        </article>
      </div>
    </section>
  );
}
