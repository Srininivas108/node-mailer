# node-mailer

## Creating a Singup API
  created a signup api which takes name,email,password as request body parameters and creates new user in database , generates a jsontoken. if email already exists
  in database throws an error.
 
 
## Creating A Login API
 created a login api which takes email,password as request body parameters and if email,password matches with email,password in database asigns a json token can login.
 
 
## ForgotPassword API
 created a forgotpassword api which takes a user mail as request body parameter and when hits this api a random password will be sent user mail and will be update in
 database with that new password. so user can login with new password that sent to their mail.
 Here i have use NODEMAILER library to send random password to mail. Here FROM, To mails needed to specified.
 
 
## MAILSEND API
   created a emailsend API, here we have to pass jsontoken in header as Authentication key which asigned during the login/signup. created a auth midddleware function which
   check the auth key is vaild or not if it is valid token then only can able to send the mail otherwise throws unotherized error.
   I have used NODE MAILER library to send a mail.

   ##in the code## 
    const transport= nodemailer.createTransport({
              service:'gmail',
              auth:{
                  user: process.env.EMAIL,   ///pass email////
                  pass: process.env.PASSWORD  ////make sure in google mail account login >>manage your google account >> security >> app passwords >> generate password and pass that here///
              }
          })

    here we have to pass recevier mail address as request body parameter and vaild token in header to sent mail.



#### i have added all the screenshots of all api and what parameters need to be pass and response of api and auth key(jsonwebtoken) passed in header.
