import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'nodemailer-express-handlebars';
@Injectable()
export class MailingService {
    private transporter: nodemailer.Transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sdiomant@gmail.com",
                pass: "byxkyznllhdvzxyp"
            }
        }, {
            from: "Main email <sdiomant@gmail.com>"
        })

        this.transporter.use("compile", handlebars({
            viewEngine: {
                extName: ".hbs",
                partialsDir: "src/mailing/mail-templates",
                layoutsDir: "src/mailing/mail-templates",
                defaultLayout: false
            },
            viewPath: "src/mailing/mail-templates", // шлях до директорії з шаблонами
            extName: ".hbs"
        }))
    }

    async sendEmail(to: string, subject: string, template: string, context: any): Promise<void> {
        const mailOptions: nodemailer.SendMailOptions = {
            from: 'your_email@gmail.com',
            to,
            subject,
            template,
            context,
        };

        await this.transporter.sendMail(mailOptions);
    }
}
