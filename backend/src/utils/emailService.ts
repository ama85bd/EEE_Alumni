import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'eee.iu.alumni@gmail.com',
    pass: 'hubp hyuu glnq udpw',
  },
});

export default transporter;
