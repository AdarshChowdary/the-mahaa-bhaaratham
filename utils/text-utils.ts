export const splitIntoParagraphs = (text: string): string[] => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const paragraphs: string[] = [];
    let currentParagraph: string[] = [];
    
    sentences.forEach((sentence, index) => {
        const cleanSentence = sentence.trim();
        currentParagraph.push(cleanSentence);
        
        const shouldBreak = 
            currentParagraph.length >= 2 &&
            (
                cleanSentence.match(/however|moreover|furthermore|therefore|consequently|thus|meanwhile|afterwards|then/i) ||
                cleanSentence.match(/later|after|before|when|while/i) ||
                currentParagraph.length >= 4
            );
        
        if (shouldBreak || index === sentences.length - 1) {
            paragraphs.push(currentParagraph.join(' '));
            currentParagraph = [];
        }
    });
    
    return paragraphs;
};