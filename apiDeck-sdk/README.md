<div align="center">
  
<img src="./logo.svg" alt="ApiDeck Logo" width="64" height="64"/>

# ApiDeck

**Lightweight API Usage Tracking SDK for Node.js**

<p align="center">
  <a href="https://www.npmjs.com/package/apideck-tracker">
    <img src="https://img.shields.io/npm/v/apideck-tracker?style=flat-square&color=00BFFF" alt="npm version"/>
  </a>
  <a href="https://www.npmjs.com/package/apideck-tracker">
    <img src="https://img.shields.io/badge/downloads-75%2Fmonth-1E90FF?style=flat-square" alt="downloads"/>
  </a>
  <a href="https://nodejs.org">
    <img src="https://img.shields.io/badge/Node.js-Compatible-228B22?style=flat-square" alt="Node.js"/>
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-32CD32?style=flat-square" alt="License"/>
  </a>
</p>

<p align="center">
  Track API requests, monitor response times, and analyze performance — effortlessly.
</p>

</div>

---

## ✨ Features

- 📊 **Automatic API usage tracking**
- ⚡ **Logs response time and status codes**
- 🔐 **Secure with API key authentication**
- 🌐 **Customizable tracker server endpoint**
- 🧩 **Simple Express.js middleware integration**

---

## 🚀 Installation

```bash
npm install apideck-tracker
```

---

## 🔑 Get Your API Key

To use ApiDeck, you need an account and an API key.

- Go to [https://apideck.site/] and create an account.

- Log in to your dashboard. Your unique apikey will be automatically generated and displayed.

- The trackerUrl is the main API endpoint for the ApiDeck service.

## 🔧 Quick Start

Choose the syntax for your project.

ES Module(import)

```bash
import express from "express";
import { apiTracker } from "apideck-tracker";

const app = express();

app.use(
  apiTracker({
    apikey: "YOUR_API_KEY",
    trackerUrl: "https://apideck.site"
  })
);
```

CommonJS (require)

```bash
const express = require("express");
const { apiTracker } = require("apideck-tracker");

const app = express();

app.use(
  apiTracker({
    apikey: "YOUR_API_KEY_FROM_SERVER",
    trackerUrl: "https://apideck.site"
  })
);
```

---

## 📖 API Reference

apiTracker(options)

Creates and returns Express middleware that automatically logs API usage.

| **Option**   | **Type** | **Description**                                           |
| ------------ | -------- | --------------------------------------------------------- |
| `apikey`     | `string` | Your unique API key for authenticating tracking requests. |
| `trackerUrl` | `string` | Base URL of the ApiDeck.                                  |

---

## 📊 What Data Gets Tracked

Each API request automatically sends structured data to your tracker backend.

| **Field**          | **Type**  | **Description**                             |
| ------------------ | --------- | ------------------------------------------- |
| `apikey`           | `string`  | Identifies and authenticates the client.    |
| `endpoint`         | `string`  | The API route being accessed.               |
| `method`           | `string`  | The HTTP method used (GET, POST, etc.).     |
| `status_code`      | `number`  | Response status code.                       |
| `is_success`       | `boolean` | True if response status is between 200–399. |
| `response_time_ms` | `number`  | Time taken for request to complete (in ms). |
| `ip`               | `string`  | The requester’s IP address.                 |

---

## 💡 Example Logged Data

```bash
{
  "apikey": "xyz123",
  "endpoint": "/api/user",
  "method": "GET",
  "status_code": 200,
  "is_success": true,
  "response_time_ms": 142,
  "ip": "::1"
}
```

---

## 🧠 Supported Frameworks

ApiDeck works seamlessly with:

- 🟢 Node.js

- ⚙️ Express.js

- 🧱 Any middleware-based HTTP framework

---

<div align="center">
  <p>Questions? <strong>kishoraman2121@gmail.com</strong></p>
</div>
