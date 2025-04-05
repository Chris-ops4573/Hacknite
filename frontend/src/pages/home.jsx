import React from "react";
import {getDatabase} from "firebase/database"
import { app } from "../firebase/firebase";

const db = getDatabase(app)

const Home = () => {
    return(
        <div>Home page</div>
    )
}

export default Home