import faunadb from 'faunadb';

export const q = faunadb.query;

export const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});