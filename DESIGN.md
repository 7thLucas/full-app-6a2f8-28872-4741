# ShopCart BD — Design Guidelines

## Core Principle
Get out of the way. The entire UI is the webview. Chrome is minimal.

## Colors
- Background (splash/loading): #FFFFFF (white)
- Loading indicator: #E63946 (accent red, commerce feel) or brand-neutral #333333
- Status bar: Light content on white background

## Loading State
- Centered circular progress indicator on a white background
- App name or logo mark may appear briefly during load
- Smooth fade-in transition when the webview finishes loading

## Navigation
- No visible navigation bar or header — full-screen immersive webview
- Android hardware back button / iOS swipe-back navigates within webview history
- If no webview history remains, the app exits gracefully

## Typography
- System default (no custom fonts needed — content is rendered by the webview)

## Elevation & Shadows
- None required — single-surface design

## Components
- WebView: full-screen, no padding, no border radius
- LoadingView: centered spinner + optional subtle brand label
- No bottom navigation, no drawer, no tabs
