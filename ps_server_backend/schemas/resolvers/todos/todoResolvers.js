import User from "../../../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ToDo from "../../../models/ToDo.js";

export const todoResolvers = {
  Query: {},
  Mutation: {
    createToDo: async (_, { title, description, dueDate }, { token }) => {
      const validToken = await jwt.verify(token, "MY_SECRET_KEY");
      if (!validToken) {
        throw new Error("Your session has expired, please login again");
      }
      if (validToken) {
        const user = await User.findById(validToken.id);
        const todo = await ToDo.create({ title, description, dueDate });
        user.todos.push(todo._id);
        user.save();
        return todo;
        /* const todo = await ToDo.create({ title, description, dueDate }); */
      }
    },
    updateCompleted: async (_, { completed, id }, { token }) => {
      console.log(completed, id);
      const validToken = await jwt.verify(token, "MY_SECRET_KEY");
      if (!validToken) {
        throw new Error("Your session has expired, please login again");
      }
      if (validToken) {
        console.log("valid token");
        const todo = await ToDo.findById(id);
        todo.completed = completed;
        todo.save();
        console.log(todo);
        return todo;
        /* const todo = await ToDo.create({ title, description, dueDate }); */
      }
    },
  },
};
