import moment from 'moment'

export default function transactionAuthorizations() {
  return {
    transaction_authorizations: {
      fields: {
        createdTs: {
          read(createdTs: number): string {
            return moment(createdTs).format('MM d')
          }
        },
        amount: {
          read(amount: number): number {
            return Math.floor(amount / 100)
          }
        },
        merchantCategory: {
          read(merchantCategory: string): string {
            return merchantCategory
            .split('_')
            .map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
            .join(' ')
          }
        }
      },
    },
  };
}
