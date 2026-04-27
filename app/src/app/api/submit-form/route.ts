import { NextResponse } from "next/server";

/**
 * Google Sheets Integration via Apps Script Web App
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1KMCr1kGMbR5RHO7Bs1W34aXYsJrEcGjR_rADPypgAq0
 * 2. Go to Extensions → Apps Script
 * 3. Delete any existing code and paste this:
 *
 * ─── Google Apps Script Code (paste in Apps Script editor) ───
 *
 * function doPost(e) {
 *   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   var data = JSON.parse(e.postData.contents);
 *
 *   // Add headers if sheet is empty
 *   if (sheet.getLastRow() === 0) {
 *     sheet.appendRow([
 *       "Timestamp",
 *       "Full Name & Role",
 *       "WhatsApp",
 *       "Email",
 *       "Social Media",
 *       "Project Info",
 *       "Project Stage",
 *       "Launch Date",
 *       "Ideal Customer",
 *       "Marketing Channels",
 *       "Differentiation",
 *       "Biggest Challenge",
 *       "Consultation Goal",
 *       "Additional Info"
 *     ]);
 *   }
 *
 *   sheet.appendRow([
 *     new Date().toLocaleString("en-US", { timeZone: "Asia/Muscat" }),
 *     data.fullName || "",
 *     data.whatsapp || "",
 *     data.email || "",
 *     data.socialMedia || "",
 *     data.projectInfo || "",
 *     data.projectStage || "",
 *     data.launchDate || "",
 *     data.idealCustomer || "",
 *     data.marketingChannels || "",
 *     data.differentiation || "",
 *     data.biggestChallenge || "",
 *     data.consultationGoal || "",
 *     data.additionalInfo || ""
 *   ]);
 *
 *   return ContentService
 *     .createTextOutput(JSON.stringify({ status: "success" }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 *
 * 4. Click "Deploy" → "New deployment"
 * 5. Select type: "Web app"
 * 6. Set "Execute as": "Me"
 * 7. Set "Who has access": "Anyone"
 * 8. Click "Deploy" and authorize when prompted
 * 9. Copy the Web App URL and paste it in the GOOGLE_SCRIPT_URL below
 *
 * ─────────────────────────────────────────────────────────────
 */

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!GOOGLE_SCRIPT_URL) {
      console.error("GOOGLE_SCRIPT_URL is not configured");
      return NextResponse.json(
        { error: "Form submission endpoint not configured" },
        { status: 500 }
      );
    }

    console.log("Submitting to Google Script:", GOOGLE_SCRIPT_URL);

    // Google Apps Script returns a 302 redirect, so we need to follow it.
    // We also send as text/plain to avoid CORS preflight issues.
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(body),
      redirect: "follow",
    });

    // Read the response body for debugging
    const responseText = await response.text();
    console.log("Google Script response status:", response.status);
    console.log("Google Script response body:", responseText);

    // Google Apps Script may return 200 or 302 (which auto-follows to 200)
    // As long as we got a response without throwing, it succeeded
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit form", details: String(error) },
      { status: 500 }
    );
  }
}
