import mapTimeZone from '@mapbox/timespace'

export const getLocationTimezoneOffset = (latitude , longtitude) => {
  // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longtitude},${latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`
  // fetch(url).then(res => res.json()).then(response => console.log(response  ));
  // return latitude * longtitude;
  const currentTime = Date.now();
  const currentTimeZoneOffset = new Date().getTimezoneOffset()
  const locationTime = mapTimeZone.getFuzzyLocalTimeFromPoint(currentTime, [longtitude, latitude])?.utcOffset()
  const hourOffset=  (locationTime + currentTimeZoneOffset) / 60
  return hourOffset;
}

