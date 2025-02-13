import sql from "./db.js";

async function checkIfEmailExists(email) {
  try {
    const result = await sql`
        SELECT EXISTS (
            SELECT 1 FROM nhansu.account WHERE email = ${email}
        ) AS exists;
    `;
    return result[0].exists;
  } catch (err) {
    throw err;
  }
}

async function signup(data) {
  try {
    await sql`
    INSERT INTO nhansu.account
      (email, password)
    VALUES
      (${data.email}, ${data.password})
  `;
  } catch (err) {
    throw err;
  }
}

async function checkAccountValidity(data) {
  try {
    const result = await sql`
    SELECT
      email, password
    FROM 
      nhansu.account
    WHERE 
      email = ${data.email}
  `;
    if (result[0]) {
      const password = result[0].password;
      return password == data.password ? true : false;
    }
    return false;
  } catch (err) {
    throw err;
  }
}

export const crud = {
  checkAccountValidity,
  checkIfEmailExists,
  signup,
};
