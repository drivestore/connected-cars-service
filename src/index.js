import EchosApi from "./EchosAdminApi"
import EchosCustomerApi from "./EchosCustomerApi"
import pool from "./db"


async function job()
{
    console.log("[+] Starting job")
    // load all credentials from the database
    let credentials = await pool.query(`SELECT * FROM sync.connected_cars_credentials`)
    console.log("[+] Fetched " + credentials.rows.length + " credentials")

    for(let row of credentials.rows)
    {
        console.log("[+] Processing vehicle " + row.license_plate + " for branch " + row.brch_id + " and provider " + row.provider)
        let brch_id = row.brch_id
        let provider = row.provider
        let Echos = new EchosCustomerApi(row.credentials.privacy_key, row.credentials.account_id)   
        let vehicles = await Echos.getVehicles()
        console.log("[+] Fetched " + vehicles.length + " vehicles")
        vehicles.forEach(vehicle => {
            pool.query(`INSERT INTO sync.connected_cars_data (brch_id, license_plate, provider, data ,created_at, updated_at) 
                        VALUES ($1, $2, $3, $4 , now_utc() , now_utc() )
                        ON CONFLICT (brch_id, license_plate, provider) DO UPDATE SET data = $4, updated_at = now_utc()
                        `, [brch_id, vehicle.licensePlate, provider, JSON.stringify(vehicle)])
        })
        console.log("[+] Upserted " + vehicles.length + " vehicles")
        
    }

    console.log("[+] Done")

}

while(true)
{
    await job();       
    await new Promise(resolve => setTimeout(resolve, 1000 * 60 * 5 ));
}