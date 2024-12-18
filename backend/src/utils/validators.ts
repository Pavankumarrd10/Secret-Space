export const validateConfession = (content: string): string | null => {
  if (!content) {
    return 'Content is required';
  }
  if (content.length < 10) {
    return 'Confession must be at least 10 characters long';
  }
  if (content.length > 1000) {
    return 'Confession must not exceed 1000 characters';
  }
  return null;
};