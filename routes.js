const dns = require('dns');
//var MongoClient = require('mongodb').MongoClient;
module.exports = function(app, db) {
  app.post('/api/shorturl/new', (req, res) => {
    console.log(req.body)
    let url = req.body.url;
  //remove https:// if it's there.
   
  if (url.includes('//')) {
    let ind = url.indexOf('//');
    ind = ind + 2;
    url = url.substring(ind);
     console.log(url);
     }
   
  dns.lookup(url, (err, address, family) => {
    if (err) {
      console.log(err);
      res.json({ error: "invalid URL" });
    }else{
      
      let addo = address;
  let famo = family;
      
  // console.log(addo);
//  res.send(addo); 
   
      
    }
   
  }); 
    let url1 = {original_url: req.body.url};
    let total = 0;
   // console.log('db is ' + db.keys);
    // TOTAL WILL HOLD NUMBER OF DB ENTRIES
    db.collection('urlShortener').count({}, (err, result) =>{
      if(err) console.log(err);
      if (result) {
        total = result + 1;
        url1.short_url = total;
       // res.send("database contains: " + total );
        
        db.collection('urlShortener').insert(url1, (err, result) => {
                              if (err) {
                                res.send(err);
                              }else{
                                res.json({
                                  original_url: req.body.url, 
                                  short_url: total       
                                         });
                              }
                                         });
      };
    });
   
})
 app.get("/api/shorturl/:id", function (req, res) {
  let shorturl = { "short_url": parseInt(req.params.id) };
  db.collection('urlShortener').findOne(shorturl, (err, result) => {
    if (err) {
      console.log("error is " + err);
    }else{
      console.log("result is " + result);
     res.redirect(result.original_url);
    }
  });
 // res.send("hey");
});

}