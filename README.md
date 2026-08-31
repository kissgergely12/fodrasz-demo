# Selyemhaj Fodrászat – demó weboldal

Statikus (HTML/CSS/JS) bemutatkozó weboldal egy fiktív fodrászatnak. Nincs benne
backend vagy adatbázis, GitHub Pages-en közvetlenül publikálható.

## Fájlstruktúra

- `index.html` – **magyar** verzió (Kezdőlap, Rólunk, Szolgáltatások, Nyitvatartás, Időpontfoglalás, Megközelíthetőség)
- `en/index.html` – **angol** verzió
- `de/index.html` – **német** verzió
- `style.css` – közös kinézet mindhárom nyelvi oldalhoz, reszponzív elrendezés
- `script.js` – közös JS mindhárom oldalhoz: mobil menü, aktuális év, demó naptár widget. A naptár hónapnevei és a kattintásra megjelenő üzenet a fájl elején lévő `TRANSLATIONS` objektumból jönnek, az adott HTML `<html lang="hu|en|de">` attribútuma alapján.
- `images/` – ide kerülnek a képek, **csak a gyökérben, egy helyen** (lásd lent, milyen fájlneveket várnak a HTML fájlok). Az `en/` és `de/` oldalak `../images/...` relatív úttal hivatkoznak ugyanide, nem kell duplikálni a képeket.

### Többnyelvűség – fontos tudnivaló

A három nyelv **három külön, teljes HTML fájl** (nem egy közös sablon + fordítás
JS-ből) – ez a statikus, GitHub Pages-es oldalaknál a legegyszerűbb és
SEO-barát megoldás. A hátránya, hogy **ha tartalmat módosítasz** (pl. árat,
nyitvatartást, szöveget), azt **mindhárom fájlban** (`index.html`, `en/index.html`,
`de/index.html`) külön át kell vezetned, különben a nyelvek szét fognak csúszni.
A `style.css` és `script.js` viszont közös, azokat elég egy helyen módosítani.

## Cím módosítása (Google Maps)

A "Megközelíthetőség" szekció egy Google Maps beágyazást és egy "Útvonaltervezés
indítása" gombot tartalmaz, API-kulcs nélkül. A placeholder cím jelenleg
`Kossuth Lajos tér 1-3, 1055 Budapest` (a Magyar Országház) – ha ezt lecseréled
a valódi címre, **mindhárom nyelvi fájlban** (`index.html`, `en/index.html`,
`de/index.html`) három helyen kell frissítened ugyanarra a szövegre:

1. az `<iframe src="https://www.google.com/maps?q=...">` végén,
2. a "Útvonaltervezés indítása" / "Get Directions" / "Route planen" gomb `href="https://www.google.com/maps/dir/?api=1&destination=...">` részében,
3. a lábléc szövegében (és opcionálisan a "Megközelíthetőség" szekció alatti szövegben).

## Elérhetőségek (lábléc: Instagram, Facebook, WhatsApp, telefon)

A lábléc alján egy "Elérhetőségek" sor van Instagram, Facebook, Messenger,
WhatsApp és telefon linkekkel. Ezek jelenleg placeholder adatok – **mindhárom
nyelvi fájl** (`index.html`, `en/index.html`, `de/index.html`) `<footer>`
részében cseréld le őket ugyanarra:

- **Instagram / Facebook**: írd át a `href="https://www.instagram.com/..."` és
  `href="https://www.facebook.com/..."` linkeket a saját profilod URL-jére.
- **WhatsApp**: a `href="https://wa.me/36301234567?text=...">` linkben a
  `36301234567` a te valódi telefonszámod nemzetközi formátumban, `+` és
  szóközök nélkül (pl. `+36 30 123 4567` → `36301234567`). A `?text=...` rész
  egy előre kitöltött üzenetszöveg, opcionális – törölhető is.
- **Telefon**: a `href="tel:+36301234567"` linkben cseréld le a számot a
  sajátodra (itt maradhat a `+` jel és akár szóköz is).

**Fontos:** a WhatsApp linknek csak akkor van értelme, ha a megadott
telefonszámhoz **valóban létezik regisztrált WhatsApp-fiók** (a te vagy a
szalon száma) – a `wa.me` link csak megnyitja a WhatsApp-ot/WhatsApp Web-et
azzal a számmal, magát a fiókot a WhatsApp appban kell létrehoznod (ingyenes).

## Szükséges képek

Az `index.html` jelenleg az alábbi fájlneveket várja az `images/` mappában.
Töltsd fel ezekkel a nevekkel a saját fotóidat (vagy módosítsd a HTML-ben a fájlneveket):

- `images/hero.jpg` – nagy header/hero kép a főoldalon
- `images/rolunk.jpg` – kép a Rólunk szekcióhoz (pl. a szalon vagy a csapat)
- `images/favicon.png` – kis ikon a böngésző füléhez (favicon), négyzetes kép ajánlott (pl. 512×512 px)

## Helyi megnyitás

Nincs szükség szerverre, elég duplán kattintani az `index.html` fájlon,
vagy VS Code-ban a "Live Server" kiterjesztéssel megnyitni.

## Publikálás GitHub Pages-re

1. Hozz létre egy új repository-t a GitHub-on.
2. Töltsd fel ebbe a mappát (git init, add, commit, push – vagy böngészőből feltöltve).
3. A repo **Settings → Pages** menüjében válaszd ki a `main` branch-et (root mappa) forrásként.
4. Pár percen belül elérhető lesz az oldal a
   `https://<felhasznalonev>.github.io/<repo-nev>/` címen.

Ha később módosítasz valamit és push-olod, a GitHub Pages automatikusan frissíti az élő oldalt.
