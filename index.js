//importation des modules nécéssaires au projets

const { execSync } = require('child_process'); // Pour exécuter des commandes système (CLI)
const fs = require('fs'); // Pour manipuler les fichiers (créer, lire, supprimer)
const path = require('path'); // Pour gérer proprement les chemins de dossiers

console.log("==================================================");
console.log("   AGENT GÉNÉRATEUR DE CODE & AGENT DE REVIEW   ");
console.log("==================================================\n");

// 1. Définition des agents
const AGENT_DEV = "Développeur (Celui qui génère le code)";
const AGENT_REVIEWER = "Relecteur (Celui qui fait une review du code généré)";

// Fichier temporaire généré par l'Agent Dev qui contiendra le code à review
const TARGET_FILE = path.join(__dirname, 'temp_code.js');

// ce code jouera dans cette simulation le role de code généré par l'IA (l'agent Développeur)
//il contient des érreur intentionelle que le rélecteur est cencé détecté et corrigé
const mockCode = `
function calculateTotal(price, tax){
    var total = price + (price * tax)
    console.log("Calcul effectué pour : " + price)
    return total
}
module.exports = calculateTotal;
`;

// Étape A : Génération de code par le premier Agent
console.log(`[1/4] ${AGENT_DEV} : Génération d'une nouvelle fonction JavaScript...`);
fs.writeFileSync(TARGET_FILE, mockCode.trim());
console.log(`      ✓ Fichier temporaire créé : ${path.basename(TARGET_FILE)}\n`);

// Étape B : Vérification de l'activation de la couche MCP
console.log(`[2/4] Vérification de l'état de la couche MCP`);
try {
    const mcpStatus = execSync('npx @concord-ai/concord-mcp --version', { encoding: 'utf-8' }).trim();
    console.log(`      Canal MCP actif (version : ${mcpStatus})\n`);
} catch (err) {
    console.log("      Alerte MCP : Exécution en mode hors ligne.\n");
}

// Étape C : Relecture du code par le second Agent
console.log(`[3/4] ${AGENT_REVIEWER} : Analyse de la qualité et vérification des normes...`);
const code_a_inspecter = fs.readFileSync(TARGET_FILE, 'utf-8');

let score = 100;
const message = [];

if (code_a_inspecter.includes('var ')) {
    score -= 20;
    message.push("Utilisation de 'var' détectée (Privilégier 'const' ou 'let').");
}
if (!code_a_inspecter.includes(';') || code_a_inspecter.split('\n').some(line => line.trim() && !line.trim().endsWith(';') && !line.trim().endsWith('{') && !line.trim().endsWith('}'))) {
    score -= 15;
    message.push("point virgule manquant détecté sur certaines instructions.");
}
if (code_a_inspecter.includes('console.log')) {
    score -= 10;
    message.push("ℹ Instruction 'console.log' trouvée (À retirer en production).");
}

// Étape D : Rapport de synchronisation final
console.log(`[4/4] 📊 RAPPORT DE QUALITÉ FINAL (Transmis via MCP) :`);
console.log("--------------------------------------------------");
console.log(`Note globale de qualité : ${score}/100`);
console.log("Remarques de l'Agent Relecteur :");
if (message.length === 0) {
    console.log("  ✓ Code conforme aux standards de production !");
} else {
    message.forEach(item => console.log(`  ${item}`));
}
console.log("--------------------------------------------------");

// Nettoyage du fichier temporaire
if (fs.existsSync(TARGET_FILE)) {
    fs.unlinkSync(TARGET_FILE);
}

console.log("\n✓ Collaboration Multi-Agent pour la génération et la relecture de code terminée avec succès.");