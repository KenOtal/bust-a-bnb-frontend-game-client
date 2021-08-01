import { BetsHelper } from './bets'

describe('Bets Helper', () => {
    describe('Given BetsHelper.parseAmount', () => {
        it('should return 100000000000000000000 if it receives a 100', () => {
            const res = BetsHelper.parseAmount('100')
            expect(res).toBe('100000000000000000000')
            expect(BetsHelper.uparseAmount(res)).toBe('100.00')
        })
        it('should return 100550000000000000000 if it receives a 100.55', () => {
            const res = BetsHelper.parseAmount('100.55')
            expect(res).toBe('100550000000000000000')
            expect(BetsHelper.uparseAmount(res)).toBe('100.55')
        })
        it('should return 1020554000000000000000 if it receives a 1020.554', () => {
            const res = BetsHelper.parseAmount('1020.554')
            expect(res).toBe('1020554000000000000000')
            expect(BetsHelper.uparseAmount(res)).toBe('1020.554')
        })
        it('should return 10004400 if it receives a 2000', () => {
            const res = BetsHelper.parseAmount('2000')
            expect(res).toBe('2000000000000000000000')
            expect(BetsHelper.uparseAmount(res)).toBe('2000.00')
        })
        it('should return 10001000000000000000 if it receives a 10.001', () => {
            const res = BetsHelper.parseAmount('10.001')
            expect(res).toBe('10001000000000000000')
            expect(BetsHelper.uparseAmount(res)).toBe('10.001')
        })
        it('should return 80000000000000000008 if it receives a 80.000000000000000008', () => {
            const result = BetsHelper.parseAmount('80.000000000000000008')
            expect(result).toBe('80000000000000000008')
        })
        it('should return 1271699994320000000 if it receives a 1.27169999432', () => {
            const result = BetsHelper.parseAmount('1.27169999432')
            expect(result).toBe('1271699994320000000')
        })
    })

    describe('Given BetsHelper.uparse amount', () => {
        it('1000000000000000000 -> 1.00', () => {
            const result = BetsHelper.uparseAmount('1000000000000000000')
            expect(result).toBe('1.00')
        })
        it('1010000000000000000 -> 1.01', () => {
            const result = BetsHelper.uparseAmount('1010000000000000000')
            expect(result).toBe('1.01')
        })
        it('1250000000000000000 -> 1.25', () => {
            const result = BetsHelper.uparseAmount('1250000000000000000')
            expect(result).toBe('1.25')
        })
        it('1250001000000000000 -> 1.250001', () => {
            const result = BetsHelper.uparseAmount('1250001000000000000')
            expect(result).toBe('1.250001')
        })
        it('51250001000000000000 -> 51.250001', () => {
            const result = BetsHelper.uparseAmount('51250001000000000000')
            expect(result).toBe('51.250001')
        })
        it('0512500010000000000 -> 0.51250001', () => {
            const result = BetsHelper.uparseAmount('0512500010000000000')
            expect(result).toBe('0.51250001')
        })

        it('1500100000000000000001 -> 1500.10000000000000001', () => {
            const result = BetsHelper.uparseAmount('1500100000000000000001')
            expect(result).toBe('1500.100000000000000001')
        })

        it('1 -> 0.000000000000000001', () => {
            const result = BetsHelper.uparseAmount('1')
            expect(result).toBe('0.000000000000000001')
        })

        it('10 -> 0.00000000000000001', () => {
            const result = BetsHelper.uparseAmount('10')
            expect(result).toBe('0.00000000000000001')
        })

        it('100 -> 0.0000000000000001', () => {
            const result = BetsHelper.uparseAmount('100')
            expect(result).toBe('0.0000000000000001')
        })

        it('should return 1000000000000000000 if it receives a 1', () => {
            expect(BetsHelper.uparseAmount('1000000000000000000')).toBe('1.00')
        })

        it('80000000000000000008 -> 80.0000000000000000008', () => {
            const result = BetsHelper.uparseAmount('80000000000000000008')
            expect(result).toBe('80.000000000000000008')
        })
        it('1271699994320000000 -> 1.27169999432', () => {
            const result = BetsHelper.uparseAmount('1271699994320000000')
            expect(result).toBe('1.27169999432')
        })
    })
})
