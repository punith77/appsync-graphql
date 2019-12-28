const graphql = require('graphql');
const _ = require('lodash')

const User = require('../model/User')
const Post = require('../model/Post');
const Hobby = require('../model/Hobby')
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull


} = graphql


const UserType = new GraphQLObjectType({

    name: 'User',
    description: 'Documentation for user ...',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find({ userId: parent.id })
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return Hobby.find({ userId: parent.id })
            }
        }
    })


})

const HobbyType = new GraphQLObjectType({
    name: "Hobby",
    description: "Hobby Documentation",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId)
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: "Post",
    description: "Post Type description",
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return Post.findById(parent.userId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "Root Query ...",
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find()
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id)
            }
        },


        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return Hobby.find();
            }
        },
        hobby: {
            type: HobbyType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Hobby.findById(args.id)
            }

        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find();
            }
        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Post.findById(args.id)
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Mutation For adding and updating Objects",
    fields: {
        createUser: {
            type: UserType,
            args: {
                // id: {type: GraphQLID}
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                profession: { type: GraphQLString }
            },
            resolve(parent, args) {

                let user = new User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                })

                user.save();
                return user
            }
        },
        createPost: {
            type: PostType,
            args: {

                comment: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {

                let post = new Post({
                    comment: args.comment,
                    userId: args.userId
                })
                post.save();
                return post
            }
        },


        createHobby: {
            type: HobbyType,
            args: {

                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {

                let hobby = new Hobby({
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                })
                hobby.save();

                return hobby
            }
        },

        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                profession: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                const updateduser = User.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        age: args.age,
                        profession: args.profession
                    }
                }, { new: true })

                return updateduser
            }
        },

        updatePost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                comment: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const updatePost = Post.findByIdAndUpdate(args.id, {
                    $set: {
                        comment: args.comment,
                        userId: args.userId
                    },

                }, { new: true })
                return updatePost
            }

        },
        updateHobby: {
            type: HobbyType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                userId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const updateHobby = Hobby.findByIdAndUpdate(args.id, {
                    $set: {
                        title: args.title,
                        description: args.description,
                        userId: args, userId
                    }
                }, { new: true })
                return updateHobby
            }

        },
        removeUser: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                let removedUser = User.findByIdAndRemove(args.id).exec();
                if (!removedUser) {
                    throw new ("Error")
                }
                else {
                    return removedUser
                }
            }
        },
        removePost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let removedPost = Post / findByIdAndRemove(args.id).exec();
                if (!removedPost) {
                    throw new ('!Error')
                }
                else {
                    return removedPost
                }
            }
        },
        removeHobby: {
            type: HobbyType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let removedHobby = Hobby.findByIdAndRemove(args.id).exec();
                if (!removedHobby) {
                    throw new ("!Error")
                }
                else { return removedHobby }
            }
        }

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})