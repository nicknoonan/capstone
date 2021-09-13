const Agency = require('../models/Agency');
const axios = require('axios');
const agency_name = 'test agency from jest';
const agency_address = '1234 sesame street';

test('agency controller test', async () => {
  await axios.post('http://localhost:8080/agency', {
    name: agency_name,
    address: agency_address
  }).then(res => {
    let expected = {
      name: agency_name,
      address: agency_address
    };
    expect(res.data.name).toEqual(expected.name);
    expect(res.data.address).toEqual(expected.address);
    expect(id).toBeDefined();
    let url = 'http://localhost:8080/agency/:' + id;
    axios.delete(url).then(() => {}).catch(error => {
      console.log('error: ' + error);
      expect(true).toBeFalsy;
    });
  }).catch(error => {
    expect(true).toBeFalsy();
  });
});