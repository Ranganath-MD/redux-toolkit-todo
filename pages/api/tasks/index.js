import { faunaClient, q } from "lib/faunadb";

export default async function tasks(req, res) {
  if (req.method === "GET") {
    let query = await faunaClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("tasks"))),
        q.Lambda((task) => q.Get(task))
      )
    );
    res.status(200).send({ data: query.data });
  }
  if (req.method === "POST") {
    const query = await faunaClient.query(
      q.Create(
        // iterate each item in result
        q.Collection("tasks"),
        {
          data: { title: req.body.title },
        }
      )
    );
    res
      .status(200)
      .send({ message: "Task added successfully", task: query.data });
  }
}
