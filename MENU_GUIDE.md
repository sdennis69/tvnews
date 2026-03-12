# How to Edit the Menu

## Quick Start

The menu is defined in **one place** in your code: `src/components/Header.tsx`

You only need to edit the `navItems` array (lines 6-14) to change what appears in the menu.

---

## Current Menu

Your current menu items are:

```
HOME → /
NEWS → /news
WEATHER → /weather
SPORTS → /sports
VIDEOS → /videos
LIVESTREAM → /livestream
MORE → /more
```

---

## How to Edit the Menu

### Step 1: Open the File

Open: `src/components/Header.tsx`

### Step 2: Find the Menu Definition

Look for this section (around line 6):

```tsx
const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'NEWS', href: '/news' },
  { label: 'WEATHER', href: '/weather' },
  { label: 'SPORTS', href: '/sports' },
  { label: 'VIDEOS', href: '/videos' },
  { label: 'LIVESTREAM', href: '/livestream' },
  { label: 'MORE', href: '/more' },
]
```

### Step 3: Make Your Changes

#### **To Change a Menu Item Name:**

Change the `label` value:

```tsx
// BEFORE
{ label: 'VIDEOS', href: '/videos' },

// AFTER
{ label: 'ENTERTAINMENT', href: '/videos' },
```

#### **To Change a Menu Item Link:**

Change the `href` value:

```tsx
// BEFORE
{ label: 'NEWS', href: '/news' },

// AFTER
{ label: 'NEWS', href: '/breaking-news' },
```

#### **To Add a New Menu Item:**

Add a new line to the array:

```tsx
const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'NEWS', href: '/news' },
  { label: 'WEATHER', href: '/weather' },
  { label: 'SPORTS', href: '/sports' },
  { label: 'VIDEOS', href: '/videos' },
  { label: 'ABOUT', href: '/about' },           // ← NEW
  { label: 'LIVESTREAM', href: '/livestream' },
  { label: 'MORE', href: '/more' },
]
```

#### **To Remove a Menu Item:**

Delete the entire line:

```tsx
// BEFORE
const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'NEWS', href: '/news' },
  { label: 'WEATHER', href: '/weather' },
  { label: 'SPORTS', href: '/sports' },
  { label: 'VIDEOS', href: '/videos' },
  { label: 'LIVESTREAM', href: '/livestream' },
  { label: 'MORE', href: '/more' },
]

// AFTER (removed VIDEOS)
const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'NEWS', href: '/news' },
  { label: 'WEATHER', href: '/weather' },
  { label: 'SPORTS', href: '/sports' },
  { label: 'LIVESTREAM', href: '/livestream' },
  { label: 'MORE', href: '/more' },
]
```

#### **To Reorder Menu Items:**

Move lines up or down:

```tsx
// BEFORE (LIVESTREAM at the end)
const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'NEWS', href: '/news' },
  { label: 'WEATHER', href: '/weather' },
  { label: 'SPORTS', href: '/sports' },
  { label: 'VIDEOS', href: '/videos' },
  { label: 'MORE', href: '/more' },
  { label: 'LIVESTREAM', href: '/livestream' },
]

// AFTER (LIVESTREAM moved to position 3)
const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'NEWS', href: '/news' },
  { label: 'LIVESTREAM', href: '/livestream' },
  { label: 'WEATHER', href: '/weather' },
  { label: 'SPORTS', href: '/sports' },
  { label: 'VIDEOS', href: '/videos' },
  { label: 'MORE', href: '/more' },
]
```

---

## Common Menu Configurations

### Minimal Menu (5 items)

```tsx
const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'NEWS', href: '/news' },
  { label: 'WEATHER', href: '/weather' },
  { label: 'SPORTS', href: '/sports' },
  { label: 'LIVESTREAM', href: '/livestream' },
]
```

### Full Menu (10 items)

