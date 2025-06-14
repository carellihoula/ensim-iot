# IoT Data Platform

A comprehensive IoT platform for real-time data transmission, secure storage, and experimental data processing from various IoT devices.

## 📋 Overview

This project implements a complete IoT ecosystem designed to collect, store, and analyze experimental data from any IoT device capable of MQTT communication. The platform provides a secure, scalable solution for researchers and developers who need to manage data from multiple IoT sensors and devices.

## ✨ Features

- **Universal IoT Device Support**: Compatible with any device that can publish to MQTT broker
- **Real-time Data Visualization**: Live charts and graphs with customizable time ranges
- **Secure Data Storage**: Encrypted data storage with MongoDB
- **Device Management**: Add, modify, and remove IoT devices through intuitive interface
- **User Authentication**: Secure account creation and device credential management
- **Data Analytics**: Historical data analysis and trend visualization
- **Unit Conversion**: Automatic unit conversion using convert-units library
- **WebSocket Integration**: Real-time updates via Socket.IO
- **Responsive Design**: Modern web interface built with Next.js

## 📦 Repository Links

- **🔗 [Backend Repository](https://github.com/carellihoula/ensim-iot-backend-v2.git)** - Express.js API server with MQTT integration
- **🔗 [ESP32 Hardware Code](https://github.com/carellihoula/iot-environmental-monitoring.git)** - Complete ESP32 implementation


## 🏗️ Architecture

### Backend Stack
- **Express.js**: RESTful API server
- **MongoDB**: NoSQL database for data storage
- **EMQX**: Cloud-based MQTT broker for device communication
- **Socket.IO**: Real-time bidirectional communication
- **TypeScript**: Type-safe development

### Frontend Stack
- **Next.js**: React-based web application framework
- **Vercel**: Cloud platform for deployment and hosting
- **Recharts**: Powerful charting library for data visualization
- **TypeScript**: Enhanced development experience
- **Real-time Charts**: Dynamic data visualization with interactive features

### Hardware (Testing)
- **ESP32**: Microcontroller for IoT device prototyping
- **DHT22**: Temperature and humidity sensor for platform testing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB instance
- EMQX broker account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd iot-data-platform
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend application**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the platform**
   Open your browser and navigate to `http://localhost:3000`

## 📱 Device Integration

### MQTT Configuration

To connect your IoT device to the platform:

1. **Create an account** on the web platform
2. **Add your device** through the dashboard
3. **Configure your device** with the provided MQTT credentials:
   - **Broker**: Your EMQX broker URL
   - **Topic**: `devices/{device_id}/data`
   - **Username**: Generated device username
   - **Password**: Generated device password


### ESP32 Example Code

For a complete ESP32 implementation with DHT22 sensor integration, check out our reference implementation:

**🔗 [ESP32 Environmental Monitoring Code](https://github.com/carellihoula/iot-environmental-monitoring.git)**

This repository contains:
- Complete ESP32 Arduino code for DHT22 integration
- MQTT connection and data publishing examples
- WiFi configuration and error handling
- Sensor calibration and data formatting
- Power management optimizations

## 🔧 Platform Features

### Device Management
- **Add Devices**: Register new IoT devices with custom configurations
- **Edit Devices**: Modify device settings and metadata
- **Remove Devices**: Safely remove devices and their associated data
- **Device Status**: Monitor connection status and last activity

### Data Visualization
- **Real-time Charts**: Live updating graphs powered by Recharts for all connected devices
- **Interactive Dashboards**: Responsive charts with zoom, pan, and tooltip features
- **Multiple Chart Types**: Line charts, bar charts, area charts, and scatter plots
- **Historical Analysis**: View data trends over custom time periods
- **Multiple Metrics**: Display multiple sensor readings simultaneously
- **Unit Conversion**: Automatic conversion between measurement units

### Security Features
- **Encrypted Storage**: All data encrypted at rest
- **Authentication**: Secure user accounts with JWT tokens
- **Device Credentials**: Unique MQTT credentials for each device
- **Data Isolation**: User data completely separated and protected

## 🛠️ Development

### Project Structure
```
iot-data-platform/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── services/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
│
└── hardware/
    └── esp32-examples/
```

### Available Scripts

**Backend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## 📊 Supported Data Types

The platform supports various data types and automatically handles unit conversions:
- **Temperature**: Celsius, Fahrenheit, Kelvin
- **Humidity**: Percentage, Absolute humidity
- **Pressure**: Pascal, Bar, PSI, mmHg
- **Distance**: Meters, Feet, Inches
- **Custom Units**: Extensible through convert-units library

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License

## 📸 Screenshots

### Dashboard Overview
![Login](./login.png)
![Register](./register.png)
![Dashboard](./accueil.png)
![List of Devices](./list.png)
![Add a new device](./ajout.png)
![new unit request](./demande.png)

## 🔮 Future Enhancements

- [ ] Advanced analytics and machine learning integration
- [ ] Data export functionality (CSV, JSON, XML)
- [ ] Email/SMS alerts for threshold violations
- [ ] Multi-tenant support for organizations
- [ ] Data backup and recovery tools

---

**Built with ❤️ for the IoT community**
