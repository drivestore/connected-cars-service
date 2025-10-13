

CREATE TABLE sync.connected_cars_credentials (
    id SERIAL PRIMARY KEY,
    brch_id INT NOT NULL,
    provider VARCHAR(255) NOT NULL,
    credentials JSONB NOT NULL default '{}'
)

insert into sync.connected_cars_credentials values (1, '6487', 'echos',  '{"privacy_key": "8bcd1b37f982482cb4f209c41ad8c4cd" , "account_id": 832 }');


CREATE TABLE sync.connected_cars_data (
    brch_id INT NOT NULL,
    license_plate VARCHAR(50) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    data JSONB NOT NULL default '{}',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (brch_id, license_plate, provider)
)

INSERT INTO sync.connected_cars_data (brch_id, license_plate, provider, data) VALUES (1, '1234567890', 'echos', '{"privacy_key": "8bcd1b37f982482cb4f209c41ad8c4cd" , "account_id": 832 }');