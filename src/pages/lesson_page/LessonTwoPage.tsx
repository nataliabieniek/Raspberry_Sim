import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, PointerEvent as ReactPointerEvent } from 'react';
import { LessonTwo } from './lessons/lesson_two/LessonTwo';
import picoBoardImage from '../../../3643332-40.jpg';
import './lesson-page.css';

export function LessonTwoPage() {
  const footerHeight = 61;
  const minimizedPanelHeight = 35;
  const minimizedPanelBottomOffset = 12;

  const [code, setCode] = useState(
    [
      'from machine import Pin',
      'import utime',
      '',
      '# Przycisk na GPIO12, zewnetrzna LED na GPIO15',
      'button = Pin(12, Pin.IN, Pin.PULL_DOWN)',
      'external_led = Pin(15, Pin.OUT)',
      '',
      'while True:',
      '    if button.value() == 1:',
      '        external_led.value(1)  # przycisk wcisniety',
      '    else:',
      '        external_led.value(0)  # przycisk puszczony',
      '    utime.sleep(0.05)',
    ].join('\n'),
  );
  const [popupPos, setPopupPos] = useState({ x: 32, y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isRectLedOn] = useState(false);
  const [isExternalLedOn, setIsExternalLedOn] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isLessonCompletedPopupOpen, setIsLessonCompletedPopupOpen] = useState(false);
  const [isHintBubbleOpen, setIsHintBubbleOpen] = useState(false);
  const [isCodeRunning, setIsCodeRunning] = useState(false);
  const [maxPanelSize, setMaxPanelSize] = useState({ width: 80, height: 80 }); // % viewport
  const [maxPanelPos, setMaxPanelPos] = useState({ left: 10, top: 10 }); // % viewport
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const resizeOffsetRef = useRef({ startX: 0, startY: 0, startWidth: 0, startHeight: 0, startLeft: 0, startTop: 0 });
  const simulatorRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const topForMinimizedPanel = window.innerHeight - footerHeight - minimizedPanelHeight - minimizedPanelBottomOffset;
    setPopupPos({ x: 32, y: Math.max(72, topForMinimizedPanel) });
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging || !popupRef.current) {
        return;
      }

      const popupRect = popupRef.current.getBoundingClientRect();
      const headerHeight = 64;
      const minX = 8;
      const minY = isMinimized ? 8 : headerHeight + 8;
      const maxX = window.innerWidth - popupRect.width - 8;
      const maxY = window.innerHeight - popupRect.height - 8;

      const nextX = event.clientX - dragOffsetRef.current.x;
      const nextY = event.clientY - dragOffsetRef.current.y;

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
  }, [isDragging, isMinimized]);

  useEffect(() => {
    const handleResizePointerMove = (event: PointerEvent) => {
      if (!isResizing || !popupRef.current) {
        return;
      }

      const deltaX = event.clientX - resizeOffsetRef.current.startX;
      const deltaY = event.clientY - resizeOffsetRef.current.startY;
      const vw = window.innerWidth / 100;
      const vh = window.innerHeight / 100;

      let newWidth = resizeOffsetRef.current.startWidth;
      let newHeight = resizeOffsetRef.current.startHeight;
      let newLeft = resizeOffsetRef.current.startLeft;
      let newTop = resizeOffsetRef.current.startTop;

      // Resize z lewej strony
      if (isResizing.includes('left')) {
        const deltaWidthPercent = -deltaX / vw;
        newWidth = resizeOffsetRef.current.startWidth + deltaWidthPercent;
        newLeft = resizeOffsetRef.current.startLeft - deltaWidthPercent;
      }

      // Resize z prawej strony
      if (isResizing.includes('right')) {
        newWidth = resizeOffsetRef.current.startWidth + deltaX / vw;
      }

      // Resize z góry
      if (isResizing.includes('top')) {
        const deltaHeightPercent = -deltaY / vh;
        newHeight = resizeOffsetRef.current.startHeight + deltaHeightPercent;
        newTop = resizeOffsetRef.current.startTop - deltaHeightPercent;
      }

      // Resize z dołu
      if (isResizing.includes('bottom')) {
        newHeight = resizeOffsetRef.current.startHeight + deltaY / vh;
      }

      // Min 40% width/height, Max 95%
      newWidth = Math.max(40, Math.min(newWidth, 95));
      newHeight = Math.max(40, Math.min(newHeight, 95));
      newLeft = Math.max(0, Math.min(newLeft, 100 - newWidth));
      newTop = Math.max(0, Math.min(newTop, 100 - newHeight));

      setMaxPanelSize({ width: newWidth, height: newHeight });
      setMaxPanelPos({ left: newLeft, top: newTop });
    };

    const handleResizePointerUp = () => {
      setIsResizing(null);
    };

    if (isResizing) {
      window.addEventListener('pointermove', handleResizePointerMove);
      window.addEventListener('pointerup', handleResizePointerUp);

      return () => {
        window.removeEventListener('pointermove', handleResizePointerMove);
        window.removeEventListener('pointerup', handleResizePointerUp);
      };
    }
  }, [isResizing]);

  useEffect(() => {
    if (!isCodeRunning) {
      setIsExternalLedOn(false);
      return;
    }

    setIsExternalLedOn(isButtonPressed);
  }, [isCodeRunning, isButtonPressed]);

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

  // Obsługa resize zmaksymalizowanego panelu
  const handleResizeStart = (event: ReactPointerEvent<HTMLElement>, edge: string) => {
    event.stopPropagation();
    resizeOffsetRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      startWidth: maxPanelSize.width,
      startHeight: maxPanelSize.height,
      startLeft: maxPanelPos.left,
      startTop: maxPanelPos.top,
    };
    setIsResizing(edge);
  };

  // Obsługa minimalizacji panelu - zawsze minimalizuje
  const handleMinimize = () => {
    setIsMinimized(true);
    setIsMaximized(false);
    // Po minimalizacji nie przeciągamy
    setIsDragging(false);
    // Pozycja startowa w lewym dolnym rogu (x to left, y to top)
    const topForMinimizedPanel = window.innerHeight - footerHeight - minimizedPanelHeight - minimizedPanelBottomOffset;
    setPopupPos({
      x: 32,
      y: Math.max(72, topForMinimizedPanel),
    });
  };

  // Obsługa maksymalizacji panelu na 80% body
  const handleMaximize = () => {
    setIsMaximized(true);
    setIsMinimized(false);
    // Po maksymalizacji nie przeciągamy
    setIsDragging(false);
  };

  const codeLineCount = code.split('\n').length;

  return (
    <section className="lesson-main">
      <div className="lesson-ide-side">
        <header className="lesson-ide-topbar">
          <div className="lesson-tabs">
            <button className="lesson-tab lesson-tab-active" type="button">main.py</button>
          </div>
          <div className="lesson-top-actions">
            <button
              className="lesson-action-button"
              type="button"
              onClick={() => setIsLessonCompletedPopupOpen(true)}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <g clipPath="url(#checkIconClip)">
                  <path d="M7.33342 3.69337V4.00004C7.33301 4.71884 7.10025 5.41826 6.66986 5.99398C6.23947 6.56969 5.63451 6.99086 4.9452 7.19467C4.25589 7.39848 3.51917 7.374 2.8449 7.1249C2.17064 6.87579 1.59497 6.4154 1.20373 5.81239C0.812503 5.20938 0.626678 4.49606 0.673974 3.77881C0.721269 3.06156 0.99915 2.37881 1.46617 1.83239C1.9332 1.28598 2.56434 0.905164 3.26548 0.746752C3.96661 0.588339 4.70017 0.660815 5.35675 0.95337M7.33342 1.33337L4.00008 4.67004L3.00008 3.67004" stroke="#F3F3F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="checkIconClip">
                    <rect width="8" height="8" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span>Sprawdz</span>
            </button>
            <button
              className="lesson-action-button"
              type="button"
              onClick={() => setIsCodeRunning((previousState) => !previousState)}
            >
              <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M0 8.16667V0L6.41667 4.08333L0 8.16667Z" fill="white"/>
              </svg>
              <span>{isCodeRunning ? 'Zatrzymaj' : 'Uruchom'}</span>
            </button>
          </div>
        </header>

        <div className="lesson-editor-wrapper">
          <label className="lesson-editor-label" htmlFor="lesson-code-input">
            Pole kodu
          </label>
          <div className="lesson-editor-body">
            <div className="lesson-line-numbers" aria-hidden="true">
              {Array.from({ length: codeLineCount }, (_, index) => (
                <span key={index} className="lesson-line-number">{index + 1}</span>
              ))}
            </div>
            <textarea
              id="lesson-code-input"
              className="lesson-code-textarea"
              value={code}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setCode(event.target.value)}
              spellCheck={false}
            />
          </div>
        </div>

        <footer className="lesson-terminal">
          <p className="lesson-terminal-meta">Terminal output</p>
          <p className="lesson-terminal-success">&gt;&gt;&gt; Running main.py...</p>
          <p className="lesson-terminal-info">Device connected on /dev/tty.usbmodem101</p>
          <p className="lesson-terminal-info">_</p>
        </footer>
      </div>

      <div className="lesson-simulator-side" ref={simulatorRef}>
        <header className="lesson-simulator-topbar">Symulator</header>

        <div className="lesson-simulator-content">
          <section className="lesson-sim-placeholder">
            <h3>Obszar symulacji</h3>

            <div className="lesson-breadboard-stage">
              <div className="lesson-breadboard-head">
                <h4>Plytka stykowa</h4>
                <p>Zewnetrzna LED i przycisk testowy.</p>
              </div>

              <div className="lesson-breadboard-surface" aria-hidden="true">
                <div className="lesson-breadboard-rails lesson-breadboard-rails-top">
                  <span className="rail rail-power" />
                  <span className="rail rail-ground" />
                </div>
                <div className="lesson-breadboard-holes" />
                <div className="lesson-breadboard-gap" />
                <div className="lesson-breadboard-holes" />
                <div className="lesson-breadboard-rails lesson-breadboard-rails-bottom">
                  <span className="rail rail-power" />
                  <span className="rail rail-ground" />
                </div>

                <div className={`lesson-external-led${isExternalLedOn ? ' is-on' : ''}`}>
                  <span className="lesson-led-head" />
                  <span className="lesson-led-leg lesson-led-leg-left" />
                  <span className="lesson-led-leg lesson-led-leg-right" />
                </div>

                <button
                  type="button"
                  className={`lesson-breadboard-button${isButtonPressed ? ' is-pressed' : ''}`}
                  onPointerDown={() => {
                    setIsButtonPressed(true);
                  }}
                  onPointerUp={() => {
                    setIsButtonPressed(false);
                  }}
                  onPointerLeave={() => {
                    setIsButtonPressed(false);
                  }}
                  aria-label="Przycisk na plytce stykowej GPIO12"
                  title="GPIO12: przytrzymaj, aby zapalic zewnetrzna diode na GPIO15"
                />
              </div>
            </div>

            <section className="lesson-gpio-card lesson-gpio-card-compact">
              <header>
                <span>GPIO Inspector</span>
                <strong>Live</strong>
              </header>
              <div className="lesson-gpio-row">
                <div className="lesson-gpio-pin">
                  <span>GPIO</span>
                  <p>GPIO12 (BTN)</p>
                </div>
                <div>
                  <span>State</span>
                  <p>{isButtonPressed ? 'HIGH' : 'LOW'}</p>
                </div>
                <div className="lesson-gpio-pin">
                  <span>GPIO</span>
                  <p>GPIO15 (LED)</p>
                </div>
                <div>
                  <span>State</span>
                  <p>{isExternalLedOn ? 'HIGH' : 'LOW'}</p>
                </div>
                <div className="lesson-gpio-pin">
                  <span>GPIO</span>
                  <p>GPIO25 (LED1)</p>
                </div>
                <div>
                  <span>State</span>
                  <p>{isRectLedOn ? 'HIGH' : 'LOW'}</p>
                </div>
              </div>
            </section>

            <div className="lesson-board-stage">
              <div className="lesson-board-image-wrap">
                <img
                  className="lesson-board-image"
                  src={picoBoardImage}
                  alt="Raspberry Pi Pico"
                />
              </div>
              <div className="lesson-rect-led-controller">
                <div className="lesson-rect-led-head">
                  <span>Wbudowana LED1</span>
                  <strong>{isRectLedOn ? 'ON' : 'OFF'}</strong>
                </div>
                <div className={`lesson-rect-led-visual${isRectLedOn ? ' is-on' : ''}`} aria-hidden="true" />
              </div>
            </div>
          </section>
        </div>

        <aside
          className={`lesson-theory-panel${isDragging ? ' lesson-theory-panel-dragging' : ''}${isMinimized ? ' lesson-theory-panel-minimized' : ''}${isMaximized ? ' lesson-theory-panel-maximized' : ''}`}
          ref={popupRef}
          style={!isMaximized 
            ? { left: `${popupPos.x}px`, top: `${popupPos.y}px` }
            : { 
                width: `${maxPanelSize.width}%`,
                height: `${maxPanelSize.height}%`,
                left: `${maxPanelPos.left}%`,
                top: `calc(64px + ${maxPanelPos.top}%)`,
              }
          }
        >
          <header onPointerDown={isMaximized ? undefined : handleDragStart} className="lesson-theory-drag-handle">
            <div className="lesson-theory-header-left">
              {isMinimized && (
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 12.5H9.16667V7.5H7.5V12.5ZM8.33333 5.83333C8.56944 5.83333 8.76736 5.75347 8.92708 5.59375C9.08681 5.43403 9.16667 5.23611 9.16667 5C9.16667 4.76389 9.08681 4.56597 8.92708 4.40625C8.76736 4.24653 8.56944 4.16667 8.33333 4.16667C8.09722 4.16667 7.89931 4.24653 7.73958 4.40625C7.57986 4.56597 7.5 4.76389 7.5 5C7.5 5.23611 7.57986 5.43403 7.73958 5.59375C7.89931 5.75347 8.09722 5.83333 8.33333 5.83333ZM8.33333 16.6667C7.18056 16.6667 6.09722 16.4479 5.08333 16.0104C4.06944 15.5729 3.1875 14.9792 2.4375 14.2292C1.6875 13.4792 1.09375 12.5972 0.65625 11.5833C0.21875 10.5694 0 9.48611 0 8.33333C0 7.18056 0.21875 6.09722 0.65625 5.08333C1.09375 4.06944 1.6875 3.1875 2.4375 2.4375C3.1875 1.6875 4.06944 1.09375 5.08333 0.65625C6.09722 0.21875 7.18056 0 8.33333 0C9.48611 0 10.5694 0.21875 11.5833 0.65625C12.5972 1.09375 13.4792 1.6875 14.2292 2.4375C14.9792 3.1875 15.5729 4.06944 16.0104 5.08333C16.4479 6.09722 16.6667 7.18056 16.6667 8.33333C16.6667 9.48611 16.4479 10.5694 16.0104 11.5833C15.5729 12.5972 14.9792 13.4792 14.2292 14.2292C13.4792 14.9792 12.5972 15.5729 11.5833 16.0104C10.5694 16.4479 9.48611 16.6667 8.33333 16.6667ZM8.33333 15C10.1944 15 11.7708 14.3542 13.0625 13.0625C14.3542 11.7708 15 10.1944 15 8.33333C15 6.47222 14.3542 4.89583 13.0625 3.60417C11.7708 2.3125 10.1944 1.66667 8.33333 1.66667C6.47222 1.66667 4.89583 2.3125 3.60417 3.60417C2.3125 4.89583 1.66667 6.47222 1.66667 8.33333C1.66667 10.1944 2.3125 11.7708 3.60417 13.0625C4.89583 14.3542 6.47222 15 8.33333 15Z" fill="#f3f3f3"/>
                </svg>
              )}
              <h2>Teoria</h2>
            </div>
            <div className="lesson-theory-header-actions">
              <button
                type="button"
                className="lesson-theory-btn-minimize"
                onClick={handleMinimize}
                title={isMinimized ? 'Rozwiń panel' : 'Minimalizuj panel'}
                aria-label={isMinimized ? 'Rozwiń panel' : 'Minimalizuj panel'}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.58325 11H17.4166" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                type="button"
                className="lesson-theory-btn-maximize"
                onClick={handleMaximize}
                title={isMaximized ? 'Przywróć rozmiar' : 'Zmaksymalizuj'}
                aria-label={isMaximized ? 'Przywróć rozmiar' : 'Zmaksymalizuj'}
              >
                {isMinimized ? (
                  <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.05 5.55L0 4.5L4.5 0L9 4.5L7.95 5.55L4.5 2.1L1.05 5.55Z" fill="white"/>
                  </svg>
                ) : (
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 6.5V1H12M17.5 1L11.0833 7.41667M1 12V17.5H6.5M1 17.5L7.41667 11.0833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </header>
          {!isMinimized && (
            <div className="lesson-theory-content">
              <LessonTwo />
            </div>
          )}
          {isMaximized && (
            <>
              <div
                className="lesson-theory-panel-maximized-resize-top"
                onPointerDown={(e) => handleResizeStart(e, 'top')}
              />
              <div
                className="lesson-theory-panel-maximized-resize-right"
                onPointerDown={(e) => handleResizeStart(e, 'right')}
              />
              <div
                className="lesson-theory-panel-maximized-resize-bottom"
                onPointerDown={(e) => handleResizeStart(e, 'bottom')}
              />
              <div
                className="lesson-theory-panel-maximized-resize-left"
                onPointerDown={(e) => handleResizeStart(e, 'left')}
              />
              <div
                className="lesson-theory-panel-maximized-resize-top-left"
                onPointerDown={(e) => handleResizeStart(e, 'top-left')}
              />
              <div
                className="lesson-theory-panel-maximized-resize-top-right"
                onPointerDown={(e) => handleResizeStart(e, 'top-right')}
              />
              <div
                className="lesson-theory-panel-maximized-resize-bottom-left"
                onPointerDown={(e) => handleResizeStart(e, 'bottom-left')}
              />
              <div
                className="lesson-theory-panel-maximized-resize-bottom-right"
                onPointerDown={(e) => handleResizeStart(e, 'bottom-right')}
              />
            </>
          )}
        </aside>
      </div>

      {isLessonCompletedPopupOpen && (
        <div
          className="lesson-completed-backdrop"
          role="presentation"
          onClick={() => setIsLessonCompletedPopupOpen(false)}
        >
          <div
            className="lesson-completed-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Lekcja ukonczona"
            onClick={(event) => event.stopPropagation()}
          >
            <h3>Lekcja ukonczona</h3>
            <button
              type="button"
              className="lesson-completed-close"
              onClick={() => setIsLessonCompletedPopupOpen(false)}
            >
              Zamknij
            </button>
          </div>
        </div>
      )}

      <div className="lesson-hint-widget">
        {isHintBubbleOpen && (
          <div className="lesson-hint-bubble" role="status" aria-live="polite">
            <button
              type="button"
              className="lesson-hint-minimize"
              onClick={() => setIsHintBubbleOpen(false)}
              aria-label="Minimalizuj podpowiedz"
              title="Minimalizuj"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 7H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <p>
              Podpowiedz: ustaw GPIO25 jako OUT i steruj stanem HIGH/LOW, a dla
              testu przytrzymaj przycisk GPIO12, aby zapalic diode na GPIO15.
            </p>
          </div>
        )}
        <button
          type="button"
          className="lesson-hint-toggle"
          onClick={() => setIsHintBubbleOpen((prevState) => !prevState)}
          aria-expanded={isHintBubbleOpen}
          aria-label={isHintBubbleOpen ? 'Ukryj podpowiedz' : 'Pokaz podpowiedz'}
          title={isHintBubbleOpen ? 'Ukryj podpowiedz' : 'Pokaz podpowiedz'}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9.95 16C10.3 16 10.5958 15.8792 10.8375 15.6375C11.0792 15.3958 11.2 15.1 11.2 14.75C11.2 14.4 11.0792 14.1042 10.8375 13.8625C10.5958 13.6208 10.3 13.5 9.95 13.5C9.6 13.5 9.30417 13.6208 9.0625 13.8625C8.82083 14.1042 8.7 14.4 8.7 14.75C8.7 15.1 8.82083 15.3958 9.0625 15.6375C9.30417 15.8792 9.6 16 9.95 16ZM9.05 12.15H10.9C10.9 11.6 10.9625 11.1667 11.0875 10.85C11.2125 10.5333 11.5667 10.1 12.15 9.55C12.5833 9.11667 12.925 8.70417 13.175 8.3125C13.425 7.92083 13.55 7.45 13.55 6.9C13.55 5.96667 13.2083 5.25 12.525 4.75C11.8417 4.25 11.0333 4 10.1 4C9.15 4 8.37917 4.25 7.7875 4.75C7.19583 5.25 6.78333 5.85 6.55 6.55L8.2 7.2C8.28333 6.9 8.47083 6.575 8.7625 6.225C9.05417 5.875 9.5 5.7 10.1 5.7C10.6333 5.7 11.0333 5.84583 11.3 6.1375C11.5667 6.42917 11.7 6.75 11.7 7.1C11.7 7.43333 11.6 7.74583 11.4 8.0375C11.2 8.32917 10.95 8.6 10.65 8.85C9.91667 9.5 9.46667 9.99167 9.3 10.325C9.13333 10.6583 9.05 11.2667 9.05 12.15ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
