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

- Use of Typescript, in place of Javascript
- Type Safety reduces Production Errors by 80%
- Complete State Management by Redux with Redux Devtools Extension Integration
- Persisting Global State Across All Routes
- Use of React Router Dom for creating Routes in a Single Page Application
- No use of Custom UI framework, completely built using Tailwind CSS
- Responsive UI even in Smaller Devices
- 70% UI Text, Elements configurable from One File
- Unit Tests for testing UI
- No Redundant API Calls
- Complete Data Processing within the Application from Single API Call

## Status of CI/CD Setup

![Deployment Status](https://github.com/iamsomraj/React-Acko-Weather-App/actions/workflows/main.yml/badge.svg)

![Testing Status](https://github.com/iamsomraj/React-Acko-Weather-App/actions/workflows/unit-tests.yml/badge.svg)

## Documentation

For developing this project, I prepared one basic design documentation. I will encourage you to see that first, so that you can get a better idea what to expect from this.

[Design Document - Link]()

## Demo

- [Live Version - Github Actions - CI/CD](https://iamsomraj.github.io/React-Acko-Weather-App/)

## Install React-Acko-Weather-App On Your Local System

- Open Terminal

- Clone React-Acko-Weather-App Repository

```bash
    git clone https://github.com/iamsomraj/React-Acko-Weather-App.git
```

- Install dependencies

```bash
  cd React-Acko-Weather-App
  npm install
```

## Run React-Acko-Weather-App

- Open Terminal

- Go to Root Directory of React-Acko-Weather-App

- Start React-Acko-Weather-App

```bash
  npm start
```

## Running Tests

React-Acko-Weather-App currently supports some frontend tests using `jest` & `react-testing-library` . To run tests, run the following command

```bash
  npm run test
```

## Tech Stack

**Client:** React, Redux, React Hooks

**Language Used:** Typescript

**API:** [Open Weather Map API](https://openweathermap.org/forecast5)

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

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Feedback

If you have any feedback or you want to give me some tips related to development, please reach out to me at iamsomraj@gmail.com.
