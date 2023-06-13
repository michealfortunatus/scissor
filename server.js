const express = require("express")
const app = express()

const db = require("./db/db")

PORT= process.env.PORT



db.connectToMongoDB()

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})

