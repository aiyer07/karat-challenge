export default function globalTP() {
  return {
    Query: {
      fields: {
        transaction_authorizations: {
          keyArgs: [],
          merge(existing = [], incoming: any[]) {
            return [...existing, ...incoming]
          }
        }
      },
    },
  };
}
