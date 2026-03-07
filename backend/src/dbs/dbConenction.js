import mongoos from "mongoose"


const connectDB= async()=>{
           try {
            const ConnectedDB= await mongoos.connect(`${process.env.MONGO_URL}`)
            console.log("DB is conencted successfully ",connectDB );
           } catch (error) {
            console,log("Connection to DB is Failed",error);
            throw error
           }
} 

export default connectDB;