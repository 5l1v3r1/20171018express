
const nodemailer = require('nodemailer');

module.exports = {
  
  /*update appoint date
  postEmail(req, res) {
	let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
        to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };
	transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }else{
			console.log("success");
		}
        //console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    return res.send({
            "code":200,
            "success":"email"
          });
  },
	*/
	
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
  /*update appoint date*/
  updateClient(req, res) {
    return DateItem
      .find({
        where: {
          id: req.params.dateid,
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
			      msg: req.body.msg || dateItem.msg,
		          clientid: req.params.clientid || dateItem.clientid,
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
  /*update appoint date*/
  updateUserDate(req, res) {
    return DateItem
      .find({
        where: {
          id: req.params.dateid,
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
		          clientid: req.params.clientid || dateItem.clientid,
              msg:'',
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

  
};
