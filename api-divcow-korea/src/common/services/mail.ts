
const AUTH = {
	cs: {user: 'cs@wowboxapp.com', pass: 'fnxm37foqtm@11'},
	noReply: {user: 'no_reply@wowboxapp.com', pass: 'fnxm37foqtm@11'}
};

export function sendEmail(toEmail:string, auth: 'cs' | 'noReply', subject:string, html:string, callback: ()=> void){
	const nodemailer = require('nodemailer');

	
	let transporter = nodemailer.createTransport({
		service: 'hiworks',
		host: 'smtps.hiworks.com', 
		port: 465,
		secure: true,//ssl사용
		auth: {user: 'no_reply@wowboxapp.com', pass: 'fnxm37foqtm@11'}
	});

	const message = {
		from: AUTH[auth].user, // 보내는 사람
		to: toEmail, // 받는 사람 이름과 이메일 주소
		subject: subject, // 메일 제목
		html: html
	};

	transporter.sendMail(message, (err, res) => {
		if (err) {
		console.log('failed... => ', err);
		} else {

			console.log('mail result >>>>>>>', res);

			if(callback) {
				callback();
			}
		}
	
		transporter.close();
	});
}