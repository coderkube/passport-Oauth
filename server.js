import app from "./app.js";

import connectDb from "./config/database.js";



// * mongodb schema - collection(crud)
connectDb();

app.get("/",(req,res,next)=> {
    res.send(`<h1>Hello 👋</h1>`);
});

//* listen port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
  