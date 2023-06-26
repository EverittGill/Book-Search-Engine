// this is the resolvers file and it is where we will create the functionality for each query type we define in typeDefs.js.

const { AuthenticationError } = require('apollo-server-express');
const { User } = require("../models");
const { signToken } = require("../utils/auth");


// there will be one for query
// there will be four for mutation

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const correctPw = await User.isCorrectPassword(body.password);
      if (!correctPw) {
        return res.status(400).json({ message: "Wrong password!" });
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { user, body }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    },

    removeBook: async (parent, { user, params }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;