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
- Separate types folder, for handling all Application Types From One Place
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

- [Design Document - Link](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Acko%20Weather%20Design%20Document#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1LDoDDeXxr86frGwT0wGW1eg2tLLtGAFS%26export%3Ddownload)

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

- Install dev dependencies

```bash
  npm install --only=dev
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

**Client:** React, Redux, React Hooks, Tailwind CSS

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
