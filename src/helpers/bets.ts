export class BetsHelper {
    static parseAmount(amount: string): string {
        const dotIntex = amount.indexOf('.')

        if (dotIntex >= 0) {
            const lengthDot = amount.substring(dotIntex + 1).length
            return `${amount.replace('.', '')}${'0'.repeat(18 - lengthDot)}`
        }

        return amount + '0'.repeat(18)
    }

    static uparseAmount(amount: string): string {
        const dotPosition = amount.length - 18
        const afterDotAmount = amount.substring(dotPosition, amount.length)
        let findedIndex = Array.from(afterDotAmount)
            .reverse()
            .findIndex(x => x !== '0')
        findedIndex =
            findedIndex === -1 ? 2 : afterDotAmount.length - findedIndex
        let returnAmount = `${amount.substring(
            0,
            dotPosition
        )}.${afterDotAmount.substring(0, findedIndex)}`

        if (amount.length < 19) {
            returnAmount = `0.${'0'.repeat(
                18 - amount.length
            )}${returnAmount.substring(1)}`
        }
        return returnAmount
    }

    static calculatePlayersWinnings(
        amount: string,
        exitMultiplier: number
    ): string {
        const [integer, decimal] = exitMultiplier.toString().split('.')

        let fix = 1
        let multiplier = integer

        if (decimal) {
            fix = 10 ** decimal.length
            multiplier = `${integer}${decimal}`
        }

        const result = (BigInt(amount) * BigInt(multiplier)) / BigInt(fix)

        return result.toString()
    }
}
