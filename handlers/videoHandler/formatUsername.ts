export default function formatUsername(username: string) {
  return username
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/[^a-z0-9_]/g, ""); // Remove non-alphanumeric characters except underscores
}
