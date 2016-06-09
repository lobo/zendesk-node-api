var should = require('chai').should();
var expect = require('chai').expect;

module.exports = function(zendesk){
  var TICKET_ID = 212;

  it('should get all tickets', function(done){
    zendesk.tickets.list().then(function(tickets){
      expect(tickets).to.exist;
      done();
    });
  });

  it('should show a ticket by id', function(done){
    zendesk.tickets.show(TICKET_ID).then(function(ticket){
      expect(ticket).to.exist;
      done();
    });
  });

  it('should create a ticket', function(done){
    zendesk.tickets.create({
      subject: 'A new ticket',
      comment: {
        body: 'A ticket created with zendesk-node-api'
      }
    }).then(function(data){
      expect(data).to.exist;
      expect(data.ticket.subject).to.equal('A new ticket');
      done();
    });
  });

  it('should update a ticket', function(done){
    var testString = Math.random().toString(36).substring(7)
    zendesk.tickets.update(TICKET_ID, {
      subject: testString
    }).then(function(data){
      expect(data).to.exist;
      expect(data.ticket.subject).to.equal(testString);
      done();
    });
  });

  it('should delete a ticket', function(done){
    this.timeout(10000);
    zendesk.tickets.create({
      subject: 'This will be deleted',
      comment: {
        body: 'A ticket that will be deleted'
      }
    }).then(function(data){
      zendesk.tickets.delete(data.ticket.id).then(function(result){
        expect(result).to.be.true;
        done();
      });
    });
  });
}