import axios from 'axios';
import { url } from '../config';

// all the locations
async function allLocations() {
    const res = await axios.get(`${url}/list?field=location`)
    const { data } = res;
    return data;
}

// all the battle by location
async function battleDetailsByLocation(location) {
    const res = await axios.get(`${url}/search?location=${location}`)
    const { data } = res;
    return data;
}

export {
    allLocations,
    battleDetailsByLocation
};