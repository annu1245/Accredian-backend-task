import * as Yup from "yup";
import prisma from "../config/db.js";
import { sendEmail } from "../services/emailService.js";

// Define validation schema
const referralSchema = Yup.object({
  referrerName: Yup.string()
    .min(3, "Referrer name must be at least 3 characters")
    .required("Referrer name is required"),
  referrerEmail: Yup.string()
    .email("Invalid email format")
    .required("Referrer email is required"),
  refereeName: Yup.string()
    .min(3, "Referee name must be at least 3 characters")
    .required("Referee name is required"),
  refereeEmail: Yup.string()
    .email("Invalid email format")
    .required("Referee email is required"),
});

export const createReferral = async (req, res) => {
  try {
    // Validate request body
    const validatedData = await referralSchema.validate(req.body, { abortEarly: false });

    const { referrerName, referrerEmail, refereeName, refereeEmail } = validatedData;

    const referral = await prisma.referral.create({
      data: { referrerName, referrerEmail, refereeName, refereeEmail },
    });

    await sendEmail(
      refereeEmail,
      "You've been referred!",
      `Hi ${refereeName}, ${referrerName} has referred you for our program.`
    );

    res.status(201).json(referral);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        errors: error.errors,
      });
    }
    console.error("Error creating referral:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};