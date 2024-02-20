exports.up = function (knex) {
    return knex.schema.createTable('interns', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('address').notNullable();
        table.date('dob').notNullable();
        table.boolean('selectionStatus').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('interns');
};