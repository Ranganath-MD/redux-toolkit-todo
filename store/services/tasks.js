import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),

    addTask: builder.mutation({
      query: (body) => {
        return {
          url: "/tasks",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Tasks"]
    }),

    deleteTask: builder.mutation({
      query: (id) => {
        return {
          url: `/tasks/${id}/delete`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation } =
  tasksApi;
