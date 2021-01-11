export default function globalTP() {
  return {
    Query: {
      fields: {
        transactionAuthorizations: {
          keyArgs: [],
          merge(existing = [], incoming: any[]) {
            console.log("🚀 ~ file: Global.ts ~ line 8 ~ merge ~ incoming", incoming)
            return [...existing, ...incoming]
          }
        }
      },
    },
  };
}
