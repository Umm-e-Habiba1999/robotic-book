# Detailed Urdu Translation Guide for Physical AI Textbook

## Translation Progress

### ✅ Completed Translations:
1. intro.md
2. Chapter 3 (Part I) - Sensing the Physical World
3. Chapter 4 (Part II) - ROS 2 Architecture and Fundamentals

### 📝 Remaining Translations:
- Chapters 5-19 (15 chapters)
- Appendices A-F (6 appendices)

## Translation Principles

### 1. Structure to Maintain:
- Keep ALL frontmatter unchanged (---...---)
- Keep ALL image paths unchanged
- Keep ALL code blocks in English
- Keep ALL URLs and links unchanged

### 2. Section Headers - Standard Translations:
```
## Chapter Overview → ## باب کا جائزہ
## Learning Objectives → ## سیکھنے کے مقاصد
## Key Concepts → ## اہم تصورات
## Practical Labs → ## عملی لیبز
## Assessment Ideas → ## تشخیصی خیالات
## Summary → ## خلاصہ
## Section X.Y: Title → ## سیکشن X.Y: [Urdu Title]
### Lab X.Y: Title → ### لیب X.Y: [Urdu Title]
```

### 3. Common Lab Fields:
```
- **Objective**: → - **مقصد**:
- **Activities**: → - **سرگرمیاں**:
- **Deliverables**: → - **Deliverables**:
- **Time estimate**: X hours → - **وقت کا تخمینہ**: X گھنٹے
```

### 4. Standard Phrases:
```
"By the end of this chapter, students will be able to:"
→ "اس باب کے اختتام تک، طلباء قابل ہوں گے:"

"This chapter covers..."
→ "یہ باب ... کا احاطہ کرتا ہے"

"Students will learn..."
→ "طلباء سیکھیں گے..."
```

### 5. Technical Terms - Keep in English:
- ROS 2, NVIDIA Isaac, Gazebo, Unity (platform names)
- forward kinematics, inverse kinematics (technical terms)
- SLAM, CNN, transformer (acronyms)
- Python, C++, JavaScript (programming languages)

But provide Urdu explanations in context.

### 6. Partial Urdu Terms (Urdu + English):
- Robot → روبوٹ
- System → سسٹم
- Data → ڈیٹا
- Network → نیٹ ورک
- Node → node
- Topic → topic
- Service → service
- Parameter → parameter

## Example Translation Pattern

### English Original:
```markdown
## Section 5.1: SLAM Algorithms and Implementation
SLAM is one of the most fundamental problems in robotics. The SLAM problem involves
estimating the robot's trajectory and building a map simultaneously.
```

### Urdu Translation:
```markdown
## سیکشن 5.1: SLAM الگورتھمز اور نفاذ
SLAM روبوٹکس میں سب سے بنیادی مسائل میں سے ایک ہے۔ SLAM مسئلہ روبوٹ کی trajectory
کا تخمینہ لگانے اور بیک وقت نقشہ بنانے پر مشتمل ہے۔
```

## Quick Reference - Common Translations

| English | Urdu |
|---------|------|
| Architecture | آرکیٹیکچر |
| Framework | framework |
| Implementation | نفاذ / implementation |
| Configuration | configuration |
| Algorithm | الگورتھم |
| Performance | کارکردگی |
| Optimization | optimization |
| Integration | انضمام / integration |
| Application | ایپلیکیشن |
| Environment | ماحول |
| Sensor | سینسر |
| Calibration | calibration |
| Accuracy | درستگی |
| Efficiency | کارکردگی / efficiency |
| Real-time | ریئل ٹائم |
| Distributed | distributed |
| Navigation | navigation |
| Manipulation | manipulation |
| Perception | perception |
| Control | کنٹرول |
| Planning | planning |
| Execution | execution |
| Simulation | simulation / سمیولیشن |
| Training | training |
| Inference | inference |
| Model | ماڈل |

## Translation Workflow

For each chapter:
1. Read the English version completely
2. Translate section by section:
   - Translate the title
   - Translate the overview paragraph
   - Translate learning objectives (keep numbered list format)
   - Translate key concepts (keep bullet points)
   - Translate each section's content paragraphs
   - Translate lab descriptions
   - Translate assessment ideas
   - Translate summary

3. Review for:
   - Natural Urdu flow
   - Consistent terminology
   - Preserved formatting
   - No broken links or images

## Notes
- Focus on clear, natural Urdu that students can understand
- Don't over-translate technical terms - keep them recognizable
- Maintain the academic tone
- Keep explanations detailed and complete
