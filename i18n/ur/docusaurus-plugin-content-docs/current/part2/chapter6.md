---
sidebar_position: 3
---

# باب 6: Manipulation اور Control Frameworks

## باب کا جائزہ
یہ باب ROS 2 ecosystem کے اندر روبوٹک manipulation صلاحیتوں پر توجہ مرکوز کرتا ہے۔ طلباء manipulator control کو program کرنا، motion planning algorithms کو نافذ کرنا، perception کو manipulation کے ساتھ integrate کرنا، اور grasp planning سسٹمز ڈیزائن کرنا سیکھیں گے۔

## سیکھنے کے مقاصد
اس باب کے اختتام تک، طلباء قابل ہوں گے:
1. ROS 2 interfaces استعمال کرتے ہوئے robotic manipulators کو program اور کنٹرول کرنا
2. Manipulation کاموں کے لیے motion planning algorithms کو نافذ اور customize کرنا
3. خود مختار operation کے لیے perception سسٹمز کو manipulation کے ساتھ integrate کرنا
4. Grasp planning اور manipulation حکمت عملیوں کو ڈیزائن اور execute کرنا
5. محفوظ تعامل کے لیے force control اور compliant motion کو نافذ کرنا

## اہم تصورات
- **MoveIt! Motion Planning Framework**: ROS 2 کے لیے معیاری motion planning framework جو manipulator سسٹمز کے لیے collision checking، inverse kinematics، اور trajectory generation فراہم کرتا ہے۔
- **Trajectory Generation اور Execution**: Robot joints کے لیے ہموار، collision-free راستے بنانے اور errors کی نگرانی کرتے ہوئے انہیں محفوظ طریقے سے execute کرنے کا عمل۔
- **Grasp Synthesis اور Manipulation Planning**: وہ algorithms جو یہ طے کرتے ہیں کہ objects کو کیسے grasp کیا جائے اور اہداف حاصل کرنے کے لیے manipulation actions کی ترتیب کی منصوبہ بندی کریں۔
- **Force Control اور Compliant Motion**: Control حکمت عملیاں جو روبوٹس کو صرف positions کی بجائے forces کو کنٹرول کرکے اپنے ماحول کے ساتھ محفوظ طریقے سے تعامل کرنے کی اجازت دیتی ہیں۔

## سیکشن 6.1: Manipulator Control کی بنیادیں
روبوٹک manipulation میں ماحول میں objects کے ساتھ تعامل کے لیے robotic arms کا precise control شامل ہے۔ اس کے لیے robot kinematics، dynamics، اور control theory کی سمجھ کی ضرورت ہے۔

Manipulator control مختلف spaces میں انجام دیا جا سکتا ہے:
- **Joint space**: Joint angles/positions کا براہ راست control
- **Cartesian space**: End-effector position اور orientation کا control
- **Task space**: ماحول میں objects یا tasks کے مقابلے میں control

Control modes میں position control (سب سے عام)، velocity control، اور effort/torque control شامل ہیں۔ ہر mode کی مختلف ایپلیکیشنز ہیں اور مختلف control حکمت عملیوں کی ضرورت ہے۔

Manipulation سسٹمز میں حفاظت سب سے اہم ہے۔ اس میں collision avoidance، force limiting، اور مناسب error handling شامل ہے تاکہ روبوٹ، ماحول، یا انسانوں کو نقصان سے بچایا جا سکے۔

## سیکشن 6.2: MoveIt! Integration
MoveIt! ROS 2 کے لیے معیاری motion planning framework ہے، جو robotic manipulation کے لیے جامع ٹولز کا مجموعہ فراہم کرتا ہے۔ یہ پیچیدہ کاموں جیسے collision checking، inverse kinematics، اور trajectory generation کو سنبھالتا ہے۔

کلیدی MoveIt! اجزاء میں شامل ہیں:
- **Planning Scene**: ماحول کی نمائندگی کرتا ہے بشمول روبوٹ اور رکاوٹیں
- **Motion Planners**: Collision-free راستے تیار کرنے کے algorithms
- **Collision Detection**: Planning اور execution کے دوران collisions کی جانچ کے سسٹمز
- **Kinematics Solvers**: Forward اور inverse kinematics کے ٹولز
- **Trajectory Execution**: حقیقی یا simulated روبوٹس پر planned motions کو execute کرنے کے سسٹمز

MoveIt! متعدد planning algorithms کی حمایت کرتا ہے بشمول OMPL (Open Motion Planning Library)، CHOMP (Covariant Hamiltonian Optimization for Motion Planning)، اور STOMP (STOchastic Motion Planning)۔

MoveIt! کی configuration میں ایک robot configuration package بنانا شامل ہے جس میں URDF/URDF++ description، kinematics configuration، اور controller settings شامل ہیں۔

## سیکشن 6.3: Grasp Planning اور Execution
Grasp planning robotic manipulation کا ایک اہم جزو ہے، جو یہ طے کرتا ہے کہ روبوٹ کو کسی کام کو کامیابی سے مکمل کرنے کے لیے کسی object کو کیسے grasp کرنا چاہیے۔

