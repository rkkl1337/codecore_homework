const faker = require("faker");
const random = n => Math.ceil(Math.random() * n) + 20;
function names() {
  let team = "";
  for (let i = 0; i < random(10); i += 1) {
    team += `${faker.name.firstName()} ${faker.name.lastName()}, `;
  };
  return team.slice(0, -2);
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .del()
    .then(function () {
      
      // Inserts seed entries
      const cohorts = Array.from({length: 20}).map(() => ({
        name: faker.company.companyName(),
        members: names(),
        logoUrl: faker.image.avatar()
      }));

      return knex("cohorts").insert(cohorts);
    });
};
