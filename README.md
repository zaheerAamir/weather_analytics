# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gzarii/weather-app
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API keys and Firebase configuration:
   ```
   # OpenWeather API
   VITE_REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key

   # Firebase Configuration
   VITE_REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   VITE_REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   VITE_REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Authentication**
   - Sign in using your Google account
   - Access to all features requires authentication
   - Your preferences and favorites are tied to your account
   - Secure logout available in the navigation bar

2. **View Current Weather**
   - Enter a city name in the search bar
   - View detailed weather information including temperature, humidity, wind speed, and more

2. **Check Forecasts**
   - Click on "Details" to view detailed forecasts
   - Switch between 24-hour and 5-day forecast views
   - Analyze weather trends through interactive charts

3. **Manage Favorites**
   - Click the heart icon to add/remove cities from favorites
   - Access favorite cities quickly from the dashboard
   - View all favorite locations in a dedicated section

4. **Customize Settings**
   - Toggle temperature unit (°C/°F) using the unit switch
   - Settings persist across sessions

