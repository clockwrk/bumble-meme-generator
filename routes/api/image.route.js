let express = require('express'),
  router = express.Router(),
  Images = require('../../db/models/image.model.js');

  module.exports = router;

  router.get('/', (req, res, next) => {

    Images.findAll({}).then(allImages => {
      res.send(allImages);
    }).catch(next)
  });

  router.get('/type/:type', (req, res, next) => {
    let type = req.params.date;

    Images.findAll({
      where: {
        type:type
      }
    }).then(allImagesOfType => {
      res.send(allImagesOfType)
    }).catch(next)
  })

  // router.post('/', (req,res,send)=>{
  //   let savedImage = generateFileName(req.body);
  //   let defaultStorageOptions ={
  //     dirname: imagePathDir
  //     maxBytes: 20000000
  //   }
  //
  //
  //
  //   Images.create(req.body)
  //     .then((newImage) => {
  //       res.status(newImage);
  //   })
  //
  // })

  router.delete('/:imageID', (req, res, next)=>{
    Image.destroy({
      where: {
        id:req.params.id
      }
    })
      .then(function() {
        res.send(204)
      })
      .catch(next)

  })
