# WeatherWise

WeatherWise is a simple and user-friendly application that allows users to get real-time weather information for any location in the world. The app provides current weather conditions, a 3-day forecast and additional details such as temperature, humidity, wind speed etc. The app fetches data from the [Weather API](https://www.weatherapi.com/).

>**Note:** Active development is ongoing in the [`weather-v2`](https://github.com/pawarnikhild/WeatherWise/tree/weather-v2) branch. It contains new features that are still being tested and refined.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Snapshots](#project-snapshots)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Tech Stack

- [React Native](https://reactnative.dev/): Core framework for building the app.
- [NativeWind](https://www.nativewind.dev/): Tailwind CSS for styling React Native components.
- [React Native Heroicons](https://www.npmjs.com/package/react-native-heroicons): Icon library for adding visually appealing icons to the app.
- [React Native Progress](https://www.npmjs.com/package/react-native-progress): Progress indicators for loading states.
- [React Native Async Storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage): Local storage for saving the last searched city.
- [Weather API](https://www.weatherapi.com/): Fetches real-time weather data and 3-day forecast.

## Features

- **Real-Time Weather**: Search for any city or location to get up-to-date weather information.
- **3-Day Forecast**: View a detailed 3-day weather forecast for your selected location.
- **Save Location**: Automatically saves your last searched city in local storage.
- **Responsive Design**: Simple and intuitive design ensures responsiveness across various devices (mobile, tablet, desktop).

## Installation

1.**Clone the repository**
```
git clone https://github.com/pawarnikhild/contact-us-page
```
2.**Navigate to project repository and install dependencies**
```
cd contact-us-page
npm Install
```
3.**Start the development server:**
```
npm start
```

> **Note**: Due to API rate limits, it's recommended to use your own API key. You can use the provided key for a quick demo, but kindly do not overuse it to ensure it remains available for others who may also need to test the project.

## Usage

1. Enter the name of a city or location in the search bar. The app will bring up a list of matching locations. Select the desired city from the dropdown.
2. The app will fetch and display the current weather and the 3-day forecast with detailed information about the temperature, humidity, wind speed.
3. The app automatically saves the last searched city to local storage, so the next time you open the app, it will load the weather details for the saved location automatically.

## Project Snapshots

Here are screenshots of the project:

<p align="center">
  <img src="https://github.com/pawarnikhild/WeatherWise/blob/main/Project%20Demo/Screenshot_1722538089.png" alt="Screenshot 1" width="200" style="margin-right: 30px;"/>
  <img src="https://github.com/pawarnikhild/WeatherWise/blob/main/Project%20Demo/Screenshot_1722538097.png" alt="Screenshot 2" width="200"/>
</p>

## Acknowledgments

This project was created following the tutorial by [Code With Nomi](https://www.youtube.com/@codewithnomi). Thanks to him for providing the guidance and resources for this project. The detailed steps and explanation can be found in the video:<br>
🔴 Build Weather App Using React Native | React Native Projects | Beginners -<br>
https://www.youtube.com/watch?v=953vyZMO4cM

## Contact

For any questions or suggestions, kindly reach out:

- Email: pawarnikhild@gmail.com
- LinkedIn: https://www.linkedin.com/in/nikhil-pawar-529687223/
- GitHub: https://github.com/pawarnikhild
