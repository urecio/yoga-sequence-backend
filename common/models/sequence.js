var loopback = require('loopback');
var Ashana = loopback.getModel('Ashana');

module.exports = function(Sequence) {
  Sequence.updateAll = function(ashanaIds, cb) {
    ashanaIds.foreach(function(ashanaId, index){
        Sequence.ashanas.add(ashanaId, function(err){
          if(err) return cb(err);
        });
      });
      cb(null, 'Ashanas updated');
    };

  Sequence.remoteMethod('updateAll',{
    accepts: [
    { arg: 'ashanas', type: 'object', http: { source: 'body' } },
    { arg: 'id', type: 'number', required: true }
    ],
    http: {path: '/{id}/ashanas/updateAll'},
    returns: {arg: 'result', type: 'string'}
  });

  Sequence.afterRemote('prototype.__get__ashanas', function(ctx, result, next){
    var sequenceAshana = Sequence.app.models.SequenceAshana;
    var Ashana = Sequence.app.models.Ashana;
    if(!ctx.result) {
      var err = new Error('No result');
      err.statusCode = 400;
      return next(err);
    }
    ctx.result.map(function(result){
      Ashana.findById(result.ashanaId, function(err, ashana){
          if(err) return next(err);
          delete result.ashanaId;
          result.ashana = ashana;
        });
    });
    next();


  });
};
