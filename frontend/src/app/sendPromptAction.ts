'use server'

export async function sendPrompt(prompt: string): Promise<string> {
    const result= await fetch(`http://localhost:8082/api/v1/chat/book?message=${encodeURIComponent(prompt)}`);
    
        if (!result.ok) {
         throw new Error('Ağ yanıtı başarılı değil: ' + result.statusText);
        }
      const data = await result.text();
      return data;
}