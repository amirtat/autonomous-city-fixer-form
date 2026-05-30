# Autonomous City Fixer Form

A simple multilingual complaint form for city issue reporting.

## What it includes

- `index.html` — complaint form interface
- `styles.css` — responsive styling
- `script.js` — form logic, validation, and webhook submission

## Features

- Minimal required fields: full name, email, phone, description
- Optional image upload (JPG/PNG/GIF, max 5MB)
- English-only form for a simple first stage
- Submits form data to Make webhook URL

## How to use

1. Open `index.html` in a browser.
2. Fill in the form fields and attach an image if needed.
3. Submit the form.

## Webhook configuration

The form currently posts to the Make webhook URL configured in `script.js`:

```js
const webhookUrl = 'https://hook.eu1.make.com/gchvwboxdsxg86w42klumpvpv3wtx1jy';
```

If you want to change the webhook, update that value.

## Deploying

For a public URL, you can use GitHub Pages from this repo.

## Notes

- Date/time is handled externally via webhook/Make.
- The form is designed for a U.S. city context and is currently English-only for simplicity.
