import ky from 'ky';

export default ky.create({
  credentials: 'include',
  mode: 'cors',
  prefixUrl: process.env.API_URI,
})
