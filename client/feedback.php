<?php
$_REQUEST['email'] = isset($_REQUEST['email']) ? $_REQUEST['email'] : '';
$_REQUEST['subject'] = isset($_REQUEST['subject']) ? $_REQUEST['subject'] : '';
$_REQUEST['message'] = isset($_REQUEST['message']) ? $_REQUEST['message'] : '';
$_REQUEST['emailawesome'] = isset($_REQUEST['emailawesome']) ? $_REQUEST['emailawesome'] : '';

if($_REQUEST['email'] != '' && $_REQUEST['subject'] != '' && $_REQUEST['message'] != ''){
	require 'PHPMailerAutoload.php';
	$mail = new PHPMailer;

	$mail->setFrom('feedback@getviewfinder.com');
	$mail->addAddress('feedback@getviewfinder.com', 'Feedback');
	$mail->addReplyTo($_REQUEST['email']);
	$mail->isHTML(true);

	$mail->Subject = $_REQUEST['subject'];
	$mail->Body    = $_REQUEST['message'];

	if(!$mail->send()) {
		echo 'Mailer Error: ' . $mail->ErrorInfo;
		echo 'shabba';
	}else{
		echo '';
	}
}else{
	echo 'shabba';
}