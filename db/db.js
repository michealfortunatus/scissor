import  mongoose from "mongoose"
import {config} from "../config/config.js"


const MONGODB_URI= config.mongodb.url

function connectToMongoDB() {

	mongoose.connect(MONGODB_URI);

    mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB successfully');
        });
    
     mongoose.connection.on('error', (err) => {
            console.log('Error connecting to MongoDB', err);
        })
    }
    
    
    export {connectToMongoDB};
		