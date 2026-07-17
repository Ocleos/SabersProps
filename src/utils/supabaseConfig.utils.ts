import LOG from '~src/utils/logger.utils';

export const validateSupabaseConfig = (
  url: string | undefined,
  key: string | undefined,
): { apiKey: string; apiUrl: string } => {
  const missingKeys = [!url && 'supabaseApiUrl', !key && 'supabaseApiKey'].filter(Boolean);

  if (missingKeys.length > 0) {
    const message = `Missing required Supabase configuration: ${missingKeys.join(', ')}. Check app.config.ts and .env.local.`;
    LOG.error(message);
    throw new Error(message);
  }

  return { apiKey: key as string, apiUrl: url as string };
};
