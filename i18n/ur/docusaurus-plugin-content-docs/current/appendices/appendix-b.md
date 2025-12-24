---
sidebar_position: 2
---

# ضمیمہ B: Software Installation اور Setup

## B.1 ROS 2 Installation Guide
مختلف operating systems پر troubleshooting tips کے ساتھ ROS 2 install کرنے کے قدم بہ قدم ہدایات۔

### System کی ضروریات:
- Ubuntu 22.04 LTS (تجویز کردہ) یا دیگر supported Linux distributions
- WSL2 (Windows Subsystem for Linux) کے ساتھ Windows 10/11
- Docker containers کے ساتھ macOS
- کم از کم 8GB RAM، 50GB free disk space
- Package installation کے لیے internet connection

### Installation کے مراحل:
1. **Sources کا setup**: اپنے system میں ROS 2 GPG key اور repository شامل کریں
2. **Package list کو update کریں**: Package information کو refresh کرنے کے لیے `sudo apt update` (Ubuntu پر) چلائیں
3. **ROS 2 packages کی تنصیب**: Desktop-full یا custom package selection install کریں
4. **Environment setup**: اپنی shell configuration میں ROS 2 environment کو source کریں
5. **Installation کی تصدیق**: سادہ commands کے ساتھ بنیادی ROS 2 functionality کو test کریں

### عام مسائل اور حل:
- Repository access errors: Internet connection اور proxy settings چیک کریں
- اجازت کے مسائل: ضرورت کے مطابق مناسب sudo commands استعمال کریں
- Package conflicts: Installation سے پہلے متضاد packages کو ہٹائیں
- Environment source نہیں ہو رہی: Shell configuration files کی تصدیق کریں

## B.2 Isaac Platform Setup
Robotics development کے لیے NVIDIA Isaac platform کو setup کرنے کی جامع guide۔

### Hardware کی ضروریات:
- CUDA capability کے ساتھ NVIDIA GPU (کم از کم compute capability 6.0)
- آپ کے GPU کے ساتھ compatible CUDA toolkit
- Compatible Linux distribution
- Simulation environments کے لیے کافی RAM اور storage

### Installation کا عمل:
1. **Prerequisites**: NVIDIA drivers اور CUDA toolkit install کریں
2. **Isaac Sim**: Omniverse کے ساتھ Isaac Sim کو download اور install کریں
3. **Isaac Apps**: Pre-built applications اور examples install کریں
4. **Development containers**: Development کے لیے Docker containers setup کریں
5. **تصدیق**: بنیادی Isaac functionality کو test کریں

### Troubleshooting:
- GPU driver compatibility مسائل
- CUDA version conflicts
- Docker container setup مسائل
- Omniverse کے لیے network configuration

## B.3 Simulation Environment Configuration
Gazebo اور Unity سمیت simulation environments کو setup اور configure کرنے کی ہدایات۔

### Gazebo Setup:
- Gazebo Garden یا Fortress کی تنصیب
- Plugin installation اور management
- Model اور world کا انتظام
- مختلف hardware کے لیے performance optimization

### Unity Robotics Setup:
- Unity Hub اور Unity Editor کی تنصیب
- Robotics packages اور tools کی تنصیب
- Reinforcement learning کے لیے ML-Agents setup
- ROS-TCP-Connector configuration

## B.4 Development Environment کی تیاری
Physical AI projects کے لیے مکمل development environment setup کرنے کے بہترین طریقے۔

### IDE Configuration:
- تجویز کردہ IDEs: VS Code، PyCharm، یا custom solutions
- Extension اور plugin installation
- Debugging tools setup
- Version control integration

### اضافی ٹولز:
- Version control کے لیے Git
- Containerization کے لیے Docker
- تجربات کے لیے Jupyter notebooks
- Performance analysis کے لیے profiling tools

## خلاصہ
کامیاب robotics development کے لیے مناسب software installation اور environment setup اہم ہے۔ ان ہدایات کو احتیاط سے follow کریں اور development کے ساتھ آگے بڑھنے سے پہلے یقینی بنائیں کہ تمام components صحیح طریقے سے configure ہیں۔
