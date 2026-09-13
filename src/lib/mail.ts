import nodemailer from "nodemailer";

function requireEnv(name: string, value: string | undefined): string {
  if (!value?.trim()) {
    throw new Error(`Falta la variable de entorno ${name}`);
  }
  return value.trim();
}

export function getMailCredentials() {
  const user = requireEnv(
    "email",
    process.env.email ?? process.env.EMAIL,
  );
  const pass = requireEnv(
    "email_password",
    process.env.email_password ?? process.env.EMAIL_PASSWORD,
  );
  const host = requireEnv(
    "email_host",
    process.env.email_host ?? process.env.EMAIL_HOST,
  );
  const port = Number(
    process.env.email_port ?? process.env.EMAIL_PORT ?? "465",
  );

  if (!Number.isFinite(port) || port <= 0) {
    throw new Error("email_port inválido");
  }

  return { user, pass, host, port };
}

export function createMailTransporter() {
  const { user, pass, host, port } = getMailCredentials();
  const secure = port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure && port === 587,
    auth: { user, pass },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
  });
}

export async function sendContactEmail(options: {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
  cc?: string | string[];
}) {
  const { user } = getMailCredentials();
  const transporter = createMailTransporter();

  const ccList = (Array.isArray(options.cc) ? options.cc : [options.cc])
    .filter((value): value is string => Boolean(value?.trim()))
    .map((value) => value.trim())
    .filter((value) => value.toLowerCase() !== user.toLowerCase());

  await transporter.sendMail({
    from: `"URLEX Web" <${user}>`,
    to: user,
    cc: ccList.length > 0 ? ccList : undefined,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}
