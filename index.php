<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger datos del formulario
    $firstName = htmlspecialchars($_POST['nombre']);
    $lastName = htmlspecialchars($_POST['apellido']);
    $phone = htmlspecialchars($_POST['telefono']);
    $email = htmlspecialchars($_POST['correo']);
    $appointmentDate = htmlspecialchars($_POST['fechaCita']);
    $appointmentTime = htmlspecialchars($_POST['horaCita']);
    $additionalInfo = htmlspecialchars($_POST['informacionAdicional']);

    // Datos del paquete seleccionado
    $selectedPackageId = htmlspecialchars($_POST['selectedPackageId']);
    $selectedPackageName = htmlspecialchars($_POST['selectedPackageName']);    
    $selectedPackagePrice = htmlspecialchars($_POST['selectedPackagePrice']);

    // Crear una nueva instancia de PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor
        $mail->isSMTP();
        $mail->SMTPDebug = SMTP::DEBUG_OFF;
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'navidadpromocion3@gmail.com'; // Cambiar a tu correo
        $mail->Password   = 'ctbgbdhqatsjcxjv'; // Cambiar a tu contraseña
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Establecer la codificación a UTF-8
        $mail->CharSet = 'UTF-8';

        // Destinatarios
        $mail->setFrom('navidadpromocion3@gmail.com', 'Christmas Mini Session');
        $mail->addAddress('navidadpromocion3@gmail.com', 'Recepcionista');

        // Contenido
        $mail->isHTML(true);
        $mail->Subject = 'Nueva Reserva de Sesión Navideña';

        // Plantilla HTML para el correo
        $emailTemplate = "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'> <!-- Asegúrate de que la página tenga esta metaetiqueta -->
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #c41e3a; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
                .content { background-color: #ffffff; padding: 20px; border-left: 1px solid #dddddd; border-right: 1px solid #dddddd; }
                .footer { background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 5px 5px; border: 1px solid #dddddd; }
                .appointment-details { margin-top: 20px; }
                .detail-row { margin-bottom: 10px; }
                .detail-label { font-weight: bold; color: #c41e3a; }
                .alert { background-color: #6ceb0f; border: 1px solid #ffeeba; color: #000000; padding: 10px; border-radius: 5px; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Nueva Reserva de Sesión Navideña</h1>
                </div>
                <div class='content'>
                    <p>Se ha recibido una nueva reserva para una sesión fotográfica navideña. A continuación, los detalles:</p>
                    
                    <div class='appointment-details'>
                        <div class='detail-row'>
                            <span class='detail-label'>Nombre:</span> $firstName $lastName
                        </div>
                        <div class='detail-row'>
                            <span class='detail-label'>Teléfono:</span> $phone
                        </div>
                        <div class='detail-row'>
                            <span class='detail-label'>Email:</span> $email
                        </div>
                        <div class='detail-row'>
                            <span class='detail-label'>Fecha de Cita:</span> $appointmentDate
                        </div>
                        <div class='detail-row'>
                            <span class='detail-label'>Hora de Cita:</span> $appointmentTime
                        </div>
                        <div class='detail-row'>
                            <span class='detail-label'>Paquete Seleccionado:</span> $selectedPackageName
                        </div>
                        <div class='detail-row'>
                            <span class='detail-label'>Precio del Paquete:</span> $ $selectedPackagePrice
                        </div>
                    </div>

                    <div class='alert' style='font-size: 18px;'>
                        <strong>Información Adicional:</strong><br>
                        " . ($additionalInfo ? nl2br($additionalInfo) : 'No se proporcionó información adicional.') . "
                    </div>
                </div>
                <div class='footer'>
                    <p>Este es un correo automático generado por el sistema de reservas.</p>
                </div>
            </div>
        </body>
        </html>
        ";

        $mail->Body = $emailTemplate;
        $mail->AltBody = "Nueva reserva de Sesión Navideña:\nNombre: $firstName $lastName\nTeléfono: $phone\nEmail: $email\nFecha: $appointmentDate\nHora: $appointmentTime\nPaquete: $selectedPackageName\nID del Paquete: $selectedPackageId\nPrecio: $selectedPackagePrice\nInfo Adicional: $additionalInfo";

        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Reserva enviada con éxito']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "Error al enviar la reserva: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud inválido']);
}
?>
