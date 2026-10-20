# TOYVERSE — responsive toy store demo

A polished front-end toy shop built with HTML, CSS and vanilla JavaScript. No build step or package installation is required.

## Run locally
1. Unzip the project folder.
2. Open `index.html` in a modern browser.
3. For a more realistic local server, run `python3 -m http.server 8000` from this folder and open `http://localhost:8000`.

## Customise the store
Open `app.js` and edit the `STORE` object near the top:
- `brand`: displayed store name.
- `currency`: retained as a configuration setting; current display helper formats amounts as PKR (`Rs`).
- `whatsappNumber`: international digits only, such as `923001234567`. Leave blank to keep the WhatsApp inquiry safely disabled.
- `contactEmail`: email address used by the contact link.

## Change products
Edit the `products` array in `app.js`. Each product has:
- `id`, `name`, `category`
- `price`, optional `oldPrice` (PKR sample prices)
- `rating`, `reviews`, `badge`
- `color`, `image`, `description`

Product prices, discounts, ratings, review counts, availability and testimonials in this project are illustrative demo content. Verify them before launching a real store. Product photos are loaded from Unsplash URLs and require an internet connection.

## Change design
- `styles.css`: colors are defined at the top in `:root`, plus responsive breakpoints near the end.
- `index.html`: change copy, sections, navigation, FAQ and footer content.
- Logo is a simple text-based mark using the `✳` symbol; replace it with your own SVG/image if needed.

## What works
- Responsive layout and mobile menu
- Product search, category filtering and sorting
- Add/remove cart items and quantity controls
- Automatic subtotal calculations
- Wishlist toggles and wishlist shortcut
- Product quick-view modal
- WhatsApp order inquiry message generation (requires configured number)
- Newsletter form validation and demo confirmation
- FAQ accordion, scroll reveal animations and reduced-motion support

## Not connected (requires real integration)
- Payment gateway / checkout
- User accounts and authentication
- Database-backed order storage and admin dashboard
- Real inventory and shipping/tax calculation
- Real newsletter/email provider
- Verified product reviews and live product feeds
- Production privacy, terms, shipping and return policies

## Free deployment
**Netlify Drop:** sign in at Netlify, open the manual deploy/drop page, and drag the unzipped project folder (or its contents) into the upload area.  
**GitHub Pages:** create a repository, upload these files to the root, then enable Pages in repository Settings → Pages.  
Because this is a static site, no server build is needed. Add your real policies, business contact details, verified product data and backend integrations before accepting live orders.
