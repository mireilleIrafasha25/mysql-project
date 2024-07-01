import express from "express";
import {getNote,getNotes,createNote,deleteNote,updateNote} from "./database.js";
const app = express();

app.use(express.json());

app.use((err,req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
})
app.post("/createNote",async(req,res) =>{
    const {title,contents} = req.body;
    const new_note=await createNote(title,contents);
  res.status(201).send(new_note);
})
app.get("/notes", async(req, res) => {
    const notes=await getNotes();
  res.send(notes);
});
app.get("/note/:id", async(req, res) => {
    const id=req.params.id;
    const note=await getNote(id);
  res.send(note);
});
app.delete("/delete/:id", async(req, res) => {
    const id=req.params.id;
    const note=await deleteNote(id);
  res.send(note);
})

app.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const { title, contents } = req.body;
  
    try {
      const result = await updateNote(id, title, contents);
      if (result.affectedRows === 0) {
        res.status(404).send({ message: `Note with id ${id} not found.` });
      } else {
        res.send({ message: "Note updated successfully.", result });
      }
    } catch (error) {
      res.status(500).send({ message: "Error updating note.", error });
    }
  });


app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

export default app;
