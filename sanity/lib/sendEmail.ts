// src/lib/sendEmail.ts   (ya lib/sendEmail.ts)

import emailjs from "@emailjs/browser";

// Tumhare real IDs (jo force test mein kaam kiye)
emailjs.init("I8lRRiKyj3rgAnbIq");   // ← Public Key

export const sendOrderConfirmationEmail = async (items: any[], total: number) => {
  const userJson = localStorage.getItem("avionUser");
  if (!userJson) {
    alert("Please login first!");
    return false;
  }

  const user = JSON.parse(userJson);

  const templateParams = {
    name: user.name,
    email: user.email,
    items: items
      .map((i: any) => `${i.name} × ${i.quantity || 1} - Rs${i.price || i.price}`)
      .join("\n"),
    total: total,
  };

  try {
    await emailjs.send(
      "service_58vz5ia",        // ← Tumhara Service ID
      "template_kfs6x58",     // ← YEH DAAL DO (dashboard se copy karo – force test mein jo use kiya)
      templateParams
    );
    alert("Order confirmed! Email sent successfully 🎉");
    return true;
  } catch (error: any) {
    console.error("EmailJS Error:", error);
    alert("Email failed: " + (error?.text || "Try again"));
    return false;
  }
};