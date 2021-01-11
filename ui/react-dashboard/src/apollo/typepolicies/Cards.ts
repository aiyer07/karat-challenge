export default function cards() {
  return {
    cards: {
      fields: {
        transactionsByCategory: {
          read(transactionsByCategory: any[]=[]): any[] {
            // transportation_services => Transportation Services
            return transactionsByCategory.map(tbc => {
              let merchantCategory: string = tbc.merchantCategory
              .split('_')
              .map((w: string) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
              .join(' ')
              return {...tbc, merchantCategory}
            })
          }
        },
        totalSpend: {
          read(totalSpend: number): string {
            // -1203 => -$12.03
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
