var rp = require("request-promise");
const wpSiteLocation = process.env.wpSiteLocation;

exports.handler = async event => {
  const headers = {
    "Access-Control-Allow-Origin": "*"
  };

  return rp(`${wpSiteLocation}/wp-json/wp/v2/posts`)
    .then(json => {
      const response = {
        statusCode: 200,
        body: json,
        headers
      };

      return response;
    })
    .catch(err => {
      const error = {
        statusCode: 500,
        body: "Server Error",
        headers
      };

      return error;
    });
};
