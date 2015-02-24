/*jshint unused: false*/
/*jshint undef: false*/
/*jshint expr: true*/
/*jshint maxlen: 1000*/
/*jshint quotmark: false*/

describe('StringUtils', function() {
  var
    _ = require('lodash'),
    sinon = require('sinon'),
    should = require('should'),
    stringUtils = require('../lib/string-utils');

  beforeEach(function() {

  });

  describe('hashCode()', function() {
    it('should return the correct hash code', function() {
      stringUtils.hashCode('string').should.eql(-891985903);
    });

    it('should return 0 if empty string', function() {
      stringUtils.hashCode('').should.eql(0);
    });

  });

  describe('capitalizeFirstLetter()', function() {
    it('should capitalize the first letter of a string', function() {
      stringUtils.capitalizeFirstLetter('string').should.eql('String');
    });
  });

  describe('startsWith()', function() {
    it('should return true if string starts with character', function() {
      stringUtils.startsWith('string', 's').should.eql(true);
    });

    it('should return false if string does not start with character', function() {
      stringUtils.startsWith('string', 'y').should.eql(false);
    });
  });

  describe('endsWith()', function() {
    it('should return true if string ends with character', function() {
      stringUtils.endsWith('string', 'g').should.eql(true);
    });

    it('should return false if string does not end with character', function() {
      stringUtils.endsWith('string', 'y').should.eql(false);
    });
  });

  describe('stripSurroundingQuotes', function() {
    var
      stripped;

    it('should strip surrounding double quotes', function() {
      var
        doubleQuotedString = '"strip double quotes from string"';

      stripped = stringUtils.stripSurroundingQuotes(doubleQuotedString);
      stripped.should.not.eql(doubleQuotedString);
      stripped.should.eql('strip double quotes from string');
    });

    it('should strip single quotes from string', function() {
      var
        singleQuotedString = "'strip double quotes from string'";

      stripped = stringUtils.stripSurroundingQuotes(singleQuotedString);
      stripped.should.not.eql(singleQuotedString);
      stripped.should.eql('strip double quotes from string');
    });

    it('should not strip single quotes from middle of string', function() {
      var
        singleQuotedString = "strip double quote's from string";

      stripped = stringUtils.stripSurroundingQuotes(singleQuotedString);
      stripped.should.eql(singleQuotedString);
    });

    it('should not strip double quotes from middle of string', function() {
      var
        singleQuotedString = 'strip double quote"s from string';

      stripped = stringUtils.stripSurroundingQuotes(singleQuotedString);
      stripped.should.eql(singleQuotedString);
    });
  });

  describe('normalizeEmail()', function() {
    var
      dirty = '" Test@EmaIl.Com "',
      clean = 'test@email.com';

    it('should trim a string', function() {
      stringUtils.normalizeEmail(dirty).should.eql(clean);
    });

    it('should lowercase a string', function() {
      stringUtils.normalizeEmail(dirty).should.eql(clean);
    });

    it('should strip quotes from a string', function() {
      stringUtils.normalizeEmail(dirty).should.eql(clean);
    });
  });

  describe('emailToContactsAddresses()', function() {
    var
      addressObject,
      email,
      cleaned,
      normalizeEmailStub,
      withoutStub;

    before(function() {
      // normalizeEmailStub = sinon.stub(stringUtils, 'normalizeEmail');
      withoutStub = sinon.spy(_, 'without');
      // withoutStub.returns([{address: ' EmAil@Email.COM '}]);
      addressObject = {
        name: 'name',
        address: ' EmAil '
      };
      userAddressObj = {
        name: 'user',
        address: 'useremail'
      },
      email = {
        user_email: 'useremail',
        to: [addressObject],
        from: userAddressObj,
        cc: [addressObject],
        bcc: [addressObject]
      };

      cleaned = stringUtils.emailToContactsAddresses(email);
    });

    it('should lowercase and trim the emails and remove the useremail', function() {
      cleaned.length.should.eql(3);
      cleaned.indexOf('useremail').should.eql(-1);
      cleaned[0].should.eql('email');
    });
  });
});