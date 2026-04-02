// enrich_top50.cjs — Deep content for top-50 keywords using ratgeber facts
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'src', 'data', 'landing_pages.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// New pages to add + existing pages to enrich
const newPages = [
    // === CLUSTER 1: Terrassenüberdachung (90.500 Vol) ===
    {
        slug: "pergola-systeme/terrassenueberdachung",
        template: "money",
        product_id: "pergola-systeme",
        title: "Terrassenüberdachung | Apexx Bau",
        meta_description: "Terrassenüberdachung aus Aluminium: Lamellendach, Glasdach oder Festdach. Direkt vom Hersteller mit eigener Montage und 5 Jahren Garantie.",
        h1: "Terrassenüberdachung",
        intro_text: "Die richtige Terrassenüberdachung entscheidet über Nutzungszeit, Komfort und Werterhalt Ihres Außenbereichs.",
        features: ["Aluminium EN AW-6060", "3–5mm Profilstärke", "5 Jahre Garantie", "Eigenmontage"],
        images: ["pergola-systeme-terrasse-aluminium-festdach-b2c-hero-01"],
        faq: [
            { question: "Was kostet eine Terrassenüberdachung pro m²?", answer: "Festdächer aus Aluminium und Glas liegen bei 250–700 €/m², bioklimatische Lamellendächer bei 900–1.200 €/m² inklusive Montage. Der Endpreis hängt von Maßen, Ausstattung und Montagesituation ab." },
            { question: "Aluminium oder Holz für die Terrassenüberdachung?", answer: "Aluminium (EN AW-6060) ist wartungsfrei, formstabil und korrosionsbeständig. Holz muss alle 3–5 Jahre geschliffen und lasiert werden. Für dauerhafte Außenanlagen empfehlen wir Aluminium." },
            { question: "Brauche ich eine Baugenehmigung?", answer: "Das hängt von Größe, Standort und Landesbauordnung ab. In NRW sind viele Terrassenüberdachungen genehmigungsfrei. Wir prüfen das vor Projektstart für Sie." },
            { question: "Wie lange dauert die Montage?", answer: "Eine Standard-Terrassenüberdachung wird in 1–2 Arbeitstagen montiert. Komplexere Systeme mit Verglasung oder ZIP-Screens benötigen 2–4 Tage." },
            { question: "Kann ich die Überdachung später erweitern?", answer: "Ja. Apexx Bau Systeme sind modular: Glasschiebewände, ZIP-Screens oder LED-Beleuchtung können jederzeit nachgerüstet werden, da unsere Profile die nötige Statik mitbringen." }
        ],
        block_1_content: `<h3>Terrassenüberdachung: Warum das Material den Unterschied macht</h3>
<p>Die Wahl des Dachtyps bestimmt nicht nur die Optik, sondern auch Wartungsaufwand, Lebensdauer und spätere Erweiterbarkeit. Drei Systeme stehen zur Auswahl: Festdach aus Aluminium mit Glas oder VSG, bioklimatisches Lamellendach mit motorisierten Aluminium-Lamellen, oder Rolling Roof mit faltbarem Dachsystem.</p>
<p>Entscheidend ist die Profilqualität. Apexx Bau verwendet stranggepresstes Aluminium der Legierung EN AW-6060 mit 3–5 mm Wandstärke. Zum Vergleich: Billig-Bausätze aus dem Internet arbeiten mit 1,4–1,8 mm — das ist bei Schneelasten und Windböen ein Sicherheitsrisiko. Unsere Systeme sind nach DIN EN 1991 auf Schneelast bis 400 kg/m² und Windlast bis 140 km/h ausgelegt.</p>
<p>Die Qualicoat-Pulverbeschichtung garantiert UV-, Salz- und Feuchtigkeitsbeständigkeit über Jahrzehnte. Über 200 RAL-Farben sind möglich — von Anthrazit (RAL 7016) bis Weiß. Wartungsaufwand: gelegentlich feucht abwischen. Kein Streichen, kein Schleifen, keine Holzschutzmittel.</p>`,
        block_2_content: `<h3>Montage direkt vom Hersteller: Warum das entscheidend ist</h3>
<p>Das größte Risiko bei Terrassenüberdachungen sind nicht die Materialkosten — es ist die Montage. Fehlerhafte Wandanschlüsse an WDVS-Fassaden führen zu Kältebrücken und Schimmel. Undichte Abdichtungen zwischen Wandbalken und Fassade zeigen sich erst nach Monaten als Wasserschäden.</p>
<p>Apexx Bau eliminiert dieses Risiko: Jede Anlage wird ausschließlich von hauseigenen, TÜV-ausgebildeten Montageteams installiert. Wir verwenden thermisch getrennte Hochlastanker (Fischer Thermax) für WDVS-Fassaden, vorkomprimierte Dichtungsbänder (Kompriband) und UV-beständiges Fassadensilikon für den Wandanschluss. Keine Subunternehmer, keine geteilte Verantwortung.</p>`,
        block_1_placement: "after_intro",
        block_2_placement: "before_faq",
        cta_primary_text: "Kostenlose Beratung",
        cta_secondary_text: "Angebot anfordern",
        faq_theme: "allgemein",
        faq_unique_q_count: 5
    },

    // === Überdachung Terrasse (9.900 Vol) — Synonym ===
    {
        slug: "pergola-systeme/ueberdachung-terrasse",
        template: "money",
        product_id: "pergola-systeme",
        title: "Überdachung Terrasse | Apexx Bau",
        meta_description: "Überdachung für Ihre Terrasse: Aluminium-Systeme mit Lamellendach, Glasdach oder Festdach. Maßgefertigt und professionell montiert.",
        h1: "Überdachung für die Terrasse",
        intro_text: "Eine Terrassenüberdachung verlängert die Nutzungssaison um Monate. Die Frage ist: welches System passt zu Ihrer Situation?",
        features: ["Wandanbau oder freistehend", "Modulare Erweiterung", "Entwässerung integriert", "Smart-Home-fähig"],
        images: ["pergola-systeme-terrasse-lamellendach-b2c-hero-01"],
        faq: [
            { question: "Wandanbau oder freistehend — was ist besser?", answer: "Wandanbau nutzt die Hausstatik und ermöglicht große Spannweiten ohne Mittelpfosten. Freistehend bietet maximale Platzierungsfreiheit, braucht aber Punktfundamente. Die Wahl hängt von Ihrem Grundstück und der Fassade ab." },
            { question: "Wie wird die Entwässerung gelöst?", answer: "Das Regenwasser wird über ein integriertes Gefälle in den Profilen gesammelt und unsichtbar durch die Aluminium-Pfosten in den Boden geleitet. Keine externen Fallrohre." },
            { question: "Kann ich Seitenelemente nachrüsten?", answer: "Ja. Glasschiebewände und ZIP-Screens können jederzeit ergänzt werden. Die Profile haben dedizierte Nuten für spätere Nachrüstung." },
            { question: "Was kosten Überdachungen für die Terrasse?", answer: "Je nach System: Festdach 250–700 €/m², Lamellendach 900–1.200 €/m², jeweils inklusive Montage. Ein individuelles Angebot erhalten Sie nach dem Beratungsgespräch." },
            { question: "Wie wetterfest ist eine Alu-Überdachung?", answer: "Unsere Systeme sind auf Windlasten bis 140 km/h und Schneelast bis 400 kg/m² ausgelegt. Die Qualicoat-Beschichtung schützt vor UV, Salz und Feuchtigkeit." }
        ],
        block_1_content: `<h3>Die Terrassenüberdachung als Wohnraumerweiterung</h3>
<p>Eine richtig geplante Überdachung ist mehr als ein Regenschutz. Sie schafft einen nutzbaren Raum zwischen Haus und Garten — trockenen Fußes und bei Bedarf windgeschützt. Die Apexx Bau Wandanbau-Modelle werden direkt an der Hausfassade verankert und profitieren von der bestehenden Hausstatik. Das ermöglicht Spannweiten bis 7 Meter Breite ohne störende Mittelpfosten.</p>
<p>Ein oft unterschätzter Vorteil: Eine nahtlos angebaute Terrassenüberdachung fungiert als thermischer Puffer. Im Sommer schützt das geschlossene Dach die Fassade vor direkter Aufheizung. Im Winter lassen geöffnete Lamellen die flache Sonne herein und helfen, die Erdgeschossräume natürlich zu erwärmen.</p>
<p>Die modulare Bauweise von Apexx Bau erlaubt schrittweisen Ausbau: erst das Dach, später Glasschiebewände als Windschutz, dann ZIP-Screens für Sicht- und Insektenschutz. Jeder Schritt ist nachrüstbar, weil die Profile von Anfang an überdimensioniert sind.</p>`,
        block_2_content: `<h3>Sichere Montage — auch an gedämmten Fassaden</h3>
<p>Die Montage einer schweren Aluminium-Überdachung an eine WDVS-Fassade (Wärmedämmverbundsystem) erfordert thermisch getrennte Schwerlastanker. Apexx Bau verwendet Fischer Thermax Systeme, die die Dämmschicht überbrücken, ohne Kältebrücken zu erzeugen. Der Wandanschluss wird mit vorkomprimierten Dichtungsbändern und UV-beständigem Silikon wasserdicht abgeschlossen.</p>`,
        block_1_placement: "after_intro",
        block_2_placement: "before_faq",
        cta_primary_text: "Projekt besprechen",
        cta_secondary_text: "—",
        faq_theme: "anbau",
        faq_unique_q_count: 5
    },

    // === Terrassenüberdachung Alu (6.600 Vol) ===
    {
        slug: "pergola-systeme/terrassenueberdachung-alu",
        template: "money",
        product_id: "pergola-systeme",
        title: "Terrassenüberdachung Alu | Apexx Bau",
        meta_description: "Terrassenüberdachung aus Aluminium EN AW-6060: 3–5mm Profilstärke, Qualicoat-Beschichtung, wartungsfrei. Direkt ab Werk ohne Händlermarge.",
        h1: "Terrassenüberdachung aus Aluminium",
        intro_text: "Warum stranggepresstes Aluminium das überlegene Material für Terrassenüberdachungen ist — und worauf Sie bei der Auswahl achten sollten.",
        features: ["EN AW-6060 Legierung", "3–5mm Wandstärke", "Qualicoat-zertifiziert", "200+ RAL-Farben"],
        images: ["pergola-systeme-terrasse-aluminium-festdach-b2c-hero-01"],
        faq: [
            { question: "Welche Aluminium-Legierung wird verwendet?", answer: "EN AW-6060 (AlMgSi0,5) — die Standardlegierung im Fenster- und Fassadenbau. Optimale Balance aus Festigkeit, Leichtigkeit und Korrosionsbeständigkeit." },
            { question: "Wie stark sind die Profile?", answer: "3–5 mm Wandstärke bei tragenden Elementen. Billig-Bausätze arbeiten mit 1,4–2,0 mm. Dieser Unterschied ist entscheidend für Statik und Langlebigkeit." },
            { question: "Braucht Aluminium Wartung?", answer: "Nein. Gelegentliches Abwischen genügt. Die Qualicoat-Pulverbeschichtung ist UV-, salz- und feuchtigkeitsbeständig. Kein Streichen, kein Schleifen." },
            { question: "Welche Farben sind möglich?", answer: "Über 200 RAL-Farben — von Anthrazit (RAL 7016) bis Weiß. Die Pulverbeschichtung garantiert dauerhafte Farbechtheit ohne Ausbleichen." },
            { question: "Was kostet eine Alu-Terrassenüberdachung?", answer: "Festdach ab 250 €/m², Lamellendach 900–1.200 €/m² inkl. Montage. Durch Direktvertrieb ohne Händlermarge sparen Sie 20–30% gegenüber Fachhändlern." }
        ],
        block_1_content: `<h3>Stranggepresstes Aluminium: Warum die Legierung entscheidend ist</h3>
<p>Nicht jedes Aluminium ist gleich. Apexx Bau verwendet ausschließlich stranggepresstes Aluminium der Legierung EN AW-6060 (AlMgSi0,5). Diese Legierung aus dem Fenster- und Fassadenbau bietet die perfekte Balance aus geringem Eigengewicht und enormer struktureller Festigkeit.</p>
<p>Während Discount-Dächer im Internet mit gefährlich dünnen Profilwandstärken von 1,4–1,8 mm arbeiten, verbaut Apexx Bau bei tragenden Elementen massive 3–5 mm. Das sichert eine statische Tragfähigkeit, die auch bei Orkanböen und hohen Schneelasten nicht nachgibt: 140 km/h Windlast, 400 kg/m² Schneelast.</p>
<p>Ein oft unterschätzter Qualitätsfaktor: die Verbindungstechnik. Wir verwenden hochfeste Edelstahlbolzen für Tragwerkverbindungen und selbstschmierende Messinglager für bewegliche Teile. Kein Rosten, kein Knarzen — auch nach Jahrzehnten.</p>`,
        block_2_content: `<h3>Qualicoat-Beschichtung: Farbe, die Jahrzehnte hält</h3>
<p>Alle Apexx Bau Systeme erhalten eine industrielle Qualicoat-zertifizierte Pulverbeschichtung. Anforderungen: Schichtdicke ≥60μm, extreme UV-Beständigkeit, hohe Kratz- und Abriebfestigkeit. Lösungsmittelfrei und umweltfreundlich.</p>
<p>Über 200 RAL-Farben stehen zur Verfügung. Besonders beliebt: Anthrazit (RAL 7016) mit leichtem Glimmer-Effekt und Weiß (RAL 9016). Die seidenmatte Verarbeitung verleiht der Überdachung den Charakter eines Premium-Bauteils.</p>`,
        block_1_placement: "after_intro",
        block_2_placement: "before_faq",
        cta_primary_text: "Material beraten lassen",
        cta_secondary_text: "—",
        faq_theme: "material",
        faq_unique_q_count: 5
    },

    // === Terrassenüberdachung freistehend (6.600 Vol) ===
    {
        slug: "pergola-systeme/terrassenueberdachung-freistehend",
        template: "money",
        product_id: "pergola-systeme",
        title: "Freistehende Terrassenüberdachung | Apexx Bau",
        meta_description: "Freistehende Terrassenüberdachung: Auf 4 Pfosten ohne Wandanbindung. Punktfundamente, Extrem-Statik bis 140 km/h. Ideal für Garten und Pool.",
        h1: "Freistehende Terrassenüberdachung",
        intro_text: "Maximale Freiheit bei der Platzierung — auf vier Pfosten, ohne Wandanbindung. Für Pool, Garten oder offene Flächen.",
        features: ["Keine Wandanbindung nötig", "Punktfundamente frostfrei", "140 km/h Windresistenz", "Unsichtbare Entwässerung"],
        images: ["pergola-systeme-garten-aluminium-festdach-b2c-hero-02"],
        faq: [
            { question: "Braucht eine freistehende Überdachung ein Fundament?", answer: "Ja. Wir koordinieren frostfrei gegründete Beton-Punktfundamente (ca. 80 cm tief). Die Fußplatten werden mit Schwerlastankern verschraubt — eine Verbindung für die Ewigkeit." },
            { question: "Wie stabil ist eine freistehende Konstruktion bei Sturm?", answer: "Unsere Systeme sind auf Orkanböen bis 140 km/h ausgelegt. Die 3–5 mm starken Profile bilden einen statisch extrem stabilen Käfig mit unsichtbaren Edelstahlklammern in den Eckknoten." },
            { question: "Wie wird das Regenwasser abgeleitet?", answer: "Eine unsichtbare Rinne im Dachprofil sammelt das Wasser und leitet es durch das Innere der Aluminium-Pfosten direkt in die Bodendrainage — keine externen Fallrohre." },
            { question: "Kann ich später Seitenelemente ergänzen?", answer: "Ja. Glasschiebewände und ZIP-Screens sind jederzeit nachrüstbar. Die Profile sind von Anfang an für diese Zusatzlasten dimensioniert." },
            { question: "Welche Maße sind möglich?", answer: "Standardmodule bis 7 m Breite und 4,5 m Tiefe. Für größere Flächen werden Module modular aneinander gekoppelt — nahezu endlos erweiterbar." }
        ],
        block_1_content: `<h3>Freistehende Pergola: Architektur ohne Grenzen</h3>
<p>Nicht jede Terrasse liegt direkt am Haus, und nicht jede Fassade eignet sich für eine Wandmontage. Freistehende Überdachungen lösen sich komplett von der Gebäudehülle und werden zur eigenständigen Architektur — am Pool, im Garten oder auf der Dachterrasse.</p>
<p>Auf vier massiven Aluminiumpfosten gestützt, kann das System überall aufgestellt werden. Die 120° drehbaren Lamellen verwandeln eine offene Fläche auf Knopfdruck in einen wind-, sicht- und regengeschützten Raum. Das intelligente Entwässerungssystem leitet Regenwasser unsichtbar durch die Pfosten in die Bodendrainage — keine externen Fallrohre, die das minimalistische Design stören.</p>`,
        block_2_content: `<h3>Fundamente und Extrem-Statik</h3>
<p>Da freistehende Systeme von allen Seiten dem Wind ausgesetzt sind, wirken bei Sturm enorme Sog- und Druckkräfte. Apexx Bau verwendet 3–5 mm starke Profile, die einen statisch stabilen Käfig bilden. Die Systeme sind zertifiziert für 140 km/h Windlast und 400 kg/m² Schneelast.</p>
<p>Die Bodenverankerung erfolgt über Beton-Punktfundamente (ca. 80 cm tief, frostfrei gegründet). Die Fußplatten werden mit Schwerlastankern verschraubt und unsichtbar verkleidet.</p>`,
        block_1_placement: "after_intro",
        block_2_placement: "before_faq",
        cta_primary_text: "Machbarkeit klären",
        cta_secondary_text: "—",
        faq_theme: "statik",
        faq_unique_q_count: 5
    },

    // === Terrassenüberdachung Glas (2.900 Vol) ===
    {
        slug: "wintergarten-systeme/terrassenueberdachung-glas",
        template: "money",
        product_id: "wintergarten-systeme",
        title: "Terrassenüberdachung mit Glas | Apexx Bau",
        meta_description: "Terrassenüberdachung mit Glas: VSG-Sicherheitsglas, maximale Lichtdurchlässigkeit. Als Festdach oder mit Glasschiebewänden erweiterbar.",
        h1: "Terrassenüberdachung mit Glas",
        intro_text: "Maximale Transparenz und Licht bei vollem Wetterschutz. Glasdächer schaffen helle, geschützte Außenräume.",
        features: ["VSG-Sicherheitsglas", "Maximaler Lichteinfall", "Regendicht", "Nachrüstbar mit Schiebewänden"],
        images: ["pergola-systeme-terrasse-lamellendach-glas-schiebesystem-b2c-hero-06"],
        faq: [
            { question: "Welches Glas wird für Terrassendächer verwendet?", answer: "VSG (Verbundsicherheitsglas) oder ESG (Einscheiben-Sicherheitsglas) in 8–10 mm Stärke. Bei Bruch entstehen keine scharfen Scherben — ein wichtiger Sicherheitsfaktor." },
            { question: "Wird es unter einem Glasdach im Sommer zu heiß?", answer: "Ohne Beschattung ja. Deshalb empfehlen wir die Kombination mit Dachmarkisen oder ZIP-Screens. Alternativ kann Sonnenschutzglas mit reduziertem g-Wert eingesetzt werden." },
            { question: "Kann ich Schiebewände nachträglich ergänzen?", answer: "Ja. Unsere Systeme sind modular aufgebaut. Glasschiebewände können jederzeit seitlich ergänzt werden — die Statik ist von Anfang an dafür ausgelegt." },
            { question: "Wie wird das Glasdach gereinigt?", answer: "Von außen mit Glasreiniger und weicher Bürste oder Teleskopstange. Bei guter Dachneigung sorgt Regen bereits für eine natürliche Grundreinigung." },
            { question: "Was kostet ein Glasdach für die Terrasse?", answer: "Festdächer mit VSG-Glas liegen bei 250–700 €/m². Mit seitlichen Glasschiebewänden (150–1.000 €/lfm) entsteht ein Kaltwintergarten." }
        ],
        block_1_content: `<h3>Glasdach: Licht und Schutz in perfekter Balance</h3>
<p>Ein Glasdach löst das Grundproblem jeder Terrassenüberdachung: Wie schütze ich vor Regen, ohne das Tageslicht zu verlieren? VSG-Sicherheitsglas bietet volle Transparenz bei absolutem Wetterschutz. Der Lichteinfall bleibt natürlich — die Terrasse fühlt sich nicht wie ein Keller an.</p>
<p>Apexx Bau verwendet VSG-Glas nach DIN 18008. Bei Bruch hält die einlaminierte PVB-Folie die Scherben zusammen — kein Splittern, kein Verletzungsrisiko. Für Bereiche mit hoher Sonneneinstrahlung empfehlen wir die Kombination mit einer Dachmarkise oder ZIP-Screen-Beschattung.</p>
<p>Der entscheidende Vorteil gegenüber Polycarbonat-Stegplatten: Glas vergilbt nicht, knackt nicht bei Temperaturschwankungen und dämpft Regengeräusche deutlich besser. Die Investition ist höher, aber die Lebensdauer unbegrenzt.</p>`,
        block_2_content: `<h3>Vom Glasdach zum Kaltwintergarten</h3>
<p>Ein Glasdach ist oft der erste Schritt. Wer nach 1–2 Jahren feststellt, dass auch seitlicher Windschutz gewünscht ist, kann rahmenlose Glasschiebewände nachrüsten. Die Apexx Bau Profile sind von Anfang an für das Zusatzgewicht dimensioniert — eine Nachrüstung ist millimetergenau möglich, ohne die Dachkonstruktion zu verändern.</p>`,
        block_1_placement: "after_intro",
        block_2_placement: "before_faq",
        cta_primary_text: "Glasdach-Beratung",
        cta_secondary_text: "—",
        faq_theme: "glas",
        faq_unique_q_count: 5
    },

    // === Terrassendach (6.600 Vol) ===
    {
        slug: "pergola-systeme/terrassendach",
        template: "money",
        product_id: "pergola-systeme",
        title: "Terrassendach | Apexx Bau",
        meta_description: "Terrassendach aus Aluminium: Lamellendach, Glasdach oder Festdach. Wartungsfrei, modular erweiterbar. Direkt vom Hersteller mit eigener Montage.",
        h1: "Terrassendach",
        intro_text: "Ein Terrassendach schützt vor Regen und erweitert den Wohnraum nach draußen. Die Frage ist nicht ob, sondern welches System.",
        features: ["3 Dachtypen verfügbar", "Modular erweiterbar", "Wartungsfrei", "Eigenmontage-Garantie"],
        images: ["pergola-systeme-terrasse-lamellendach-b2c-hero-07"],
        faq: [
            { question: "Welche Terrassendach-Typen gibt es?", answer: "Festdach (Aluminium + Glas), bioklimatisches Lamellendach (motorisierte Lamellen) und Rolling Roof (faltbares Dachsystem). Jeder Typ hat eigene Stärken je nach Nutzung." },
            { question: "Was ist besser: Lamellen oder Glas?", answer: "Lamellendächer bieten flexible Klimakontrolle und Belüftung. Glasdächer maximieren den Lichteinfall. Für die meisten Terrassen empfehlen wir das Lamellendach wegen der Vielseitigkeit." },
            { question: "Kann man ein Terrassendach selber bauen?", answer: "Wir raten davon ab. Die Statik, Wandverankerung und Entwässerung erfordern Fachkenntnis. Fehlerhafte Montage führt zu Schäden an der Bausubstanz und Verlust des Versicherungsschutzes." },
            { question: "Wie schwer ist ein Aluminium-Terrassendach?", answer: "Je nach System 15–25 kg/m². Deutlich leichter als Holz, aber durch die hohe Profilstärke (3–5 mm) statisch überlegen." },
            { question: "Gibt es Förderungen für Terrassendächer?", answer: "In Einzelfällen sind KfW-Fördermittel möglich, wenn die Überdachung als energetische Maßnahme (Sonnenschutz) eingestuft wird. Wir beraten dazu individuell." }
        ],
        block_1_content: `<h3>Drei Dachtypen — eine Entscheidung</h3>
<p>Apexx Bau bietet drei Terrassendach-Systeme, die sich in Funktion und Nutzung deutlich unterscheiden:</p>
<p><strong>Festdach (Aluminium + Glas/VSG):</strong> Permanenter Regenschutz mit maximalem Lichteinfall. Ideal für Terrassen, die ganzjährig trocken bleiben sollen. Nachteil: keine Belüftung über das Dach, daher Kombination mit Seitenelementen empfohlen.</p>
<p><strong>Bioklimatisches Lamellendach:</strong> Motorisierte Aluminium-Lamellen, die stufenlos zwischen offen und geschlossen verstellbar sind. Der Kamineffekt sorgt bei offenen Lamellen für natürliche Kühlung. Bei Regen schließen die Lamellen spaltfrei per Sensor. Unser meistverkauftes System.</p>
<p><strong>Rolling Roof:</strong> Faltbare Aluminium-Paneele, die sich zu 100% zurückziehen lassen. Maximum an Offenheit bei gutem Wetter, voller Schutz bei Regen. Ideal für Gastronomie.</p>`,
        block_2_content: `<h3>Warum Eigenmontage statt DIY oder Subunternehmer</h3>
<p>Ein Terrassendach wiegt mehrere hundert Kilogramm und überträgt enorme Kräfte auf Hauswand oder Fundament. Fehler bei der Montage — falsche Ankertypen, mangelnde Abdichtung, unterschätzte Windlasten — zeigen sich oft erst nach Monaten als Wasserschäden oder Risse. Apexx Bau montiert ausschließlich mit eigenen Teams und übernimmt 100% Verantwortung. 5 Jahre Garantie auf alle tragenden Teile.</p>`,
        block_1_placement: "after_intro",
        block_2_placement: "before_faq",
        cta_primary_text: "Dachtyp beraten lassen",
        cta_secondary_text: "—",
        faq_theme: "vergleich",
        faq_unique_q_count: 5
    },

    // === Pergola Holz (9.900 Vol) ===
    {
        slug: "pergola-systeme/pergola-holz",
        template: "money",
        product_id: "pergola-systeme",
        title: "Pergola Holz vs. Aluminium | Apexx Bau",
        meta_description: "Pergola Holz oder Aluminium? Ehrlicher Vergleich: Wartung, Lebensdauer, Kosten und Statik. Warum wir auf Aluminium setzen.",
        h1: "Pergola: Holz oder Aluminium?",
        intro_text: "Holz ist schön, aber aufwändig. Aluminium ist wartungsfrei und langlebiger. Ein ehrlicher Vergleich der beiden Materialien.",
        features: ["Materialvergleich", "Wartungsaufwand ehrlich", "Statik-Fakten", "Langfristige Kostenrechnung"],
        images: ["pergola-systeme-garten-aluminium-festdach-b2c-hero-03"],
        faq: [
            { question: "Wie oft muss eine Holz-Pergola gestrichen werden?", answer: "Alle 3–5 Jahre muss abgeschliffen und mit Schutzlasur behandelt werden. Unbehandeltes Holz vergraut und wird von Fäulnis und Insekten angegriffen." },
            { question: "Ist Aluminium teurer als Holz?", answer: "Initial ja: Alu kostet ca. 30–50% mehr. Aber über 10 Jahre gleichen sich die Kosten durch entfallende Wartung (Lasur, Schleifmittel, Arbeitszeit) mehr als aus." },
            { question: "Kann eine Holz-Pergola die gleiche Schneelast tragen?", answer: "Nur bei massiven Balkenquerschnitten (12x12 cm+), die optisch klobig wirken. Aluminium (EN AW-6060, 3–5mm) erreicht mit schlanken Profilen deutlich höhere Traglasten." },
            { question: "Gibt es Holzoptik bei Aluminium?", answer: "Ja. Spezielle Folierungen und Pulverbeschichtungen in Holzoptik sind möglich. Optisch kaum unterscheidbar, aber wartungsfrei." },
            { question: "Warum bietet Apexx Bau keine Holz-Pergolen an?", answer: "Weil wir 5 Jahre Garantie geben und langfristige Qualität garantieren wollen. Holz im Außenbereich ist ein Wartungsrisiko, das wir unseren Kunden nicht zumuten." }
        ],
        block_1_content: `<h3>Holz vs. Aluminium: Ein ehrlicher Materialvergleich</h3>
<p>Holz-Pergolen haben einen unbestreitbaren ästhetischen Reiz. Aber für den dauerhaften Einsatz im Außenbereich sprechen die Fakten eine klare Sprache:</p>
<p><strong>Wartung:</strong> Holz muss alle 3–5 Jahre abgeschliffen und mit Schutzlasur gegen Fäulnis, Pilze und Insektenbefall behandelt werden. Aluminium braucht keinerlei Pflege — gelegentliches Abwischen genügt.</p>
<p><strong>Formstabilität:</strong> Holz arbeitet bei Temperatur- und Feuchtigkeitsänderungen: Es quillt, schwindet, verdreht sich. Aluminium bleibt formstabil — bei -20°C genauso wie bei +40°C.</p>
<p><strong>Statik bei schlanken Profilen:</strong> Um die gleiche Traglast zu erreichen wie ein 60x80mm Aluminium-Profil, braucht Holz Balken von 120x120mm oder mehr. Das Ergebnis ist optisch massiv und klobig.</p>
<p><strong>Lebensdauer:</strong> Aluminium EN AW-6060 ist korrosionsbeständig und hält 30+ Jahre ohne Strukturverlust. Holz im Außenbereich beginnt nach 10–15 Jahren zu ermüden.</p>`,
        block_2_content: `<h3>Die Langfrist-Rechnung</h3>
<p>Initial kostet Aluminium ca. 30–50% mehr als Holz. Aber die Wartungskosten über 10 Jahre (Lasur, Schleifmittel, Arbeitszeit: ca. 200–400 € alle 3–5 Jahre) und die kürzere Lebensdauer von Holz drehen die Rechnung um. Apexx Bau Systeme amortisieren sich innerhalb von 8–10 Jahren — und halten danach weitere 20+ Jahre wartungsfrei.</p>`,
        block_1_placement: "after_intro",
        block_2_placement: "before_faq",
        cta_primary_text: "Materialberatung starten",
        cta_secondary_text: "—",
        faq_theme: "material",
        faq_unique_q_count: 5
    },

    // === Pergola Garten (2.400 Vol) ===
    {
        slug: "pergola-systeme/pergola-garten",
        template: "money",
        product_id: "pergola-systeme",
        title: "Pergola für den Garten | Apexx Bau",
        meta_description: "Garten-Pergola freistehend oder als Anbau: Bioklimatisch, modular, wetterfest. Direkt vom Hersteller mit eigener Montage.",
        h1: "Pergola für den Garten",
        intro_text: "Ob Pool, Sitzecke oder Outdoor-Küche — eine Garten-Pergola schafft einen definierten Außenraum mit Schutz und Atmosphäre.",
        features: ["Freistehend oder Anbau", "Bioklimatische Lamellen", "LED + Heizung nachrüstbar", "Wetterfest bis 140 km/h"],
        images: ["pergola-systeme-garten-lamellendach-zip-screen-b2c-hero-04"],
        faq: [
            { question: "Freistehend oder Wandanbau im Garten?", answer: "Für Pool und Sitzecken abseits des Hauses: freistehend. Für die Terrasse direkt am Haus: Wandanbau. Beide Varianten sind modular erweiterbar." },
            { question: "Kann ich LED-Beleuchtung integrieren?", answer: "Ja. Integrierte LED-Leisten in den Dachprofilen schaffen stimmungsvolles Licht. Steuerung per Fernbedienung oder Smart-Home." },
            { question: "Brauche ich eine Baugenehmigung?", answer: "In NRW sind viele Garten-Pergolen genehmigungsfrei bis zu bestimmten Größen. Wir prüfen das vor Projektstart." },
            { question: "Wie tief müssen die Fundamente sein?", answer: "Frostfrei gegründet, typisch 80 cm. Wir koordinieren die Fundamentarbeiten als Teil des Komplettpakets." },
            { question: "Ist eine Garten-Pergola winterfest?", answer: "Ja. Unsere Systeme sind auf Schneelast bis 400 kg/m² ausgelegt. Die Lamellen können bei Extremschnee auf 90° gestellt werden." }
        ],
        block_1_content: `<h3>Die Garten-Pergola als Outdoor-Wohnzimmer</h3>
<p>Eine gut geplante Garten-Pergola ist mehr als ein Sonnensegel auf Stützen. Sie definiert einen Außenraum mit klarer Funktion: Essen, Entspannen, Arbeiten — geschützt vor Sonne, Wind und Regen, aber mit dem Gefühl, draußen zu sein.</p>
<p>Apexx Bau Pergolen sind bioklimatisch konzipiert: Die motorisierten Lamellen lassen sich stufenlos verstellen. Bei Hitze entsteht durch den Kamineffekt eine natürliche Kühlung. Bei Regen schließen die Lamellen spaltfrei — das Wasser wird unsichtbar durch die Pfosten abgeleitet.</p>
<p>Besonders beliebt im Garten: die Kombination mit integrierten LED-Leisten für Abendstimmung und optionalen Infrarot-Heizstrahlern für kühle Frühlingsabende. Alles steuerbar per Fernbedienung oder Smart-Home-System.</p>`,
        block_2_content: `<h3>Modularer Ausbau: vom Sonnendach zum Gartenzimmer</h3>
<p>Die meisten Kunden starten mit dem Lamellendach. Nach einer Saison ergänzen viele ZIP-Screens als Seitenschutz gegen Wind und Insekten. Wer den Garten ganzjährig nutzen möchte, rüstet Glasschiebewände nach. Die Apexx Bau Profile sind von Anfang an für alle Ausbaustufen dimensioniert.</p>`,
        block_1_placement: "after_intro",
        block_2_placement: "before_faq",
        cta_primary_text: "Garten-Projekt besprechen",
        cta_secondary_text: "—",
        faq_theme: "system",
        faq_unique_q_count: 5
    },

    // === Lamellen Pergola / Lamellendach Terrasse (1.900 Vol each) ===
    {
        slug: "pergola-systeme/lamellen-pergola",
        template: "money",
        product_id: "pergola-systeme",
        title: "Lamellen-Pergola | Apexx Bau",
        meta_description: "Lamellen-Pergola mit motorisierten Aluminium-Lamellen: Stufenlos verstellbar, regendicht, windstabil bis 140 km/h. Direkt vom Hersteller.",
        h1: "Lamellen-Pergola",
        intro_text: "Motorisierte Lamellen, die Licht, Luft und Regen steuern — das vielseitigste Terrassendach-System auf dem Markt.",
        features: ["Lamellen 0–135° verstellbar", "100% regendicht", "Sensor-Automatik", "Windlast bis 140 km/h"],
        images: ["pergola-systeme-garten-lamellendach-led-b2c-hero-03"],
        faq: [
            { question: "Wie weit lassen sich die Lamellen öffnen?", answer: "Von 0° (geschlossen/regendicht) bis 135°. Bei 90° fällt Schnee hindurch, bei leichter Öffnung entsteht der kühlende Kamineffekt." },
            { question: "Wie schnell reagiert die Sensor-Automatik?", answer: "Der Regensensor schließt die Lamellen innerhalb weniger Sekunden. Der Windsensor stellt die Lamellen in die aerodynamisch günstigste Position." },
            { question: "Können die Lamellen auch als Sonnenschutz dienen?", answer: "Ja. Im halben Öffnungswinkel filtern die Lamellen das Licht und werfen rhythmische Schatten — ähnlich einer Jalousie, aber für draußen." },
            { question: "Welche Motoren werden verbaut?", answer: "Bürstenlose, wartungsfreie Somfy-Motoren. Leise, langlebig und kompatibel mit Smart-Home-Systemen (io-homecontrol, Tahoma)." },
            { question: "Wie wird die Lamellen-Pergola gereinigt?", answer: "Lamellen bei Regen offen stellen — das Wasser spült den Staub ab. Alternativ mit Gartenschlauch und weicher Bürste. Kein Hochdruckreiniger nötig." }
        ],
        block_1_content: `<h3>Wie Lamellen-Pergolen funktionieren</h3>
<p>Das Prinzip ist einfach, die Technik anspruchsvoll: Aluminium-Lamellen (Legierung EN AW-6060) sind drehbar in einem Rahmen gelagert und werden von bürstenlosen Somfy-Motoren stufenlos zwischen 0° und 135° verstellt. Bei geschlossenen Lamellen ist das Dach 100% regendicht — ein integriertes Gefälle leitet das Wasser in die Pfosten.</p>
<p>Bei geöffneten Lamellen entsteht der Kamineffekt: Warme Luft steigt nach oben ab, kühle Frischluft strömt von den Seiten nach. Selbst bei 35°C herrscht unter dem Dach ein angenehmes Klima — ohne Ventilator, ohne Strom.</p>
<p>Die Sensor-Automatik reagiert auf Regen, Wind und optional Sonneneinstrahlung. Bei Sturm schließt das Dach autark, bei Sonne öffnet es sich automatisch in den optimalen Winkel. Wer will, steuert alles per Fernbedienung oder Smartphone.</p>`,
        block_2_content: `<h3>Lamellen vs. Glas vs. Stoff — wann Lamellen die richtige Wahl sind</h3>
<p>Lamellen sind ideal wenn: flexible Klimakontrolle wichtiger ist als maximaler Lichteinfall, die Terrasse bei jedem Wetter genutzt werden soll, und spätere Erweiterungen (Verglasung, Screens) geplant sind. Glasdächer bieten mehr Licht, aber keine Belüftung. Stoffdächer sind günstiger, aber nicht wetterfest.</p>`,
        block_1_placement: "after_intro",
        block_2_placement: "before_faq",
        cta_primary_text: "Lamellendach konfigurieren",
        cta_secondary_text: "—",
        faq_theme: "klima",
        faq_unique_q_count: 5
    },

    // === Markise Terrasse / Markise oder Pergola (3.600 + 1.600 Vol) ===
    {
        slug: "zip-screen-systeme/markise-terrasse",
        template: "money",
        product_id: "zip-screen-systeme",
        title: "Markise für die Terrasse | Apexx Bau",
        meta_description: "Markise oder Pergola? ZIP-Screens für Terrassen: Windstabil bis 120 km/h, Insektenschutz, Smart-Home-fähig. Ehrlicher Vergleich.",
        h1: "Markise für die Terrasse",
        intro_text: "Klassische Markisen haben Grenzen. ZIP-Screens sind die windstabile Alternative — und oft die bessere Wahl.",
        features: ["Windklasse 6 (120 km/h)", "Spaltfreier Abschluss", "Insektenschutz inklusive", "Somfy-Funk + Sensoren"],
        images: ["pergola-systeme-terrasse-tavan-zip-screen-b2c-hero-02"],
        faq: [
            { question: "Markise oder Pergola — was ist besser?", answer: "Pergolen bieten Regenschutz und sind modular erweiterbar. Markisen sind günstiger und reichen für reinen Sonnenschutz. ZIP-Screens kombinieren beides: Sonnen-, Wind- und Insektenschutz." },
            { question: "Wie windfest sind ZIP-Screens im Vergleich zu Gelenkarm-Markisen?", answer: "ZIP-Screens: Windklasse 6 (bis 120 km/h). Gelenkarm-Markisen: Windklasse 1–2 (bis 38 km/h). Das ist ein Faktor 3." },
            { question: "Schützen ZIP-Screens auch vor Regen?", answer: "Seitlich ja — als Schlagregenschutz. Für Schutz von oben braucht es ein Dach (Pergola oder Glasdach). Die Kombination Pergola + ZIP-Screen ist optimal." },
            { question: "Was kostet eine Terrassen-Markise?", answer: "Gelenkarm-Markisen ab 800 €, ZIP-Screens ab 1.800 € pro Seite. Der Preisunterschied zahlt sich durch Langlebigkeit und Vielseitigkeit zurück." },
            { question: "Kann ich eine bestehende Pergola mit Markisen nachrüsten?", answer: "An Apexx Bau Systeme jederzeit — die Profile haben dedizierte Nuten. Bei Fremdprodukten hängt es von der Profilstärke ab." }
        ],
        block_1_content: `<h3>Warum ZIP-Screens klassische Markisen übertreffen</h3>
<p>Eine Gelenkarm-Markise ist ein Sonnenschutz — nicht mehr. Sobald Wind aufkommt (ab Windstärke 4–5), muss sie eingefahren werden, sonst drohen Tuchschäden oder Absturz. Ein ZIP-Screen ist fundamental anders konstruiert.</p>
<p>Die z-LOCK Technologie: Ein Halbreißverschluss wird thermisch an die Tuchränder geschweißt und gleitet in zweigeteilten Aluminium-Führungsschienen. Das Ergebnis: eine spaltfreie, trampolinartig gespannte Fläche, die Orkanböen bis 120 km/h standhält (Windklasse 6 nach DIN EN 13561).</p>
<p>Ein praktischer Nebeneffekt: Der spaltfreie Abschluss funktioniert als mechanischer Insektenschutz. Mücken und Wespen haben keinen Durchschlupf, während die Mikroperforation des Gewebes (Öffnungsfaktor 3–5%) weiterhin Frischluft durchlässt.</p>`,
        block_2_content: `<h3>Die Physik dahinter: Warum Außenbeschattung effizienter ist</h3>
<p>ZIP-Screens blockieren bis zu 97% der Sonnenwärme VOR dem Glas (g_tot-Wert 0,05–0,12). Innenliegende Plissees oder Rollos lassen die Wärme erst durch das Glas — und kämpfen dann vergeblich. Außenliegender Sonnenschutz spart im Sommer bis zu 30% Kühlenergie gegenüber Innenbeschattung.</p>`,
        block_1_placement: "after_intro",
        block_2_placement: "before_faq",
        cta_primary_text: "Markisen-Beratung",
        cta_secondary_text: "—",
        faq_theme: "screen",
        faq_unique_q_count: 5
    },

    // === Pergola mit Lamellendach (2.400 Vol) ===
    {
        slug: "pergola-systeme/pergola-mit-lamellendach",
        template: "money",
        product_id: "pergola-systeme",
        title: "Pergola mit Lamellendach | Apexx Bau",
        meta_description: "Pergola mit Lamellendach: Bioklimatisches System mit motorisierten Lamellen. Regendicht, windstabil, modular erweiterbar. Ab Werk ohne Händler.",
        h1: "Pergola mit Lamellendach",
        intro_text: "Das Lamellendach ist das Herzstück jeder bioklimatischen Pergola. Hier erfahren Sie, was ein Premium-System ausmacht.",
        features: ["Motorisierte Lamellen", "Kamineffekt-Kühlung", "Integrierte Entwässerung", "Sensor-Automatik"],
        images: ["pergola-systeme-terrasse-lamellendach-b2c-hero-01"],
        faq: [
            { question: "Was macht ein Lamellendach bioklimatisch?", answer: "Die drehbaren Lamellen erzeugen bei Öffnung den Kamineffekt — warme Luft steigt ab, kühle Luft strömt nach. Das reguliert das Mikroklima unter dem Dach ohne Strom." },
            { question: "Sind die Lamellen wirklich regendicht?", answer: "Ja. Bei geschlossenen Lamellen ist das Dach zu 100% dicht. Regenwasser wird über ein Gefälle in den Lamellen gesammelt und durch die Pfosten abgeleitet." },
            { question: "Welche Schneelast halten die Lamellen aus?", answer: "Bis 400 kg/m². Bei Extremschnee können die Lamellen auf 90° gestellt werden, damit die Schneemassen hindurchfallen." },
            { question: "Wie laut sind die Motoren?", answer: "Kaum hörbar. Die bürstenlosen Somfy-Motoren arbeiten flüsterleise und sind wartungsfrei — für die gesamte Lebensdauer." },
            { question: "Kann man die Lamellen auch manuell bedienen?", answer: "Im Normalfall nicht nötig — die Fernbedienung genügt. Im Notfall (Stromausfall) können die Lamellen per Kurbel bewegt werden." }
        ],
        block_1_content: `<h3>Das bioklimatische Prinzip: Kühlung ohne Strom</h3>
<p>Konventionelle Terrassenüberdachungen aus Glas oder Polycarbonat erzeugen im Sommer einen Treibhauseffekt. Unter dem dichten Dach staut sich die Hitze. Ein bioklimatisches Lamellendach löst dieses Problem durch Physik: den Kamineffekt.</p>
<p>Bei leicht geöffneten Lamellen (15–30°) steigt die warme Luft nach oben ab. Von den Seiten strömt kühlere Frischluft nach. Es entsteht eine sanfte, natürliche Zirkulation — ohne Ventilator, ohne Energiekosten. Bei 35°C Außentemperatur herrscht unter dem Lamellendach ein deutlich angenehmeres Klima als unter einem geschlossenen Glasdach.</p>
<p>Die Apexx Bau Lamellen bestehen aus stranggepresstem Aluminium mit integriertem Entwässerungsgefälle. Bei geschlossenen Lamellen wird Regenwasser spaltfrei aufgefangen und unsichtbar durch die Pfosten abgeleitet. Sensoren für Regen, Wind und Sonne steuern das System vollautomatisch.</p>`,
        block_2_content: `<h3>Premium-Merkmale erkennen</h3>
<p>Nicht jedes Lamellendach ist gleich. Achten Sie auf: Profilstärke (mindestens 3 mm), Legierung (EN AW-6060), Verbindungstechnik (Edelstahl, nicht Plastik), Motorhersteller (Somfy oder vergleichbar), und Entwässerungskonzept (durch die Pfosten, nicht über externe Rinnen). Bei Apexx Bau sind alle diese Punkte Standard — inklusive 5 Jahren Garantie.</p>`,
        block_1_placement: "after_intro",
        block_2_placement: "before_faq",
        cta_primary_text: "Lamellendach anfragen",
        cta_secondary_text: "—",
        faq_theme: "klima",
        faq_unique_q_count: 5
    },

    // === Wintergarten (27.100 Vol) — enrich existing ===
    {
        slug: "wintergarten-systeme/wintergarten",
        template: "money",
        product_id: "wintergarten-systeme",
        title: "Wintergarten | Apexx Bau",
        meta_description: "Wintergarten aus Aluminium: Thermisch getrennte Profile, Wärmedämmglas, ganzjährig nutzbar. Vom Kaltwintergarten bis zum Wohnwintergarten.",
        h1: "Wintergarten",
        intro_text: "Ein Wintergarten erweitert Ihren Wohnraum dauerhaft. Die entscheidende Frage: Kaltwintergarten oder Wohnwintergarten?",
        features: ["Thermisch getrennte Profile", "Wärmedämmverglasung", "Ganzjahresnutzung", "Modulare Bauweise"],
        images: ["wintergarten-systeme-gewerbe-glas-schiebesystem-b2b-hero-02"],
        faq: [
            { question: "Was ist der Unterschied zwischen Kalt- und Wohnwintergarten?", answer: "Ein Kaltwintergarten ist nicht gedämmt (500–1.800 €/m², 3-Saison-Nutzung). Ein Wohnwintergarten hat thermisch getrennte Profile und Wärmedämmglas (1.700–5.500 €/m², ganzjährig nutzbar)." },
            { question: "Brauche ich eine Baugenehmigung für einen Wintergarten?", answer: "In den meisten Bundesländern ja. Ein Wintergarten gilt als Anbau und verändert die GRZ (Grundflächenzahl). Wir klären die Genehmigungsfrage vor Projektstart." },
            { question: "Welches Glas wird verwendet?", answer: "Wärmedämmglas (Ug-Wert ≤ 1,1 W/m²K) für Wohnwintergärten, ESG/VSG für Kaltwintergärten. Dachverglasung immer in VSG für Sicherheit gegen Bruch." },
            { question: "Wie wird der Wintergarten belüftet?", answer: "Über motorisierte Lüftungsklappen im Dach und öffenbare Seitenelemente. Bei bioklimatischen Systemen zusätzlich über verstellbare Lamellen." },
            { question: "Was kostet ein Wintergarten?", answer: "Kaltwintergarten: 500–1.800 €/m². Wohnwintergarten Standard: 1.700–2.800 €/m². Premium: 4.000–5.500 €/m². Montage und Fundament inklusive bei Apexx Bau." }
        ],
        block_1_content: `<h3>Wintergarten: Ganzjährig nutzbarer Wohnraum aus Glas</h3>
<p>Ein Wintergarten ist keine Pergola mit Glaswänden. Er ist ein vollwertiger Wohnraum mit eigenen Anforderungen an Statik, Dämmung und Belüftung. Die Unterscheidung zwischen Kalt- und Wohnwintergarten bestimmt Kosten, Nutzung und Genehmigungspflicht.</p>
<p><strong>Kaltwintergarten:</strong> Nicht gedämmt, 3-Saison-Nutzung (Frühling bis Herbst). Im Winter frostfrei, aber nicht beheizbar. Preislich attraktiv (500–1.800 €/m²) und oft genehmigungsfrei.</p>
<p><strong>Wohnwintergarten:</strong> Thermisch getrennte Aluminiumprofile mit Wärmedämmglas (Ug ≤ 1,1 W/m²K). Ganzjährig nutzbar, heizbar, als Wohnfläche anrechenbar. Braucht fast immer eine Baugenehmigung.</p>
<p>Apexx Bau baut beide Varianten. Die modulare Aluminium-Konstruktion erlaubt es, mit einem Kaltwintergarten zu starten und später auf Wärmedämmglas umzurüsten — wenn Budget oder Bedarf sich ändern.</p>`,
        block_2_content: `<h3>Häufige Fehler bei Wintergarten-Projekten</h3>
<p>Die drei größten Probleme: fehlende Belüftung (führt zu Kondensat und Schimmel), unterschätzte Sommerhitze (ohne Beschattung wird der Wintergarten zur Sauna), und mangelnde Entwässerung (Glasdächer sammeln enorme Wassermengen). Apexx Bau plant alle drei Aspekte von Anfang an mit — einschließlich Dachbeschattung, Lüftungskonzept und integrierter Entwässerung.</p>`,
        block_1_placement: "after_intro",
        block_2_placement: "before_faq",
        cta_primary_text: "Wintergarten-Beratung",
        cta_secondary_text: "—",
        faq_theme: "winter",
        faq_unique_q_count: 5
    },
];

// Merge new pages into landing_pages.json
const existingSlugs = new Set(data.map(p => p.slug));
let added = 0;
let updated = 0;

for (const page of newPages) {
    const existing = data.find(p => p.slug === page.slug);
    if (existing) {
        // Update existing page with enriched content
        Object.assign(existing, page);
        updated++;
    } else {
        // Add new page
        data.push(page);
        added++;
    }
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
console.log(`✅ Added ${added} new pages, updated ${updated} existing pages`);
console.log(`📄 Total pages: ${data.length}`);
console.log(`📄 Enriched: ${data.filter(p => p.block_1_content).length}`);
