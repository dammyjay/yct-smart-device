const { pool } = require("./db");

async function createAdmin() {
  try {
    const adminEmail = "admin@calicare.com";
    const adminPassword = "Admin123"; // You can hash this later
    const fullName = "System Administrator";

    // Check if admin exists
    const check = await pool.query("SELECT id FROM users WHERE email = $1", [
      adminEmail,
    ]);

    if (check.rows.length > 0) {
      console.log("✔ Admin already exists");
      return;
    }

    // Create admin user
    await pool.query(
      `
      INSERT INTO users (email, full_name, password, role, created_at)
      VALUES ($1, $2, $3, 'admin', NOW())
      `,
      [adminEmail, fullName, adminPassword]
    );

    console.log("✅ Admin account created successfully");
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  }
}

module.exports = { createAdmin };
