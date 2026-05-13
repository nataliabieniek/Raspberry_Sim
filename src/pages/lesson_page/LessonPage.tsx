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
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(true);
  const [maxPanelSize, setMaxPanelSize] = useState({ width: 80, height: 80 }); // % viewport
  const [maxPanelPos, setMaxPanelPos] = useState({ left: 10, top: 10 }); // % viewport
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const resizeOffsetRef = useRef({ startX: 0, startY: 0, startWidth: 0, startHeight: 0, startLeft: 0, startTop: 0 });
  const simulatorRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLElement | null>(null);

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
    setPopupPos({
      x: 32,
      y: window.innerHeight - 35 - 16,
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
            <button className="lesson-tab" type="button">notes.txt</button>
          </div>
          <div className="lesson-top-actions">
            <button className="lesson-action-button" type="button">
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
            <button className="lesson-action-button" type="button">
              <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M0 8.16667V0L6.41667 4.08333L0 8.16667Z" fill="white"/>
              </svg>
              <span>Uruchom</span>
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
              <h2>Theory Panel</h2>
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
              <LessonOne />
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
    </section>
  );
}
