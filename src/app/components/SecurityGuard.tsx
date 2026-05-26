'use client';

import { useEffect, useRef, useState } from 'react';

// Set to 'true' to enable all protections (F12 block, right-click block, copy block, watermark, screen blur)
// Set to 'false' to disable them during development/debugging
const ENABLE_SECURITY = false; // Disabled for development - set to true before deployment

export default function SecurityGuard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bypassed, setBypassed] = useState(true);

  useEffect(() => {
    // ─── DYNAMIC BYPASS FOR DEVELOPMENT ────────────────────────────────────
    // If the URL has ?sec=false or ?debug=true, we temporarily disable security
    // and save it to localStorage so the bypass persists during navigation.
    const params = new URLSearchParams(window.location.search);
    if (params.get('sec') === 'false' || params.get('debug') === 'true') {
      localStorage.setItem('disable_security', 'true');
    } else if (params.get('sec') === 'true') {
      localStorage.removeItem('disable_security');
    }

    const isBypassed = localStorage.getItem('disable_security') === 'true';
    setBypassed(isBypassed);

    if (!ENABLE_SECURITY || isBypassed) {
      console.log('🔓 Portfolio protections temporarily disabled for development.');
      return;
    }
    // ─── WATERMARK CANVAS (appears in ALL screenshots) ─────────────────────
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const draw = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.save();
          ctx.globalAlpha = 0.055; // subtle but visible in screenshots
          ctx.font = 'bold 18px monospace';
          ctx.fillStyle = '#ffffff';
          ctx.rotate(-Math.PI / 6); // 30° diagonal

          const text = '© Ansh Agarwal — All Rights Reserved  •  Unauthorized use prohibited';
          const textWidth = ctx.measureText(text).width;
          const step = 220;

          // Fill entire canvas with diagonal repeating watermark
          for (let y = -canvas.height; y < canvas.height * 2; y += step) {
            for (let x = -canvas.width; x < canvas.width * 2; x += textWidth + 80) {
              ctx.fillText(text, x, y);
            }
          }
          ctx.restore();

          // Corner stamp — more visible in screenshots
          ctx.globalAlpha = 0.55;
          ctx.font = 'bold 12px monospace';
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.fillText('© Ansh Agarwal | ansh-portfolio.dev | PROTECTED', 16, canvas.height - 14);
        };

        draw();
        window.addEventListener('resize', draw);
      }
    }

    // ─── 1. Right-click disable ────────────────────────────────────────────
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showToast('🔒 Right-click is disabled on this portfolio.');
    };

    // ─── 2. Keyboard shortcuts block ──────────────────────────────────────
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;

      if (
        (ctrl && (key === 'c' || key === 'u' || key === 's' || key === 'a' || key === 'p')) ||
        (ctrl && e.shiftKey && (key === 'i' || key === 'j' || key === 'c' || key === 's')) ||
        e.key === 'F12' ||
        e.key === 'PrintScreen' ||
        (e.altKey && e.key === 'PrintScreen') ||
        (e.metaKey && e.shiftKey && (key === '3' || key === '4' || key === '5'))
      ) {
        e.preventDefault();
        e.stopPropagation();
        if (e.key === 'PrintScreen' || (e.altKey && e.key === 'PrintScreen')) {
          showToast('📸 Screenshot keys are blocked — watermark will appear anyway.');
        } else {
          showToast('🔒 This action is disabled on this portfolio.');
        }
        return false;
      }
    };

    // ─── 3. Copy / Cut block ───────────────────────────────────────────────
    const handleCopy = (e: ClipboardEvent) => { e.preventDefault(); showToast('🔒 Copying is not allowed.'); };
    const handleCut  = (e: ClipboardEvent) => { e.preventDefault(); };

    // ─── 4. Drag block ─────────────────────────────────────────────────────
    const handleDragStart = (e: DragEvent) => { e.preventDefault(); };

    // ─── 5. DevTools detection ─────────────────────────────────────────────
    let devtoolsOpen = false;
    const detectDevTools = () => {
      const w = window.outerWidth - window.innerWidth > 160;
      const h = window.outerHeight - window.innerHeight > 160;
      if (w || h) {
        if (!devtoolsOpen) {
          devtoolsOpen = true;
          document.body.classList.add('devtools-open');
          showToast('🛡️ DevTools detected — content protected.');
          // Fire console warning when DevTools first opens
          fireConsoleWarning();
        }
      } else if (devtoolsOpen) {
        devtoolsOpen = false;
        document.body.classList.remove('devtools-open');
      }
    };

    // ─── Console ASCII warning ─────────────────────────────────────────────
    function fireConsoleWarning() {
      console.clear();
      console.log(
        '%c⚠️  STOP!',
        'color:#ff4444; font-size:48px; font-weight:900; text-shadow: 0 0 10px #ff0000;'
      );
      console.log(
        '%cThis is a protected portfolio. Inspecting, copying, or reusing\nany code, design, or content without permission is prohibited.\n\n© 2026 Ansh Agarwal — All Rights Reserved\n🔒 Unauthorized use may result in legal action.',
        'color:#f5f0e8; font-size:15px; line-height:2; background:#0a0a0f; padding:16px 24px; border-left: 4px solid #e07c3a; border-radius:4px;'
      );
      console.log(
        '%c  ANSH AGARWAL PORTFOLIO  ',
        'color:#e07c3a; font-size:11px; font-family:monospace; letter-spacing:0.4em; background:#0a0a0f; padding:8px 16px;'
      );
      // Override console methods to discourage further inspection
      const noop = () => {};
      // (We log once, then leave console usable — full override causes errors)
    }

    // Fire console warning once on page load too
    fireConsoleWarning();

    // ─── 6. Print block ────────────────────────────────────────────────────
    const handleBeforePrint = () => { document.body.classList.add('printing-blocked'); };
    const handleAfterPrint  = () => { document.body.classList.remove('printing-blocked'); };

    // ─── 7. Clipboard watch (detects OS-level PrtSc via paste) ────────────
    // When user presses PrtSc, Windows copies to clipboard. We detect paste events.
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (const item of Array.from(items)) {
          if (item.type.startsWith('image')) {
            e.preventDefault();
            showToast('📸 Screenshot detected — image is watermarked.');
          }
        }
      }
    };

    // ─── Register all listeners ────────────────────────────────────────────
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('paste', handlePaste);
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    const devInterval = setInterval(detectDevTools, 1000);

    // ─── Inject CSS ────────────────────────────────────────────────────────
    const styleId = 'security-guard-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }
        img {
          pointer-events: none !important;
          -webkit-user-drag: none !important;
          user-drag: none !important;
        }
        /* DevTools blur */
        body.devtools-open > *:not(#security-watermark-canvas):not(#security-toast-container) {
          filter: blur(12px) !important;
          pointer-events: none !important;
          transition: filter 0.3s ease;
        }
        /* Print block */
        @media print {
          body * { display: none !important; }
          body::before {
            display: block !important;
            content: "© Ansh Agarwal — Printing this portfolio is not permitted.";
            font-size: 22px;
            text-align: center;
            padding-top: 40vh;
            color: #333;
          }
        }

        /* Watermark canvas — always on top, pointer-events none */
        #security-watermark-canvas {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          z-index: 2147483647;
          pointer-events: none;
        }

        /* Toast */
        #security-toast-container {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2147483646;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          pointer-events: none;
        }
        .security-toast {
          background: rgba(8, 8, 14, 0.93);
          border: 1px solid rgba(255, 60, 60, 0.55);
          color: #f0f0f0;
          padding: 10px 22px;
          border-radius: 8px;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          backdrop-filter: blur(14px);
          box-shadow: 0 4px 28px rgba(255,40,40,0.22);
          animation: sgToastIn 0.3s ease, sgToastOut 0.4s ease 2.6s forwards;
          white-space: nowrap;
        }
        @keyframes sgToastIn {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes sgToastOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    // ─── Toast helper ──────────────────────────────────────────────────────
    function showToast(message: string) {
      let container = document.getElementById('security-toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'security-toast-container';
        document.body.appendChild(container);
      }
      const toast = document.createElement('div');
      toast.className = 'security-toast';
      toast.textContent = message;
      container.appendChild(toast);
      setTimeout(() => toast.remove(), 3200);
    }

    // ─── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('paste', handlePaste);
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      clearInterval(devInterval);
      document.getElementById(styleId)?.remove();
    };
  }, []);

  if (!ENABLE_SECURITY || bypassed) return null;

  // Canvas renders OVER everything — always visible in screenshots
  return (
    <canvas
      ref={canvasRef}
      id="security-watermark-canvas"
      aria-hidden="true"
    />
  );
}
