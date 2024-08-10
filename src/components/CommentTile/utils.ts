export const validateInput = (input: string) => {
  if (!input.trim()) return false
  // TODO: Check for scripts / SQL injection
  return true
}
