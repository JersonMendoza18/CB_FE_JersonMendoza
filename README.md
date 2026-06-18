# Financial Agent Station (Frontend)

This project represents the web user interface designed to simulate a local bank teller or agent terminal. It consumes the distributed REST services exposed by the Spring Boot API.

## 🏗️ UI/UX Design Decisions

- **Standalone Components (Modern Angular):** Heavy legacy modules (`NgModules`) were completely avoided. The application features a lightweight, independent standalone component architecture.
- **Transactional Alignment & Input Hardening (UX/UI Fix):** To prevent data inconsistencies during teller operations, a protected user flow was implemented: the `Account ID` field in the transaction form is strictly configured as **read-only (`[disabled]="true"`)**, forcing it to inherit the context of the active account fetched on screen. This guarantees the operator can only execute deposits or withdrawals on the explicitly validated entity.
- **Dynamic State Control:** The execution form remains hidden or locked via `*ngIf` until a valid account query succeeds, significantly reducing human operational errors.
- **Real-Time Error Feedback:** The interface catches structured error payloads from the backend, abstracting complex HTTP rejections into clean, semantic user-facing alert banners (e.g., overdraft or operational limit violations).

## 🛠️ Tech Stack

- **Angular 18+**
- **TypeScript**
- **Native HTML5 / CSS3**

## 🚀 How to Run the Application

1. Ensure **Node.js** (LTS version recommended) is installed on your system.
2. Open a terminal and navigate to the root directory of the frontend project.
3. Install the framework packages and dependencies by executing:
   ```bash
   npm install
   ```

4. Start the local development server using:
   ```bash
   ng serve -o
   ```

The `-o` flag will automatically open your default web browser at http://localhost:4200/.

**Important:** Make sure the Backend server is running simultaneously so that network integration and API requests resolve successfully.
