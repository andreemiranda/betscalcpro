
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
└── images/             # Pasta sugerida para ativos visuais
    ├── favicon.png          # 32x32px
    ├── og-image.png         # 1200x630px (Redes Sociais)
    ├── twitter-card.png     # 1200x600px
    ├── pwa-192.png          # 192x192px (Ícone do App)
    └── pwa-512.png          # 512x512px (Ícone Splash)
```

---

## 🛠️ Tecnologias Utilizadas

- **React 19**: Interface reativa e moderna.
- **Tailwind CSS**: Estilização via classes utilitárias rápida e responsiva.
- **Lucide React**: Biblioteca de ícones leves e elegantes.
- **jsPDF & AutoTable**: Geração de documentos PDF no lado do cliente.
- **Service Workers**: Capacidade offline e instalação nativa.

---

## 📝 Como utilizar a Progressão

O cálculo baseia-se na **Progressão de Banca Acumulada**, onde o lucro de cada etapa é reinvestido para potencializar os resultados através do crescimento exponencial:

- **C**: Banca Inicial.
- **i**: Porcentagem de lucro esperado por jogo (ex: 10%).
- **n**: Quantidade de etapas sucessivas (jogos no ciclo).

---

## 👨‍💻 Autor
Desenvolvido por **André Miranda**.
[Acessar Site do Autor](https://github.com/andreemiranda)

© 2026 Bet's Calc Pro - Todos os direitos reservados.
