import axios from 'axios';

async function post_review(review,token) {
  return new Promise((resolve, reject) => {
    axios.post('/api/review', {
      review_type: review.type,
      review_of: review.of,
      review_body: "empty for now",
      review_user: review.user,
      rating: review.rating,
      
    }, {
      headers: {
        authtoken: token
      }
    })
    .then((res) => {
      resolve(res.status);
    })
    .catch((err) => {
      reject(err);
    })
  });
}

async function get_review(query, token) {
  return new Promise((resolve, reject) => {
    axios.get('api/review', {
      
    })
  })
}


export { post_review };

