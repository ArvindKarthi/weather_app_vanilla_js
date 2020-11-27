const apiKey = "BXsmIyOA3SnwhiEIHpFRxF5St6QReBz1";
export const getKey = async (cityName) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${apiKey}&q=${cityName}`;
  const request = await fetch(base + query);
  const response = await request.json();
  return response[0];
};
export const getCityData = async (cityKey) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${cityKey}?apikey=${apiKey}`;
  const request = await fetch(base + query);
  const response = await request.json();
  return response[0];
};
