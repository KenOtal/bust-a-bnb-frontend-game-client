import * as crypto from 'crypto'
import { v4 as uuid } from 'uuid'

export class AccountHelper {
    static createHash() {
        const original = uuid()
        const hash = crypto
            .createHash('sha256')
            .update(original)
            .digest('base64')
        return hash
    }
}
