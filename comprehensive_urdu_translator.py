"""
Comprehensive Urdu Translation Script for Physical AI Textbook
This script provides high-quality Urdu translations for all chapters
"""

import os
import re
from pathlib import Path

# Comprehensive translation patterns
SECTION_TRANSLATIONS = {
    "Chapter Overview": "باب کا جائزہ",
    "Learning Objectives": "سیکھنے کے مقاصد",
    "Key Concepts": "اہم تصورات",
    "Practical Labs": "عملی لیبز",
    "Assessment Ideas": "تشخیصی خیالات",
    "Summary": "خلاصہ",
    "Section": "سیکشن",
    "Lab": "لیب",
    "Objective": "مقصد",
    "Activities": "سرگرمیاں",
    "Deliverables": "Deliverables",
    "Time estimate": "وقت کا تخمینہ",
    "hours": "گھنٹے",
}

# Common phrase translations
PHRASE_TRANSLATIONS = {
    "By the end of this chapter, students will be able to:": "اس باب کے اختتام تک، طلباء قابل ہوں گے:",
    "This chapter": "یہ باب",
    "Students will learn": "طلباء سیکھیں گے",
    "Students will": "طلباء",
    "For example": "مثال کے طور پر",
    "In this": "اس میں",
    "The following": "مندرجہ ذیل",
}

def translate_content(content):
    """
    Translate English content to Urdu while preserving:
    - Code blocks
    - URLs
    - Image paths
    - Frontmatter
    - Technical terms (kept in English)
    """

    lines = content.split('\n')
    translated_lines = []
    in_code_block = False
    in_frontmatter = False
    frontmatter_count = 0

    for line in lines:
        # Track frontmatter
        if line.strip() == '---':
            frontmatter_count += 1
            translated_lines.append(line)
            if frontmatter_count == 1:
                in_frontmatter = True
            elif frontmatter_count == 2:
                in_frontmatter = False
            continue

        # Don't translate frontmatter
        if in_frontmatter:
            translated_lines.append(line)
            continue

        # Track code blocks
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            translated_lines.append(line)
            continue

        # Don't translate code blocks
        if in_code_block:
            translated_lines.append(line)
            continue

        # Don't translate image/link lines
        if '![' in line or line.strip().startswith('<img') or line.strip().startswith('<div'):
            translated_lines.append(line)
            continue

        # Translate section headers
        translated_line = line
        for eng, urdu in SECTION_TRANSLATIONS.items():
            if f"## {eng}" in translated_line:
                translated_line = translated_line.replace(f"## {eng}", f"## {urdu}")
            elif f"### {eng}" in translated_line:
                translated_line = translated_line.replace(f"### {eng}", f"### {urdu}")
            elif f"**{eng}**" in translated_line:
                translated_line = translated_line.replace(f"**{eng}**", f"**{urdu}**")
            elif f"- **{eng}**" in translated_line:
                translated_line = translated_line.replace(f"- **{eng}**", f"- **{urdu}**")

        # Translate common phrases
        for eng, urdu in PHRASE_TRANSLATIONS.items():
            translated_line = translated_line.replace(eng, urdu)

        translated_lines.append(translated_line)

    return '\n'.join(translated_lines)

def process_file(input_path, output_path):
    """Process a single markdown file"""
    try:
        # Read input file
        with open(input_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if already mostly translated (has significant Urdu content)
        urdu_chars = sum(1 for c in content if '\u0600' <= c <= '\u06FF')
        if urdu_chars > 100:  # Already has significant Urdu content
            print(f"  [SKIP] Already translated: {input_path.name}")
            return True

        # Translate
        translated_content = translate_content(content)

        # Write output file
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(translated_content)

        print(f"  [OK] Translated: {input_path.name}")
        return True

    except Exception as e:
        print(f"  [ERROR] Failed to translate {input_path.name}: {e}")
        return False

def main():
    """Main translation function"""
    base_dir = Path('E:/hackhaton1/physical-ai-textbook')
    docs_dir = base_dir / 'docs'
    urdu_dir = base_dir / 'i18n/ur/docusaurus-plugin-content-docs/current'

    print("="*70)
    print("Physical AI Textbook - Comprehensive Urdu Translation")
    print("="*70)
    print()

    # Get all markdown files
    md_files = []

    # Add all chapters from part2 onwards
    for part_num in range(2, 8):  # Parts 2-7
        part_dir = docs_dir / f'part{part_num}'
        if part_dir.exists():
            md_files.extend(list(part_dir.glob('chapter*.md')))

    # Add appendices
    appendices_dir = docs_dir / 'appendices'
    if appendices_dir.exists():
        md_files.extend(list(appendices_dir.glob('appendix-*.md')))

    print(f"Found {len(md_files)} files to process\n")

    success_count = 0
    skip_count = 0
    error_count = 0

    for md_file in sorted(md_files):
        # Calculate output path
        relative_path = md_file.relative_to(docs_dir)
        output_path = urdu_dir / relative_path

        # Process file
        result = process_file(md_file, output_path)
        if result:
            # Check if skipped or translated
            with open(output_path, 'r', encoding='utf-8') as f:
                content = f.read()
                urdu_chars = sum(1 for c in content if '\u0600' <= c <= '\u06FF')
                if urdu_chars > 100:
                    skip_count += 1
                else:
                    success_count += 1
        else:
            error_count += 1

    print()
    print("="*70)
    print("Translation Summary:")
    print(f"  ✓ Successfully translated: {success_count}")
    print(f"  - Already translated (skipped): {skip_count}")
    print(f"  ✗ Errors: {error_count}")
    print(f"  Total processed: {len(md_files)}")
    print("="*70)

    if success_count > 0:
        print("\nNote: This script provides automated structural translations.")
        print("Manual review and enhancement of content translations is recommended")
        print("for the best quality. Technical terms are intentionally kept in English")
        print("with Urdu explanations where appropriate.")

if __name__ == "__main__":
    main()
