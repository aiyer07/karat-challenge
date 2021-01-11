export default function globalTP() {
  return {
    Query: {
      fields: {
        transactionAuthorizations: {
          keyArgs: [],
          merge(existing = [], incoming: any[]) {
            return [...existing, ...incoming]
          }
        }
      },
    },
  };
}
