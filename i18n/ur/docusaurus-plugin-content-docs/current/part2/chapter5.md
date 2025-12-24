---
sidebar_position: 2
---

# باب 5: Perception اور Navigation Stack

## باب کا جائزہ
یہ باب ROS 2 استعمال کرتے ہوئے روبوٹک سسٹمز کی ضروری perception اور navigation صلاحیتوں کا احاطہ کرتا ہے۔ طلباء Simultaneous Localization and Mapping (SLAM) کو نافذ کرنا، navigation stacks کو configure کرنا، point clouds کو process کرنا، اور mobile robots کے لیے collision-free trajectories کی منصوبہ بندی کرنا سیکھیں گے۔

## سیکھنے کے مقاصد
اس باب کے اختتام تک، طلباء قابل ہوں گے:
1. ROS 2 framework کے اندر SLAM algorithms کو نافذ کرنا اور tune کرنا
2. مختلف mobile robot platforms کے لیے navigation stacks کو configure اور optimize کرنا
3. ماحولیاتی سمجھ کے لیے 3D point cloud ڈیٹا کو process اور تشریح کرنا
4. پیچیدہ ماحول میں collision-free trajectories کی منصوبہ بندی اور execution کرنا
5. مضبوط navigation task execution کے لیے behavior trees ڈیزائن کرنا

## اہم تصورات
- **Simultaneous Localization and Mapping (SLAM)**: وہ عمل جس کے ذریعے روبوٹ نامعلوم ماحول کا نقشہ بناتا ہے جبکہ بیک وقت اس نقشے میں اپنے مقام کا سراغ رکھتا ہے۔
- **Costmap Representation اور Path Planning**: ماحول کی grid-based نمائندگی جو رکاوٹوں، inflation zones، اور دیگر navigational constraints کو شامل کرتی ہے تاکہ مؤثر path planning ممکن ہو سکے۔
- **Point Cloud Processing اور Segmentation**: 3D sensor ڈیٹا کی تشریح کرنے کی تکنیکیں تاکہ روبوٹ کے ماحول میں objects، surfaces، اور navigable spaces کی شناخت کی جا سکے۔
- **Navigation کے لیے Behavior Trees**: Hierarchical ڈھانچے جو پیچیدہ navigation کاموں کو قابل انتظام، دوبارہ استعمال کے قابل اجزاء میں واضح execution logic کے ساتھ منظم کرتے ہیں۔

## سیکشن 5.1: SLAM Algorithms اور Implementation
SLAM روبوٹکس میں سب سے بنیادی مسائل میں سے ایک ہے، جو روبوٹس کو نامعلوم ماحول میں کام کرنے کی صلاحیت دیتا ہے۔ SLAM مسئلہ روبوٹ کی trajectory کا تخمینہ لگانے اور بیک وقت ماحول کا نقشہ بنانے پر مشتمل ہے، جو ایک chicken-and-egg مسئلہ پیدا کرتا ہے کیونکہ درست localization کے لیے اچھے نقشے کی ضرورت ہوتی ہے اور اچھا نقشہ بنانے کے لیے درست localization کی ضرورت ہوتی ہے۔

جدید SLAM طریقوں کو کئی اقسام میں تقسیم کیا جا سکتا ہے:
- **Filter-based SLAM**: Recursive Bayesian estimation (جیسے EKF یا particle filters) استعمال کرتا ہے تاکہ روبوٹ کی pose estimate اور نقشے کو برقرار رکھا جا سکے۔
- **Graph-based SLAM**: SLAM کو ایک optimization مسئلے کے طور پر تشکیل دیتا ہے جہاں poses اور landmarks کے درمیان constraints کو ایک graph کے طور پر پیش کیا جاتا ہے۔
- **Direct methods**: Features نکالنے کی بجائے خام sensor ڈیٹا کے ساتھ براہ راست کام کرتے ہیں، اکثر visual SLAM میں استعمال ہوتے ہیں۔

مقبول ROS 2 SLAM packages میں Cartographer، RTAB-Map، اور SLAM Toolbox شامل ہیں۔ ہر ایک کی مختلف طاقتیں ہیں اور مختلف ایپلیکیشنز اور sensor configurations کے لیے موزوں ہے۔

SLAM کی تشخیص میں metrics شامل ہیں جیسے trajectory accuracy (ATE/RMSE)، نقشے کی کوالٹی، computational efficiency، اور مختلف ماحول میں مضبوطی۔

## سیکشن 5.2: Navigation Stack کے اجزاء
ROS 2 navigation stack mobile robot navigation کے لیے ایک جامع framework فراہم کرتا ہے۔ یہ stack modular اور قابل تشکیل ہے، جو اسے مختلف robot platforms اور ایپلیکیشن کی ضروریات کے مطابق ڈھالنے کی اجازت دیتا ہے۔

Navigation stack کئی کلیدی اجزاء پر مشتمل ہے:
- **Costmap 2D**: رکاوٹ کی معلومات، inflation zones، اور دیگر navigational constraints کے ساتھ ماحول کی 2D نمائندگی کو برقرار رکھتا ہے۔
- **Global planner**: روبوٹ کے موجودہ مقام سے goal location تک راستے کا حساب لگاتا ہے۔
- **Local planner**: Global path کو track کرتا ہے جبکہ مقامی رکاوٹوں سے بچتا ہے اور robot kinematics کا احترام کرتا ہے۔
- **Recovery behaviors**: اس وقت execute ہوتے ہیں جب روبوٹ پھنس جاتا ہے یا پیش رفت کرنے میں ناکام ہو جاتا ہے۔

