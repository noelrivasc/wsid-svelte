import nodemailer from 'nodemailer';
import { config } from '$lib/utils/config';

const transporter = nodemailer.createTransport({
	host: config.smtp.host,
	port: config.smtp.port,
	secure: config.smtp.port === 465,
	auth: config.smtp.user
		? { user: config.smtp.user, pass: config.smtp.pass }
		: undefined
});

export async function sendEmail(opts: {
	to: string;
	subject: string;
	text: string;
	html?: string;
}): Promise<void> {
	await transporter.sendMail({
		from: config.smtp.from,
		to: opts.to,
		subject: opts.subject,
		text: opts.text,
		html: opts.html
	});
}
