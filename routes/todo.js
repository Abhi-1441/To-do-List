const router = require("express").Router();
const { dailyList, customList } = require("../models/Todo");
const _ = require("lodash");

// routes
router
  .post("/", (req, res) => {
    const nList = req.body.list;
    const nItem = req.body.newItem;
    const newItem = new dailyList({ item: nItem });
    console.log(`${nList} list updated...`);
    if (nList === "Daily") {
      newItem
        .save()
        .then(() => {
          console.log("Successfully added todo!");
          res.redirect("/");
        })
        .catch((err) => console.log(err));
    }
    else {
      customList.findOne({name:nList})
        .then(foundList => {
          if(!foundList){
            res.redirect("/" + nList);
          }
          foundList.items.push(newItem);
          foundList.save().then(() => {
            res.redirect("/" + nList);
          })
        })
        .catch((err) => console.log(err));
    }
  })
  .post("/delete", async (req, res) => {
    const dItemId = req.body.checkbox;
    const nList = req.body.listType;
    if (nList === "Daily") {
      dailyList.findOneAndRemove({ _id: dItemId })
        .then((Obj) => {
          console.log(`Item "${Obj.item}" has been deleted `);
          res.redirect("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
    else {
      customList.findOneAndUpdate({ name: nList }, { $pull: { items: { _id: dItemId } } })
        .then(() => {
          res.redirect("/" + nList);
        })
        .catch((err) => console.log(err));
    }
  })

module.exports = router;
