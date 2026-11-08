
const express = require("express");

const app = express();
const PORT = 5000;


app.use(express.json());


const notes = [];


app.get("/notes", (req, res) => {
    res.json(notes);
});


app.post("/notes", (req, res) => {
    const { title, content } = req.body;


    if (
        typeof title !== "string" ||
        !title.trim() ||
        typeof content !== "string" ||
        !content.trim()
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newNote = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date().toISOString().split("T")[0]
    };

    notes.push(newNote);

    res.status(201).json({
        message: "Note created successfully",
        note: newNote
    });
});

app.get("/notes/:id", (req, res) => {
    const id = Number(req.params.id);

    const note = notes.find((n) => n.id === id);

    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    res.json(note);
});

app.put("/notes/:id", (req, res) => {
    const id = Number(req.params.id);

    const note = notes.find((n) => n.id === id);

    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    const { title, content } = req.body;

    if (
        typeof title !== "string" ||
        !title.trim() ||
        typeof content !== "string" ||
        !content.trim()
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    note.title = title.trim();
    note.content = content.trim();

    res.json({
        message: "Note updated successfully",
        note: note
    });
});

app.delete("/notes/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = notes.findIndex((n) => n.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    notes.splice(index, 1);

    res.json({
        message: "Note deleted successfully"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
