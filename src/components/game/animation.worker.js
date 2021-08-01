/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

self.addEventListener('message', event => {
    const { state, data } = event.data

    if (state === 'ROUND_IN_PROGRESS') {
        const startTicking = startTickNumber => {
            let tickNumber = startTickNumber
            setInterval(() => {
                tickNumber += 1
                const r = 0.00007
                const ms = tickNumber * 20
                const multiplier =
                    // eslint-disable-next-line no-restricted-properties
                    Math.floor(100 * Math.pow(Math.E, r * ms)) / 100
                self.postMessage({ state, multiplier })
            }, 20)
        }

        startTicking(data.tickNumber || 0)
    } else if (state === 'TAKING_BETS') {
        const startCountdown = initialCountdown => {
            let countdown = initialCountdown
            const countdownId = setInterval(() => {
                countdown -= 1
                self.postMessage({ state, countdown })

                if (countdown === 0) {
                    clearInterval(countdownId)
                }
            }, 10)
        }

        startCountdown(data.countdown || 500)
    }
})
