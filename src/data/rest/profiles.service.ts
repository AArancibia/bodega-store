import axios from 'axios';
import {Constants} from '../../utils/constants';
import {Profile} from '../../domain/model/Profile';

export const getProfiles = (): Promise<Array<Profile>> => {
  return new Promise(((resolve, reject) => {
    axios.get(Constants.URL_MS_2 + `accesos/general`)
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}
