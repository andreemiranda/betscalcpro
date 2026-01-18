
# 🚀 Bet's Calc Pro - Gestão de Banca Profissional

Uma calculadora PWA (Progressive Web App) de alta performance projetada para apostadores profissionais simularem a **Progressão de Banca** através do reinvestimento acumulado.

---

## 📂 Estrutura do Projeto

O projeto é organizado de forma modular para facilitar a manutenção e escalabilidade:

```text
/
├── index.html          # Ponto de entrada HTML com Metatags SEO e PWA
├── index.tsx           # Inicialização do React e registro do Service Worker
├── App.tsx             # Componente principal e orquestrador da lógica
├── types.ts            # Definições de interfaces TypeScript
├── constants.ts        # Cores, chaves de armazenamento e configurações globais
├── metadata.json       # Metadados para a infraestrutura do projeto
├── manifest.json       # Configurações do PWA (ícones, cores, display)
├── service-worker.js   # Lógica de cache offline e PWA
│
├── components/         # Componentes de UI Reutilizáveis
│   ├── InputGroup.tsx       # Campos de entrada estilizados
│   ├── ResultCard.tsx       # Cards de resumo de resultados
│   └── ProgressionTable.tsx # Tabela detalhada jogo a jogo
│
├── services/           # Integrações e serviços externos
│   ├── pdfGenerator.ts      # Geração de relatórios PDF profissionais (jsPDF)
│   └── shareService.ts      # API de compartilhamento nativo e cópia
│
├── utils/              # Lógica pura e auxiliares
│   ├── calculations.ts      # Motor matemático da Progressão de Banca
│   └── formatters.ts        # Máscaras de moeda (BRL) e formatação
│
└── images/             # Ativos visuais obrigatórios para o GitHub
```

---

## 🖼️ Relação de Imagens para Publicação

Para que o aplicativo funcione corretamente como PWA e exiba os cards em redes sociais, certifique-se de que a pasta `/images/` contenha os seguintes arquivos:

### Identidade Visual e Redes Sociais
- **favicon.png** (32x32px): Ícone da aba do navegador.
- **og-image.png** (1200x630px): Imagem de visualização para WhatsApp, Facebook e LinkedIn.
- **twitter-card.png** (1200x600px): Imagem otimizada especificamente para o Twitter (X).

### Ícones do App (PWA)
Estes ícones são fundamentais para que o usuário possa "Instalar" o app no celular:
- **apple-touch-icon.png** (180x180px): Ícone específico para dispositivos iOS (Apple).
- **pwa-72.png** (72x72px)
- **pwa-96.png** (96x96px)
- **pwa-128.png** (128x128px)
- **pwa-144.png** (144x144px)
- **pwa-152.png** (152x152px)
- **pwa-192.png** (192x192px): Ícone principal da tela inicial.
- **pwa-512.png** (512x512px): Ícone da tela de carregamento (Splash Screen).

---

## 🛠️ Tecnologias Utilizadas

- **React 19**: Interface reativa e moderna.
- **Tailwind CSS**: Estilização via classes utilitárias rápida e responsiva.
- **Lucide React**: Biblioteca de ícones leves e elegantes.
- **jsPDF & AutoTable**: Geração de documentos PDF no lado do cliente.
- **Service Workers**: Capacidade offline e instalação nativa.

---

## 👨‍💻 Autor
Desenvolvido por **André Miranda**.
[Acessar Perfil no GitHub](https://github.com/andreemiranda)

© 2026 Bet's Calc Pro - Todos os direitos reservados.
