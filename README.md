# Selyemhaj Fodrászat – demó weboldal

Statikus (HTML/CSS/JS) bemutatkozó weboldal egy fiktív fodrászatnak. Nincs benne
backend vagy adatbázis, GitHub Pages-en közvetlenül publikálható.

## Fájlstruktúra

- `index.html` – az oldal tartalma (Kezdőlap, Rólunk, Szolgáltatások, Nyitvatartás, Időpontfoglalás, Megközelíthetőség)
- `style.css` – kinézet, reszponzív elrendezés
- `script.js` – mobil menü, aktuális év, demó naptár widget
- `images/` – ide kerülnek a képek (lásd lent, milyen fájlneveket vár az `index.html`)

## Cím módosítása (Google Maps)

A "Megközelíthetőség" szekció egy Google Maps beágyazást és egy "Útvonaltervezés
indítása" gombot tartalmaz, API-kulcs nélkül. A placeholder cím jelenleg
`1234 Példaváros, Fő utca 12.` – ha ezt lecseréled a valódi címre, az
`index.html`-ben **három helyen** kell frissítened ugyanarra a szövegre:

1. az `<iframe src="https://www.google.com/maps?q=...">` végén,
2. a "Útvonaltervezés indítása" gomb `href="https://www.google.com/maps/dir/?api=1&destination=...">` részében,
3. a lábléc szövegében (és opcionálisan a "Megközelíthetőség" szekció alatti szövegben).

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
