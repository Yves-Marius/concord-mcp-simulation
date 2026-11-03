# 🤖 Simulation d'une collaboration multi-agent

Démonstration d'une architecture multi-agent collaborative simulant un flux de développement logiciel sécurisé (Génération de code + Relecture / Review) inspirée des standards du Model Context Protocol (MCP).

## 🚀 Fonctionnalités
- **Agent Développeur :** Génère un bloc de code structuré.
- **Couche MCP (Simulation/Health-check) :** Vérifie l'état du canal de communication et gère un mode de repli autonome (hors ligne).
- **Agent Relecteur :** Analyse statique du code (détection de bonnes pratiques, recherche de points-virgules, calcul de score).

## 🛠️ Lancement rapide
```bash
git clone [https://github.com/Yves-Marius/concord-mcp-simulation.git]
cd concord-mcp-simulation
npm install
node index.js