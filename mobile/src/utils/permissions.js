import {PermissionsAndroid} from 'react-native';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'DevRadar Location Permission',
        message:
          'DevRadar precisa da sua permissão para utilizar sua localização',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      return true;
    } else {
      console.log('location permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}

export {requestLocationPermission};
