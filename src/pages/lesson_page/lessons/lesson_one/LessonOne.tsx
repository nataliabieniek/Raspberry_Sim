export function LessonOne() {
  return (
    <article className="lesson-one-content">
      <div className="lesson-one-tags">
        <span>Digital Signal</span>
        <span>GPIO Basics</span>
      </div>
      <h3>Lekcja 1: Miganie dioda LED</h3>
      <p>
        Sygnał cyfrowy ma dwa stany: ON (HIGH) oraz OFF (LOW). W tym cwiczeniu
        ustawiasz GPIO25 jako wyjscie i przełączasz stan diody co 0.5 sekundy.
      </p>
      <blockquote>
        Gdy pin jest w stanie HIGH, dioda sie swieci. Gdy przechodzisz na LOW,
        dioda gasnie. To najprostsza petla sterowania wyjsciem.
      </blockquote>
      <button type="button">Open Full Theory</button>
    </article>
  );
}
