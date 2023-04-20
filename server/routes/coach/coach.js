const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Coach = require("../../models/user");
const crypto = require("crypto");
const Meetings = require("../../models/meeting");

const router = new express.Router();

router.post("/login", (req, res) => {
  const coachLogin = req.body;
  Coach.Coach.findOne({ email: coachLogin.email })
    .then((coach) => {
      if (!coach) {
        return res.json({
          error: "Invalid email or password",
        });
      }
      bcrypt.compare(coachLogin.password, coach.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { id: coach._id, email: coach.email },
            "harris123",
            { expiresIn: 86400 },
            (err, token) => {
              if (err) {
                return res.json({ message: err });
              } else {
                return res.json({
                  message: "success",
                  token: token,
                  id: coach._id,
                  email: coach.email,
                });
              }
            }
          );
        } else {
          res.json({ error: "Invalid email or password" });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/changePassword", (req, res) => {
  const pass = req.body.new;
  const id = req.body.id;
  const salted = req.body.salted;
  Coach.Coach.updateOne({ _id: id }, { $set: { password: pass, salt: salted } })
    .exec()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.post("/getName", (req, res) => {
  console.log(req.body);
  Coach.Coach.findOne({ email: req.body.email })
    .select("firstName")
    .exec()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log("in error");
      res.json({ error: err });
    });
});

router.post("/getMeetings", (req, res) => {
  let toSend = {};
  const now = new Date();
  const { email } = req.body;
  console.log("Got request from", email);

  Meetings.Meetings.find({ coachEmail: email })
    .select("clientEmail meetingDate ")
    .exec()
    .then((emailResponse) => {
      console.log("All meetings for this coach:", emailResponse);
      let futureMeetings = new Array();

      emailResponse.map((elem) => {
        if (elem.meetingDate.getTime() > now.getTime()) {
          futureMeetings.push(elem);
        }
      });
      console.log(futureMeetings);
      futureMeetings.map((elem) => {
        let date = elem.meetingDate;
        let email = elem.clientEmail;
        console.log(date, email);
        Client.Client.find({ email: email })
          .select("firstName")
          .exec()
          .then((nameResponse) => {
            clientName = nameResponse.firstName;
            console.log(clientName);
            // let toSend = { name: clientName, time: date };
            // res.send(toSend);
          })
          .catch((err) => {
            console.log("In error");
            res.send("");
          });
      });

      const upcomingMeeting = emailResponse.find(
        (meeting) => meeting.meetingDate.getTime() > now.getTime()
      );

      if (upcomingMeeting) {
        date = upcomingMeeting.meetingDate;
        const clientEmail = upcomingMeeting.clientEmail;

        Client.Client.find({ email: clientEmail })
          .select("firstName")
          .exec()
          .then((nameResponse) => {
            clientName = nameResponse.firstName;
            let toSend = { name: clientName, time: date };
            res.send(toSend);
          })
          .catch((err) => {
            res.send("");
          });
      } else {
        res.send("");
      }
    })
    .catch((err) => {
      res.send({ error: err });
    });
});

module.exports = router;
