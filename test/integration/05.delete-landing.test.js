'use strict';

const path = require('path');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiValidateResponse = require('chai-validate-response');

chai.use(chaiHttp);
chai.use(chaiValidateResponse.default);

const should = chai.should();

const server = require('../../app/app');
const config = require('../../config/config');
const fakes = require('../fakes/fakes');

const routesPrefix = config.routesPrefix + config.landingsRoutesNamespace;

const openapiSchemaPath = path.resolve("./spec/openapi.yaml");

let landingId = '';

describe(`DELETE ${routesPrefix}/{landingId}`, () => {

    before(() => {
        return new Promise((resolve) => {
            chai.request(server)
                .get(`${routesPrefix}`)
                .set('authorization', `Bearer ${fakes.fakeUserAuthToken}`)
                .end((err, res) => {
                    const landing = res.body.landings.pop();
                    landingId = landing._id;
                    resolve();
                });
        });
    });


    it("should return auth error for request without bearer token", (done) => {
        chai.request(server)
            .delete(`${routesPrefix}/${landingId}`)
            .end((err, res) => {
                should.not.exist(err);
                res.status.should.eql(401);
                res.type.should.eql('application/json');
                res.should.to.be.a.validResponse(openapiSchemaPath, `${routesPrefix}/{landingId}`, "delete")
                    .andNotifyWhen(done);
            });
    });


    it("should return bad request error when landing id is invalid", (done) => {
        chai.request(server)
            .delete(`${routesPrefix}/blah-blah-blah`)
            .set('authorization', `Bearer ${fakes.fakeAnotherUserAuthToken}`)
            .end((err, res) => {
                should.not.exist(err);
                res.should.to.be.a.validResponse(openapiSchemaPath, `${routesPrefix}/{landingId}`, "delete")
                    .andNotifyWhen(done);
            });
    });


    it("should return not found when trying to delete landing for another user", (done) => {
        chai.request(server)
            .delete(`${routesPrefix}/${landingId}`)
            .set('authorization', `Bearer ${fakes.fakeAnotherUserAuthToken}`)
            .end((err, res) => {
                should.not.exist(err);
                res.status.should.eql(404);
                res.should.to.be.a.validResponse(openapiSchemaPath, `${routesPrefix}/{landingId}`, "delete")
                    .andNotifyWhen(done);
            });
    });


    it("should return success for authenticated user", (done) => {
        chai.request(server)
            .delete(`${routesPrefix}/${landingId}`)
            .set('authorization', `Bearer ${fakes.fakeUserAuthToken}`)
            .end((err, res) => {
                should.not.exist(err);
                res.status.should.eql(204);
                res.should.to.be.a.validResponse(openapiSchemaPath, `${routesPrefix}/{landingId}`, "delete")
                    .andNotifyWhen(done);
            });
    });


    it("should return not found when requesting deleted landing", (done) => {
        chai.request(server)
            .delete(`${routesPrefix}/${landingId}`)
            .set('authorization', `Bearer ${fakes.fakeUserAuthToken}`)
            .end((err, res) => {
                should.not.exist(err);
                res.status.should.eql(404);
                res.should.to.be.a.validResponse(openapiSchemaPath, `${routesPrefix}/{landingId}`, "delete")
                    .andNotifyWhen(done);
            });
    });


});