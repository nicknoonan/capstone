function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function get_domain() {
  return process.env.BHH_DOMAIN_NAME;
  //return "http://localhost:8080";
  //return "http://localhost:3000";
}

export { get_domain };