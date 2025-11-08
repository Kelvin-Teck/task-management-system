import nodemailer from "nodemailer";
import { create } from "express-handlebars";
import path from "path";
import fs from "fs/promises";
import type { Transporter } from "nodemailer";

// Setup handlebars engine
const hbs = create({
  extname: ".hbs",
  defaultLayout: false,
  
});

// Create the transporter instance
const createTransporter = (): Transporter => {
  const config = process.env.EMAIL_SERVICE
    ? {
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER!,
          pass: process.env.EMAIL_PASS!,
        },
      }
    : {
        host: process.env.EMAIL_HOST!,
        port: Number(process.env.EMAIL_PORT),
        secure: process.env.EMAIL_PORT === "465",
        auth: {
          user: process.env.EMAIL_USER!,
          pass: process.env.EMAIL_PASS!,
        },
      };

  return nodemailer.createTransport(config);
};

const transporter = createTransporter();

// Manual Handlebars rendering function
const renderTemplate = async (
  template: string,
  context: Record<string, any>
): Promise<string> => {
  const templatePath = path.resolve(
    __dirname,
    "../mailers/hbs",
    `${template}.hbs`
  );
  const templateContent = await fs.readFile(templatePath, "utf-8");

  // Compile with empty options object
  const compiledTemplate = hbs.handlebars.compile(templateContent, {});
  return compiledTemplate(context);
};

// Wrapper function for sending emails with templates
export const sendTemplatedEmail = async (options: {
  from?: string;
  to: string | string[];
  subject: string;
  template: string;
  context: Record<string, any>;
  attachments?: any[];
}) => {
  const html = await renderTemplate(options.template, options.context);

  return transporter.sendMail({
    from: options.from || process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    html,
    attachments: options.attachments,
  });
};

export { transporter };
export default transporter;
