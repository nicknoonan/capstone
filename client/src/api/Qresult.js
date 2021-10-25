import axios from 'axios';

async function new_qresult(qresult) {
  const {qmodel_id, user_id, review_of_id, review_of_name, survey_result} = qresult;
  return new Promise(function(resolve, reject){
    axios.post('/api/qresult', {
      qmodel_id, user_id, review_of_id, review_of_name, survey_result
    }).then(function(res) {
      resolve(res);
    }).catch(function(err){
      reject(err);
    });
  });
}

async function get_qresult_by_id(id) {
  return new Promise(function(resolve, reject){
    axios.get('/api/qresult',{
      params: {
        id: id
      }
    }).then(function(res) {
      let qresults = res.data.qresult;
      resolve(qresults);
    }).catch(function(err) {
      reject(err);
    });
  });
}

async function get_qresults_by_user_id(user_id) {
  return new Promise(function(resolve, reject){
    axios.get('/api/qresult',{
      params: {
        user_id: user_id
      }
    }).then(function(res) {
      let qresults = res.data.qresult;
      resolve(qresults);
    }).catch(function(err) {
      reject(err);
    });
  });
}

async function get_qresults_by_review_of_id(review_of_id) {
  return new Promise(function(resolve, reject){
    axios.get('/api/qresult',{
      params: {
        review_of_id: review_of_id
      }
    }).then(function(res) {
      let qresults = res.data.qresult;
      resolve(qresults);
    }).catch(function(err) {
      reject(err);
    });
  });
}
export { new_qresult, get_qresult_by_id, get_qresults_by_user_id, get_qresults_by_review_of_id };