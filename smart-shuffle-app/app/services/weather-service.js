import Service from '@ember/service';
import fetch from 'fetch';
import WeatherForecast from 'smart-shuffle-app/models/weather-forecast';

export default class WeatherService extends Service {
  async getWeatherForecast() {
    try {
      let response = await fetch(
        'https://localhost:5155/WeatherForecast/GetWeatherForecast',
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

      return data.map((item) => WeatherForecast.create(item));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
