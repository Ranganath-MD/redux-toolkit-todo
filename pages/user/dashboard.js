import React, { useRef } from "react";
import {
  useAddTaskMutation,
  useGetTasksQuery,
} from "store/services/tasks";
import { Header } from "component/Header";
import { ListItem } from "component/ListItem";

export default function DashBoard() {
  const ref = useRef();
  const [addTask, { isLoading: isAdding }] = useAddTaskMutation();
  const { data, isLoading } = useGetTasksQuery("tasks");

  const handleScroll = () => {
    console.log(ref.current);
    ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  };

  return (
    <>
      <div className="dashboard__container">
        <Header />

        <Input addTask={addTask} handleScroll={handleScroll} />

        <div className="list" ref={ref}>
          {isLoading && <p>...loading</p>}

          {data?.data.length === 0 && !isLoading ? <p>No Tasks Found</p> : null}

          {data?.data?.map((task) => (
            <ListItem
              key={task.ref["@ref"].id}
              id={task.ref["@ref"].id}
              title={task.data.title}
            />
          ))}

          {isAdding && (
            <ListItem key={"loading"} title={"LOADING..."} readOnly />
          )}
        </div>
      </div>
    </>
  );
}

const Input = ({ addTask, handleScroll }) => {
  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!ref.current.task.value) return;
    const task = {
      title: ref.current.task.value,
    };

    addTask(task);
    handleScroll();
    ref.current.reset();
  };

  return (
    <form onSubmit={handleSubmit} ref={ref} className="add__task">
      <input type="name" placeholder="Add tasks" name="task" />
    </form>
  );
};
