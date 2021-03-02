const axios = require("axios");

require("dotenv").config();
const port = process.env.PORT || 8000;

exports.apiHandler = async (user, path) => {
  const data = "";

  const config = {
    method: "post",
    url: `http://localhost:${port}/api/${path}/${user._id}`,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDM3OGI5MDg0Y2MzZGQ5ZTQ2OTdmZTQiLCJfcm9sZSI6MSwiaWF0IjoxNjE0MzI3ODc1fQ.s2I6X98orDDsx7XhVYNPRt4vLnEI3CiEAHUU7A8ot1Q",
    },
    data: data,
  };

  const response = await axios(config);
  const result = await JSON.stringify(response.data._id);
  return result;
};
