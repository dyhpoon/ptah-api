'use strict';

const _ = require('lodash');
const ObjectID = require("bson-objectid");

const findLandings = require('./helpers/find-landings');
const updateLandingData = require('./helpers/update-landing-data');
const deletePublishedLanding = require('./helpers/delete-published-landing');
const getDbCollection = require('../utils/get-db-collection');

module.exports = async (ctx, next) => {
    const id = ctx.params.id;
    let data = {};
    try {
        const landings = await findLandings(ctx, [id]);
        const landing = landings[0];
        if (landing) {

            // remove published landing (and external domain config too), if exists
            deletePublishedLanding(id);

            data = updateLandingData(ctx, landing, {
                isPublished: false
            });

            const collection = getDbCollection(ctx);

            await collection.updateOne({_id: ObjectID(id)}, {$set: data});
        }
    } catch (err) {
        throw err
    }

    ctx.status = 200;
    ctx.body = _.omit(data, 'landing');
    next();
};
