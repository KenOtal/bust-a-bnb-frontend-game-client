import axios, { AxiosResponse } from 'axios'
import { REPORTS_SERVICE_URL } from '../constants/constants'

const reportService = {
    getEvents: async (roundNumber: string): Promise<AxiosResponse> => {
        const res = await axios.get(`${REPORTS_SERVICE_URL}/${roundNumber}`)
        return res
    },
}

export default reportService
