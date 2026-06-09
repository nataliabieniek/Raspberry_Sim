import electronicsIllustration from '../../../../assets/electronics-generated.svg';

export function LessonOne() {
  return (
    <article className="lesson-one-content">
      <div className="lesson-one-tags">
        <span>Sygnal cyfrowy</span>
        <span>Podstawy GPIO</span>
      </div>
      <h3>Lekcja 1: Miganie dioda LED</h3>
      <p>
        Sygnał cyfrowy ma dwa stany: ON (HIGH) oraz OFF (LOW). W tym cwiczeniu
        ustawiasz GPIO25 jako wyjscie i przełączasz stan diody co 0.5 sekundy.
      </p>
      <p>
        GPIO (General Purpose Input/Output) to uniwersalne piny mikrokontrolera.
        Kazdy pin moze pracowac jako wejscie (INPUT) albo wyjscie (OUTPUT).
        W trybie OUTPUT pin wystawia stan logiczny, a w trybie INPUT odczytuje
        sygnal z przycisku, czujnika lub innego ukladu.
      </p>
      <p>
        Dla Raspberry Pi Pico najczesciej spotkasz trzy kroki:
      </p>
      <ul className="lesson-one-list">
        <li>Konfiguracja pinu, np. GPIO25 jako Pin.OUT.</li>
        <li>Ustawienie stanu HIGH lub LOW.</li>
        <li>Dodanie opoznienia, aby uzyskac widoczny efekt migania.</li>
      </ul>
      <blockquote>
        Gdy pin jest w stanie HIGH, dioda sie swieci. Gdy przechodzisz na LOW,
        dioda gasnie. To najprostsza petla sterowania wyjsciem.
      </blockquote>

      <figure className="lesson-one-illustration">
        <img src={electronicsIllustration} alt="Schemat elektroniki: mikrokontroler, rezystor, LED i przycisk" />
        <figcaption>Przykladowy uklad: GPIO steruje LED przez rezystor, a przycisk podaje sygnal na pin wejsciowy.</figcaption>
      </figure>
    </article>
  );
}
