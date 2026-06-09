import buttonSignalIllustration from '../../../../assets/button-square-wave.svg';

export function LessonTwo() {
  return (
    <article className="lesson-one-content">
      <div className="lesson-one-tags">
        <span>Wejscia cyfrowe</span>
        <span>Przycisk</span>
      </div>
      <h3>Lekcja 2: Sprawdzanie stanu przycisku</h3>
      <p>
        W tej lekcji pin GPIO12 pracuje jako wejscie i odczytuje stan przycisku.
        Gdy przycisk jest wcisniety, pin zwraca HIGH. Gdy nie jest wcisniety,
        pin zwraca LOW.
      </p>
      <p>
        Typowy schemat odczytu wejscia to:
      </p>
      <ul className="lesson-one-list">
        <li>Konfiguracja pinu jako Pin.IN.</li>
        <li>Uzycie rezystora podciagajacego (pull-up lub pull-down).</li>
        <li>Cykliczny odczyt value() i reakcja na zmiane stanu.</li>
      </ul>
      <blockquote>
        Odczyt stanu przycisku jest podstawa do obslugi zdarzen,
        np. wlaczenia LED, uruchomienia timera lub zmiany trybu pracy.
      </blockquote>

      <figure className="lesson-one-illustration">
        <img src={buttonSignalIllustration} alt="Przebieg prostokatny sygnalu z przycisku: LOW i HIGH" />
        <figcaption>Przy nacisnieciu pojawia sie stan HIGH, po puszczeniu sygnal wraca do LOW.</figcaption>
      </figure>
    </article>
  );
}
