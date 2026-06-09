import './proposal-page.css';

export function ProposalPage() {
    return (
        <section className="proposal-page">
            <div className="proposal-card">
                <div className="proposal-left">
                    <div className="proposal-icon" aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <circle cx="11" cy="9" r="6" stroke="#a60036" strokeWidth="1.8" fill="none"/>
                            <path d="M11 15v4M8 19h6" stroke="#a60036" strokeWidth="1.8" strokeLinecap="round"/>
                            <path d="M8.5 9a2.5 2.5 0 0 1 5 0" stroke="#a60036" strokeWidth="1.6" strokeLinecap="round"/>
                        </svg>
                    </div>

                    <h1 className="proposal-title">Zgłoś propozycję lekcji</h1>

                    <p className="proposal-description">
                        Stale rozwijamy nasz program nauczania. Masz pomysł na
                        nowy temat? Chcesz dowiedzieć się więcej o konkretnym
                        czujniku lub protokole komunikacyjnym? Daj nam znać!
                        Twoja propozycja może stać się kolejnym modułem w
                        naszym kursie.
                    </p>

                    <blockquote className="proposal-quote">
                        <p>
                            "Edukacja to dzielenie się pasją. Pomóż nam tworzyć
                            najlepszą platformę do nauki MicroPython w Polsce."
                        </p>
                    </blockquote>
                </div>

                <div className="proposal-right">
                    <div className="proposal-form">
                        <div className="proposal-field">
                            <label className="proposal-label" htmlFor="proposal-topic">
                                Temat lekcji
                            </label>
                            <input
                                id="proposal-topic"
                                className="proposal-input"
                                type="text"
                                placeholder="np. Obsługa akcelerometru MPU6050"
                                autoComplete="off"
                            />
                        </div>

                        <div className="proposal-field">
                            <label className="proposal-label" htmlFor="proposal-description">
                                Krótki opis
                            </label>
                            <textarea
                                id="proposal-description"
                                className="proposal-textarea"
                                placeholder="Opisz czego chciałbyś się nauczyć lub jaki problem rozwiązać..."
                                rows={5}
                            />
                        </div>

                        <button className="proposal-submit" type="button">
                            Wyślij propozycję
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