```tsx
const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'NEWS', href: '/news' },
  { label: 'WEATHER', href: '/weather' },
  { label: 'SPORTS', href: '/sports' },
  { label: 'VIDEOS', href: '/videos' },
  { label: 'ENTERTAINMENT', href: '/entertainment' },
  { label: 'COMMUNITY', href: '/community' },
  { label: 'CONTESTS', href: '/contests' },
  { label: 'LIVESTREAM', href: '/livestream' },
  { label: 'ABOUT', href: '/about' },
]
```

### News-Heavy Menu

```tsx
const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'BREAKING NEWS', href: '/breaking' },
  { label: 'LOCAL NEWS', href: '/local' },
  { label: 'NATIONAL NEWS', href: '/national' },
  { label: 'WEATHER', href: '/weather' },
  { label: 'SPORTS', href: '/sports' },
  { label: 'LIVESTREAM', href: '/livestream' },
]
```

---

## Important Rules

### ✅ DO:
- Use **UPPERCASE** for menu labels (standard for TV news sites)
- Use **lowercase** for URLs (e.g., `/breaking-news`, not `/Breaking-News`)
- Use **hyphens** to separate words in URLs (e.g., `/breaking-news`)
- Make sure the page exists before linking to it
- Use **forward slashes** at the start of URLs (e.g., `/about`, not `about`)

### ❌ DON'T:
- Use special characters in labels (e.g., `{ label: 'NEWS & WEATHER' }` — use `NEWS AND WEATHER` instead)
- Use spaces in URLs (e.g., `/breaking news` — use `/breaking-news`)
- Link to pages that don't exist yet
- Use backslashes in URLs (e.g., `\about`)
- Leave the `label` or `href` empty

---

## Examples

### Example 1: Add an "About Us" Link

**File:** `src/components/Header.tsx`

**Change this:**
```tsx
const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'NEWS', href: '/news' },
  { label: 'WEATHER', href: '/weather' },
  { label: 'SPORTS', href: '/sports' },
  { label: 'VIDEOS', href: '/videos' },
  { label: 'LIVESTREAM', href: '/livestream' },
  { label: 'MORE', href: '/more' },
]
```

**To this:**
```tsx
const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'NEWS', href: '/news' },
  { label: 'WEATHER', href: '/weather' },
  { label: 'SPORTS', href: '/sports' },
  { label: 'VIDEOS', href: '/videos' },
  { label: 'LIVESTREAM', href: '/livestream' },
  { label: 'ABOUT', href: '/about' },
  { label: 'MORE', href: '/more' },
]
```

**Then create the page:** `pages/about.tsx`

---

### Example 2: Rename "VIDEOS" to "WATCH"

**Change this:**
```tsx
{ label: 'VIDEOS', href: '/videos' },
```

**To this:**
```tsx
{ label: 'WATCH', href: '/videos' },
```

---

### Example 3: Remove "MORE" and Add "CONTACT"

**Change this:**
```tsx
const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'NEWS', href: '/news' },
  { label: 'WEATHER', href: '/weather' },
  { label: 'SPORTS', href: '/sports' },
  { label: 'VIDEOS', href: '/videos' },
  { label: 'LIVESTREAM', href: '/livestream' },
  { label: 'MORE', href: '/more' },
]
```

**To this:**
```tsx
const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'NEWS', href: '/news' },
  { label: 'WEATHER', href: '/weather' },
  { label: 'SPORTS', href: '/sports' },
  { label: 'VIDEOS', href: '/videos' },
  { label: 'LIVESTREAM', href: '/livestream' },
  { label: 'CONTACT', href: '/contact' },
]
```

---

### Example 4: Create a News Submenu Structure

If you want `/news/local`, `/news/national`, etc., change to:

```tsx
const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'LOCAL NEWS', href: '/news/local' },
  { label: 'NATIONAL NEWS', href: '/news/national' },
  { label: 'WEATHER', href: '/weather' },
  { label: 'SPORTS', href: '/sports' },
  { label: 'LIVESTREAM', href: '/livestream' },
]
```

Then create these pages:
- `pages/news/local.tsx`
- `pages/news/national.tsx`

---

## Testing Your Changes

### Step 1: Save the File

Save `src/components/Header.tsx` after making changes.

