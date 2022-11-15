import { faunaClient, q } from "lib/faunadb";

export default async function getTask(req, res) {
  const { id } = req.query;

  try {
    const task = await faunaClient.query(
      q.Get(q.Ref(q.Collection('tasks'), id))
    );
    res.status(200).json(task.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
