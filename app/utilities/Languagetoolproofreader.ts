// languageToolProofreader.ts
//
// Implements the real IProofreaderInterface from
// @farscrl/tiptap-extension-spellchecker (confirmed by reading
// node_modules/@farscrl/tiptap-extension-spellchecker/lib/index.d.ts):
//
//   interface IProofreaderInterface {
//     proofreadText(sentence: string): Promise<ITextWithPosition[]>;
//     getSuggestions(word: string): Promise<string[]>;
//     normalizeTextForLanguage(text: string): string;
//   }
//
//   interface ITextWithPosition {
//     offset: number;
//     length: number;
//     word: string;
//   }
//
// proofreadText() only needs to report WHERE the problems are
// (offset/length/word) — no suggestions yet. getSuggestions() is called
// separately, on demand, when the user clicks a flagged word.

import type { IProofreaderInterface, ITextWithPosition } from '@farscrl/tiptap-extension-spellchecker';

export class LanguageToolProofreader implements IProofreaderInterface {
    private endpoint: string;
    private language: string;

    /**
     * @param language LanguageTool language code, e.g. 'en-US', 'en-GB'.
     * @param endpoint Override for a self-hosted LanguageTool server.
     *                 Defaults to the public API (rate-limited, fine for demos).
     */
    constructor(language = 'en-US', endpoint = 'https://api.languagetool.org/v2/check') {
        this.language = language;
        this.endpoint = endpoint;
    }

    normalizeTextForLanguage(text: string): string {
        // Called synchronously before proofreading. Collapse odd whitespace so
        // offsets line up cleanly; add language-specific normalization here later
        // (e.g. smart quotes) if you need it.
        return text.replace(/\s+/g, ' ').trim();
    }

    async proofreadText(sentence: string): Promise<ITextWithPosition[]> {
        if (!sentence.trim()) return [];

        const matches = await this.callLanguageTool(sentence);

        // Only keep matches LanguageTool tags as spelling issues, and shape them
        // into { offset, length, word } as the interface expects.
        return matches
            .filter((match: any) => this.isSpellingIssue(match))
            .map((match: any) => ({
                offset: match.offset,
                length: match.length,
                word: sentence.substring(match.offset, match.offset + match.length),
            }));
    }

    async getSuggestions(word: string): Promise<string[]> {
        const matches = await this.callLanguageTool(word);
        if (matches.length === 0) return [];

        // The whole `word` was sent as the text, so its match (if any) covers
        // the full string — take its replacements.
        return (matches[0].replacements ?? []).map((r: any) => r.value).slice(0, 5);
    }

    private isSpellingIssue(match: any): boolean {
        // LanguageTool tags spelling rules under the 'TYPOS' category (and rule
        // ids usually contain "MORFOLOGIK" or "SPELL"). Grammar/style issues are
        // filtered out so this proofreader stays spelling-only.
        const categoryId = match.rule?.category?.id ?? '';
        return categoryId === 'TYPOS';
    }

    private async callLanguageTool(text: string): Promise<any[]> {
        const body = new URLSearchParams({
            text,
            language: this.language,
        });

        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        });

        if (!response.ok) {
            console.error('LanguageTool request failed', response.status);
            return [];
        }

        const data = await response.json();
        return data.matches ?? [];
    }
}