
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
        console.log('[PWA] Service Worker registrado com sucesso:', registration.scope);
        
        // Detecção de atualizações
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('[PWA] Nova versão disponível! Por favor, recarregue a página.');
                } else {
                  console.log('[PWA] Conteúdo em cache para uso offline.');
                }
              }
            };
          }
        };
      })
      .catch(error => console.log('[PWA] Falha ao registrar Service Worker:', error));
  });

  // Prompt de instalação (A2HS)
  let deferredPrompt: any;
  window.addEventListener('beforeinstallprompt', (e: any) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('[PWA] Prompt de instalação interceptado.');
  });
}
