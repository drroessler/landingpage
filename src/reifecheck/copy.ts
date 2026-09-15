/** Textpassagen des Ergebnisdokuments — Quelle: reifecheck_set1_v40.md.
 *
 *  Reihenfolge im Dokument: Vorspann, Diagramm 1, die neun Statements,
 *  Diagramm 2 mit Begleittext, Übergang, methodischer Hinweis.
 */

export const DOC = {
  title: "Reifecheck IT-Vorhaben",
  subtitle: "Wie belastbar ist die Grundlage Ihrer Entscheidung?",
  runningHead: "Reifecheck IT-Vorhaben — Auswertung",

  vorspann: {
    h2: "Was Sie hier sehen",
    left: [
      "Am Anfang steht ein geschäftliches Problem. Etwas kostet zu viel, dauert zu lange, bindet zu viele Menschen oder lässt sich nicht mehr weiterentwickeln. Daraus entsteht eine Initiative, die dieses Problem lösen soll. Zwischen dem Problem und der Umsetzung liegen zwei Schritte, an denen sich der spätere Erfolg entscheidet: eine systematische Analyse der Ausgangssituation und eine fundierte Entscheidung darüber, was umgesetzt wird.",
      "Wie weit Sie mit diesen beiden Schritten gekommen sind, beschreibt die Entscheidungsreife Ihres Vorhabens. Sie sagt etwas über die Grundlage aus, auf der Sie sich festlegen werden. Über die Lösung selbst sagt sie nichts.",
    ],
    right: [
      "Sie haben neun Fragen beantwortet. Sechs davon beschreiben, wie es um Ihre Entscheidungsreife steht. Das Diagramm auf dieser Seite zeigt sie im Überblick, zu jeder Ihrer Antworten finden Sie eine kurze Einordnung.",
      "Diese Auswertung bewertet Ihr Vorhaben nicht. Sie sagt nichts darüber, ob Ihre Lösung die richtige ist, ob sich die Investition lohnt oder wie wahrscheinlich der Erfolg ist. Dafür kennen wir Ihre Situation zu wenig, und eine Antwortauswahl liefert diese Auskunft ohnehin nicht.",
    ],
    closing:
      "Was Sie bekommen: eine strukturierte Sicht darauf, wo Ihre Vorbereitung heute steht und welche Fragen Sie sich vor der nächsten Festlegung stellen sollten. Es gibt keine Punktzahl und kein Gesamturteil. Die sechs Punkte stehen nebeneinander, weil sie unterschiedliche Dinge beschreiben und sich nicht gegeneinander aufrechnen lassen.",
  },

  diagram1: {
    rubric: "Diagramm 1",
    title: "Ihre Entscheidungsreife",
    meta: "Sechs Achsen · drei Stufen",
  },

  contextSection: {
    rubric: "Ihre Antworten · F1 bis F3",
    h2: "Status und Kontext",
    lede: "Zeitpunkt, Einigkeit über das Ziel und Reichweite in der Organisation. Diese drei Antworten beschreiben Eigenschaften Ihres Vorhabens und gehen nicht in das Diagramm ein.",
  },

  reifeSection: {
    rubric: "Ihre Antworten · R1 bis R6",
    h2: "Die sechs Punkte im Einzelnen",
    lede: "Die Stufe links neben jeder Frage ist der Punkt auf der zugehörigen Achse des Diagramms.",
  },

  diagram2: {
    rubric: "Diagramm 2 · Umsetzungsreife",
    h2: "Die zweite Hälfte",
    left: "Was Sie bis hier gesehen haben, beschreibt die Qualität der Entscheidungsgrundlage. Daneben steht ein zweites Netz mit derselben Struktur und sechs weiteren Punkten. Es beschreibt den Weg von der getroffenen Entscheidung in die tatsächliche Umsetzung: Verantwortung, Nachvollziehbarkeit, direkter Kontakt zu den Betroffenen, Prüfrhythmus, Umgang mit widerlegten Annahmen und Rückhalt der Führungsebene.",
    right: "Dieses Netz bleibt hier leer. Es beschreibt den Weg, der nach der Entscheidung vor Ihnen liegt: wie aus einer belastbaren Analyse und einer getroffenen Entscheidung eine Umsetzung wird, deren Risiko sich Schritt für Schritt verringern lässt.",
    pull: "Der Bruch zwischen beiden Hälften ist der Ort, an dem gut vorbereitete Entscheidungen in der Umsetzung auseinanderlaufen. Die Begründung erreicht die Teams nicht, das Gebaute entspricht der Spezifikation und trifft das Problem trotzdem nicht.",
  },

  uebergang: {
    rubric: "Nächster Schritt",
    h2: "Wie es weitergehen kann",
    left: "Wenn Sie an einem der offenen Punkte weiterarbeiten wollen, sprechen wir darüber. Ein Erstgespräch dauert 30 Minuten und dient dazu, die zweite Hälfte zu füllen und einzuordnen, welche der sichtbaren Lücken für Ihr Vorhaben tatsächlich zuerst zählt. Das ist die Frage, die diese Auswertung offenlässt, weil sie von Ihrem Kontext abhängt.",
    right: "Zwei Dinge vorab. Es kann sein, dass am Ende des Gesprächs steht, dass Sie für Ihr Vorhaben keine Unterstützung brauchen. Das kommt vor und wird dann auch so gesagt. Und wenn die Umsetzung bereits beauftragt ist, ist der Zeitpunkt für eine Arbeit an der Entscheidungsgrundlage vorbei. Dann bleiben andere Ansatzpunkte, aber es wäre unredlich, das anders darzustellen.",
    ctaLabel: "Erstgespräch vereinbaren",
    ctaMicro: "30 Minuten · Lieber erst eine Frage stellen?",
  },

  methode: {
    rubric: "Methodischer Hinweis",
    h2: "Woher die Fragen kommen und was sie leisten",
    left: "Die neun Fragen sind aus veröffentlichten wissenschaftlichen Arbeiten abgeleitet. Sie greifen Erfolgsfaktoren und Komplexitätsindikatoren auf, die dort aus der Untersuchung realer Vorhaben gewonnen wurden.",
    right: "Die Auswertung läuft regelbasiert. Jede Antwortoption gibt einen vorher formulierten Text aus, es wird nicht gerechnet und nicht gewichtet. Kein Sprachmodell ist an der Beurteilung beteiligt.",
    imprint: "NarraTec — eine Marke der Dr. Richard Rößler Management Advisory, Dresden",
  },
} as const;

