const DateTime = require('./date-time')
export default {
  typeDefs: [
    DateTime.typeDef
  ],
  resolvers: {
    ...DateTime.resolvers
  }
}