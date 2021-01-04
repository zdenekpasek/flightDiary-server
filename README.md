# Letecký deník / Flight Diary

## Serverová část

## Popis

- Aplikace pro evidenci leteckých záznamů bezpilotních prostředků
- React Native

## Nasazení

- Back end je nasazen na platformě Heroku
- Dostupný zde: https://limitless-tor-34551.herokuapp.com

## Konfigurace serveru

- veškerá konfigurace se nacházi v src/config
- kde je možné změnit dbUrl, port atd.
- v src/index.js je vytvářena instance ExpressLoaderu

## Instalace a instrukce pro lokální spustění

1. Stáhnout nebo naklonovat zip soubor projektu
2. Ve složce projektu nainstalovat ngrok - npm i ngrok
3. Ve složce projektu - ngrok http 3000
4. Forwarding adresu zkopírovat do src/services/api/fdApi.js

- pozor platnost adresy vyprší za 8 hodin!

![ngrok](https://user-images.githubusercontent.com/45901583/101216244-75cc4580-367f-11eb-9b12-327a05f8d2cb.PNG)

![fdapi](https://user-images.githubusercontent.com/45901583/101216343-a1e7c680-367f-11eb-9691-80cfc2a9542a.PNG)

5. Je třeba doplnit API klíče a credentials google API. Z důvodu bezpečnosti nejsou nahrány na githubu

- v root složce projektu vytvořit soubour .env a přidat klíče ve formátu
  API_KEY_C = klíč
  API_SECRET_C = klíč
- po vyžádání samozřejmě klíče a credentials poskytnu

6. Ve složce projektu - npm run dev (spuštení serveru)
