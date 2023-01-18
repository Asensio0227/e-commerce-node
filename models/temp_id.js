import { MongoClient } from 'mongodb';
import {
  ObjectId
} from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$match': {
      'product': new ObjectId('63c85595396d0f7837a4ac09')
    }
  }, {
    '$group': {
      '_id': '$rating', 
      'amount': {
        '$sum': 1
      }
    }
  }
];

const client = await MongoClient.connect(
  '',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db('06-e-commerce-api').collection('reviews');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();