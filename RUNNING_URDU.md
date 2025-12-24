# How to Run Your Site with Urdu Translation

## ✅ Current Status

- ✅ Chatbot works in both English and Urdu
- ✅ Urdu translation files are ready
- ✅ Language switcher appears in navbar
- ⚠️ Clicking "اردو" shows "Page Not Found" in development mode

## 🔧 The Issue

In **development mode** (`npm start`), Docusaurus only serves ONE locale at a time by default. This is why you get "Page Not Found" when clicking the Urdu language switcher.

## 🚀 Solutions

### **Option 1: Run Development Server with Urdu** (Recommended for testing)

Stop your current server and restart with the Urdu locale:

```bash
# Stop current server (Ctrl+C)

# Start with Urdu locale
npm start -- --locale ur
```

Now you can view your site in Urdu at: `http://localhost:3000/`

**To switch back to English:**
```bash
npm start -- --locale en
```

---

### **Option 2: Build Production Version** (Shows both languages)

Build the production version which includes ALL locales:

```bash
# Build for production
npm run build

# Serve the built site
npm run serve
```

Now visit: `http://localhost:3000/`
- Default will be English
- Click language switcher to see Urdu
- Both languages will work!

---

### **Option 3: Run Multiple Dev Servers** (Advanced)

If you want to test both languages simultaneously:

**Terminal 1 (English):**
```bash
npm start -- --locale en --port 3000
```

**Terminal 2 (Urdu):**
```bash
npm start -- --locale ur --port 3001
```

Access:
- English: `http://localhost:3000/`
- Urdu: `http://localhost:3001/`

---

## 📝 What Content is Translated?

### ✅ Fully Translated:
1. **UI Elements** - Navbar, footer, sidebar (all in Urdu)
2. **Chatbot** - Complete Urdu interface
3. **Introduction Page** - `intro.md` fully translated
4. **Chapter 16** - "Humanoid Robot Hardware" fully translated

### ⏳ Not Yet Translated:
- Other chapters (1-15, 17-19)
- Blog posts
- Appendices

**Note:** When viewing Urdu locale, untranslated pages will show the English content as a fallback.

---

## 🎯 Recommended Workflow

### For Development:
```bash
# Work in English (default)
npm start

# Test Urdu translations
npm start -- --locale ur
```

### For Production Testing:
```bash
# Build all locales
npm run build

# Test the built site
npm run serve
```

### For Deployment:
```bash
# Build includes all locales automatically
npm run build

# Deploy the 'build' folder
```

---

## 🔍 How the Language Switcher Works

### In Development Mode (`npm start`):
- Only ONE locale is active
- Language switcher appears but switching causes 404
- **Solution:** Restart server with desired locale

### In Production Mode (`npm run build` + `npm run serve`):
- ALL locales are built and available
- Language switcher works perfectly
- Switching between English ↔ Urdu works seamlessly

---

## 📂 Understanding the File Structure

When you build for production:

```
build/
├── index.html              # English homepage
├── docs/                   # English docs
│   ├── intro/
│   └── part1/chapter1/
└── ur/                     # Urdu version
    ├── index.html          # Urdu homepage
    └── docs/               # Urdu docs
        ├── intro/
        └── part6/chapter16/
```

---

## 💡 Quick Commands Reference

```bash
# Start development (English only)
npm start

# Start development (Urdu only)
npm start -- --locale ur

# Build for production (all locales)
npm run build

# Serve production build
npm run serve

# Generate translation files
npm run write-translations -- --locale ur
```

---

## ✅ Testing Checklist

After running `npm run build` and `npm run serve`:

1. ✅ Visit `http://localhost:3000/`
2. ✅ See English content
3. ✅ Click language dropdown in navbar
4. ✅ Select "اردو"
5. ✅ Page switches to Urdu
6. ✅ Open chatbot (💬)
7. ✅ Click "اردو" button in chatbot
8. ✅ Chatbot UI switches to Urdu
9. ✅ Ask a question
10. ✅ Get response in Urdu

---

## 🎉 Summary

**The language switcher IS working!** It just doesn't work in development mode because Docusaurus serves one locale at a time by default.

**To see it working:**
1. Run: `npm run build`
2. Run: `npm run serve`
3. Visit: `http://localhost:3000/`
4. Click the language switcher!

Everything will work perfectly! 🚀
