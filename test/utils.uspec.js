/*jshint unused: false*/
/*jshint undef: false*/
/*jshint expr: true*/
/*jshint maxlen: 1000*/
/*jshint quotmark: false*/

describe('utils', function() {
  var
    _ = require('lodash'),
    sinon = require('sinon'),
    should = require('should'),
    utils = require('../lib/utils');

  beforeEach(function() {

  });

  describe('hashCode()', function() {
    it('should return the correct hash code', function() {
      utils.hashCode('string').should.eql(-891985903);
    });

    it('should return 0 if empty string', function() {
      utils.hashCode('').should.eql(0);
    });

  });

  describe('capitalizeFirstLetter()', function() {
    it('should capitalize the first letter of a string', function() {
      utils.capitalizeFirstLetter('string').should.eql('String');
    });
  });

  describe('startsWith()', function() {
    it('should return true if string starts with character', function() {
      utils.startsWith('string', 's').should.eql(true);
    });

    it('should return false if string does not start with character', function() {
      utils.startsWith('string', 'y').should.eql(false);
    });
  });

  describe('endsWith()', function() {
    it('should return true if string ends with character', function() {
      utils.endsWith('string', 'g').should.eql(true);
    });

    it('should return false if string does not end with character', function() {
      utils.endsWith('string', 'y').should.eql(false);
    });
  });

  describe('stripSurroundingQuotes', function() {
    var
      stripped;

    it('should strip surrounding double quotes', function() {
      var
        doubleQuotedString = '"strip double quotes from string"';

      stripped = utils.stripSurroundingQuotes(doubleQuotedString);
      stripped.should.not.eql(doubleQuotedString);
      stripped.should.eql('strip double quotes from string');
    });

    it('should strip single quotes from string', function() {
      var
        singleQuotedString = "'strip double quotes from string'";

      stripped = utils.stripSurroundingQuotes(singleQuotedString);
      stripped.should.not.eql(singleQuotedString);
      stripped.should.eql('strip double quotes from string');
    });

    it('should not strip single quotes from middle of string', function() {
      var
        singleQuotedString = "strip double quote's from string";

      stripped = utils.stripSurroundingQuotes(singleQuotedString);
      stripped.should.eql(singleQuotedString);
    });

    it('should not strip double quotes from middle of string', function() {
      var
        singleQuotedString = 'strip double quote"s from string';

      stripped = utils.stripSurroundingQuotes(singleQuotedString);
      stripped.should.eql(singleQuotedString);
    });
  });

  describe('normalizeEmail()', function() {
    var
      dirty = '" Test@EmaIl.Com "',
      clean = 'test@email.com';

    it('should trim a string', function() {
      utils.normalizeEmail(dirty).should.eql(clean);
    });

    it('should lowercase a string', function() {
      utils.normalizeEmail(dirty).should.eql(clean);
    });

    it('should strip quotes from a string', function() {
      utils.normalizeEmail(dirty).should.eql(clean);
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
      // normalizeEmailStub = sinon.stub(utils, 'normalizeEmail');
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

      cleaned = utils.emailToContactsAddresses(email);
    });

    it('should lowercase and trim the emails and remove the useremail', function() {
      cleaned.length.should.eql(3);
      cleaned.indexOf('useremail').should.eql(-1);
      cleaned[0].should.eql('email');
    });
  });

  describe('getUserName()', function() {
    var
      email = 'username@domain.com';

    it('should strip @domain.com', function() {
      utils.getUserName(email).should.eql('username');
    });
  });

  describe('toTitleCase()', function() {
    var
      sent = 'my first word';

    it('should capitalize the first letter of every words', function() {
      utils.toTitleCase(sent).should.eql('My First Word');
    });
  });

  describe('addressToName()', function() {
    var
      email = 'first.last@domain.com';

    it('should format the email', function() {
      utils.addressToName(email).should.eql('First Last');
    });
  });

  describe('replaceSeperatorWithSpace()', function() {
    var
      period = 'first.last',
      underscore = 'first_last',
      hyphen = 'first-last';

    it('should replace periods with spaces', function() {
      utils.replaceSeperatorWithSpace(period).should.eql('first last');
    });

    it('should replace underscores with spaces', function() {
      utils.replaceSeperatorWithSpace(underscore).should.eql('first last');
    });

    it('should replace hyphens with spaces', function() {
      utils.replaceSeperatorWithSpace(hyphen).should.eql('first last');
    });
  });
});