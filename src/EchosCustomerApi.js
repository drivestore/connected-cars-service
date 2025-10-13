

export default class EchosCustomerApi {
    baseUrl = "https://api.neutral-server.com"
    privacyKey = ""

    constructor(privacyKey , accountId ) {
        this.privacyKey = "Privacykey " + privacyKey
        this.accountId = accountId
    }

    async getVehicles() {
        const response = await fetch(`${this.baseUrl}/api/accounts/${this.accountId}/assets`, {
            headers: {
                "Authorization": this.privacyKey
            }
        })
        return response.json()
    }

    async getFleets() {
        const response = await fetch(`${this.baseUrl}/api/customer/fleets`, {
            headers: {
                "Authorization": `Privacykey ${this.privacyKey}`
            }
        })
        return response.json()
    }
}