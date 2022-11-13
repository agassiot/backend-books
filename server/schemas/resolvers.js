var { AuthenticationError } = require('apollo-server-express');
var { User, Book } = require('../models');
var { signToken } = require('../utils/auth');

//nearly identical to unit 21 activity 25
var resolvers = {

    Query: {
        me: async (parent, args, context) => context.user ? Profile.findOne({ _id: context.user._id }) : new AuthenticationError('login!')

   },

    Mutation: {
        
        addUser: async (parent, { username, email, password }) => {
            let user = await User.create({ username, email, password });
            let token = signToken(user);
            return { token, user };
          },

        login: async (parent, { email, password }) => {
           let user = await User.findOne({ email });
            if(!user) throw new AuthenticationError('No user found with this email address');
     
           let auth = await user.isCorrectPassword(password);
            if(!auth) throw new AuthenticationError('Incorrect credentials');
           
           let token = signToken(user);
            return { token, user };
         },

         saveBook: async (parent, args, context)=>{
            if(context.user){
              return User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: {
    savedBooks: { bookId: args.bookId, authors: args.authors, title: args.title, description: args.description, image: args.image, link: args.link }
                  }},
                { new: true, runValidators: true });
            }
            throw new AuthenticationError('You need to be logged in!');
          },

          removeBook: async(parent, {bookId}, context) =>{
            if(context.user){
              return User.findOneAndUpdate(
                {_id: context.user._id},
                { $pull: {savedBooks: { bookId }}},
                {new: true,}
              );
            }
            throw new AuthenticationError('You need to be logged in!');
          }
   }
};