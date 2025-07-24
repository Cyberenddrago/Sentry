import { RequestHandler } from "express";
import nodemailer from "nodemailer";

// Email configuration
const emailConfig = {
  host: "mail.bbplumbers.co.za",
  port: 587,
  secure: false,
  auth: {
    user: "info@bbplumbers.co.za",
    pass: "f+rExbEPKZNj",
  },
};

export const handleSendCompletionEmail: RequestHandler = async (req, res) => {
  try {
    const { jobId, claimNumber, jobTitle, forms, photos } = req.body;

    if (!jobId || !claimNumber) {
      return res.status(400).json({
        error: "Missing required fields: jobId, claimNumber"
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport(emailConfig);

    // Format form types for email body
    const formTypes = forms.map((formId: string) => {
      switch (formId) {
        case "noncompliance-form":
        case "form-noncompliance":
          return "Non Compliance Form";
        case "form-discovery-geyser":
          return "Discovery Form";
        case "material-list-form":
        case "form-material-list":
          return "Material List Form";
        case "form-absa-certificate":
          return "ABSA Certificate";
        case "form-clearance-certificate":
          return "Clearance Certificate";
        case "form-liability-certificate":
          return "Enhanced Liability Waiver Form";
        case "form-sahl-certificate":
          return "SAHL Certificate";
        default:
          return formId.replace(/-/g, " ").replace(/form/gi, "").trim() + " Form";
      }
    }).join(", ");

    // Prepare attachments
    const attachments: any[] = [];

    // Add photo attachments if provided
    if (photos && Array.isArray(photos)) {
      for (const photo of photos) {
        try {
          const response = await fetch(photo.url);
          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          attachments.push({
            filename: `${photo.label || 'photo'}.jpg`,
            content: buffer,
            contentType: 'image/jpeg'
          });
        } catch (error) {
          console.warn(`Failed to attach photo ${photo.id}:`, error);
        }
      }
    }

    const photoCount = photos?.length || 0;
    const formCount = forms?.length || 0;

    // Email content
    const mailOptions = {
      from: '"BBP BlockBusters" <info@bbplumbers.co.za>',
      to: "info@bbplumbers.co.za",
      subject: `Job Completed - Claim ${claimNumber}`,
      html: `
        <h2>Job Completion Notification</h2>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>Claim Number:</strong> ${claimNumber}</p>
        <p><strong>Job ID:</strong> ${jobId}</p>
        ${formCount > 0 ? `<p><strong>Forms Completed:</strong> ${formTypes}</p>` : ''}
        ${formCount > 0 ? `<p><strong>Total Forms:</strong> ${formCount}</p>` : ''}
        ${photoCount > 0 ? `<p><strong>Photos Attached:</strong> ${photoCount}</p>` : ''}
        <hr>
        <p>This job has been marked as completed by staff.</p>
        ${formCount > 0 ? '<p><em>All completed forms are available in the admin dashboard for download.</em></p>' : ''}
        ${photoCount > 0 ? '<p><em>Job photos are attached to this email.</em></p>' : ''}
        <br>
        <p>Best regards,<br>BBP BlockBusters & Partners (PTY) Ltd.</p>
      `,
      text: `
        Job Completion Notification

        Job Title: ${jobTitle}
        Claim Number: ${claimNumber}
        Job ID: ${jobId}
        ${formCount > 0 ? `Forms Completed: ${formTypes}` : ''}
        ${formCount > 0 ? `Total Forms: ${formCount}` : ''}
        ${photoCount > 0 ? `Photos Attached: ${photoCount}` : ''}

        This job has been marked as completed by staff.
        ${formCount > 0 ? 'All completed forms are available in the admin dashboard for download.' : ''}
        ${photoCount > 0 ? 'Job photos are attached to this email.' : ''}

        Best regards,
        BBP BlockBusters & Partners (PTY) Ltd.
      `,
      attachments: attachments
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`Completion email sent for job ${jobId}, claim ${claimNumber}`);
    res.json({ success: true, message: "Completion email sent successfully" });

  } catch (error) {
    console.error("Error sending completion email:", error);
    res.status(500).json({ 
      error: "Failed to send completion email",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
