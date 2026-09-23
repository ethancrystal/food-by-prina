# Prina's Kitchen

Website and online ordering for **Prina's Kitchen**: soul food and seafood platters for pickup or delivery.

> Forked from [`ethancrystal/dungyov-clone`](https://github.com/ethancrystal/dungyov-clone).

## What's on the site

- **Home (`/`)**: hero, how to order, FAQ and contact sections.
- **Menu (`/menu`)**: browse items, add to cart and switch between pickup and delivery. An "Open now / Closed" badge is driven by the opening hours.
- **Checkout** writes the order as a text message to Prina's phone (`sms:`). Payment is via Cash App. There is no online card payment.
- The cart and customer profile are saved in the browser (`localStorage`), so they survive a page refresh.

## Project layout

```
frontend/   React (CRA + craco), Tailwind, Radix UI — the whole customer-facing site
  src/data/menu.js              brand details, menu items, prices and opening hours ← edit content here
  src/lib/hours.js              open/closed logic (America/New_York)
  src/components/restaurant/    homepage sections (Header, Hero, Faq, Footer, …)
  src/components/order/         menu page, cart, item dialog, pickup/delivery toggle
  src/context/OrderContext.jsx  cart state
backend/    FastAPI + MongoDB starter (only a sample /api/status endpoint; ordering doesn't use it yet)
tests/      backend test package
```

## Running locally

**Frontend**

```bash
cd frontend
yarn install      # or: npm install
yarn start        # http://localhost:3000
```

**Backend** (optional, since the site doesn't depend on it yet)

```bash
cd backend
pip install -r requirements.txt
# backend/.env needs MONGO_URL and DB_NAME (CORS_ORIGINS is optional, defaults to *)
uvicorn server:app --reload --port 8001
```

## Before launch: content still to confirm

These are marked `TODO` in `frontend/src/data/menu.js`:

- [ ] Real opening days and hours (the current ones are placeholders)
- [ ] Exact delivery service area / city
- [ ] Instagram and Facebook links
