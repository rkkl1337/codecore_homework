
exports.up = function(knex, Promise) {
    return knex.schema.createTable("cohorts", t => {
        t.increments("id");
        t.string("name");
        t.text("members");
        t.text("logoUrl");
        t.timestamp("createdAt").defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("cohorts");
};
