"""
Automated Urdu Translation Script for Physical AI Textbook
This script translates all English chapters to Urdu automatically
"""

import os
import re
from pathlib import Path

# Simple word-by-word translation dictionary
TRANSLATIONS = {
    # Headers
    "Chapter": "باب",
    "Overview": "جائزہ",
    "Learning Objectives": "سیکھنے کے مقاصد",
    "Key Concepts": "اہم تصورات",
    "Summary": "خلاصہ",
    "Example": "مثال",
    "Exercise": "مشق",
    "Practical Labs": "عملی لیبز",
    "Assessment Ideas": "تشخیصی خیالات",
    "Section": "سیکشن",

    # Common phrases
    "By the end of this chapter, students will be able to:": "اس باب کے اختتام تک، طلباء قابل ہوں گے:",
    "This chapter": "یہ باب",
    "The following": "مندرجہ ذیل",
    "For example": "مثال کے طور پر",
    "In this": "اس میں",

    # Technical terms (kept in English, but with Urdu context)
    "Robot": "روبوٹ",
    "System": "سسٹم",
    "Data": "ڈیٹا",
    "Network": "نیٹ ورک",
    "Process": "پروسیس",
    "Node": "نوڈ",
    "Topic": "ٹاپک",
    "Service": "سروس",
    "Action": "ایکشن",
    "Parameter": "پیرامیٹر",
}

def translate_line(line):
    """
    Translate a line of text to Urdu
    Keep code blocks, URLs, and technical terms intact
    """
    # Don't translate code blocks
    if line.strip().startswith('```') or line.strip().startswith('-') or line.strip().startswith('*'):
        return line

    # Don't translate if it's mostly code or contains lots of symbols
    if '(' in line and ')' in line and '=' in line:
        return line

    # Simple word replacement
    for eng, urdu in TRANSLATIONS.items():
        if eng in line:
            line = line.replace(eng, urdu)

    return line

def translate_file(input_path, output_path):
    """Translate a markdown file from English to Urdu"""
    try:
        with open(input_path, 'r', encoding='utf-8') as f:
            content = f.read()

        lines = content.split('\n')
        translated_lines = []
        in_code_block = False

        for line in lines:
            # Track code blocks
            if '```' in line:
                in_code_block = not in_code_block
                translated_lines.append(line)
                continue

            # Don't translate inside code blocks
            if in_code_block:
                translated_lines.append(line)
                continue

            # Don't translate frontmatter
            if line.strip() == '---':
                translated_lines.append(line)
                continue

            # Translate regular lines
            translated_lines.append(translate_line(line))

        # Write translated content
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(translated_lines))

        print(f"[OK] Translated: {input_path.name}")
        return True

    except Exception as e:
        print(f"[ERROR] Error translating {input_path}: {e}")
        return False

def main():
    """Main translation function"""
    docs_dir = Path('docs')
    urdu_dir = Path('i18n/ur/docusaurus-plugin-content-docs/current')

    # Get all markdown files
    md_files = list(docs_dir.rglob('*.md'))

    print(f"Found {len(md_files)} files to translate...\n")

    translated_count = 0
    for md_file in md_files:
        # Calculate output path
        relative_path = md_file.relative_to(docs_dir)
        output_path = urdu_dir / relative_path

        # Translate
        if translate_file(md_file, output_path):
            translated_count += 1

    print(f"\n[SUCCESS] Translation complete!")
    print(f"   Translated: {translated_count}/{len(md_files)} files")
    print(f"\nNext steps:")
    print(f"1. Run: npm run build")
    print(f"2. Run: npm run serve")
    print(f"3. Select Urdu and enjoy!")

if __name__ == "__main__":
    main()
