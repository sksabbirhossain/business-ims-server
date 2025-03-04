function generateTrxId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomPart = "";
  for (let i = 0; i < 7; i++) {
    randomPart += chars[Math.floor(Math.random() * chars.length)];
  }
  return `TX-${randomPart}`;
}

module.exports = generateTrxId;
