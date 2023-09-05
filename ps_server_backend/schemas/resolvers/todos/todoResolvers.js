/* Tools */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/* Models  */
import User from "../../../models/User.js";
import ToDo from "../../../models/ToDo.js";

export const todoResolvers = {
  Query: {},
  Mutation: {
    /* creates a new todo, and adds it to the current user */
    createToDo: async (_, { title, description, dueDate }, { token }) => {
      const validToken = await jwt.verify(token, process.env.PS_JWT_SECRET_KEY);
      if (!validToken) {
        throw new Error("Your session has expired, please login again");
      }
      if (validToken) {
        const todo = await ToDo.create({ title, description, dueDate });
        const user = await User.findByIdAndUpdate(
          validToken.id,
          { $push: { todos: todo._id } },
          { new: true }
        ).populate("todos");

        return { user, todo };
      }
    },

    /* updates completed status on todo */
    updateCompleted: async (_, { completed, id }, { token }) => {
      const validToken = await jwt.verify(token, process.env.PS_JWT_SECRET_KEY);
      if (!validToken) {
        throw new Error("Your session has expired, please login again");
      } else {
        const todo = await ToDo.findById(id);
        todo.completed = completed;
        todo.save();
        return todo;
      }
    },

    editTodo: async (_, { id, title, description, dueDate }, { token }) => {
      const validToken = await jwt.verify(token, process.env.PS_JWT_SECRET_KEY);
      if (!validToken) {
        throw new Error("Your session has expired, please login again");
      } else {
        const todo = await ToDo.findById(id);
        todo.title = title;
        (todo.description = description), (todo.dueDate = dueDate);
        todo.save();
        const user = await User.findById(validToken.id).populate("todos");
        return { user, todo };
      }
    },

    deleteTodo: async (_, { id }, { token }) => {
      const validToken = await jwt.verify(token, process.env.PS_JWT_SECRET_KEY);
      if (!validToken) {
        throw new Error("Your session has expired, please login again");
      } else {
        await ToDo.deleteOne({ _id: id });
        const user = await User.findById(validToken.id).populate("todos");
        return { todo: {}, user: user };
      }
    },
  },
};
