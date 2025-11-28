import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const userLimit = rateLimit.get(identifier);

  if (userLimit && now > userLimit.resetTime) {
    rateLimit.delete(identifier);
  }

  const existing = rateLimit.get(identifier);
  
  if (existing) {
    return false;
  }

  rateLimit.set(identifier, {
    count: 1,
    resetTime: now + 24 * 60 * 60 * 1000,
  });

  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Parse FormData instead of JSON
    const formData = await request.formData();
    
    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const budget = formData.get('budget') as string;
    const description = formData.get('description') as string;
    const file = formData.get('file') as File | null;

    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const identifier = ip;

    // Check rate limit
    const allowed = checkRateLimit(identifier);
    if (!allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'You have already sent a message today. Please try again tomorrow.' 
        },
        { status: 429 }
      );
    }

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Process file attachment if exists
    const attachments = [];
    if (file) {
      // Convert File to Buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      attachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type,
      });
    }

    // Send email with CC to multiple recipients
    await transporter.sendMail({
      from: `"Agency Contact Form" <${process.env.GMAIL_USER}>`,
      to: 'badaldotagency@gmail.com',
      cc: ['munnarifat20@gmail.com', 'colleague2@example.com'], // Add your CC emails here
      replyTo: email,
      subject: `New Project Inquiry from ${name}`,
      attachments: attachments,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Project Inquiry</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                        🚀 New Project Inquiry
                      </h1>
                      <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px;">
                        ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      
                      <!-- Client Information Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                        <tr>
                          <td style="padding-bottom: 20px;">
                            <h2 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600; border-bottom: 3px solid #667eea; padding-bottom: 10px; display: inline-block;">
                              📋 Client Information
                            </h2>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9fafb; border-radius: 8px; overflow: hidden;">
                              <tr>
                                <td style="padding: 16px 20px; border-bottom: 1px solid #e5e7eb;">
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td width="140" style="color: #6b7280; font-size: 14px; font-weight: 600;">
                                        👤 Full Name
                                      </td>
                                      <td style="color: #1f2937; font-size: 15px; font-weight: 500;">
                                        ${name}
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 16px 20px; border-bottom: 1px solid #e5e7eb;">
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td width="140" style="color: #6b7280; font-size: 14px; font-weight: 600;">
                                        📧 Email
                                      </td>
                                      <td style="color: #1f2937; font-size: 15px;">
                                        <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-weight: 500;">
                                          ${email}
                                        </a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 16px 20px;">
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td width="140" style="color: #6b7280; font-size: 14px; font-weight: 600;">
                                        💰 Budget Range
                                      </td>
                                      <td>
                                        <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 6px 14px; border-radius: 6px; font-size: 14px; font-weight: 600; display: inline-block;">
                                          ${budget}
                                        </span>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Project Description Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                        <tr>
                          <td style="padding-bottom: 20px;">
                            <h2 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600; border-bottom: 3px solid #667eea; padding-bottom: 10px; display: inline-block;">
                              💼 Project Description
                            </h2>
                          </td>
                        </tr>
                        <tr>
                          <td style="background: linear-gradient(to right, #f9fafb, #ffffff); border-left: 4px solid #667eea; padding: 24px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                            <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">
${description}
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- Attachment Card -->
                      ${file ? `
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                        <tr>
                          <td style="padding-bottom: 20px;">
                            <h2 style="margin: 0; color: #1f2937; font-size: 20px; font-weight: 600; border-bottom: 3px solid #667eea; padding-bottom: 10px; display: inline-block;">
                              📎 Attached File
                            </h2>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table cellpadding="0" cellspacing="0" border="0" style="background-color: #f0f9ff; border: 2px dashed #667eea; border-radius: 8px; padding: 16px 20px;">
                              <tr>
                                <td style="color: #374151; font-size: 14px; font-weight: 500;">
                                  📄 ${file.name} <span style="color: #9ca3af; font-weight: 400;">(${(file.size / 1024).toFixed(2)} KB)</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      ` : ''}

                      <!-- Action Button -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px;">
                        <tr>
                          <td align="center">
                            <table cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 16px 32px;">
                                  <a href="mailto:${email}" style="color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; display: inline-block;">
                                    ✉️ Reply to Client
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background: linear-gradient(to right, #f9fafb, #f3f4f6); padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px; line-height: 1.6;">
                        <strong>This inquiry was submitted via your agency contact form</strong>
                      </p>
                      <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                        Please respond promptly to maintain client satisfaction
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
