
import nodemailer from 'nodemailer'

export const SendEmail = async( to, sub, text) => {
   try {

    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "developerwahidsadik@gmail.com",
        pass: "cgntvmmvgegwqdeq"
      }
    });

      await transport.sendMail({
        form : 'insta_clone',
        to : to,
        subject : sub,
        text : text
      })
   } catch (error) {
    console.log(error);
   }
}