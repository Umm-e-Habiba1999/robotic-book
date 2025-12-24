---
sidebar_position: 1
---

# باب 4: ROS 2 آرکیٹیکچر اور بنیادی اصول

![ROS 2 Architecture](/img/ros-architecture.png)

## باب کا جائزہ
یہ باب Robot Operating System 2 (ROS 2) کا تعارف کراتا ہے، جو middleware framework ہے جو جدید روبوٹک سسٹمز کے لیے nervous system کے طور پر کام کرتا ہے۔ طلباء ROS 2 کے distributed architecture، اس کے communication patterns، اور اس کے ecosystem استعمال کرتے ہوئے مضبوط روبوٹک ایپلیکیشنز بنانے کے بارے میں سیکھیں گے۔

## سیکھنے کے مقاصد
اس باب کے اختتام تک، طلباء قابل ہوں گے:
1. ROS 2 کی بنیاد میں موجود DDS-based communication architecture کو سمجھنا
2. روبوٹک ایپلیکیشنز کے لیے nodes، topics، services، اور actions کو نافذ کرنا
3. ROS 2 environments کو configure کرنا اور پیچیدہ launch procedures کا انتظام کرنا
4. Distributed روبوٹک سسٹمز کو مؤثر طریقے سے debug اور troubleshoot کرنا
5. مختلف روبوٹک کاموں کے لیے مناسب Quality of Service (QoS) policies لاگو کرنا

## اہم تصورات
- **Distributed Messaging Patterns**: وہ communication architecture جو روبوٹک سسٹم کے مختلف اجزاء کو قابل اعتماد طریقے سے معلومات کا تبادلہ کرنے کی اجازت دیتا ہے، بشمول publish-subscribe، request-response، اور action-based patterns۔
- **Node Lifecycle Management**: وہ عمل جس کے ذریعے ROS 2 nodes مختلف states (unconfigured، inactive، active، finalized) سے گزرتے ہیں اور یہ کس طرح سسٹم کی وشوسنییتا اور resource management کو متاثر کرتا ہے۔
- **Quality of Service (QoS) Policies**: قابل تشکیل ترتیبات جو یہ طے کرتی ہیں کہ messages کیسے deliver کیے جاتے ہیں، بشمول reliability، durability، liveliness، اور deadline constraints جو سسٹم کی کارکردگی اور ریئل ٹائم رویے کو متاثر کرتی ہیں۔
- **Parameter Management اور Dynamic Reconfiguration**: روبوٹک ایپلیکیشنز کو runtime پر configure کرنے اور سسٹم کو روکے بغیر operational conditions کی بنیاد پر parameters کو adjust کرنے کے سسٹمز۔

## سیکشن 4.1: ROS 2 آرکیٹیکچر کا جائزہ
ROS 2، ROS 1 سے ایک اہم architectural ارتقاء کی نمائندگی کرتا ہے، جو Data Distribution Service (DDS) پر بنایا گیا ہے تاکہ ریئل ٹائم سسٹمز، سیکیورٹی، اور distributed computing کے لیے بہتر مدد فراہم کی جا سکے۔ DDS کی بنیاد ROS 2 کو پیچیدہ، multi-robot ماحول میں مؤثر طریقے سے کام کرنے کی صلاحیت دیتی ہے۔

بنیادی architecture ایک distributed system پر مبنی ہے جہاں nodes ایک publish-subscribe model کے ذریعے بات چیت کرتے ہیں۔ ROS 1 کے centralized master architecture کے برعکس، ROS 2 ایک peer-to-peer discovery mechanism استعمال کرتا ہے جو سسٹم کو زیادہ مضبوط اور scalable بناتا ہے۔

DDS کئی کلیدی صلاحیتیں فراہم کرتا ہے جو اسے robotics ایپلیکیشنز کے لیے موزوں بناتی ہیں:
- Discovery: Nodes خودکار طور پر network پر ایک دوسرے کو دریافت کرتے ہیں
- Data-centricity: Communication data پر مرکوز ہے نہ کہ remote procedure calls پر
- Quality of Service: Delivery، reliability، اور performance کے لیے قابل تشکیل policies
- Platform independence: مختلف operating systems اور hardware platforms پر کام کرتا ہے

ROS 2 ROS 1 کے مانوس تصورات (nodes، topics، services، actions) کو برقرار رکھتا ہے جبکہ بہتر security، ریئل ٹائم کارکردگی، اور multi-robot صلاحیتیں فراہم کرتا ہے۔

## سیکشن 4.2: بنیادی Communication Primitives
ROS 2 چار بنیادی communication patterns فراہم کرتا ہے جو روبوٹک ایپلیکیشنز میں مختلف مقاصد کی خدمت کرتے ہیں:

**Nodes** ROS 2 میں بنیادی execution units ہیں۔ ہر node ایک مخصوص functionality کو encapsulate کرتا ہے اور messages کے ذریعے دوسرے nodes کے ساتھ بات چیت کرتا ہے۔ Nodes مختلف programming languages (C++، Python، وغیرہ) میں لکھے جا سکتے ہیں اور مختلف machines پر چل سکتے ہیں۔

**Topics** publish-subscribe pattern کو نافذ کرتے ہیں جہاں nodes topics پر messages publish کر سکتے ہیں اور دوسرے nodes ان messages کو وصول کرنے کے لیے subscribe کر سکتے ہیں۔ یہ streaming data جیسے sensor readings یا robot states کے لیے مثالی ہے۔

