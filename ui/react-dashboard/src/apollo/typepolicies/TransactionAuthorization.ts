import moment from 'moment'

export default function transactionAuthorizations() {
  return {
    transaction_authorizations: {
      fields: {
        createdTs: {
          read(createdTs: number): string {
            return moment(createdTs).format('MMM d')
          }
        },
        amount: {
          read(amount: number): string {
            const dollarAmount: number = Math.floor(amount / 100)
            return dollarAmount < 0 ? `-$${Math.abs(dollarAmount)}` : `$${dollarAmount}`
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
