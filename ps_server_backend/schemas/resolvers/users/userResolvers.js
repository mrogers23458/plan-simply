import User from "../../../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userResolvers = {
  Query: {
    me: async (_, __, { token }) => {
      console.log({ token });
      if (token) {
        console.log({ token });
        const validToken = await jwt.verify(token, "MY_SECRET_KEY");
        const user = await User.findById(validToken.id);
        return user;
      }
    },
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
      const token = jwt.sign({ id: user._id }, "MY_SECRET_KEY", {
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
        const token = await jwt.sign({ id: user._id }, "MY_SECRET_KEY", {
          expiresIn: "3h",
        }); // TODO: ADD SECRET KEY TO .env File
        console.log({ user, token });
        return { user, token };
      }
      if (user && !validPass) {
        throw new Error("Passwords do not match!");
      }
    },
  },
};

export default userResolvers;
