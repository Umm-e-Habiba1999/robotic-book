# Urdu Translation Guide - اردو ترجمہ گائیڈ

## ✅ What's Been Implemented

### 1. Docusaurus i18n Configuration
- Urdu (`ur`) locale is configured in `docusaurus.config.js`
- Language switcher dropdown added to navbar
- UI elements translated (navbar, footer, sidebar)

### 2. Chatbot Urdu Support
- Language toggle button in chatbot header
- All chatbot UI text translated to Urdu
- Right-to-left (RTL) text direction support
- Auto-detects language from page URL

### 3. Translated Content Files Created
- ✓ `i18n/ur/docusaurus-plugin-content-docs/current/intro.md` - Introduction page
- ✓ `i18n/ur/docusaurus-plugin-content-docs/current/part6/chapter16.md` - Chapter 16

## 🚀 How to Use Urdu Translation

### For Users:
1. Click the **language dropdown** in the top-right navbar
2. Select **اردو (Urdu)** to switch the entire site to Urdu
3. Click **English** to switch back

### For Chatbot:
1. Open the chatbot (💬 icon)
2. Click the **"اردو"** or **"EN"** button in the header
3. All chatbot UI will switch languages

## 📝 How to Add More Urdu Content

### Step 1: Create Directory Structure
For each chapter you want to translate, create the corresponding directory:

```bash
mkdir -p i18n/ur/docusaurus-plugin-content-docs/current/part1
mkdir -p i18n/ur/docusaurus-plugin-content-docs/current/part2
# ... and so on for each part
```

### Step 2: Translate Chapter Files
1. Copy the English chapter file structure
2. Translate the content to Urdu
3. Save it in the same path under `i18n/ur/...`

**Example:**
- English: `docs/part1/chapter1.md`
- Urdu: `i18n/ur/docusaurus-plugin-content-docs/current/part1/chapter1.md`

### Step 3: File Format
Keep the same frontmatter and structure:

```markdown
---
sidebar_position: 1
---

# باب کا عنوان

## سیکشن 1
اردو میں مواد...

## سیکشن 2
مزید اردو مواد...
```

## 🔤 Translation Tips

### Common Technical Terms:
- Physical AI → فزیکل AI
- Humanoid Robotics → ہیومنوائیڈ روبوٹکس
- Machine Learning → مشین لرننگ
- Neural Network → نیورل نیٹ ورک
- Algorithm → الگورتھم
- Sensor → سینسر
- Actuator → ایکچویٹر

### Common Phrases:
- "Chapter Overview" → "باب کا جائزہ"
- "Learning Objectives" → "سیکھنے کے مقاصد"
- "Key Concepts" → "اہم تصورات"
- "Section" → "سیکشن"
- "Example" → "مثال"
- "Exercise" → "مشق"

## 🧪 Testing Urdu Pages

### To test locally:
1. Start your development server: `npm start`
2. Visit: `http://localhost:3000/ur/docs/intro` (for Urdu version)
3. Visit: `http://localhost:3000/docs/intro` (for English version)

### Building for production:
```bash
# Build all locales
npm run build

# Build only Urdu
npm run build -- --locale ur
```

## 📁 File Structure Reference

```
physical-ai-textbook/
├── docs/                          # English content
│   ├── intro.md
│   ├── part1/
│   │   ├── chapter1.md
│   │   └── chapter2.md
│   └── part6/
│       └── chapter16.md
│
├── i18n/ur/                       # Urdu translations
│   ├── code.json                  # UI translations
│   ├── docusaurus-theme-classic/
│   │   ├── navbar.json            # Navbar translations
│   │   └── footer.json            # Footer translations
│   └── docusaurus-plugin-content-docs/current/
│       ├── intro.md               # Translated intro
│       ├── part1/
│       │   ├── chapter1.md        # Translated chapter 1
│       │   └── chapter2.md
│       └── part6/
│           └── chapter16.md       # Translated chapter 16
│
└── static/chatbot/
    └── widget.js                  # Chatbot with Urdu support
```

## 🎯 Current Translation Status

### Completed:
- ✅ UI elements (navbar, footer, sidebar)
- ✅ Chatbot interface
- ✅ Introduction page (`intro.md`)
- ✅ Chapter 16 (Humanoid Robot Hardware)

### To Do:
- ⏳ Part 1 chapters (1-3)
- ⏳ Part 2 chapters (4-6)
- ⏳ Part 3 chapters (7-9)
- ⏳ Part 4 chapters (10-12)
- ⏳ Part 5 chapters (13-15)
- ⏳ Part 6 chapters (17-18)
- ⏳ Part 7 chapter (19)
- ⏳ Appendices

## 💡 Quick Translation Workflow

1. **Choose a chapter** to translate
2. **Create the directory** if it doesn't exist
3. **Copy the English file** structure
4. **Translate the content** to Urdu
5. **Test locally** by visiting `/ur/docs/...`
6. **Commit and push** your changes

## 🛠️ Useful Commands

```bash
# Start development server
npm start

# Start with specific locale
npm start -- --locale ur

# Build for production
npm run build

# Write translations for a specific locale
npm run write-translations -- --locale ur

# Serve built site
npm run serve
```

## 📞 Need Help?

If you need help with Urdu translations:
1. Check this guide
2. Look at existing translated files as examples
3. Test your translations locally before committing

---

**Happy Translating! - ترجمہ کی خوشیاں!** 🎉
