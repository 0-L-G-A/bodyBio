# bodyBio backend

///////////////////////////////////////
START DATABASE
brew services start mysql
brew services restart mysql
brew services stop mysql
mysql -u root -p

///////////////////////////////////////
START BACKEND APP
npm run start:dev

///////////////////////////////////////
GENERATING NEST MODULES
nest g module users
nest g controller users/controllers/users
nest g service users/services/users

///////////////////////////////////////
DOCKER: DELETE existing network, image, container
docker stop mysql-container body-bio
docker rm mysql-container body-bio
docker rmi mysql:latest body-bio-image
docker network rm body-bio-network

///////////////////////////////////////
DOCKER: create network, image, container

docker network create body-bio-network

docker run --name mysql-container \
 --network body-bio-network \
 -e MYSQL_ROOT_PASSWORD='' \
 -e MYSQL_DATABASE=body_bio \
 -p 3306:3306 \
 -d mysql:latest

docker build -t body-bio-image .

docker run --name body-bio \
 --network body-bio-network \
 -p 3000:3000 \
 -e DATABASE_HOST=mysql-container \
 -e DATABASE_PORT=3306 \
 -e DATABASE_USERNAME=root \
 -e DATABASE_PASSWORD= \
 -e DATABASE_NAME=body_bio \
 -e API_SECRET_KEY='' \
 -e PORT=3000 \
 -d body-bio-image

///////////////////////////////////////
DOCKER: checking
docker logs mysql-container
docker logs body-bio
http://localhost:3000/users

///////////////////////////////////////
DOCKER: update after changes in app (without database)

docker stop body-bio

docker rm body-bio

docker build -t body-bio-image .

docker run --name body-bio \
 --network body-bio-network \
 -p 3000:3000 \
 -e DATABASE_HOST=mysql-container \
 -e DATABASE_PORT=3306 \
 -e DATABASE_USERNAME=root \
 -e DATABASE_PASSWORD= \
 -e DATABASE_NAME=body_bio \
 -e API_SECRET_KEY='' \
 -e PORT=3000 \
 -d body-bio-image

///////////////////////////////////////
DOCKER: update after changes in app with database

docker stop body-bio
docker rm body-bio
docker build -t body-bio-image .
docker run --name body-bio \
 --network body-bio-network \
 -p 3000:3000 \
 -e DATABASE_HOST=mysql-container \
 -e DATABASE_PORT=3306 \
 -e DATABASE_USERNAME=root \
 -e DATABASE_PASSWORD= \
 -e DATABASE_NAME=body_bio \
 -e API_SECRET_KEY='' \
 -e PORT=3000 \
 -d body-bio-image

///////////////////////////////////////
RAILWAY:
https://mbbioprod.up.railway.app/users




// відповідь юзера на логін чи реєстрацію
const users = [
    {
        "name": "Admin",
        "surname": "Adminovych",
        "role": "super_admin",
        "email": "@gmail.com",
        "contactNumber": "+38",
        "insuranceId": "ins1dor",
        
        "id": "a",
        "createdAt": "2024-10-08T15:36:17.875Z",
        "isAlive": true,
        "sex": "male"
        "patientsIds": [],
        "doctorsIds": [],
        "adminsIds": [],
        "trustPersonsIds": [],
    },
]

//перший запит
const bodySystems: BodySystem[] = [
    {
        "id": "d181b406-a160-4518-802d-fff7f956d196",
        "name": "Сімейна медицина",
        "nameKey": "familyMedicine",
        "level": 0,
        "doctorsSpecializations": [
            {
                "id": "2a5a7512-4c05-4672-8e49-83174c9eb8dc",
                "name": "Педіатр",
                "nameKey": "pediatrician"
            },
            {
                "id": "c4442a71-a21d-4f32-b92a-bf36746ec746",
                "name": "Терапевт",
                "nameKey": "generalPractitioner"
            },
            {
                "id": "f992217e-eaf2-4355-8760-172c654e78ab",
                "name": "Сімейний лікар",
                "nameKey": "familyDoctor"
            }
        ],
        "laboratories": [
            {
                "id": "56845e93-b975-4071-86f0-7a07e6007b06",
                "name": "Аналізи крові",
                "nameKey": "bloodCountcs",
                "level": 1
            },
            {
                "id": "fee23b05-384a-4b6c-8a5d-0d83c9b433de",
                "name": "Загальний аналіз крові",
                "nameKey": "сompleteBloodCountc",
                "level": 2
            }
        ],
        "findings": [
            {
                "id": "3cce31db-ece1-44c0-a116-14ffb0c7fe32",
                "name": "Інші симптоми",
                "nameKey": "otherSymptoms",
                "level": 1
            },
            {
                "id": "5cf7f4ad-a08f-47a1-aca7-ba08a60f49db",
                "name": "Втома",
                "nameKey": "fatigue",
                "level": 2
            },
        ],
        "diagnozes": [
            {
                "id": "54673ad2-a612-49c6-b8fb-39724dbf2619",
                "name": "Алергічний риніт",
                "nameKey": "allergicRhinitis",
                "level": 2
            },
            {
                "id": "c42b59e8-0995-4dcf-9681-e5668fad63a6",
                "name": "Респіраторні захворювання",
                "nameKey": "respiratoryDiseases",
                "level": 1
            }
        ]
    }
]

// запит всіх лобораторі (батьківських і дочірниіх) по бадіСистемІд після відкриття потрітрібної баді систем
const laboratory: Laboratory[] = //ідентично до діагнозів

// запит всіх симптомів (батьківських і дочірниіх) по бадіСистемІд після відкриття потрітрібної баді систем
const findings:Finding[] = //ідентично до діагнозів

// запит всіх діагнозів (батьківських і дочірниіх) по бадіСистемІд після відкриття потрітрібної баді систем
const diagnozes:Diagnoze[] = [
    {
        "parentId": "c42b59e8-0995-4dcf-9681-e5668fad63a6",
        "id": "6b434eaa-7e79-47fd-b2a9-928548e8e965",
        "name": "Грип чи ГРВІ",
        "nameKey": "influenza",
        "level": 2,
        "bodySystemId": "d181b406-a160-4518-802d-fff7f956d196",
        "children": []
    },
    {
        "parentId": null,
        "id": "c42b59e8-0995-4dcf-9681-e5668fad63a6",
        "name": "Респіраторні захворювання",
        "nameKey": "respiratoryDiseases",
        "level": 1,
        "bodySystemId": "d181b406-a160-4518-802d-fff7f956d196",
        "children": [
            {
                "id": "6b434eaa-7e79-47fd-b2a9-928548e8e965",
                "name": "Грип чи ГРВІ",
                "nameKey": "influenza",
                "level": 2
            },
        ]
    }
]

// окремий запит
const doctorSpecialization:any[] = [
    {
        "id": "f992217e-eaf2-4355-8760-172c654e78ab",
        "name": "Сімейний лікар",
        "nameKey": "familyDoctor",
        "bodySystem": {
            "id": "d181b406-a160-4518-802d-fff7f956d196",
            "name": "Сімейна медицина",
            "nameKey": "familyMedicine",
            "level": 0
        }
    }
]
