

export default class EchosApi {
 
    baseUrl = "https://api.neutral-server.com"
    api_key = ""

    constructor(api_key) {
        this.api_key = api_key
    }

    async getAccounts()
    {
        const response = await fetch(`${this.baseUrl}/api/accounts`, {
            headers: {
                "Authorization": `${this.api_key}`
            }
        })

        return response.json()
    }

    async getFuelTypes()
    {
        const response = await fetch(`${this.baseUrl}/api/global/fuel_types`, {
            headers: {
                "Authorization": `${this.api_key}`
            }
        })

        return response.json()
    }

    async getFleets( account_id )
    {
        const response = await fetch(`${this.baseUrl}/api/accounts/${account_id}/fleets`, {
            headers: {
                "Authorization": `${this.api_key}`
            }
        })

        return response.json()
    }

    async getPrivacyKeys(accountId){

        let keys = [];
            
        const response = await fetch(`${this.baseUrl}/api/accounts/${accountId}/privacy_key`, {
            headers: {
                "Authorization": `${this.api_key}`
            }
        })
        keys = await response.json()

        keys.forEach(key => {
            let now = +new Date()
            key.exp_date = new Date(key.expiredAt).toISOString()        
            key.expired = now > key.expiredAt
        })

        return keys;
        
    }

    
}