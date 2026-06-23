# Sistema de Riego Inteligente IoT con ESP32, LoRa y FastAPI

## Descripción

Sistema de monitoreo y control de riego inteligente basado en ESP32 y comunicación LoRa.

El proyecto permite monitorear variables agrícolas en tiempo real y controlar remotamente el sistema de riego mediante una aplicación web y una API desplegada en la nube.

## Arquitectura

Sensores ESP32 + LoRa

↓

Nodo Controlador ESP32 + LoRa

↓

Gateway ESP32 + WiFi

↓

MQTT Broker (Mosquitto)

↓

FastAPI

↓

PostgreSQL

↓

Frontend React + TypeScript

## Variables Monitoreadas

* Temperatura ambiente
* Humedad del suelo
* Nivel de batería
* Estado de válvula
* Fecha y hora de eventos

## Tecnologías

### Backend

* Python
* FastAPI
* SQLAlchemy
* PostgreSQL

### Frontend

* React
* TypeScript
* Tailwind CSS
* Recharts

### Infraestructura

* Oracle Cloud VPS
* Docker
* Docker Compose
* Mosquitto MQTT

### Hardware

* ESP32
* Módulo LoRa SX1278/SX1262
* Sensores de humedad
* Sensores de temperatura
* Electroválvula

## Funcionalidades

* Visualización de datos en tiempo real
* Historial de sensores
* Gráficos de tendencias
* Apertura y cierre remoto de válvula
* Registro de eventos
* Comunicación MQTT

## Estado Actual

* MQTT operativo
* PostgreSQL operativo
* API FastAPI funcional
* Dashboard React en desarrollo
* Integración ESP32 pendiente

## Autor

Proyecto desarrollado por Kike para monitoreo y automatización de riego agrícola mediante IoT.
