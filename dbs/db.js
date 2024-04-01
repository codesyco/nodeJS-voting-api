import mongoose from "mongoose";

export const db = () => {
    mongoose
        .connect("mongodb://127.0.0.1:27017/voting")
        .then(() => console.log("DB Connected established"))
        .catch((err) => console.log("Check your connection for ", err.message
    ));
}