**Services** request-response pattern کو نافذ کرتی ہیں جہاں ایک client request بھیجتا ہے اور server سے response کا انتظار کرتا ہے۔ یہ ان operations کے لیے موزوں ہے جن کی واضح شروعات اور اختتام ہے، جیسے computation services یا device commands۔

**Actions** طویل مدتی کاموں کے لیے استعمال ہوتے ہیں جن کو مکمل ہونے میں وقت لگ سکتا ہے اور جنہیں منسوخ کیا جا سکتا ہے۔ ان میں execution کے دوران feedback اور completion پر result reporting شامل ہے، جو انہیں navigation اور manipulation کاموں کے لیے مثالی بناتا ہے۔

## سیکشن 4.3: Parameters اور Configuration
ROS 2 میں parameters nodes کو recompilation کے بغیر runtime پر configure کرنے کا طریقہ فراہم کرتے ہیں۔ ہر node default values اور types کے ساتھ parameters declare کر سکتا ہے، اور انہیں launch time یا execution کے دوران override کیا جا سکتا ہے۔

Parameter declaration node initialization کے دوران ہوتا ہے اور اس میں parameter name، type، اور default value شامل ہوتی ہے۔ Parameters کو namespaces میں group کیا جا سکتا ہے تاکہ پیچیدہ سسٹمز میں naming conflicts سے بچا جا سکے۔

Parameter system callback functions کے ذریعے automatic validation کی حمایت کرتا ہے جو invalid parameter values کو reject کر سکتے ہیں۔ یہ invalid configurations کو روک کر system stability کو یقینی بناتا ہے۔

Parameters کو YAML configuration files سے load کیا جا سکتا ہے، جو متعدد nodes اور environments میں پیچیدہ configurations کا انتظام آسان بناتا ہے۔

## سیکشن 4.4: Advanced ROS 2 خصوصیات
ROS 2 میں کئی advanced خصوصیات شامل ہیں جو پیچیدہ روبوٹک ایپلیکیشنز کی حمایت کرتی ہیں:

**Composition** متعدد nodes کو ایک ہی process کے اندر چلانے کی اجازت دیتا ہے، communication overhead کو کم کرتا ہے اور tightly coupled components کے لیے کارکردگی کو بہتر بناتا ہے۔

**Lifecycle nodes** پیچیدہ سسٹمز کے لیے واضح state management فراہم کرتے ہیں جنہیں controlled طریقے سے مختلف operational states سے گزرنے کی ضرورت ہے۔

**Time اور time synchronization** خصوصیات ریئل ٹائم ایپلیکیشنز اور multi-robot coordination کی حمایت کرتی ہیں جہاں precise timing اہم ہے۔

**Security خصوصیات** میں authentication، access control، اور encryption شامل ہیں تاکہ روبوٹک سسٹمز کو unauthorized access سے محفوظ رکھا جا سکے۔

## عملی لیبز
### لیب 4.1: بنیادی ROS 2 Node کی تخلیق اور Communication
- **مقصد**: ایک سادہ publisher-subscriber جوڑا بنائیں اور ROS 2 communication کو سمجھیں
- **سرگرمیاں**: طلباء دو nodes نافذ کریں گے جو topics کے ذریعے بات چیت کرتے ہیں، ایک sensor data publish کرتا ہے اور دوسرا اسے consume کرتا ہے
- **Deliverables**: کام کرنے والا publisher-subscriber سسٹم بشمول logging اور message flow کی visualization
- **وقت کا تخمینہ**: 4-5 گھنٹے

### لیب 4.2: Parameter Server Configuration اور Management
- **مقصد**: ROS 2 سسٹم میں dynamic parameter management کو نافذ کریں
- **سرگرمیاں**: طلباء configurable parameters کے ساتھ ایک node بنائیں گے اور parameter change callbacks کو نافذ کریں گے
- **Deliverables**: Parameter-managed node بشمول configuration file اور dynamic reconfiguration کا مظاہرہ
- **وقت کا تخمینہ**: 3-4 گھنٹے

### لیب 4.3: Custom Message اور Service Definitions
- **مقصد**: مخصوص روبوٹک کاموں کے لیے custom message types اور services بنائیں
- **سرگرمیاں**: طلباء custom message structures کی تعریف کریں گے اور service-based communication کو نافذ کریں گے
- **Deliverables**: Custom message/service definitions بشمول client-server implementation جو ان کے استعمال کا مظاہرہ کرتی ہے
- **وقت کا تخمینہ**: 4-5 گھنٹے

## تشخیصی خیالات
- **System Design مسائل**: مشقیں جن میں طلباء کو مخصوص روبوٹک ایپلیکیشنز کے لیے ROS 2 system architectures ڈیزائن کرنے کی ضرورت ہے
- **Communication Architecture تجزیہ**: ROS 2 communication patterns کا تجزیہ اور optimization کرنے والے مسائل
- **Debugging مشقیں**: Distributed system issues والے منظرنامے جن میں troubleshooting اور resolution کی ضرورت ہے
- **QoS Policy ایپلیکیشنز**: مسائل جن میں مختلف روبوٹک کاموں کے لیے مناسب QoS policy کے انتخاب کی ضرورت ہے

## خلاصہ
ROS 2 جدید روبوٹک سسٹمز کے لیے ضروری middleware infrastructure فراہم کرتا ہے۔ اس کے architecture اور communication patterns کو سمجھنا مؤثر روبوٹک ایپلیکیشنز بنانے کے لیے بنیادی ہے جو single robots سے لے کر پیچیدہ multi-robot سسٹمز تک scale کر سکیں۔