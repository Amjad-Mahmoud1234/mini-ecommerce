import app from './app.js';
import prisma from "./config/db.js";

const PORT = process.env.PORT || 3000;

async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

checkDatabaseConnection();
