import User from "../models/User.js";
import jwt from "jsonwebtoken";

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (_, { id }) => {
      return await User.findById(id);
    },
  },
  Mutation: {
    createUser: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      const user = new User({ firstName, lastName, username, email, password });
      const token = jwt.sign({ id: user._id }, "MY_SECRET_KEY"); // TODO: ADD SECRET KEY TO .env File
      await user.save();
      return { user, token };
    },
  },
};

export default resolvers;
