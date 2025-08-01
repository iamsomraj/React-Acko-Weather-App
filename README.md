# 🍃 React-Acko-Weather-App

React-Acko-Weather-App is a forecast viewer application. When you use the Check Weather feature in React-Acko-Weather-App, user will receive a prompt for accepting location permission. Based on user input, React-Acko-Weather-App shows the forecast weather data.

## Top Features

### Functionality

- Online Forecast Fetching
- Two Separate Modes of Forecast Fetching
- Geolocation Mode ( which requires permission )
- User Search Mode ( based on user input )
- Filter Forecast Data by Date
- Responsive Table To View All Forecast Data By Time

### Code level

- Modern React 18 with TypeScript for type safety and better development experience
- Vite for fast development and optimized production builds
- Redux Toolkit for efficient state management with Redux DevTools integration
- React Router v6 for client-side routing in Single Page Application
- Tailwind CSS for utility-first styling without custom UI frameworks
- Vitest for fast unit testing with modern testing capabilities
- ESLint and Prettier for code quality and consistent formatting
- Bun runtime support for faster package management and execution
- Responsive design optimized for all device sizes
- Component-based architecture with 15+ reusable TypeScript components
- Efficient API integration with no redundant calls
- Complete data processing and state persistence across routes
- Modern build tooling with hot module replacement

## Documentation

For developing this project, I prepared one basic design documentation. I will encourage you to see that first, so that you can get a better idea what to expect from this.

