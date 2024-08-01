# 📚 Unifinder API Documentation

Welcome to the Unifinder API! This document provides a comprehensive overview of our API endpoints, including authentication, legacy features, user management, and experimental automation tools. Let's dive in!

## 🔒 Authentication

### `/api/auth`

- **`/signup`**: Registers a new user.
  *Input* POST signup data.
- **`/login`**: Authenticates and logs in an existing user.
  *Input* POST login data.

## 🏛️ Legacy API

### `/api/legacy`

- **`/auto`**: Generates a CSV dataset.
  **Warning!** You may be temporarily blacklisted from Gemini due to ratelimits
  **Warning!** Code is deprecated, reccomended to GET `/api/automationv3/experimental` instead.
  *Input* List of universities embedded in source code.
  *Output* MongoDB instance `university`

## 👤 User Management

### `/api/user`

- **`/signout`**:
  Logs out the current user session.
  *Input* POST login data
- **`/update-user/:userID`**:
  Updates user information for the specified `userID`.
  *Input* POST user information to CRUD.

## 🤖 Automation V3

### `/api/automationv3`

- `/experimental`
  *Input* Takes in `server/automation/data/usUnivs.js`
  *Output* Creates a CSV dataset `server/automation/data/usUnivsGen2.csv`
  *Output* Creates a MongoDB instance `UniversityV3Dataset`
  *Effeciency* 1 prompt/uni; 6000ms (0.1min) delay

## 💎Legacy Gemini API

### `/api/gemini`

* `/api/gemini/generate-res` Generates a Gemini result based on information.

---

Feel free to use this API documentation as a guide for understanding the internals of Unifinder. Happy coding! 🚀
Copyright©️ 2024 Unifinder
