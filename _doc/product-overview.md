# ShopCart BD — Product Overview

## Product
**Name**: ShopCart BD  
**Type**: Branded Store Launcher PWA (Progressive Web App)  
**Target URL**: https://shopcartbd.vercel.app/  

## What It Does
ShopCart BD is a dedicated branded launcher that sends customers directly to the ShopCart BD e-commerce store at https://shopcartbd.vercel.app/. When a user opens the app, a branded splash screen appears briefly, then the app redirects straight to the live store — one tap from the home screen to shopping.

## Core Behaviour
- On launch → shows branded splash screen with app name, logo, and countdown
- After ~1.8 s → redirects to https://shopcartbd.vercel.app/ via JS (`window.location.replace`)
- `<meta http-equiv="refresh">` fallback ensures redirect works even without JS
- Manual "Open Store" button available on the splash for immediate tap-through
- Always loads live content — any store update is instantly reflected with no app update needed

## Users / Audience
- **Primary**: Customers of the ShopCart BD online store in Bangladesh
- Shoppers who prefer a dedicated, home-screen-bookmarked app over navigating through a mobile browser

## Positioning
A branded, app-like portal to the ShopCart BD storefront — bridging the gap between a mobile website and a native shopping app, giving customers a direct one-tap shortcut to the store from their home screen.

## Brand & Tone
- Clean, commerce-ready
- Trustworthy and direct
- Bangladeshi market focus (BDT currency, local shopper audience)

## Scope (MVP)
- Single-screen branded splash → auto-redirect to https://shopcartbd.vercel.app/
- Branded splash screen: logo, app name, tagline, countdown, "Open Store" button
- No in-app navigation UI — the store website handles all navigation internally
- Redirect fires via JS + `<meta>` fallback for maximum compatibility
