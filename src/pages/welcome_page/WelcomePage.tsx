import './WelcomePage.css';

export function WelcomePage() {
  return (
    <div className="welcomePage">
      <main className="mainContent">
        {/* ---------- Hero ---------- */}
        <section className="heroSection">
          <div className="heroGradient" aria-hidden="true" />
          <div className="heroContainer">
            <div className="heroSpacer" />
            <div className="heroHeading">
              <h1 className="heroTitle">Naucz się Raspberry Pi Pico bez Hardware</h1>
            </div>
            <div className="heroSubtitleWrapper">
              <p className="heroSubtitle">
                Zero konfiguracji. Zero kosztów sprzętu. Programuj i obserwuj efekty natychmiast w przeglądarce.
              </p>
            </div>
            <div className="heroButtons">
              <button className="btnPrimary">
                <span className="btnPrimaryText">Rozpocznij naukę</span>
              </button>
              <button className="btnSecondary">
                <span className="btnSecondaryText">Przegląd Lekcji</span>
              </button>
            </div>
          </div>

          <div className="heroMedia">
            <div className="heroImageWrapper">
              <div
                className="heroImage"
                role="img"
                aria-label="Wizualizacja symulatora Raspberry Pi Pico"
              />
            </div>
          </div>
        </section>

        {/* ---------- Features ---------- */}
        <section className="featuresSection">
          <div className="featuresContainer">
            {/* Feature 1: Virtual Simulator */}
            <div className="featureRow">
              <div className="featureText">
                <div className="featureLabel">
		  <img src="/cpu.svg" alt="" className="featureLabelIcon" aria-hidden="true" />
                  <span className="featureLabelText">Symulacja w czasie rzeczywistym</span>
                </div>
                <h2 className="featureHeading">Wirtualny Symulator</h2>
                <p className="featureDesc">
                  Silnik w przeglądarce wiernie odwzorowuje charakterystyki chipu Raspberry Pi Pico. Podłącz sensory i aktuatory do wirtualnej płytki — obserwuj efekty natychmiast, bez konfiguracji środowiska.
                </p>
                <ul className="featureList">
                  <li className="featureItem">
		    <img src="/check_circle.svg" alt="" className="featureLabelIcon" aria-hidden="true" />
                    <span className="featureItemText">Natychmiastowa reakcja peryferii na kod</span>
                  </li>
                  <li className="featureItem">
		    <img src="/check_circle.svg" alt="" className="featureLabelIcon" aria-hidden="true" />
                    <span className="featureItemText">Dokładna mapa pinout dla Pico i Pico W</span>
                  </li>
                  <li className="featureItem">
		    <img src="/check_circle.svg" alt="" className="featureLabelIcon" aria-hidden="true" />
                    <span className="featureItemText">Biblioteka 50+ komponentów: od LED po PWM</span>
                  </li>
                </ul>
              </div>
              <div className="featureImageCard">
                <div
                  className="featureImage"
                  role="img"
                  aria-label="Zrzut ekranu symulatora"
                />
              </div>
            </div>

            {/* Feature 2: Interactive IDE */}
            <div className="ideRow">
              <div className="ideBlock">
                <div className="ideShadow" aria-hidden="true" />
                <div className="ideHeader">
                  <span className="ideDotRed" aria-hidden="true" />
                  <span className="ideDotYellow" aria-hidden="true" />
                  <span className="ideDotGreen" aria-hidden="true" />
                  <span className="ideTitle">main.py</span>
                </div>
                <pre className="idePre">
                  <code className="ideCode">
                    <span className="c-pink">from machine import Pin</span>{"\n"}
                    <span className="c-pink">import utime</span>{"\n"}
                    {"\n"}
                    <span className="c-cyan">led = Pin(25, Pin.OUT)</span>{"\n"}
                    <span className="c-cyan">while True:</span>{"\n"}
                    {"    "}<span className="c-cyan">led.toggle()</span>{"\n"}
                    {"    "}<span className="c-cyan">utime.sleep(0.5)</span>
                  </code>
                </pre>
              </div>

              <div className="ideText">
                <div className="featureLabel">
		  <img src="/dev.svg" alt="" className="featureLabelIcon" aria-hidden="true" />
                  <span className="featureLabelText">Środowisko programistyczne</span>
                </div>
                <h2 className="featureHeading">Interaktywne IDE</h2>
                <p className="featureDesc">
                  Pełnoprawne IDE działające w przeglądarce. Podświetlanie składni, numeracja linii i autouzupełnianie modułów machine oraz utime. Kod uruchamia się lokalnie przez WebAssembly — bez serwera, bez opóźnień.
                </p>
                <div className="ideSubfeatures">
                  <div className="ideSubfeature">
                    <h4 className="ideSubfeatureTitle">REPL</h4>
                    <p className="ideSubfeatureDesc">Wykonywanie komend na żywo na wirtualnym rdzeniu RP2040.</p>
                  </div>
                  <div className="ideSubfeature">
                    <h4 className="ideSubfeatureTitle">Debugger</h4>
                    <p className="ideSubfeatureDesc">Sprawdzaj stany GPIO i pamięć w czasie rzeczywistym.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="ctaSection">
          <div className="ctaBox">
            <h2 className="ctaHeading">Czas na Raspberry Pi Pico</h2>
            <p className="ctaDesc">
              Ucz się MicroPythona na żywo. Koduj, testuj i obserwuj efekty w pełnym środowisku w przeglądarce.
            </p>
            <button className="ctaButton">
              <span className="ctaShadow" aria-hidden="true" />
              <span className="ctaButtonText">Rozpocznij naukę</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
