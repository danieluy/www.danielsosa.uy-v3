const apiURL = process.env.API_URL || location.origin;

export const sendEmail = async (name, email, message, rcToken) => {
  const response = await fetch(`${apiURL}/api/contact/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message, rcToken }),
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
};
