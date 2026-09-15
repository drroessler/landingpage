# Reifecheck-Endpunkt

`POST /api/reifecheck` nimmt die neun Antworten und die Kontaktdaten entgegen,
wertet regelbasiert aus, rendert das PDF, verschickt es per SMTP und legt den
Vorgang in Notion ab.

## Ablauf

1. **Auswertung** — aus `src/reifecheck/evaluate.ts`, denselben Regeln wie im
   Browser. Die vom Browser gesendeten Statements werden **nicht** übernommen;
   der Server rechnet aus den Antwort-Kennungen neu. Sonst könnte man den Inhalt
   des Dokuments von außen bestimmen.
2. **PDF** — `_lib/document.ts` erzeugt das A4-HTML, `_lib/pdf.ts` druckt es mit
   Headless-Chromium. Die Schriften stecken als `@font-face` mit eingebetteten
   woff2-Dateien im HTML (`_lib/fonts.ts`), weil im Lambda keine Systemschriften
   liegen.
3. **Versand** — `_lib/mail.ts` über das eigene Postfach (nodemailer, SMTP).
4. **Notion** — `_lib/notion.ts` legt eine Seite in der Kontakt-Datenbank an.

Der Statuscode richtet sich nach dem **Versand**: nur der ist für den
Interessenten sichtbar. Scheitert die Notion-Ablage, wird das protokolliert, der
Vorgang ist über `SMTP_BCC` trotzdem im eigenen Postfach.

## Umgebungsvariablen

In Vercel unter *Settings → Environment Variables* setzen.

| Variable | Pflicht | Beispiel | Bedeutung |
|---|---|---|---|
| `SMTP_HOST` | ja | `smtp.migadu.com` | Postausgangsserver |
| `SMTP_PORT` | nein | `465` | Standard 465 (implizit TLS); bei 587 wird STARTTLS verwendet |
| `SMTP_USER` | ja | `contact@narratec.io` | Postfach-Benutzer, bei Migadu die volle Adresse |
| `SMTP_PASS` | ja | — | Passwort der Mailbox, nicht das des Migadu-Kontos |
| `SMTP_FROM` | ja | `contact@narratec.io` | Absenderadresse |
| `SMTP_BCC` | nein | `contact@narratec.io` | Blindkopie an das eigene Postfach |
| `NOTION_TOKEN` | ja | `ntn_…` | Integration-Token |
| `NOTION_DATABASE_ID` | ja | 32 Hex-Zeichen | Ziel-Datenbank |
| `ALLOWED_ORIGINS` | empfohlen | `https://www.narratec.io,https://narratec.io` | Anfragen von anderen Herkünften werden abgelehnt. Leer = keine Prüfung. |

`SMTP_PASS` und `NOTION_TOKEN` sind Geheimnisse und gehören nicht ins Repository.

## Notion-Datenbank anlegen

Eine Datenbank (z. B. „Kontakte") mit diesen Eigenschaften. **Keine ist Pflicht
außer dem Titel** — was fehlt, wird übersprungen, die vollständige Auswertung
steht ohnehin im Seiteninhalt.

| Eigenschaft | Typ | Inhalt |
|---|---|---|
| `Name` | Titel | Name der Kontaktperson |
| `E-Mail` | E-Mail | Adresse |
| `Organisation` | Text | Firma |
| `Funktion` | Text | Rolle, falls angegeben |
| `Datum` | Datum | Zeitpunkt der Auswertung |
| `Kennung` | Text | z. B. `RC-8F3K-2QD1`, steht auch im PDF |
| `Quelle` | Auswahl | wird auf `Reifecheck` gesetzt |
| `Status` | Auswahl oder Status | wird auf `Neu` gesetzt |
| `Stufen` | Text | z. B. `2-2-2-1-2-2` in Achsenreihenfolge |
| `Reifecheck` | Datei | das erzeugte PDF, gleicher Dateiname wie im Mailanhang |
| `F1`…`F3` | Auswahl | gewählte Antwort |
| `R1`…`R6` | Zahl | Stufe 1–3 |

Danach die Integration über *… → Verbindungen* auf die Datenbank berechtigen,
sonst antwortet die API mit `object_not_found`.

Die Spaltennamen stehen in `_lib/notion.ts` unter `P`. Wird in Notion umbenannt,
dort nachziehen — oder die Spalte fällt einfach weg.

`NOTION_DATABASE_ID` ist die 32-stellige Kennung aus der Notion-Adresse (vor dem
`?v=`). Seit der Notion-Version 2025-09-03 hängen die Eigenschaften an einer
*Datenquelle* unter der Datenbank; `_lib/notion.ts` löst das selbst auf und
nimmt bei mehreren die erste. Eine Datenquellen-Kennung wird ebenso akzeptiert.

Ablage allein prüfen, ohne PDF und ohne Versand — legt eine Testseite an:

```bash
NOTION_TOKEN=ntn_… NOTION_DATABASE_ID=… npm run notion:test
```

## Lokal ausprobieren

```bash
npx vercel dev
```

PDF ohne Versand erzeugen (nutzt lokales Chrome oder den Playwright-Cache):

```bash
npm run pdf:sample -- auswertung.pdf           # Antworten des Entwurfs
npm run pdf:sample -- auswertung.pdf --worst   # ungünstigster Fall
npm run pdf:check                              # beide, mit Prüfung der Seitenaufteilung
```

Das Dokument muss genau drei Seiten umfassen — siehe [README](../README.md#das-dokument-hat-genau-drei-seiten).

Mailweg prüfen — ohne Empfänger nur die Anmeldung, mit Empfänger der ganze Weg
einschließlich PDF:

```bash
npm run mail:test                                  # sendet nichts
npm run mail:test -- dein.name@example.com         # echte Mail
```

Beide Prüfskripte lesen eine lokale `.env`, falls vorhanden — die Datei ist von
git ausgeschlossen und der richtige Ort für die Zugangsdaten auf diesem Rechner.

Schriften neu einbetten (nur nötig, wenn sich die Schriftauswahl ändert):

```bash
npm run fonts
```