- [Design Document - Link](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Acko%20Weather%20Design%20Document#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1LDoDDeXxr86frGwT0wGW1eg2tLLtGAFS%26export%3Ddownload)

## Demo

- [Live Version - Github Actions - CI/CD](https://iamsomraj.github.io/React-Acko-Weather-App/)

- Installing Into Local System is Preferred

## Install React-Acko-Weather-App On Your Local System

### Prerequisites

- Node.js (v18 or higher recommended)
- Bun (optional, for faster package management) or npm/yarn

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/iamsomraj/React-Acko-Weather-App.git
cd React-Acko-Weather-App
```

2. **Install dependencies**

Using Bun (recommended for faster installation):

```bash
bun install
```

Or using npm:

```bash
npm install
```

3. **Set up environment variables**

   Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

   Then edit the `.env` file and add your OpenWeatherMap API key:

   ```bash
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

   To get your API key:
   - Visit [OpenWeatherMap API](https://openweathermap.org/api)
   - Sign up for a free account
   - Navigate to API keys section
   - Copy your API key and replace `your_actual_api_key_here` in the `.env` file

## Run React-Acko-Weather-App

### Development Mode

Using Bun:

```bash
bun run dev
```

Or using npm:

```bash
npm run dev
```

The application will start on `http://localhost:5173` (Vite default port).

### Production Build

```bash
bun run build
# or
npm run build
```

### Preview Production Build

```bash
bun run preview
# or
npm run preview
```

## Running Tests

The project uses Vitest for testing with React Testing Library. Multiple test commands are available:

### Run Tests Once

```bash
bun run test
# or
npm run test
```

### Watch Mode (for development)

```bash
bun run test:watch
# or
npm run test:watch
```

### Test UI (interactive testing interface)

```bash
bun run test:ui
# or
npm run test:ui
```

### Code Quality

Run linting:

```bash
bun run lint
# or
npm run lint
```

Fix linting issues:

```bash
bun run lint:fix
# or
npm run lint:fix
```

Format code:

```bash
bun run format
# or
npm run format
```

## How To Test 2 Different Modes of Application

React-Acko-Weather-App currently has 2 modes of operation.

- Geolocation Mode : Fetches forecast data based on position
- User Input Mode : Fetches forecast data based on city name

After installing it into your local system, you can enable or disable Location permission for the website and refresh. At the time of doing, you should be on the [Home Page](http://localhost:5173/).

## Deployment

### GitHub Pages Deployment

```bash
bun run deploy
# or
npm run deploy
```

This will build the project and deploy it to GitHub Pages.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── containers/          # Page-level container components
├── state/              # Redux store, actions, and reducers
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── config/             # API and app configuration
└── data/               # Static data and constants
```

## Future Improvements

- Toggle Option for both modes of Operation
- Dark Mode Implementation
- Docker containerization for easy deployment
- Interactive Weather Map with geographical visualization
- Progressive Web App (PWA) features
- Advanced weather analytics and historical data
- Multi-language support (i18n)
- Weather alerts and notifications
- Offline functionality with service workers

## Tech Stack

**Frontend Framework:** React 18 with TypeScript

**Build Tool:** Vite (fast development and optimized builds)

**State Management:** Redux Toolkit with Redux DevTools

**Routing:** React Router v6

**Styling:** Tailwind CSS (utility-first CSS framework)

**Testing:** Vitest with React Testing Library

**Package Manager:** Bun (with npm fallback support)

**Code Quality:** ESLint + Prettier + TypeScript

**Deployment:** GitHub Actions CI/CD → GitHub Pages

**API:** [OpenWeatherMap API](https://openweathermap.org/forecast5) (5-day/3-hour forecast)

## Development Experience

This project leverages modern development tools and practices:

- **⚡ Vite**: Lightning-fast development server with Hot Module Replacement (HMR)
- **🟦 TypeScript**: Full type safety with modern TypeScript features
- **🧪 Vitest**: Fast unit testing with native ES modules support
- **🎯 Redux Toolkit**: Simplified Redux usage with built-in best practices
- **🎨 Tailwind CSS**: Utility-first styling with responsive design
- **🏃‍♂️ Bun**: Optional fast runtime and package manager support
- **📋 ESLint + Prettier**: Automated code formatting and linting
- **🚀 GitHub Actions**: Automated testing and deployment pipeline

### Key Technical Highlights

- Zero-config setup with Vite
- Modern ES modules throughout the codebase
- Efficient state management with Redux Toolkit
- Component-driven development with strict TypeScript
- Comprehensive error handling and user feedback
- Mobile-first responsive design approach
- Optimized bundle size and loading performance

## Open Weather Map API Reference

These following API end-points are used in React-Acko-Weather-App

### Coordinate Route

#### Get 5 Day Weather Forecast

```http
  GET https://api.openweathermap.org/data/2.5/forecast
```

```
  params: {
    appid: API_KEY,
    units: "metric",
    lat: GEOLOCATION_LATITUDE,
    lon: GEOLOCATION_LONGITUDE
  }
```

| Access    | Route                                              | Description                               |
| :-------- | :------------------------------------------------- | :---------------------------------------- |
| `private` | `https://api.openweathermap.org/data/2.5/forecast` | Get 5 Day Weather Forecast By Geolocation |

### City Route

#### Get 5 Day Weather Forecast

```http
  GET https://api.openweathermap.org/data/2.5/forecast
```

```
  params: {
    appid: API_KEY,
    units: "metric",
    q: CITY_NAME,
  }
```

| Access    | Route                                              | Description                        |
| :-------- | :------------------------------------------------- | :--------------------------------- |
| `private` | `https://api.openweathermap.org/data/2.5/forecast` | Get 5 Day Weather Forecast By City |

## FAQ

**Question:** Why have you used Typescript?

**Answer:** Nowadays, most React applications are built using Typescript. That's why, I have used it. Also, I like the language and it gives many benefits in the long run. I think, in future, everyone will develop React applications using only Typescript.

**Question:** Why have you used Redux?

**Answer:** It helps to keep the Main logic of the application separate with the rest of the application. One can also use React hooks, i.e., `useReducer`. But, my personal preference is Redux. In small parts of application, I also have used React hooks such as `useState` and `useEffect`.

**Question:** There are very few unit tests. Why?

**Answer:** I also agree to this. I am not very comfortable with unit tests. That's why, I was finding it difficult to write those tests. Still, for this assignment, I have tried my best to learn `react-testing-library` and implement all the things. I feel, If I give proper effort, then, it will definitely help me regarding this.

**Question:** Why have not you used Docker Hub as mentioned in the mail?

**Answer:** I have very little knowledge about Docker. Also, I have not used it, myself. In this time span, I wanted to focus on the application functionality itself.

**Question:** Why have you chosen this specific `5 Day / 3 Hour Forecast` API
from [Open Weather Map API](https://openweathermap.org/forecast5)?

**Answer:** There are only 3 free API options available on Open Weather Map API for Current & Forecast weather data collection. They are the following:

- Current Weather Data
- One Call API
- 5 Day / 3 Hour Forecast `( only this fulfilled the assignment requirment )`

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Feedback

If you have any feedback or you want to give me some tips related to development or even documentation, please reach out to me at iamsomraj@gmail.com.
