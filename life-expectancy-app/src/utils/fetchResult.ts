const SERVER_URL = '/api/predict';
// const SERVER_URL = 'http://16.171.3.37/predict';

import { FormData } from '@/app/type';

/**
 * fetchResult
 *
 * Sends a POST request to the prediction API with the user’s form data,
 * handles HTTP errors by extracting server-provided messages when available,
 * and returns the numeric life-expectancy prediction.
 *
 * @param formData - all collected form inputs conforming to FormData
 * @returns promise resolving to the predicted life expectancy (number)
 * @throws Error with detailed message on non-OK responses
 */

export async function fetchResult(formData: FormData): Promise<number> {
  const response = await fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    let errorMsg = `Server error ${response.status}: ${response.statusText}`;
    try {
      const errJson = await response.json();
      if (errJson.error) errorMsg = errJson.error;
    } catch {
      // no-op
    }
    throw new Error(errorMsg);
  }

  const json = (await response.json()) as { prediction: number };
  return json.prediction;
}
