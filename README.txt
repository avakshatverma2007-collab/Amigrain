AMIGRAIN WEBSITE — MOBILE SETUP

FILES
- index.html: website structure
- style.css: design and mobile layout
- app.js: products, cart, demo login, checkout, demo order history

OPEN USING ACODE (ANDROID)
1. Download and extract amigrain_website.zip using your phone's Files app.
2. Open Acode.
3. Choose Open Folder and select the extracted amigrain_website folder.
4. Open index.html and use Acode's Preview button (or open index.html in Chrome).
5. Keep all three files in the same folder.

PUBLISH A FREE PUBLIC LINK WITH GITHUB PAGES
1. Sign in to github.com in Chrome and create a new public repository named amigrain.
2. In the repository choose Add file > Upload files.
3. Upload index.html, style.css and app.js (not just the ZIP).
4. Commit the files.
5. Open repository Settings > Pages.
6. Under Build and deployment, choose Deploy from a branch.
7. Select branch main and folder /(root), then Save.
8. Wait for deployment. Your website link will appear in the Pages section.

IMPORTANT BEFORE REAL LAUNCH
- This is a front-end prototype. Login is NOT secure and is stored only in the same browser/device.
- Demo orders are stored in that browser only; they are not sent to a shop/admin.
- Replace the sample product list, prices, pack sizes and descriptions with verified business details.
- Nutrition information is intentionally not invented. Add actual lab/packaging values before publishing nutrition claims.
- Replace YOUR_UPI_ID@okaxis in app.js with the merchant's correct UPI ID. A UPI app redirect does not prove payment. Use a payment gateway and server-side payment verification for real orders.
- Google Maps link searches the entered address. It does not validate or autocomplete the address. For autocomplete and map pin selection, configure Google Maps Platform API key and billing, or use a suitable address/map provider.
- WhatsApp support uses the supplied number. Confirm that this number is registered on WhatsApp and belongs to the business.
- Add shipping charges, delivery areas, refund/return policy, privacy policy and terms before taking real customer orders.
- Do not collect real customer data or accept real payments using this demo version.

SUGGESTED STAGE 2 STACK
Firebase Authentication (email/phone OTP), Firestore database, Google Maps Places API, and a payment gateway such as Razorpay with server-side order/payment verification. These require setup and credentials; never put secret keys in app.js.
