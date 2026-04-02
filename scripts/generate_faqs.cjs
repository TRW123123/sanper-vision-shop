// generate_faqs.cjs
// Generates FAQs for enriched landing pages based on faq_theme
// Uses ratgeber hard_facts + page-specific content as source

const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'src', 'data', 'landing_pages.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// FAQ database by theme — based on ratgeber research + NotebookLM content
const faqsByTheme = {
    allgemein: [
        { question: "Was unterscheidet Apexx Bau von anderen Anbietern?", answer: "Apexx Bau ist Hersteller und Monteur in einem. Planung, Fertigung und Montage kommen aus einer Hand — ohne Zwischenhändler, ohne wechselnde Ansprechpartner. Das reduziert Fehlerquellen und schafft klare Verantwortung." },
        { question: "Welche Garantie gibt Apexx Bau?", answer: "Wir geben 5 Jahre Herstellergarantie auf alle tragenden und mechanischen Bauteile. Zusätzlich sichern wir eine lebenslange Teileverfügbarkeit für Motoren und Gelenke zu." },
        { question: "In welchen Regionen ist Apexx Bau tätig?", answer: "Unser Kerngebiet ist NRW, wir realisieren Projekte aber deutschlandweit. Die Montage erfolgt immer durch eigene Teams, nicht durch Subunternehmer." },
        { question: "Wie läuft eine Anfrage bei Apexx Bau ab?", answer: "Nach Ihrer Kontaktaufnahme klären wir in einem persönlichen Gespräch Ihre Anforderungen, Maße und Wünsche. Darauf basierend erhalten Sie ein transparentes Angebot mit Lieferung, Montage und Abnahme." },
        { question: "Bietet Apexx Bau auch Finanzierung an?", answer: "Auf Anfrage besprechen wir individuelle Zahlungsmodalitäten. Die Konditionen richten sich nach Projektumfang und Kundenwunsch." },
    ],
    system: [
        { question: "Was bedeutet 'System' im Vergleich zu Einzelprodukten?", answer: "Ein System denkt Dach, Entwässerung, Beschattung und Steuerung als Einheit. Einzelprodukte lösen nur Teilprobleme und führen häufig zu teuren Nachrüstungen oder Inkompatibilitäten." },
        { question: "Kann ich ein Pergola-System später erweitern?", answer: "Ja. Apexx Bau Systeme sind modular aufgebaut. Glasschiebewände, ZIP-Screens oder LED-Beleuchtung können jederzeit nachgerüstet werden, da unsere Profile von Anfang an die nötige Statik mitbringen." },
        { question: "Welche Komponenten gehören zu einem vollständigen System?", answer: "Je nach Bedarf: Dachkonstruktion (Lamellen oder Glas), Entwässerung, seitliche Verglasung oder Screens, Beleuchtung, Heizung und intelligente Steuerung über Sensoren oder Smart-Home-Anbindung." },
        { question: "Wie lange hält ein Apexx Bau System?", answer: "Bei ordnungsgemäßer Montage und normaler Nutzung sind unsere Systeme auf eine Lebensdauer von 20+ Jahren ausgelegt. Die stranggepressten Aluminiumprofile sind korrosionsbeständig und wartungsfrei." },
        { question: "Was passiert, wenn eine Komponente ausfällt?", answer: "Wir garantieren lebenslange Teileverfügbarkeit. Bei Motoren und Steuerungselementen arbeiten wir mit Markenherstellern wie Somfy, deren Ersatzteile langfristig lieferbar sind." },
    ],
    klima: [
        { question: "Wie funktioniert der Kamineffekt bei bioklimatischen Pergolen?", answer: "Bei geöffneten Lamellen steigt warme Luft nach oben ab, während von den Seiten kühle Frischluft nachströmt. So entsteht eine natürliche Zirkulation, die selbst bei 35°C ein angenehmes Klima unter dem Dach schafft." },
        { question: "Sind bioklimatische Pergolen auch bei Regen nutzbar?", answer: "Ja. Sobald der Regensensor anspricht, schließen die Lamellen spaltfrei. Das Regenwasser wird über ein integriertes Gefälle in den Lamellen gesammelt und unsichtbar durch die Pfosten abgeleitet." },
        { question: "Welche Windlast hält eine bioklimatische Pergola aus?", answer: "Apexx Bau Systeme sind auf Windlasten bis 140 km/h bei geschlossenen Lamellen ausgelegt. Bei extremen Bedingungen schützt sich die Anlage durch Windsensoren autark." },
        { question: "Wie hoch ist die Schneelast?", answer: "Unsere Systeme tragen bis zu 400 kg/m² Schneelast. Bei extremem Schneefall können die Lamellen auf 90° gestellt werden, damit Schnee hindurchfällt." },
        { question: "Braucht eine bioklimatische Pergola viel Wartung?", answer: "Nein. Dank rostfreier Edelstahlbolzen und selbstschmierender Messinglager ist die Anlage praktisch wartungsfrei. Gelegentliches Abwischen genügt." },
    ],
    preis: [
        { question: "Was kostet eine Pergola pro Quadratmeter?", answer: "Bioklimatische Premium-Lamellendächer inklusive Montage liegen bei 900–1.200 €/m². Festdächer mit Glas beginnen bei 250–700 €/m². Der Endpreis hängt von Maßen, Ausstattung und Montagesituation ab." },
        { question: "Warum sind Apexx Bau Preise günstiger als beim Fachhändler?", answer: "Wir verkaufen direkt ab Werk ohne Zwischenhändler. Bei identischer Qualität (EN AW-6060, 3-5mm Wandstärke, Qualicoat-Beschichtung) sparen Kunden die Handelsmargen." },
        { question: "Was ist im Komplettpreis enthalten?", answer: "Maßfertigung, Lieferung, Montagematerial, professionelle Installation durch eigene Teams und Abnahme. Keine versteckten Kosten für Fundamente oder Elektrik — alles wird vorab kalkuliert." },
        { question: "Gibt es versteckte Kosten?", answer: "Nein. Wir kalkulieren transparent: Fundament (70–150 €/m²), Elektrik (500–2.000 €), Entwässerung (300–800 €) und eventuelle Genehmigungskosten werden vorab besprochen." },
        { question: "Lohnt sich ein Importprodukt aus Polen?", answer: "Die Materialersparnis liegt bei 20–40%, aber Transport, Koordination und lokale Fundamente (3.000–6.000 €) schmälern den Vorteil. Der Break-Even liegt erst ab 15–20 m² Projektgröße — und ohne lokalen Servicepartner." },
    ],
    montage: [
        { question: "Wer montiert die Anlage?", answer: "Ausschließlich hauseigene, TÜV-ausgebildete Apexx Bau Montageteams. Wir setzen keine Subunternehmer ein — das garantiert Qualität und klare Verantwortung." },
        { question: "Wie lange dauert die Montage?", answer: "Eine Standard-Pergola wird in 1–2 Arbeitstagen montiert. Komplexere Systeme mit Verglasung benötigen 2–4 Tage. Die genaue Dauer klären wir im Vorfeld." },
        { question: "Kann an einer WDVS-Fassade montiert werden?", answer: "Ja. Wir verwenden thermisch getrennte Hochlastanker (z.B. Fischer Thermax), die die Dämmschicht überbrücken und Kältebrücken zu 100% vermeiden." },
        { question: "Was passiert bei Schäden während der Montage?", answer: "Durch unsere Eigenmontage-Regel tragen wir die volle Verantwortung. Im unwahrscheinlichen Fall eines Schadens greift unsere Haftpflicht — kein Ping-Pong zwischen Händler und Handwerker." },
        { question: "Brauche ich Vorkenntnisse oder Vorbereitungen?", answer: "Nein. Wir koordinieren alles: von der Fundamentplanung über die Elektrik-Vorbereitung bis zur finalen Einweisung in die Bedienung. Sie müssen nur den Zugang sicherstellen." },
    ],
    hybrid: [
        { question: "Wann macht eine Pergola-Wintergarten-Kombination Sinn?", answer: "Wenn Sie flexible Nutzung wünschen: Im Sommer offene Pergola mit Lamellen, im Winter geschlossene Verglasung. Entscheidend ist die klare Trennung zwischen offenem und geschlossenem Bereich." },
        { question: "Kann ich eine Pergola nachträglich verglasen?", answer: "Ja. Apexx Bau Profile sind mit 3–5mm Wandstärke überdimensioniert und tragen das Zusatzgewicht von Glasschiebewänden problemlos. Die Nachrüstung ist jederzeit möglich." },
        { question: "Gibt es Probleme mit Kondensat?", answer: "Kondensatbildung entsteht bei falscher Belüftung. Wir planen Hybridlösungen mit durchdachtem Lüftungskonzept, damit Feuchtigkeit kontrolliert abgeführt wird." },
        { question: "Was kostet eine Hybridlösung?", answer: "Je nach Konfiguration 30–50% mehr als eine reine Pergola. Durch den modularen Aufbau können Sie schrittweise investieren — erst das Dach, später die Verglasung." },
        { question: "Brauche ich eine Baugenehmigung?", answer: "Das hängt von Größe, Standort und Landesbauordnung ab. In NRW sind viele Terrassenüberdachungen genehmigungsfrei. Wir prüfen das im Vorfeld für Sie." },
    ],
    vergleich: [
        { question: "Was ist besser: Lamellendach oder Glasdach?", answer: "Lamellendächer bieten flexible Klimakontrolle und Belüftung. Glasdächer maximieren Lichtdurchlass und Regenschutz. Die Wahl hängt von Nutzung und Prioritäten ab." },
        { question: "Wintergarten oder Pergola — was passt zu mir?", answer: "Ein Wintergarten ist ein geschlossener, gedämmter Raum für Ganzjahresnutzung. Eine Pergola ist ein offenes bis halboffenes System für die wärmere Jahreszeit. Hybridlösungen vereinen beides." },
        { question: "Aluminium oder Holz — welches Material ist besser?", answer: "Aluminium ist wartungsfrei, formstabil und langlebig. Holz braucht alle 3–5 Jahre Pflege und arbeitet bei Witterung. Für dauerhafte Außenanlagen empfehlen wir Aluminium." },
        { question: "Welchen Vorteil haben Lamellen gegenüber Stoff?", answer: "Aluminium-Lamellen sind wasserdicht, windstabil und mechanisch belastbar. Stoffdächer bieten nur Sonnenschutz und müssen bei Wind eingefahren werden." },
        { question: "Wie schneidet Apexx Bau im Vergleich zu Renson oder Weinor ab?", answer: "Vergleichbare oder höhere Profilstärken (3–5mm vs. 2–3mm), gleiche Legierung (EN AW-6060), aber ohne Händlermarge. Technisch auf Augenhöhe, preislich deutlich attraktiver durch Direktvertrieb." },
    ],
    winter: [
        { question: "Kann ich einen Kaltwintergarten im Winter nutzen?", answer: "Bedingt. Ein Kaltwintergarten ist nicht gedämmt — bei Frost sinkt die Temperatur auf Außentemperatur +5–10°C. Für frostempfindliche Pflanzen reicht das, zum dauerhaften Wohnen nicht." },
        { question: "Was kostet ein Kaltwintergarten?", answer: "Kaltwintergärten beginnen bei 500–1.800 €/m² je nach Größe und Verglasung. Deutlich günstiger als ein Wohnwintergarten (1.700–5.500 €/m²)." },
        { question: "Braucht ein Kaltwintergarten eine Heizung?", answer: "Nein. Da keine Wärmedämmung vorhanden ist, wäre Heizen Energieverschwendung. Infrarotstrahler für kurzzeitige Wärme an kühlen Abenden sind aber eine sinnvolle Ergänzung." },
        { question: "Kann ein Kaltwintergarten zum Wohnwintergarten aufgerüstet werden?", answer: "Technisch möglich, aber aufwändig. Die Verglasung muss gegen Wärmedämmglas getauscht und eine Heizung installiert werden. Besser von Anfang an richtig planen." },
        { question: "Welche Genehmigung brauche ich?", answer: "In NRW sind Kaltwintergärten oft genehmigungsfrei bis zu bestimmten Größen. Die genauen Regelungen hängen von Kommune und Bebauungsplan ab — wir klären das vorab." },
    ],
    glas: [
        { question: "Welches Glas wird für Schiebewände verwendet?", answer: "Einscheiben-Sicherheitsglas (ESG) in 8mm oder 10mm Stärke. Bei der Herstellung wird das Glas auf 500°C erhitzt und schlagartig abgekühlt — das macht es extrem stoßfest." },
        { question: "Sind Glasschiebewände einbruchsicher?", answer: "ESG-Glas ist deutlich stabiler als Normalglas. Sollte es im Extremfall brechen, zerfällt es in stumpfkantige Krümel statt in scharfe Scherben — ein großer Sicherheitsvorteil." },
        { question: "Wie viele Schienen brauche ich?", answer: "Das hängt von der Breite ab. Für Standard-Terrassen reichen 2–3 Spuren, bei breiteren Öffnungen 4–5 Spuren. Mehr Spuren bedeuten breitere Öffnung bei gleichzeitig dünneren Einzelscheiben." },
        { question: "Was ist ein Giyotin-System?", answer: "Ein motorisiertes vertikales Schiebefenster. Statt seitlich zu öffnen, gleiten die Glaselemente per Knopfdruck nach oben — ideal für Windschutz mit maximaler Öffnungsmöglichkeit." },
        { question: "Wie pflege ich Glasschiebewände?", answer: "Regelmäßig mit Wasser und Glasreiniger abwischen. Die Laufschienen sollten 1–2x pro Jahr von Schmutz befreit werden. Mehr Pflege ist nicht nötig." },
    ],
    import: [
        { question: "Wie viel spare ich mit einem Wintergarten aus Polen?", answer: "Die reine Materialersparnis liegt bei 20–40%. Allerdings kommen Transport (1.000–3.000 €), lokale Fundamente (3.000–6.000 €) und Koordinationsaufwand hinzu. Der Break-Even liegt ab 15–20 m²." },
        { question: "Was passiert bei Mängeln an einem Import-Produkt?", answer: "Die Durchsetzung von Gewährleistungsansprüchen ist über Ländergrenzen deutlich schwieriger. Fehlende lokale Ansprechpartner, Sprachbarrieren und unterschiedliche Rechtslagen erschweren Reklamationen erheblich." },
        { question: "Bekomme ich Ersatzteile für Import-Wintergärten?", answer: "Nicht garantiert. Viele polnische Hersteller verwenden Eigenprofile, für die es keine lokalen Ersatzteile gibt. Bei Apexx Bau sichern wir lebenslange Teileverfügbarkeit zu." },
        { question: "Wer montiert einen Import-Wintergarten?", answer: "In der Regel müssen Sie einen lokalen Handwerker suchen und separat beauftragen. Bei Problemen schieben sich Lieferant und Monteur gegenseitig die Schuld zu." },
        { question: "Gibt es versteckte Kosten beim Import?", answer: "Ja. Transport, Zoll, lokale Fundamente, Elektrik, Anschlussarbeiten und eventuelle Nachbesserungen werden oft unterschätzt. Ein ehrlicher Vergleich muss alle Kosten einbeziehen." },
    ],
    screen: [
        { question: "Was ist der Unterschied zwischen ZIP-Screen und normaler Markise?", answer: "Ein ZIP-Screen wird seitlich per Reißverschluss geführt und bleibt auch bei starkem Wind gespannt. Normale Markisen flattern und müssen bei Wind eingefahren werden." },
        { question: "Wie windfest sind ZIP-Screens?", answer: "Apexx Bau ZIP-Screens erreichen Windklasse 6 — das entspricht Orkanböen bis 120 km/h. Die z-LOCK Technologie verteilt die Windlast gleichmäßig auf die gesamte Führungsschiene." },
        { question: "Schützen ZIP-Screens auch vor Insekten?", answer: "Ja. Durch den spaltfreien Abschluss an Führungsschiene und Fallleiste haben Mücken und Wespen keinen Durchschlupf — während die Mikroperforation weiterhin Frischluft durchlässt." },
        { question: "Kann ich durch einen ZIP-Screen noch nach außen sehen?", answer: "Ja. Die Mikroperforation des Gewebes (Öffnungsfaktor 3–5%) erlaubt klare Sicht von innen nach außen, während von außen nichts zu erkennen ist — perfekter Sichtschutz bei Tag." },
        { question: "Lassen sich ZIP-Screens nachträglich anbringen?", answer: "Ja. Unsere Pergola-Profile haben dedizierte Nuten für die nachträgliche Montage von ZIP-Screen-Kassetten — millimetergenau und ohne Bohrlöcher in den Hauptpfeilern." },
    ],
    markise: [
        { question: "Wann ist eine Senkrechtmarkise sinnvoll?", answer: "Immer wenn Sie an Fassaden, Fenstern oder seitlich an Pergolen gezielt Sonne, Wind oder Blicke abhalten wollen. Besonders effektiv bei Süd- und Westausrichtung." },
        { question: "Was bedeutet der g_tot-Wert?", answer: "Der Gesamtenergiedurchlassgrad (g_tot) gibt an, wie viel Sonnenenergie durch Glas + Screen hindurchkommt. Unsere Screens erreichen g_tot-Werte von 0,05–0,12 — das blockiert bis zu 97% der Hitze." },
        { question: "Welche Stoffe werden verwendet?", answer: "Hochwertiges PVC-beschichtetes Polyester (z.B. Soltis-Reihe): UV-beständig, schimmelresistent und reißfest. Verfügbar in über 20 Farben von transparent bis verdunkelnd." },
        { question: "Wie wird eine Senkrechtmarkise gesteuert?", answer: "Über SOMFY-Funkmotor per Fernbedienung. Optional mit Sonnen- und Windsensoren für automatischen Betrieb oder Smart-Home-Integration via Tahoma." },
        { question: "Ersetzt eine Senkrechtmarkise eine Klimaanlage?", answer: "An Süd- und Westfassaden kann ein außenliegender Screen bis zu 97% der Solarhitze abhalten. In vielen Fällen macht das eine Klimaanlage überflüssig oder reduziert deren Laufzeit drastisch." },
    ],
    terrasse: [
        { question: "Welche Beschattung eignet sich für die Terrasse?", answer: "ZIP-Screens für seitlichen Wind- und Sichtschutz, Dachmarkisen für Overhead-Beschattung. Die Kombination beider Systeme schafft einen rundum geschützten Außenraum." },
        { question: "Können ZIP-Screens an bestehende Pergolen nachgerüstet werden?", answer: "An Apexx Bau Systeme jederzeit — die Profile haben dedizierte Nuten dafür. Bei Fremdprodukten hängt es von der Profilstärke und Statik ab." },
        { question: "Wie schnell schließen ZIP-Screens bei Sturm?", answer: "Bei angeschlossenen Windsensoren reagiert das System automatisch. Die SOMFY-Motoren fahren den Screen in unter 60 Sekunden vollständig herab — auch wenn Sie nicht zuhause sind." },
        { question: "Stören ZIP-Screens die Optik der Terrasse?", answer: "Nein. Im eingefahrenen Zustand verschwindet das Tuch vollständig in der schlanken Aluminium-Kassette. Erst beim Ausfahren wird der Screen sichtbar." },
        { question: "Was kosten ZIP-Screens für die Terrasse?", answer: "Ab ca. 1.800 € pro Seite (150–500 €/m²). Der Preis richtet sich nach Breite, Höhe, Gewebetyp und Steuerungsvariante." },
    ],
    wetter: [
        { question: "Wie wetterfest sind ZIP-Screens wirklich?", answer: "Wetterfest bis Windklasse 6 (120 km/h). Die z-LOCK Reißverschlusstechnik und schwimmend gelagerten Keder absorbieren Windlasten dynamisch, ohne dass das Tuch reißt." },
        { question: "Halten ZIP-Screens auch Starkregen ab?", answer: "Bei senkrechter Montage schützen sie sehr gut vor Schlagregen. Für absolute Wasserdichtigkeit empfehlen wir die Kombination mit einem geschlossenen Pergola-Dach." },
        { question: "Was passiert bei Hagel?", answer: "Das PVC-beschichtete Polyestergewebe ist extrem reißfest und absorbiert Hageleinschläge. Bei extremem Hagel empfiehlt es sich trotzdem, den Screen einzufahren." },
        { question: "Muss ich den Screen im Winter einfahren?", answer: "Bei Frost und Schnee sollte der Screen eingefahren sein. Die meisten Kunden steuern das automatisch über einen Temperatursensor. Im eingefahrenen Zustand ist das Tuch in der Kassette geschützt." },
        { question: "Wie lange hält ein wetterfester ZIP-Screen?", answer: "Bei normaler Nutzung 15–20 Jahre. Die Qualicoat-beschichteten Aluminiumführungen sind korrosionsfrei, das Soltis-Gewebe UV- und schimmelbeständig." },
    ],
    anbau: [
        { question: "Kann eine Pergola direkt an die Hauswand montiert werden?", answer: "Ja. Wandanbau-Pergolen werden rückseitig im Mauerwerk verankert und profitieren von der bestehenden Hausstatik. Dadurch sind Spannweiten bis 7m Breite ohne Mittelpfosten möglich." },
        { question: "Was ist bei WDVS-Fassaden zu beachten?", answer: "Wir verwenden thermisch getrennte Schwerlastanker (Fischer Thermax), die die Dämmschicht überbrücken ohne Kältebrücken zu erzeugen. Die Montage erfordert Fachwissen — Fehler führen zu Schimmel." },
        { question: "Wie wird der Wandanschluss abgedichtet?", answer: "Durch vorkomprimierte Dichtungsbänder (Kompriband) und UV-beständiges Fassadensilikon entsteht ein dauerelastischer, wasserdichter Abschluss — auch bei starkem Schlagregen." },
        { question: "Kann eine Anbau-Pergola die Energieeffizienz verbessern?", answer: "Ja. Im Sommer schützt das geschlossene Dach die Hausfassade vor Aufheizung. Im Winter lassen geöffnete Lamellen die flache Sonne herein und helfen, das Haus natürlich aufzuwärmen." },
        { question: "Brauche ich eine Baugenehmigung für den Anbau?", answer: "In NRW sind viele Terrassenüberdachungen genehmigungsfrei bis zu bestimmten Größen. Die Regelungen variieren je nach Kommune und Bebauungsplan — wir klären das vor Projektstart." },
    ],
    material: [
        { question: "Welche Aluminiumlegierung verwendet Apexx Bau?", answer: "EN AW-6060 (AlMgSi0,5) — die Standardlegierung im Fenster- und Fassadenbau. Optimale Balance aus Festigkeit, Leichtigkeit und Korrosionsbeständigkeit." },
        { question: "Wie dick sind die Aluminiumprofile?", answer: "3–5mm Wandstärke bei tragenden Elementen. Zum Vergleich: Billig-Bausätze arbeiten mit nur 1,4–2,0mm. Der Unterschied ist entscheidend für Statik und Langlebigkeit." },
        { question: "Was ist eine Qualicoat-Pulverbeschichtung?", answer: "Ein europäisches Qualitätssiegel für Pulverbeschichtungen. Anforderungen: Schichtdicke ≥60μm, extreme UV-/Salzbeständigkeit, dauerhafte Farbechtheit. Über 200 RAL-Farben verfügbar." },
        { question: "Warum kein Holz statt Aluminium?", answer: "Holz ist witterungsanfällig, muss alle 3–5 Jahre geschliffen und lasiert werden. Aluminium ist wartungsfrei, formstabil und korrosionsbeständig — ideal für dauerhafte Außenanlagen." },
        { question: "Welche Verbindungstechnik wird eingesetzt?", answer: "Hochfeste Edelstahlbolzen für Tragwerkverbindungen und selbstschmierende Messinglager für bewegliche Teile. Kein Rosten, kein Knarzen — auch nach Jahrzehnten." },
    ],
    statik: [
        { question: "Welche Schneelast tragen Apexx Bau Systeme?", answer: "Bis zu 400 kg/m². Zum Vergleich: Billig-Bausätze schaffen oft nur 60 kg/m². Bei Extremschnee können Lamellen auf 90° gestellt werden, damit Schnee hindurchfällt." },
        { question: "Welche Windlast ist zulässig?", answer: "Bis 140 km/h bei geschlossenen Lamellen, 120 km/h bei geöffneten. Die aerodynamische Lamellenform und massive Profilstärken (3–5mm) sorgen für extreme Stabilität." },
        { question: "Welche Normen gelten für die Statik?", answer: "DIN EN 1991-1-3 (Schneelast), DIN EN 1991-1-4 (Windlast), DIN EN 1999/Eurocode 9 (Aluminium-Tragwerke) und DIN EN 1090-3 (Herstellerzertifizierung)." },
        { question: "Brauche ich ein Fundament?", answer: "Bei freistehenden Anlagen ja — wir koordinieren frostfrei gegründete Punktfundamente (ca. 80cm tief). Bei Wandanbau verankern wir direkt im tragenden Mauerwerk." },
        { question: "Was sind die häufigsten Statik-Fehler?", answer: "Unzureichende Wandverankerung an WDVS ohne thermisch getrennte Anker, unterdimensionierte Fundamente und nachträgliche Verglasung ohne erneute Statikprüfung." },
    ],
    kontakt: [
        { question: "Wie schnell erhalte ich eine Antwort auf meine Anfrage?", answer: "Wir melden uns innerhalb von 24 Stunden — persönlich, nicht per Autoresponder." },
        { question: "Was sollte ich bei der Anfrage mitteilen?", answer: "Idealerweise: Maße (Breite × Tiefe), gewünschtes System (Pergola/Verglasung/Screen), Montagesituation (Wandanbau/freistehend) und Zeitrahmen. Fotos helfen zusätzlich." },
        { question: "Ist die Erstberatung kostenlos?", answer: "Ja. Die Erstberatung inklusive erster Einschätzung ist unverbindlich und kostenlos — telefonisch oder vor Ort." },
    ],
};

let updatedCount = 0;

data.forEach(page => {
    if (!page.faq_theme) return;
    if (page.faq && page.faq.length > 0) return; // Don't overwrite existing FAQs

    const faqs = faqsByTheme[page.faq_theme];
    if (!faqs) return;

    const count = page.faq_unique_q_count || 5;
    page.faq = faqs.slice(0, count);
    updatedCount++;
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
console.log(`✅ Generated FAQs for ${updatedCount} pages`);
console.log(`📄 Output: ${jsonPath}`);
