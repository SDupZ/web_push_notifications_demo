/* Import faunaDB sdk */
const faunadb = require('faunadb');

const q = faunadb.query;

exports.handler = async event => {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  const pushSubscription = JSON.parse(event.body);

  try {
    const response = await client.query(
        q.Create(q.Collection('pushSubscriptions'), { data: pushSubscription })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500, // Improvement: send correct status code in case of 4xx.
      body: "Unable to save push notification",
    };
  }
};