/** Copy des Fragebogens auf der Landingpage — nicht Teil des Dokuments. */
export const FORM = {
  rubric: "Reifecheck",
  h1: "Wie belastbar ist die Grundlage Ihrer Entscheidung?",
  lede: "Neun Fragen, rund vier Minuten. Sie erhalten eine Auswertung Ihrer Entscheidungsreife als PDF per E-Mail — regelbasiert erzeugt, ohne Sprachmodell.",
  startLabel: "Reifecheck starten",
  intro: {
    h2: "Bevor Sie beginnen",
    points: [
      {
        title: "Neun Fragen, Einfachauswahl",
        body: "Kein Freitext. Drei Fragen zu Status und Kontext Ihres Vorhabens, sechs zur Entscheidungsreife.",
      },
      {
        title: "Mit Übergang zur Umsetzungsreife",
        body: "Die Auswertung endet nicht bei der Entscheidung. Sie benennt daneben die zweite Hälfte: die sechs Punkte des Wegs von der getroffenen Entscheidung in die tatsächliche Umsetzung.",
      },
      {
        title: "Antworten Sie für ein konkretes Vorhaben",
        body: "Die Auswertung ist umso brauchbarer, je genauer Sie ein einzelnes Vorhaben vor Augen haben — nicht Ihre Organisation im Allgemeinen.",
      },
    ],
  },
  contact: {
    rubric: "Letzter Schritt",
    h2: "Wohin dürfen wir die Auswertung schicken?",
    lede: "Die Auswertung wird nach dem Absenden erzeugt und Ihnen als PDF zugeschickt. Sie erscheint außerdem direkt hier auf dieser Seite.",
    fields: {
      name: "Name",
      email: "E-Mail",
      organisation: "Organisation",
      role: "Funktion",
      roleOptional: "optional",
    },
    consent:
      "Ich willige ein, dass meine Angaben und die Auswertung zur Bearbeitung meiner Anfrage gespeichert und mir per E-Mail zugesendet werden. Die Einwilligung kann ich jederzeit formlos widerrufen.",
    consentLinkLabel: "Datenschutzerklärung",
    submitLabel: "Auswertung erzeugen und zusenden",
    sending: "Auswertung wird erzeugt …",
  },
  progress: (current: number, total: number) => `Frage ${current} von ${total}`,
  back: "Zurück",
  next: "Weiter",
} as const;
