
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const DateItem = require('../models').DateItem;

module.exports = {
  /*create new appointdate*/
  create(req, res) {
	var currdatetime = new Date();
    return DateItem
      .create({
		    startdate: req.body.startdate,
		    enddate: req.body.enddate,
		    dateId: req.params.userid,
      })
      .then((dateItem) => {
        if (!dateItem) {
          return res.send({
            "code":404,
            "success":"Date build fail!"
          });
        }
        return res.send({
            "code":200,
            "success":"Date build success"
          });
      })
      .catch(error => {
    		return res.send({
    			"code":404,
    			"success":"Date build fail!"
    		});
	   });
  },
  /*update appoint date*/
  update(req, res) {
    return DateItem
      .find({
        where: {
          id: req.params.dateid,
          dateId: req.params.userid,
        },
      })
      .then(dateItem => {
        if (!dateItem) {
          return res.send({
            "code":404,
            "success":"Date Edit fail!"
          });
        }

        return dateItem
          .update({
			        startdate: req.body.startdate || dateItem.startdate,
		          enddate: req.body.enddate || dateItem.enddate,
          })
          .then(updatedDateItem => {
			if (!updatedDateItem) {
			  return res.send({
				"code":404,
				"success":"Date update fail!"
			  });
			}
			return res.send({
				"code":200,
				"success":"Date update success"
			  });
		})
          .catch(error => {
				return res.send({
					"code":404,
					"success":"Date build fail!"
				  });
			});
      })
      .catch(error => {
				return res.send({
					"code":404,
					"success":"Date build fail!"
				  });
			});
  },

  retrieve(req, res) {
    return DateItem.findAll({
       where: {
         dateId:{[Op.in]:[4,3]} ,
       },
    })
      .then(dateItem => {
        if (dateItem) {
          return res.send({
            "code":404,
            "success":"Date2",
            "data":dateItem

          });

        }

        })

  },
  /*delete note*/
  destroy(req, res) {
    return DateItem
      .find({
        where: {
          id: req.params.dateid,
          dateId: req.params.userid,
        },
      })
      .then(dateItem => {
        if (!dateItem) {
          return res.send({
            "code":404,
            "success":"Date lalal fail!"
          });
        }

        return dateItem
          .destroy()
          .then(() => {
            return res.send({
            "code":200,
            "success":"Date del success"
          });
         })
          .catch(error => {
            return res.send({
            "code":404,
            "success":"Date del fail!"
            });
        });
      })
      .catch(error => {
        return res.send({
            "code":404,
            "success":"Date del fail!"
            });
    });
  },


  updateAvailable(req, res) {

   return DateItem
      .find({
        where: {
          id: req.params.appointmentId,

        },
      })
      .then(dateItem => {
        if (!dateItem) {
          return res.send({
            "code":404,
            "success":"Date Edit fail!"
          });
        }

        return dateItem
          .update({
              available: false,
          })
          .then(updatedDateItem => {
            if (!updatedDateItem) {
              return res.send({
                "code":404,
                "success":"Date available update fail!"
              });
            }
          return res.send({
            "code":200,
            "success":"Date update available success"
          });
        })
          .catch(error => {
        return res.send({
          "code":404,
          "success":"Date build fail!"
          });
      });
      })
      .catch(error => {
        return res.send({
          "code":404,
          "success":"Date build fail!"
          });
      });
  },


};
