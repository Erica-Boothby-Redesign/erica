import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request, res: any) {
  // const resend = new Resend(process.env.PUBLIC_EMAIL_ID);
  const data = await req.json();
  const message = {
    from: data.email,
    to: ["ericajboothby@gmail.com"],
    subject: "New Client submission from " + data.name,
    text: data.name,

    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Client Submission</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
          }
          .client-info {
            background-color: #f9f9f9;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 20px;
          }
          .client-info p {
            margin: 10px 0;
          }
          .label {
            font-weight: bold;
            color: #2c3e50;
          }
          .footer {
            font-size: 12px;
            color: #7f8c8d;
            text-align: center;
            margin-top: 20px;
            border-top: 1px solid #e0e0e0;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <h1>New Client Submission</h1>
        <div class="client-info">
          <p><span class="label">Client Name:</span> ${data.name}</p>
          <p><span class="label">Client Email:</span> ${data.email}</p>
          <p><span class="label">Client Phone:</span> ${data.phone}</p>
          <p><span class="label">Client body In:</span> ${data.body}</p>
        </div>
        <p class="footer">This information was submitted from our official site. &copy; ${new Date().getFullYear()} Erica</p>
      </body>
      </html>
    `,
  };

  // let transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.PUBLIC_EMAIL_ID,
  //     pass: process.env.PUBLIC_EMAIL_ID_KEY,
  //   },
  // });
  let transporter: any = nodemailer.createTransport({
    // service: "gmail",
    // name: "bozjewelryco.com",
    host: process.env.PUBLIC_EMAIL_HOST, // Outgoing SMTP server
    port: 465,
    secure: true, // true for 465, false for other ports
    logger: true,
    debug: true,
    // secureConnection: false,
    tls: { rejectUnauthorized: false },
    auth: {
      user: process.env.PUBLIC_EMAIL_USERNAME, // Your email address
      pass: process.env.PUBLIC_EMAIL_PASSWORD, // Your password
    },
    socketTimeout: 10000, // Set timeout to 10 seconds or higher
  });

  return await transporter
    .sendMail(message)
    .then((response: nodemailer.SentMessageInfo) => {
      return NextResponse.json(
        { error: false, emailSent: true, errors: [], response },
        { status: 200 },
      );
    })
    .catch((error: nodemailer.SentMessageInfo) => {
      return NextResponse.json(
        { error: true, emailSent: false, errors: [error] },
        { status: 500 },
      );
    });
}
