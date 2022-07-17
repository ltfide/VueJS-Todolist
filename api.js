const server = require("http");
const fs = require("fs");

const app = server.createServer((req, res) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Content-Type", "application/json");

   if (req.method === "GET" && req.url === "/todolist") {
      res.write(fs.readFileSync("data.json"));
      res.end();
   } else if (req.url === "/todolist" && req.method === "POST") {
      req.addListener("data", (data) => {
         const dataJson = fs.readFileSync("data.json");
         const result = JSON.parse(dataJson.toString());

         const body = JSON.parse(data.toString());

         if (body.todo) {
            result.push({
               id: Math.random(),
               todo: body.todo,
               completed: false,
            });
            fs.writeFileSync("data.json", JSON.stringify(result));
            res.write(fs.readFileSync("data.json"));
         }

         res.end();
      });
   } else if (req.method === "POST" && req.url === "/delete/todolist") {
      req.addListener("data", (data) => {
         const dataJson = fs.readFileSync("data.json", "utf-8");
         const result = JSON.parse(dataJson.toString());

         const body = JSON.parse(data.toString());

         const x = result.filter((ax) => ax.id != body.id);

         fs.writeFileSync("data.json", JSON.stringify(x));
         res.write(fs.readFileSync("data.json"));

         res.end();
      });
   } else {
      res.write("Not Found");
      res.end();
   }
});

app.listen(3000, () => {
   console.log("Server is running on port 3000");
});
