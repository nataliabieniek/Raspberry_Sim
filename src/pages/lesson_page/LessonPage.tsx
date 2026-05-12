import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, PointerEvent as ReactPointerEvent } from 'react';
import { LessonOne } from './lessons/lesson_one/LessonOne';
import './lesson-page.css';

export function LessonPage() {
  const [code, setCode] = useState(
    [
      'from machine import Pin',
      'import utime',
      '',
      '# Initialize onboard LED on GPIO 25',
      'led = Pin(25, Pin.OUT)',
      '',
      'while True:',
      '    led.value(1)  # LED ON',
      '    utime.sleep(0.5)',
      '    led.value(0)  # LED OFF',
      '    utime.sleep(0.5)',
    ].join('\n'),
  );
  const [popupPos, setPopupPos] = useState({ x: 28, y: 28 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const simulatorRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging || !simulatorRef.current || !popupRef.current) {
        return;
      }

      const simRect = simulatorRef.current.getBoundingClientRect();
      const popupRect = popupRef.current.getBoundingClientRect();
      const minX = 8;
      const minY = 8;
      const maxX = simRect.width - popupRect.width - 8;
      const maxY = simRect.height - popupRect.height - 8;

      const nextX = event.clientX - simRect.left - dragOffsetRef.current.x;
      const nextY = event.clientY - simRect.top - dragOffsetRef.current.y;

      setPopupPos({
        x: Math.max(minX, Math.min(nextX, maxX)),
        y: Math.max(minY, Math.min(nextY, maxY)),
      });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  const handleDragStart = (event: ReactPointerEvent<HTMLElement>) => {
    if (!popupRef.current) {
      return;
    }

    const popupRect = popupRef.current.getBoundingClientRect();
    dragOffsetRef.current = {
      x: event.clientX - popupRect.left,
      y: event.clientY - popupRect.top,
    };
    setIsDragging(true);
  };

  return (
    <section className="lesson-main">
      <div className="lesson-ide-side">
        <header className="lesson-ide-topbar">
          <div className="lesson-tabs">
            <button className="lesson-tab lesson-tab-active" type="button">main.py</button>
            <button className="lesson-tab" type="button">notes.txt</button>
          </div>
          <button className="lesson-run-button" type="button">Run Script</button>
        </header>

        <div className="lesson-editor-wrapper">
          <label className="lesson-editor-label" htmlFor="lesson-code-input">
            Pole kodu
          </label>
          <textarea
            id="lesson-code-input"
            className="lesson-code-textarea"
            value={code}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setCode(event.target.value)}
            spellCheck={false}
          />
        </div>

        <footer className="lesson-terminal">
          <p className="lesson-terminal-meta">Terminal output</p>
          <p className="lesson-terminal-success">&gt;&gt;&gt; Running main.py...</p>
          <p className="lesson-terminal-info">Device connected on /dev/tty.usbmodem101</p>
          <p className="lesson-terminal-info">_</p>
        </footer>
      </div>

      <div className="lesson-simulator-side" ref={simulatorRef}>
        <header className="lesson-simulator-topbar">Simulator</header>

        <div className="lesson-simulator-content">
          <section className="lesson-sim-placeholder">
            <h3>Obszar symulacji</h3>
            <p>
              Na tym etapie to frontendowy kontener pod przyszla logike symulacji.
              W kolejnych krokach mozna podlaczyc stany GPIO, LED i przycisk.
            </p>
            <div className="lesson-sim-grid" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </section>

          <section className="lesson-gpio-card">
            <header>
              <span>GPIO Inspector</span>
              <strong>Live</strong>
            </header>
            <div className="lesson-gpio-row">
              <div>
                <span>GPIO</span>
                <p>GPIO25</p>
              </div>
              <div>
                <span>Mode</span>
                <p>OUT</p>
              </div>
              <div>
                <span>State</span>
                <p>HIGH</p>
              </div>
              <div>
                <span>Value</span>
                <p>1</p>
              </div>
            </div>
          </section>
        </div>

        <aside
          className={`lesson-theory-panel${isDragging ? ' lesson-theory-panel-dragging' : ''}`}
          ref={popupRef}
          style={{ left: `${popupPos.x}px`, top: `${popupPos.y}px` }}
        >
          <header onPointerDown={handleDragStart} className="lesson-theory-drag-handle">
            <h2>Theory Panel</h2>
            <small>przesun panel</small>
          </header>
          <div className="lesson-theory-content">
            <LessonOne />
          </div>
        </aside>
      </div>
    </section>
  );
}
