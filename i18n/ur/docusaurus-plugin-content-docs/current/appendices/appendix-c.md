---
sidebar_position: 3
---

# ضمیمہ C: Hardware Specifications

## C.1 Sensor Specifications اور Datasheets
Physical AI systems میں استعمال ہونے والے عام sensors کے بارے میں جامع معلومات۔

### Vision Sensors:
- **RGB Cameras**:
  - Resolution: 640x480 سے 4K تک
  - Frame rate: 30-120 FPS
  - Field of view: 60-180 degrees
  - Applications: Object recognition، navigation، mapping

- **Depth Sensors**:
  - Range: 0.2m سے 10m تک
  - Accuracy: ±1-5cm model پر منحصر
  - Technologies: Stereo، structured light، ToF
  - Applications: 3D reconstruction، obstacle detection

- **Stereo Cameras**:
  - Baseline: 5-20cm
  - Accuracy: Depth precision فاصلے کے ساتھ مختلف ہوتی ہے
  - Processing: ریئل ٹائم depth map generation
  - Applications: Navigation، manipulation

### Inertial Sensors:
- **IMUs (Inertial Measurement Units)**:
  - Accelerometer range: ±2g سے ±16g تک
  - Gyroscope range: ±250 سے ±2000 deg/s تک
  - Magnetometer: زمین کے magnetic field کی sensing
  - Applications: Balance، navigation، orientation

- **Gyroscopes**:
  - Accuracy: 0.01-10 deg/s
  - Drift characteristics: وقتی stability
  - Applications: Rotation sensing، stabilization

### Range Sensors:
- **LIDAR**:
  - Range: 0.1m سے 300m تک
  - Accuracy: ±1-5cm
  - Field of view: 360° افقی، 10-90° عمودی
  - Applications: Mapping، navigation، obstacle detection

- **Sonar**:
  - Range: 0.03m سے 4m تک
  - Accuracy: ±1cm سے ±3cm تک
  - Beam width: 15-30°
  - Applications: قریبی رکاوٹوں کا پتہ لگانا

## C.2 Actuator Parameters اور خصوصیات
Robotic systems میں استعمال ہونے والی مختلف actuator اقسام کی specifications۔

### Servo Motors:
- **Torque-Speed Curves**: Output torque اور speed کے درمیان تعلق
- **Position Accuracy**: Model پر منحصر 0.1-5 degrees
- **Control Interfaces**: PWM، serial، یا CAN bus
- **Power Consumption**: بوجھ اور رفتار کے ساتھ مختلف ہوتا ہے

### Linear Actuators:
- **Force Generation**: Model پر منحصر 10N سے 1000N+ تک
- **Position Control**: عام طور پر 0.1-1mm کی precision
- **Stroke Length**: 10mm سے 1000mm+ دستیاب
- **Speed صلاحیتیں**: Force پر منحصر 1-100mm/s

### Hydraulic/Pneumatic Systems:
- **Force Generation**: High power-to-weight ratio
- **Response Time**: تیز لیکن compressibility پر غور کی ضرورت
- **Precision**: اچھا لیکن fluid properties سے متاثر
- **Maintenance**: باقاعدہ maintenance کی ضروریات

## C.3 Computing Platform کی ضروریات
Physical AI applications کے لیے موزوں computing platforms کی specifications۔

### Edge Computing Platforms:
- **NVIDIA Jetson Series**:
  - Jetson Nano: 472 GFLOPS، 4GB RAM، 10W power
  - Jetson Xavier NX: 21 TOPS INT8، 8GB RAM، 15W power
  - Jetson AGX Orin: 275 TOPS INT8، 64GB RAM، 60W power

- **Intel NUC اور Similar**:
  - Processing power: 4-16 cores، مختلف performance levels
  - GPU options: Integrated یا discrete graphics
  - Power consumption: Model پر منحصر 15-65W
  - Connectivity: متعدد I/O options

### Cloud Integration کی ضروریات:
- **Bandwidth**: بنیادی communication کے لیے کم از کم 10Mbps
- **Latency**: ریئل ٹائم control applications کے لیے 50ms سے کم
- **Reliability**: Critical applications کے لیے 99.9% uptime
- **Security**: End-to-end encryption اور authentication

## C.4 Safety Guidelines
Physical AI systems اور human-robot interaction کے لیے جامع safety guidelines۔

### Physical Safety:
- **Force Limitations**: چوٹ سے بچنے کے لیے maximum forces
- **Speed Restrictions**: انسانی ماحول کے لیے محفوظ operational speeds
- **Emergency Stops**: تیز shutdown صلاحیتیں
- **Collision Detection**: نقصان دہ contact سے بچنے کے لیے systems

### Operational Safety:
- **Risk Assessment**: ممکنہ خطرات کی منظم تشخیص
- **محفوظ Operating طریقہ کار**: Operation کے لیے documented protocols
- **Maintenance Safety**: System maintenance کے لیے محفوظ طریقہ کار
- **Emergency Response**: System failures کے لیے طریقہ کار

## خلاصہ
Physical AI systems کے لیے مناسب components کے انتخاب کے لیے hardware specifications کو سمجھنا اہم ہے۔ Hardware کے انتخاب کرتے وقت performance کی ضروریات، environmental conditions، اور safety constraints پر غور کریں۔
