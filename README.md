# SVR Food Products — Order Online App

Repo: svrcotton/orderonline
Live URL: https://svrcotton.github.io/orderonline/

## Folder Structure

- index.html (in root)
- manifest.json (in root)
- sw.js (in root)
- README.md (in root)

icons/
  - icon-192.png
  - icon-512.png
  - apple-touch-icon.png

images/
  - logo.png
  - favicon.png
  - background.jpg
  - header-banner.jpg
  - footer-banner.jpg
  - footer-banner-2.jpg

products/
  - idli1.jpg
  - idli5.jpg
  - idli30.jpg
  - urad1.jpg
  - urad5.jpg
  - vari1.jpg

## Deploy

1. Settings -> Pages -> Branch: main / root -> Save
2. Live at: https://svrcotton.github.io/orderonline/

## Update Guide

| Change | How |
|--------|-----|
| Prices | Google Sheet auto-syncs |
| Product add/remove | Google Sheet auto-syncs |
| Keys | ROLE_PRICES tab |
| Banner images | Replace JPG in images folder |
| Product image | Replace JPG in products folder |
| WhatsApp number | Hardcoded in index.html -> WHATSAPP_NUMBER |
| Footer phone | Google Sheet phone setting |

## Keys

- Hotel: cotton
- Distributor: svr

## Cache Refresh

After big updates, bump CACHE_NAME in sw.js from v1 to v2.
