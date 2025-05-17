//const SERVER_URL = 'http://localhost:5005/predict';
const SERVER_URL = '/api/predict';

import { FormData } from '@/app/type';

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
