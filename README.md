## Scissor

This is a fast and simple URL shortener built as a capstone project from <a href="https://altschoolafrica.com/schools/engineering">AltSchool Africa</a>.

## Product Requirements

1. Scisor allows users to shorten URLs by pasting a long URL into the Scissor platform and a shorter URL gets automatically generated. The shortened URL must be designed to be as short as possible, making it easy to share on social media or through other channels.

2. Scissor allows users to also generate and QR codes for the shortened URLs. Users can download the QR code image and use it in their promotional materials or/and on their website. This feature will be implemented using a third-party QR code generator API, which can be integrated into the Scissor platform.

3. Scissor provides basic analytics that allow users to track their shortened URL's performance. Users can see how many clicks their shortened URL has received and where the clicks are coming from. We need to track when a URL is used.

4. Scissor allows users to see the history of links they have created so they can easily find and reuse links they have previously created.

5. The URL should be validated before creating a shortened version of it so as to prevent broken links.
4.	A cache-layer must be implemented to prevent hitting the DB always.
5.	Rate limiting must be implemented
6.  Unit and integration tests should be conducted where possible
7.	Spec and document the API with OpenAPI using https://stoplight.io/



### Set up

- Install [Node.js](https://nodejs.org/en/download/), [MongoDB](https://www.mongodb.com/docs/manual/installation/), [redis](https://github.com/redis/node-redis#installation)
- Install project dependencies
- clone this repo
- update env with example.env
- run `npm run start:dev`


#### How to clone this repo

```sh
git clone https://github.com/adeyinkaoresanya/scissor.git
```

#### Install project dependencies

```sh
npm install
```

#### Update .env with example.env

#### Run a development server

```sh
npm run start:dev
```

### Models
---

#### User
| field        | data_type  | constraints       |
|--------------|------------|-------------------|
|  name        | string     |  required         |
|  email       |  string    |  required         |
|  password    |  string    |  optional         |
|  createdAt |  date        |                   |



#### Url

| field                     | data_type  |constraints    |
| --------------------------| ---------- | --------------|
| urlId                     | string     | required      |
| origUrl                   | string     | required      |
| shortUrl                  | string     | required      |
| clicks                    | number     | required, default: 0 |
| date                      | date       |               |
| QRString                  | string     | required      |
| user                    | ref - User   | required      |


## Usage

### Creating a user

- Route: /register
- Method: POST
- Body

```json
{
"name": "Jane",
"email": "janebakes@gmail.com",
"password": "Janebakes236!"

}
```

Response

```json
{"name":"Jane", 
"email":"janebakes@gmail.com"}

```


### Logging in

- Route: /login
- Method: POST

Body

```json
{
"email": "janebakes@gmail.com",
"password": "Janebakes236!"
}

```

Response

```json
{
  "email": "janebakes@gmail.com",
  "token": { token }
}
```

### Create a short Url

- Route: /create
- Method: POST
- response cookies {token}

Request [Body]

```json
{
 "https://www.dataquest.io/blog/web-scraping-python-using-beautiful-soup/"}

```

Response

```json
{
"urlId": "jxPhc",
"user": new ObjectId("64a2ae1043ef0a3eb98bf6d2"),
"origUrl": "https://www.dataquest.io/blog/web-scraping-python-using-beautiful-soup/",
"shortUrl": "https://scissor-v4pd.onrender.com/by-user/jxPhc",
"clicks": 0,
"date": "03-Jul-2023",
"QRString": "data:image/png;base64,..."
}
```



---



### get all urls shortened by  user

- Route: /by-user
- Method: GET
- response cookies {token}

Response

```json
{ 
"urlId": "jxPhc",
"user": new ObjectId("64a2ae1043ef0a3eb98bf6d2"),
"origUrl": "https://www.dataquest.io/blog/web-scraping-python-using-beautiful-soup/",
"shortUrl": "https://scissor-v4pd.onrender.com/by-user/jxPhc",
"clicks": 0,
"date": "03-Jul-2023",
"QRString": "data:image/png;base64,..."
}
  
```

---


### redirect shortened url

- Route: /by-user/:id
- Method: GET
- response cookies {token}

Response

```json
{"origUrl": "https://www.dataquest.io/blog/web-scraping-python-using-beautiful-soup/",

}
  
```


---


### get QR Code of a shortened url

- Route: /ScanQRCode/:id
- Method: GET
- response cookies {token}

Response

```json
{
 
"QRString": "data:image/png;base64,..."
}
  
```

---


## Contributor
- Adeyinka Oresanya