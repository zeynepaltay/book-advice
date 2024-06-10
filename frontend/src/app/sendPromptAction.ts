'use server'

export async function sendPrompt(prompt: string): Promise<string> {
    // const result = await fetch(`http://localhost:8081/api/v1/chat/book?message=${prompt}`);
    const MOCK_RESPONSE = `Dune - Frank Herbert\nNeuromancer - William Gibson\nAltered Carbon - Richard K. Morgan\nThe Left Hand of Darkness - Ursula K. Le Guin\nSnow Crash - Neal Stephenson\nThe Three-Body Problem - Liu Cixin\nHyperion - Dan Simmons\nBlindsight - Peter Watts\nThe Dark Forest - Liu Cixin\nThe Road - Cormac McCarthy`
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_RESPONSE), 3000);
    })
}