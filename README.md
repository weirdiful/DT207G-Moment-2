Detta är ett REST-API byggt med Node.js, Express och SQLite som lagrar arbetserfarenheter. Den har full CRUD-funktionalitet (Create, Read, Update, Delete) och returnerar data i JSON-format. Applikationen har stöd för CORS, som gör det möjligt att använda webbtjänsten från andra domäner. 

När man startar servern skapas en SQLite-databas (cv.sqlite) om den inte redan finns, med en tabell "workexperience" som innehåller kolumner för företagsnamn, jobbtitel, plats och start- och slutdatum samt en valfri beskrivning. Alla fält utom beskrivningen är obligatorisk och valideras innan datan lagras. 

API-endpoints:
- GET/api/workCV - hämtar alla arbetserfarenheter
- POST/api/workCV - skapar en ny erfarenhet (kräveer alla obligatoriska fält)
- PUT/api/workCV/:id - uppdaterar en erfarenhet med angivet ID
- DELETE/api/workCV/:id - tar bort en erfarenhet med angivet ID

Ett kurs-objekt returnes/skickas som JSON med följande struktur:

{
  "companyname": "EXE Företag",
  "jobtitle": "Senior Utvecklare",
  "location": "Göteborg",
  "startdate": "2022-01-01",
  "enddate": "2023-12-31",
  "description": "Ansvarig för backend-utveckling."
}

Ett felmeddelande returnes om något av de obligatoriska fälten saknas eller om en post inte hittas.

https://dt207g-moment-2-api.onrender.com/api/workCV