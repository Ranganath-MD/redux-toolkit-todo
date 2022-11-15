import { faunaClient, q } from "lib/faunadb";

export default async function deleteTask(req, res) {
  const { id } = req.query;
  try {
    await faunaClient.query(q.Delete(q.Ref(q.Collection("tasks"), id)));
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
