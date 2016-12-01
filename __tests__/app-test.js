//jest.unMock('../components/app.js');

//causing errors...
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import App from '../components/app.js';

describe("app test", function(){
    it("tests can run", function(){
        expect(true).toEqual(true);
    });

    it("test date method", function(){
        //var appComponent = TestUtils.renderIntoDocument();

        var difference = App.getDateAge("2016-11-19T23:08:14.186Z");
        //console.log(difference);
        expect(difference).toEqual(5);
        //expect(true).toEqual(true);

        //const myApp = require('../components/app.js');
        //expect(myApp.getDateAge("2016-11-19T23:08:14.186Z")).toBe(60);

    });
});