Navigation stack کی configuration میں ہر جزو کے لیے متعدد parameters کو tune کرنا شامل ہے، بشمول obstacle inflation، planner frequencies، اور controller parameters۔ محفوظ اور موثر navigation کے لیے مناسب tuning ضروری ہے۔

## سیکشن 5.3: Point Cloud پروسیسنگ
Point clouds ماحول کے بارے میں بھرپور 3D معلومات فراہم کرتے ہیں لیکن خصوصی processing تکنیکوں کی ضرورت ہوتی ہے۔ Point clouds عام طور پر 3D sensors جیسے lidars، stereo cameras، یا RGB-D cameras کے ذریعے تیار کیے جاتے ہیں۔

Point Cloud Library (PCL) point cloud processing کے لیے جامع ٹولز کا مجموعہ فراہم کرتی ہے جو ROS 2 کے ساتھ اچھی طرح integrate ہوتی ہے۔ عام operations میں شامل ہیں:
- **Filtering**: شور کو ہٹانا، downsampling، یا دلچسپی کے مخصوص علاقوں کا انتخاب
- **Segmentation**: Planes، objects، یا دیگر geometric primitives کی شناخت
- **Registration**: مختلف viewpoints سے متعدد point clouds کو align کرنا
- **Feature extraction**: Object recognition یا registration کے لیے descriptors کا حساب لگانا

Point cloud processing میں اکثر مختلف representations (point clouds، octrees، voxel grids) کے درمیان تبدیلی شامل ہوتی ہے، ایپلیکیشن کی ضروریات پر منحصر ہے۔

## سیکشن 5.4: Advanced Navigation تکنیکیں
جدید navigation سسٹمز پیچیدہ منظرناموں کو سنبھالنے کے لیے advanced تکنیکوں کو شامل کرتے ہیں:

**Multi-robot navigation** متعدد agents کے درمیان coordination کی ضرورت ہوتی ہے تاکہ collisions سے بچا جائے جبکہ انفرادی اور اجتماعی اہداف حاصل کیے جائیں۔ اس میں communication protocols اور coordination algorithms شامل ہیں۔

**Semantic navigation** object recognition اور scene understanding کو شامل کرتا ہے تاکہ صرف geometric رکاوٹوں کی بجائے semantic تصورات کی بنیاد پر navigate کیا جا سکے۔

**Learning-based navigation** تجربے کے ذریعے navigation کی کارکردگی کو بہتر بنانے کے لیے machine learning تکنیکوں کا استعمال کرتا ہے، بشمول reinforcement learning اور imitation learning طریقے۔

**Safe navigation** formal verification اور safety guarantees کو شامل کرتا ہے تاکہ یہ یقینی بنایا جا سکے کہ navigation رویے انسانی ماحول میں deployment کے لیے حفاظتی ضروریات کو پورا کرتے ہیں۔

## عملی لیبز
### لیب 5.1: Lidar کے ساتھ 2D SLAM Implementation
- **مقصد**: ROS 2 میں lidar ڈیٹا استعمال کرتے ہوئے 2D SLAM کو نافذ کرنا اور جائزہ لینا
- **سرگرمیاں**: طلباء SLAM algorithms کو configure اور run کریں گے، نقشے کی کوالٹی کا تجزیہ کریں گے، اور localization کی درستگی کا جائزہ لیں گے
- **Deliverables**: Functional SLAM سسٹم بشمول نقشے کی کوالٹی کی تشخیص اور localization error کا تجزیہ
- **وقت کا تخمینہ**: 5-6 گھنٹے

### لیب 5.2: RGB-D Sensors کے ساتھ 3D Mapping
- **مقصد**: ROS 2 میں RGB-D sensor ڈیٹا استعمال کرتے ہوئے 3D نقشے بنانا
- **سرگرمیاں**: طلباء RGB-D ڈیٹا کو process کریں گے، 3D point clouds تیار کریں گے، اور occupancy grid maps بنائیں گے
- **Deliverables**: 3D mapping pipeline بشمول visualization اور 2D طریقوں سے موازنہ
- **وقت کا تخمینہ**: 4-5 گھنٹے

### لیب 5.3: Navigation Stack Configuration اور Tuning
- **مقصد**: کسی مخصوص robot platform کے لیے navigation stack کو configure اور tune کرنا
- **سرگرمیاں**: طلباء navigation parameters کو customize کریں گے، simulation میں test کریں گے، اور کارکردگی کو optimize کریں گے
- **Deliverables**: Tuned navigation stack بشمول performance metrics اور configuration documentation
- **وقت کا تخمینہ**: 6-7 گھنٹے

## تشخیصی خیالات
- **SLAM Algorithm موازنے**: مختلف SLAM طریقوں کا موازنہ کرنے والے تجربات اور ان کی طاقتوں/کمزوریوں کا تجزیہ
- **Navigation Performance تشخیص**: Navigation کی کامیابی کی شرح، کارکردگی، اور حفاظت کی پیمائش کرنے والے پروجیکٹس
- **Map Quality Assessment کام**: تیار کردہ نقشوں کی کوالٹی کا جائزہ لینے اور بہتر بنانے والی مشقیں
- **Path Planning Optimization**: مخصوص منظرناموں کے لیے path planning algorithms کی optimization کی ضرورت والے مسائل

## خلاصہ
Perception اور navigation mobile robotics کی بنیاد بناتے ہیں۔ ان تصورات میں مہارت روبوٹس کو پیچیدہ ماحول میں خود مختار طور پر کام کرنے کے قابل بناتی ہے، انہیں حقیقی دنیا کے منظرناموں میں مفید کام انجام دینے کے قابل بناتی ہے۔