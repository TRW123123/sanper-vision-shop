// patch_meta.cjs — Individualize meta descriptions + intro texts for enriched pages
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'src', 'data', 'landing_pages.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const patches = {
    "pergola-systeme/terrasse": {
        meta_description: "Terrassen-Pergola als Wandanbau: WDVS-sichere Montage, thermisch getrennte Anker und nahtlose Abdichtung. Direkt vom Hersteller mit 5 Jahren Garantie.",
        intro_text: "Eine Terrassen-Pergola verschmilzt Innen und Außen. Wir zeigen, worauf es bei Hausanschluss, Abdichtung und Statik wirklich ankommt.",
        h1: "Terrassen-Pergola",
        title: "Terrassen-Pergola | Apexx Bau"
    },
    "pergola-systeme/aluminium": {
        meta_description: "Aluminium-Pergola aus stranggepresstem EN AW-6060: 3–5mm Profilstärke, Qualicoat-Beschichtung, wartungsfrei. Direkt vom Hersteller.",
        intro_text: "Warum Aluminium das überlegene Material für dauerhafte Terrassenüberdachungen ist — und worauf Sie bei der Wahl achten sollten.",
        h1: "Aluminium-Pergola",
        title: "Aluminium-Pergola | Apexx Bau"
    },
    "pergola-systeme/freistehend": {
        meta_description: "Freistehende Pergola für Garten und Pool: Punktfundamente, Extrem-Statik bis 140 km/h und unsichtbare Entwässerung. Direkt vom Hersteller.",
        intro_text: "Design-Pergola ohne Wandanbindung — für Pool, Garten oder offene Terrassen. Mit Statik, die Orkanen standhält.",
        h1: "Freistehende Pergola",
        title: "Freistehende Pergola | Apexx Bau"
    },
    "pergola-systeme/lamellendach": {
        meta_description: "Lamellendach mit stufenloser Licht- und Regensteuerung. Vergleich mit Glas und Stoff — und wann ein Lamellendach die bessere Wahl ist.",
        intro_text: "Flexible Kontrolle über Licht, Luft und Regen — das Lamellendach im Vergleich zu Glas- und Stoffdächern.",
        h1: "Lamellendach",
        title: "Lamellendach | Apexx Bau"
    },
};

let count = 0;
data.forEach(page => {
    const patch = patches[page.slug];
    if (patch) {
        Object.assign(page, patch);
        count++;
    }
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
console.log(`✅ Patched ${count} meta descriptions`);
