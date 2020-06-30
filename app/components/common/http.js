import axios from 'axios';

const httpCall = (url, method, headers, params) => axios({
  method,
  url,
  headers,
  params,
}).then(res => res)
  .catch(e => e.response);

export {
  httpCall,
};
