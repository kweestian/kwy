import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import Message from '../models/message'

export function sendContactForm(req, res) {

  const smtpTrans = nodemailer.createTransport(
    smtpTransport('smtps://kidswithoutyachts%40gmail.com:' + process.env.GMAIL_PASSWORD_KWY + '@smtp.gmail.com')
  );

  const mailOpts = {
    from: "info@kidswithoutyachts.org",
    to: 'kidswithoutyachts@gmail.com',
    subject: req.body.title,
    text: req.body.message,
  };

  smtpTrans.sendMail(mailOpts, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else {
      return res.json({ info });
    }
  });
}

export function getMessages(req, res) {
  Message.find().sort('-dateAdded').exec((err, messages) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ messages: messages });
  });
}

export function addMessage(req, res) {
  if (!req.body.emailFrom && !req.body.message) {
    return res.status(403).end();
  }

  const newMessage = new Message(req.body);

  newMessage.save()

  newMessage.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.json({ message: saved });
  });

}
