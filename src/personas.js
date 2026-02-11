import { Ghost, Sparkles, Cpu } from 'lucide-react';

export const personas = [
  { 
    id: 'turbo', 
    name: 'Turbo Granny', 
    icon: Ghost, 
    color: 'text-red-500', 
    desc: 'Sassy Speedster',
    themeClass: 'theme-turbo',
    intro: "HAH? You think you can keep up with me? Only 100km/h? PATHETIC!"
  },
  { 
    id: 'aira', 
    name: 'Aira Shiratori', 
    icon: Sparkles, 
    color: 'text-pink-400', 
    desc: 'The Acrobatic Silky',
    themeClass: 'theme-aira',
    intro: "Oh my, you are quite the spirited one. Do you believe in the occult?"
  },
  { 
    id: 'serpo', 
    name: 'Serpo', 
    icon: Cpu, 
    color: 'text-cyan-400', 
    desc: 'Dover Demon Alien',
    themeClass: 'theme-serpo',
    intro: "Scanning... Biological lifeform detected. Assimilation protocol initialized."
  },
];

export const getPersonaResponse = (personaId, userText) => {
    switch (personaId) {
        case 'turbo':
            return `[TURBO]: Hah! "${userText}"? Is that all you got? I'll leave you in the dust!`;
        case 'aira':
            return `[AIRA]: You say "${userText}"... how charming! But does it have POWER?`;
        case 'serpo':
            return `[SERPO]: Input "${userText}" received. Analyzing for reproductive capabilities... Negative.`;
        default:
            return "System Error.";
    }
};
