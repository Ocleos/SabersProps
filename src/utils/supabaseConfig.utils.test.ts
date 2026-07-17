import { validateSupabaseConfig } from '~src/utils/supabaseConfig.utils';

// LOG.error is async (see logger.utils.ts) and flushes on a setTimeout(0); flush it before the test ends so
// Jest doesn't warn about logging after teardown.
const flushLog = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('validateSupabaseConfig', () => {
  it('returns the url and key when both are provided', () => {
    expect(validateSupabaseConfig('https://example.supabase.co', 'anon-key')).toEqual({
      apiKey: 'anon-key',
      apiUrl: 'https://example.supabase.co',
    });
  });

  it('throws when the url is missing', async () => {
    expect(() => validateSupabaseConfig(undefined, 'anon-key')).toThrow(/supabaseApiUrl/);
    await flushLog();
  });

  it('throws when the key is missing', async () => {
    expect(() => validateSupabaseConfig('https://example.supabase.co', undefined)).toThrow(/supabaseApiKey/);
    await flushLog();
  });

  it('throws when both are missing', async () => {
    expect(() => validateSupabaseConfig(undefined, undefined)).toThrow(/supabaseApiUrl, supabaseApiKey/);
    await flushLog();
  });
});
