import moment from 'moment'

export default function cards() {
  return {
    cards: {
      fields: {
        totalSpend: {
          read(totalSpend: number): string {
            if (!totalSpend) return '-'
            const dollarAmount: number = (totalSpend / 100)
            return dollarAmount.toLocaleString("en-US", {style:"currency", currency:"USD"});
          }
        },
        avgSpend: {
          read(avgSpend: number): string {
            if (!avgSpend) return '-'
            const dollarAmount: number = (avgSpend / 100)
            return dollarAmount.toLocaleString("en-US", {style:"currency", currency:"USD"});
          }
        }
      },
    },
  };
}
