var rp = require("request-promise");
const wpSiteLocation = process.env.wpSiteLocation;

exports.handler = async event => {
  const headers = {
    "Access-Control-Allow-Origin": "*"
  };

  const sortParamsHeader = event.headers["sort-params"];
  const filterParamsHeader = event.headers["filter-params"];

  if (sortParamsHeader) {
    var sortParams = `?${sortParamsHeader}`;
  } else sortParams = "";

  if (filterParamsHeader) {
    if (sortParamsHeader) {
      var filterParams = `&${filterParamsHeader}`;
    } else {
      filterParams = `?${filterParamsHeader}`;
    }
  } else filterParams = "";

  return rp(`${wpSiteLocation}/wp-json/wp/v2/posts${sortParams}${filterParams}`)
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
