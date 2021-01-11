import moment from 'moment'

export default function transactionAuthorizations() {
  return {
    transaction_authorizations: {
      fields: {
        createdTs: {
          read(createdTs: number): string {
            return moment(createdTs * 1000).format('MMM Do, h:mm:ss a')
          }
        },
        amount: {
          read(amount: number): string {
            if (!amount) return '-'
            const dollarAmount: number = (amount / 100)
            return dollarAmount.toLocaleString("en-US", {style:"currency", currency:"USD"});
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
