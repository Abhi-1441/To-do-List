const router = require("express").Router()
const { dailyList, customList } = require("../models/Todo");
const _ = require("lodash");

// routes will be here....
router.get("/", async (req, res) => {
    const foundList = await dailyList.find();
    res.render("index", { listTitle: "Daily to-do List", newListItems: foundList });
});

router.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

router.get("/:customListName", async (req, res) => {
    const nList = _.capitalize(req.params.customListName);
    customList.findOne({ name: nList })
        .then(foundList => {
            if (!foundList) {
                console.log("List does not exists");
                console.log(`Creating new List "${nList}" in DB....`);
                const list = new customList({
                    name: nList,
                    items: []
                });
                list
                    .save()
                    .then(() => {
                        res.redirect("/" + nList);
                    })
            }
            else {
                res.render("index", { listTitle: foundList.name + " 's to-do List", newListItems: foundList.items });
            }
        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;