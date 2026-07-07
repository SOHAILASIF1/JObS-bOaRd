import { connectDB } from "@/lib/dbConnection";
import Image from "next/image";

export default function Home() {
  connectDB()
  return (
    <div>
      hi
    </div>
  );
}

// mongodb+srv://sohail:sohail786@cluster0.wqnr3vh.mongodb.net/