Grasp planning کے طریقوں میں شامل ہیں:
- **Analytic methods**: Geometric اور physical اصولوں پر مبنی
- **Learning-based methods**: کامیاب grasps سے ڈیٹا استعمال کرنا
- **Hybrid approaches**: Analytical اور learning طریقوں کو یکجا کرنا

Grasp planning میں کلیدی غور و فکر میں شامل ہیں:
- Grasp استحکام اور بیرونی قوتوں کے خلاف مزاحمت
- Grasp کوالٹی metrics (مثلاً، force closure، grasp wrench space)
- Object کی خصوصیات (شکل، وزن، رگڑ)
- Robot hand کی صلاحیتیں (DOF، انگلیوں کی ترتیب)

Grasp execution میں pre-grasp positioning، approach، contact، اور lift مراحل شامل ہیں۔ ہر مرحلے میں محتاط control کی ضرورت ہوتی ہے اور اکثر object pose اور ماحول میں غیر یقینی صورتحال کو سنبھالنے کے لیے force control شامل ہوتا ہے۔

## سیکشن 6.4: Advanced Manipulation تکنیکیں
جدید manipulation سسٹمز پیچیدہ منظرناموں کو سنبھالنے کے لیے advanced تکنیکوں کو شامل کرتے ہیں:

**Bimanual manipulation** میں دو بازوؤں کو coordinate کرنا شامل ہے تاکہ ایسے کام انجام دیے جائیں جن کے لیے ایک بازو سے زیادہ dexterity کی ضرورت ہو۔ اس کے لیے sophisticated coordination algorithms اور planning کی ضرورت ہے۔

**Tool use** بیرونی tools استعمال کرکے روبوٹ کی صلاحیتوں کو بڑھاتا ہے۔ اس کے لیے tool affordances اور مناسب tool manipulation تکنیکوں کی سمجھ کی ضرورت ہے۔

**Learning from demonstration** روبوٹس کو انسانی مظاہروں کا مشاہدہ کرکے manipulation skills حاصل کرنے کی اجازت دیتا ہے، جو programming کو زیادہ intuitive بناتا ہے۔

**Compliance اور force control** صرف positions کی بجائے forces کو کنٹرول کرکے ماحول کے ساتھ محفوظ تعامل کو ممکن بناتا ہے، جو assembly یا نازک object handling جیسے کاموں کے لیے ضروری ہے۔

**Human-robot collaborative manipulation** میں روبوٹس کا انسانوں کے ساتھ کام کرنا شامل ہے، جس کے لیے حفاظتی سسٹمز اور intuitive تعامل کے طریقوں کی ضرورت ہے۔

## عملی لیبز
### لیب 6.1: MoveIt! کے ساتھ Arm Trajectory Planning
- **مقصد**: ROS 2 میں MoveIt! استعمال کرتے ہوئے robotic arm کے لیے motion planning کو نافذ کرنا
- **سرگرمیاں**: طلباء ایک arm کے لیے MoveIt! کو configure کریں گے، پیچیدہ trajectories کی منصوبہ بندی کریں گے، اور انہیں محفوظ طریقے سے execute کریں گے
- **Deliverables**: Functional MoveIt! setup بشمول trajectory planning اور execution صلاحیتیں
- **وقت کا تخمینہ**: 5-6 گھنٹے

### لیب 6.2: Grasp Planning اور Execution Simulation
- **مقصد**: Grasp planning کو نافذ کرنا اور simulation میں manipulation کاموں کو execute کرنا
- **سرگرمیاں**: طلباء grasp planning algorithms تیار کریں گے اور انہیں motion planning کے ساتھ integrate کریں گے
- **Deliverables**: Grasp planning سسٹم بشمول simulation میں کامیاب object manipulation
- **وقت کا تخمینہ**: 6-7 گھنٹے

### لیب 6.3: Perception-Driven Manipulation کام
- **مقصد**: خود مختار object handling کے لیے perception اور manipulation کو integrate کرنا
- **سرگرمیاں**: طلباء ایک سسٹم بنائیں گے جو objects کا پتہ لگاتا ہے، grasps کی منصوبہ بندی کرتا ہے، اور manipulation کو execute کرتا ہے
- **Deliverables**: مکمل perception-to-action pipeline بشمول خود مختار manipulation صلاحیت
- **وقت کا تخمینہ**: 7-8 گھنٹے

## تشخیصی خیالات
- **Manipulation Task Planning مسائل**: پیچیدہ منظرنامے جن میں multi-step manipulation planning کی ضرورت ہے
- **Trajectory Optimization چیلنجز**: کارکردگی یا حفاظت کے لیے motion planning کی optimization کی ضرورت والے مسائل
- **Grasp Quality Evaluation مشقیں**: Grasp planning algorithms کی تشخیص اور بہتری کے کام
- **Integration پروجیکٹس**: متعدد manipulation صلاحیتوں کو یکجا کرنے والے جامع پروجیکٹس

## خلاصہ
Manipulation صلاحیتیں روبوٹس کو اپنے ماحول کے ساتھ تعامل اور اس میں تبدیلی کرنے کے قابل بناتی ہیں، انہیں حقیقی دنیا کی ایپلیکیشنز کے لیے واقعی مفید بناتی ہیں۔ Manipulation، motion planning، اور control کے اصولوں کو سمجھنا قابل robotic سسٹمز تیار کرنے کے لیے ضروری ہے۔