### Step 2: Run the Dev Server

```bash
npm run dev
```

The dev server will automatically reload. Visit `http://localhost:3000` to see the updated menu.

### Step 3: Test the Links

Click each menu item to make sure:
- The link works
- It goes to the correct page
- The page exists (if not, you'll see a 404 error)

### Step 4: Test on Mobile

Make the browser window narrow to test the mobile menu (hamburger icon).

---

## Deploying Your Changes

### Step 1: Build for Production

```bash
npm run build
```

Make sure there are no errors.

### Step 2: Commit and Push

```bash
git add src/components/Header.tsx
git commit -m "Update menu: add About link"
git push origin main
```

### Step 3: WP Engine Atlas Rebuilds

Your site will automatically rebuild in 2-3 minutes with the new menu.

---

## Logo and Header Customization

### Change the Logo Text

In `src/components/Header.tsx`, find this section (around line 22-26):

```tsx
<a href="/" className="flex items-center gap-2 group">
  <div className="flex items-baseline">
    <span className="text-4xl font-bold text-white leading-none">41</span>
    <span className="text-lg font-bold text-white ml-1">NBC</span>
  </div>
</a>
```

**To change to "WCBI":**

```tsx
<a href="/" className="flex items-center gap-2 group">
  <div className="flex items-baseline">
    <span className="text-4xl font-bold text-white leading-none">WCBI</span>
  </div>
</a>
```

**To change to "Channel 5":**

```tsx
<a href="/" className="flex items-center gap-2 group">
  <div className="flex items-baseline">
    <span className="text-4xl font-bold text-white leading-none">Channel</span>
    <span className="text-lg font-bold text-white ml-1">5</span>
  </div>
</a>
```

---

## Styling the Menu

### Change Menu Text Color

Find this line (around line 48):

```tsx
className="block px-4 py-3.5 text-sm font-bold text-[#333333] hover:text-[#00DD00] border-b-4 border-transparent hover:border-[#00DD00] transition-all whitespace-nowrap"
```

- `text-[#333333]` = normal text color (dark gray)
- `hover:text-[#00DD00]` = hover text color (bright green)
- `hover:border-[#00DD00]` = hover underline color (bright green)

**To change hover color to red:**

```tsx
className="block px-4 py-3.5 text-sm font-bold text-[#333333] hover:text-[#FF0000] border-b-4 border-transparent hover:border-[#FF0000] transition-all whitespace-nowrap"
```

### Change Menu Font Size

Find `text-sm` in the same line and change to:
- `text-xs` = smaller
- `text-sm` = small (current)
- `text-base` = normal
- `text-lg` = large
- `text-xl` = extra large

---

## Troubleshooting

### Menu Item Not Showing

**Problem:** You added a menu item but it doesn't appear.

**Solution:** 
- Make sure you added the item inside the `navItems` array
- Make sure there's a comma after each item (except the last one)
- Check for typos in `label` or `href`

### Link Goes to 404

**Problem:** You click a menu item and get a "Page Not Found" error.

**Solution:**
- Create the page first (e.g., `pages/about.tsx`)
- Or change the `href` to point to an existing page

### Menu Looks Wrong

**Problem:** Menu items are overlapping or misaligned.

**Solution:**
- This usually means you have too many menu items
- Try removing some items or making them shorter
- The menu is responsive and will collapse to a hamburger icon on mobile

### Changes Not Showing

**Problem:** You edited the file but the menu hasn't changed.

**Solution:**
- Make sure you saved the file
- Make sure the dev server is running (`npm run dev`)
- Try refreshing the browser (Ctrl+R or Cmd+R)
- If still not working, stop the dev server and restart it

---

## Summary

**To edit the menu:**

1. Open `src/components/Header.tsx`
2. Find the `navItems` array (lines 6-14)
3. Edit, add, remove, or reorder items
4. Save the file
5. Test locally with `npm run dev`
6. Push to GitHub

**Menu item format:**
```tsx
{ label: 'MENU TEXT', href: '/page-url' }
```

That's it! The menu is automatically updated on both desktop and mobile.
