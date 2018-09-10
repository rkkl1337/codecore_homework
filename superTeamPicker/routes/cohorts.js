const express = require("express");
const router = express.Router();
const knex = require("../db/client");

router.get("/new", (request, response) => {
    response.render("./cohorts/new");
});

router.get("/", (request, response) => {
    knex("cohorts")
    .orderBy("createdAt", "desc")
    .then(cohorts => {
        response.render("./cohorts/index", {cohorts});
    });
})

router.post("/", (request, response) => {
    const { name, members, logoUrl } = request.body;
    knex("cohorts")
    .insert({
        name,
        members,
        logoUrl
    })
    .returning("id")
    .then(([id]) => {
        response.redirect(`/cohorts/${id}`);
    });
})

router.get("/:id", (req, res) => {
    const { id } = req.params;  
    const { method, quantity } = req.query;

    knex("cohorts")
      .where("id", id)
      .first()
      .then(cohort => {
        let arr = cohort.members.split(", ");
        for (let i = 0 ; i < arr.length; i += 1) {
            let temp = ` ${arr[i]}`;
            let random = Math.floor(Math.random() * arr.length);
            arr[i] = ` ${arr[random]}`;
            arr[random] = temp;
        };
        console.log(arr);
        let result = [];
        if (quantity > 0 && method === "count") {
            while (arr.length > 0) {
                result.push(arr.splice(0, quantity));
            }
        } else if (quantity > 0 && method === "team") {
            let teamCount = Math.ceil(arr.length / quantity);
            while (arr.length > 0) {
                result.push(arr.splice(0, teamCount));
            }
        }
        
        res.render("cohorts/show", { cohort, result }, );
      });
  });

  router.delete("/:id", (req, res) => {
    const { id } = req.params;
  
    knex("cohorts")
      .where("id", id)
      .del()
      .then(() => {
        res.redirect("/cohorts");
      });
  });

  router.get("/:id/edit", (req, res) => {
      const { id } = req.params;
      knex("cohorts")
        .where("id", id)
        .first()
        .then(cohort => {
            res.render("cohorts/edit", { cohort });
        });
  });

  router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { name, members, logoUrl } = req.body;
  
    knex("cohorts")
      .where("id", id)
      .update({
        name,
        members,
        logoUrl
      })
      .then(() => {
        res.redirect(`/cohorts/${id}`);
      });
  });
module.exports = router;

// knex('posts').then(renderSomeThing)

// function renderSomeThing(someParam) {
//     render('index', { posts: someParam })
// }