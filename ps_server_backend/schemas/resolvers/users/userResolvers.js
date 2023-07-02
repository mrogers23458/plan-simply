import User from "../../../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userResolvers = {
  Query: {
    me: async (_, __, { token }) => {
      if (token) {
        const validToken = await jwt.verify(token, "PS_JWT_SECRET_KEY");
        const user = await User.findById(validToken.id).populate("todos");
        return user;
      }
    },
    users: async () => {
      return await User.find({}).populate("todos");
    },
    user: async (_, { id }) => {
      return await User.findById(id).populate("todos");
    },
  },

  Mutation: {
    createUser: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      const user = new User({ firstName, lastName, username, email, password });
      const token = jwt.sign({ id: user._id }, "PS_JWT_SECRET_KEY", {
        expiresIn: "3h",
      }); // TODO: ADD SECRET KEY TO .env File
      await user.save();
      return { user, token };
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ username: username });
      if (!user) {
        throw new Error("No user found with this username.");
      }
      const validPass = await bcrypt.compare(password, user.password);
      if (user && validPass) {
        const token = await jwt.sign(
          { id: user._id, username: user.username, password: user.password },
          "PS_JWT_SECRET_KEY",
          {
            expiresIn: "3h",
          }
        ); // TODO: ADD SECRET KEY TO .env File
        return { user, token };
      }
      if (user && !validPass) {
        throw new Error("Passwords do not match!");
      }
    },
  },
};

export default userResolvers;
