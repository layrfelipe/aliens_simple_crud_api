const express = require("express");
const alien = require("../models/alien");
const router = express.Router();

const Alien = require("../models/alien");

router.get("/", async (req, res) => {
    try {
        const aliens = await Alien.find();
        return res.json(aliens);
    } catch(err){
        res.send({ error: "Error on saving alien!"});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);
        return res.json(alien);
    } catch(err){
        res.send({ error: "Error on getting alien!"});
    }
});

router.post("/", async (req, res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub, 
    });

    try {
        const registered = await alien.save();
        res.json(registered);
    } catch(err){
        res.send({ error: "Error on creating alien!"});
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);

        if(!alien) return res.send({ error: "Alien not found"});

        alien.sub = req.body.sub;
        const registered = await alien.save();
        res.json(registered);
    }catch (err) {
        res.send({ error: "Error on updating alien!"});
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);

        if(!alien) return res.send({ error: "Alien not found"});

        await alien.delete();
        res.send({ success: "Alien deleted!"})
    }catch (err) {
        res.send({ error: "Error on deleting alien!"});
    }
})


module.exports = router;