// Songstarter v2 prompt database.
//
// Each prompt is a single scene — a specific, physical moment — for a
// songwriter to sit in. The site filters this array by the user's selections
// (gender, age range, and two moods) and picks one at random.
//
// No lyrics are quoted. Artist references used during writing are documented
// in songstarter-v2-roster.md.
//
// Tagging rules:
//   - `genders`: tag every gender the scene plausibly fits. A heartbreak
//     scene that could land for anyone gets all of ['male','female','other'].
//   - `ageRanges`: tag every age window where the scene would ring true.
//     Be generous — a lot of human moments travel across decades.
//   - `moods`: tag the 3–4 emotional registers the scene could be written
//     in. Users pick 2, so broad tagging ensures pools aren't thin.
//   - 'prefer_not_to_say' is NOT a gender tag. The filter falls back to
//     'include all' when the user picks it.

export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type AgeRange = '18-24' | '25-34' | '35-44' | '45-54' | '55+';
export type Mood =
  | 'happy'
  | 'sad'
  | 'romantic'
  | 'heartbroken'
  | 'angry'
  | 'hopeful'
  | 'hopeless'
  | 'nostalgic'
  | 'lonely'
  | 'restless';

export interface Prompt {
  id: number;
  premise: string;
  genders: Exclude<Gender, 'prefer_not_to_say'>[];
  ageRanges: AgeRange[];
  moods: Mood[];
}

const ALL_GENDERS: Exclude<Gender, 'prefer_not_to_say'>[] = ['male', 'female', 'other'];

export const prompts: Prompt[] = [
  // ─── Female-leaning, young ───────────────────────────────────────────────
  {
    id: 1,
    premise: "2am, passenger seat. They change the song to one you told them about on your first date.",
    genders: ['female', 'other'],
    ageRanges: ['18-24', '25-34'],
    moods: ['happy', 'romantic', 'nostalgic'],
  },
  {
    id: 2,
    premise: "He hasn't texted in two days. You're refreshing Instagram and you see him on someone else's story, laughing at something you can't hear.",
    genders: ['female', 'other'],
    ageRanges: ['18-24', '25-34'],
    moods: ['heartbroken', 'angry', 'lonely'],
  },
  {
    id: 3,
    premise: "The group chat has a new name and you're in it. You don't get the joke.",
    genders: ['female', 'male', 'other'],
    ageRanges: ['18-24'],
    moods: ['lonely', 'sad', 'hopeless'],
  },
  {
    id: 4,
    premise: "Your ex from year 11 just added you on LinkedIn. They work for a bank now.",
    genders: ALL_GENDERS,
    ageRanges: ['18-24', '25-34'],
    moods: ['nostalgic', 'restless'],
  },
  {
    id: 5,
    premise: "Walking home from the bus stop. Your parents' kitchen light is on, and you realise this will be the last summer you come home to it.",
    genders: ALL_GENDERS,
    ageRanges: ['18-24'],
    moods: ['nostalgic', 'hopeful', 'sad'],
  },
  {
    id: 6,
    premise: "You wore the wrong thing. Everyone else is in black. You're wearing the dress he liked you in.",
    genders: ['female', 'other'],
    ageRanges: ['18-24', '25-34'],
    moods: ['sad', 'heartbroken', 'lonely'],
  },
  {
    id: 7,
    premise: "He sent you a voice note saying \"hope you're good x\". You've listened to it four times.",
    genders: ['female', 'other'],
    ageRanges: ['18-24', '25-34'],
    moods: ['lonely', 'heartbroken', 'restless'],
  },
  {
    id: 8,
    premise: "The text you drafted at 3am, saved for six months. The day you finally deleted it.",
    genders: ALL_GENDERS,
    ageRanges: ['18-24', '25-34', '35-44'],
    moods: ['heartbroken', 'nostalgic', 'hopeful'],
  },
  {
    id: 9,
    premise: "A pub in your hometown plays the song that was on when you broke up. You came in for a lemonade.",
    genders: ALL_GENDERS,
    ageRanges: ['18-24', '25-34', '35-44'],
    moods: ['nostalgic', 'heartbroken', 'sad'],
  },
  {
    id: 10,
    premise: "The first time you said \"I love you\" and they said \"thanks\".",
    genders: ALL_GENDERS,
    ageRanges: ['18-24', '25-34'],
    moods: ['heartbroken', 'sad', 'lonely'],
  },
  {
    id: 11,
    premise: "You're in the smoking area at a wedding. You don't smoke anymore but you came out anyway.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44'],
    moods: ['restless', 'lonely', 'nostalgic'],
  },
  {
    id: 12,
    premise: "You go to your ex's wedding because you promised you would. Their mum hugs you at the bar.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44'],
    moods: ['heartbroken', 'nostalgic', 'hopeful'],
  },
  {
    id: 13,
    premise: "An ex texts at 11pm: \"saw something today that made me think of you\". You don't reply for three days.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44'],
    moods: ['restless', 'nostalgic', 'heartbroken'],
  },
  {
    id: 14,
    premise: "Your sister is getting married to the boy she met at university. You're the maid of honour. You haven't had a partner stay over in two years.",
    genders: ['female', 'other'],
    ageRanges: ['25-34', '35-44'],
    moods: ['lonely', 'restless', 'hopeful'],
  },
  {
    id: 15,
    premise: "The pregnancy test is negative. You don't know if that's a relief.",
    genders: ['female', 'other'],
    ageRanges: ['25-34', '35-44'],
    moods: ['restless', 'sad', 'hopeful'],
  },
  {
    id: 16,
    premise: "Your mother calls to say your father's new partner is pregnant. You're older than the baby will be when he's gone.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44', '45-54'],
    moods: ['angry', 'nostalgic', 'sad'],
  },
  {
    id: 17,
    premise: "The house you grew up in is on Rightmove. Three bedrooms, some updating required.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44', '45-54'],
    moods: ['nostalgic', 'sad', 'hopeful'],
  },
  {
    id: 18,
    premise: "Your therapist asked if you'd ever actually been loved. You said \"I think so\" and couldn't name when.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44'],
    moods: ['sad', 'lonely', 'hopeless'],
  },
  {
    id: 19,
    premise: "A boy you liked at university is a stranger with children now. Their school run crosses your bus route.",
    genders: ['female', 'other'],
    ageRanges: ['25-34', '35-44'],
    moods: ['nostalgic', 'restless', 'sad'],
  },
  {
    id: 20,
    premise: "The photo they posted wasn't for you. But you saw it. And you know which hand they wrote those captions with.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44'],
    moods: ['heartbroken', 'angry', 'restless'],
  },
  {
    id: 21,
    premise: "You said you'd stop drinking. The bottle of prosecco in the fridge is for someone else's birthday tomorrow.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44'],
    moods: ['restless', 'hopeless', 'hopeful'],
  },
  {
    id: 22,
    premise: "The friend who was always going to end up with someone is alone. The friend nobody bet on is getting married.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44'],
    moods: ['restless', 'nostalgic', 'hopeful'],
  },
  {
    id: 23,
    premise: "Sunday morning. Their shirt on your chair. They slept through the alarm, and you don't want to wake them.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44'],
    moods: ['romantic', 'happy', 'hopeful'],
  },
  {
    id: 24,
    premise: "You said \"I love you\" before them. They blinked. Then said it back.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44'],
    moods: ['romantic', 'hopeful', 'restless'],
  },
  {
    id: 25,
    premise: "Their toothbrush is in your bathroom and you're not sure when it arrived.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44'],
    moods: ['romantic', 'happy', 'hopeful'],
  },

  // ─── Male-leaning, young ─────────────────────────────────────────────────
  {
    id: 26,
    premise: "Leaving home for uni. Your dad tries to hug you and doesn't know how.",
    genders: ['male', 'other'],
    ageRanges: ['18-24'],
    moods: ['nostalgic', 'sad', 'hopeful'],
  },
  {
    id: 27,
    premise: "She's going out with your best friend. They both think you're fine with it.",
    genders: ['male', 'other'],
    ageRanges: ['18-24', '25-34'],
    moods: ['angry', 'heartbroken', 'lonely'],
  },
  {
    id: 28,
    premise: "The girl you've been texting for two weeks stops replying. You drive past her street a bit more often than you used to.",
    genders: ['male', 'other'],
    ageRanges: ['18-24', '25-34'],
    moods: ['lonely', 'restless', 'heartbroken'],
  },
  {
    id: 29,
    premise: "Your first job interview. Your shoes are your dad's. You haven't told him you took them.",
    genders: ['male', 'other'],
    ageRanges: ['18-24'],
    moods: ['restless', 'hopeful', 'nostalgic'],
  },
  {
    id: 30,
    premise: "You finished your A-levels and walked home, and nobody was in.",
    genders: ALL_GENDERS,
    ageRanges: ['18-24'],
    moods: ['restless', 'nostalgic', 'hopeful'],
  },
  {
    id: 31,
    premise: "An old tote bag of hers in the boot of the car, six months after she left. Half a lipstick. A receipt from a petrol station neither of you have ever been to.",
    genders: ['male', 'other'],
    ageRanges: ['25-34', '35-44'],
    moods: ['heartbroken', 'lonely', 'nostalgic'],
  },
  {
    id: 32,
    premise: "The ring is in your jacket pocket. You've had it for four months. The right moment keeps not arriving.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44'],
    moods: ['restless', 'hopeful', 'lonely'],
  },
  {
    id: 33,
    premise: "Your best mate gets engaged. You've never liked his girlfriend. Nobody asks you what you think.",
    genders: ['male', 'other'],
    ageRanges: ['25-34', '35-44'],
    moods: ['restless', 'angry', 'nostalgic'],
  },
  {
    id: 34,
    premise: "She took the cat. You didn't argue. You walk past its bowl every morning.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44'],
    moods: ['heartbroken', 'lonely', 'nostalgic'],
  },
  {
    id: 35,
    premise: "You called her from a car park because you didn't want to say it from home. She said she already knew.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44'],
    moods: ['heartbroken', 'restless', 'sad'],
  },
  {
    id: 36,
    premise: "Your dad's watch stopped. You don't know how to wind it. You don't want to ask anyone.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44', '45-54'],
    moods: ['nostalgic', 'lonely', 'hopeful'],
  },
  {
    id: 37,
    premise: "She's asleep. It's 4am. You're thinking about the person before her and you can't stop.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44'],
    moods: ['restless', 'nostalgic', 'heartbroken'],
  },
  {
    id: 38,
    premise: "A friend from school killed himself. You haven't spoken to him in ten years. Everyone is messaging you and you don't know why.",
    genders: ['male', 'other'],
    ageRanges: ['25-34', '35-44'],
    moods: ['lonely', 'sad', 'restless'],
  },
  {
    id: 39,
    premise: "The first morning in the new flat. Nothing is on the walls. You like it. You can't tell anyone that.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44', '45-54'],
    moods: ['hopeful', 'restless', 'lonely'],
  },
  {
    id: 40,
    premise: "A woman at the supermarket has your mother's laugh. You follow her two aisles before you realise.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44', '45-54'],
    moods: ['nostalgic', 'lonely', 'sad'],
  },

  // ─── Female, 35–44 ───────────────────────────────────────────────────────
  {
    id: 41,
    premise: "Your youngest starts school next Monday. For the first time in twelve years you'll have Tuesday mornings to yourself.",
    genders: ['female', 'other'],
    ageRanges: ['35-44'],
    moods: ['hopeful', 'restless', 'nostalgic'],
  },
  {
    id: 42,
    premise: "Your husband is a good man. The man at your school reunion was a good man too. You're in the kitchen at 2am making tea.",
    genders: ['female', 'other'],
    ageRanges: ['35-44', '45-54'],
    moods: ['restless', 'nostalgic', 'lonely'],
  },
  {
    id: 43,
    premise: "Your daughter asks why you never sing in the car. You used to be in a band.",
    genders: ['female', 'other'],
    ageRanges: ['35-44', '45-54'],
    moods: ['nostalgic', 'sad', 'hopeful'],
  },
  {
    id: 44,
    premise: "The friend you thought you'd lose at 23 is the one you call when your father dies.",
    genders: ALL_GENDERS,
    ageRanges: ['35-44', '45-54', '55+'],
    moods: ['nostalgic', 'sad', 'hopeful'],
  },
  {
    id: 45,
    premise: "The baby is finally asleep. Your partner is in the other room. You cry for twenty seconds in the kitchen and then carry on.",
    genders: ['female', 'other'],
    ageRanges: ['25-34', '35-44'],
    moods: ['lonely', 'restless', 'hopeful'],
  },
  {
    id: 46,
    premise: "Your mother has moved in. The guest bedroom doesn't feel like a guest bedroom anymore.",
    genders: ALL_GENDERS,
    ageRanges: ['35-44', '45-54'],
    moods: ['restless', 'sad', 'nostalgic'],
  },
  {
    id: 47,
    premise: "You stopped dyeing your hair this year. Your boss didn't notice. Your eleven-year-old did.",
    genders: ['female', 'other'],
    ageRanges: ['35-44', '45-54'],
    moods: ['hopeful', 'nostalgic', 'restless'],
  },
  {
    id: 48,
    premise: "The woman at your pilates class is sleeping with your husband. You keep going to pilates.",
    genders: ['female', 'other'],
    ageRanges: ['35-44', '45-54'],
    moods: ['angry', 'sad', 'restless'],
  },

  // ─── Male, 35–44 ─────────────────────────────────────────────────────────
  {
    id: 49,
    premise: "Your son is watching you change a tyre. You hope he doesn't ask any questions.",
    genders: ['male', 'other'],
    ageRanges: ['35-44', '45-54'],
    moods: ['restless', 'hopeful', 'nostalgic'],
  },
  {
    id: 50,
    premise: "You miss your friends, but you don't miss the drinking. You don't know how to tell them that.",
    genders: ALL_GENDERS,
    ageRanges: ['35-44', '45-54'],
    moods: ['lonely', 'hopeful', 'restless'],
  },
  {
    id: 51,
    premise: "Your father's voice on the answering machine, still there on the landline you never use.",
    genders: ALL_GENDERS,
    ageRanges: ['35-44', '45-54', '55+'],
    moods: ['nostalgic', 'sad', 'lonely'],
  },
  {
    id: 52,
    premise: "Your daughter is old enough to be embarrassed by you. You remember being old enough to be embarrassed by your dad. You miss him.",
    genders: ['male', 'other'],
    ageRanges: ['35-44', '45-54'],
    moods: ['nostalgic', 'hopeful', 'sad'],
  },
  {
    id: 53,
    premise: "The band you were in at 22 is on Spotify. Two of you are dead.",
    genders: ALL_GENDERS,
    ageRanges: ['35-44', '45-54', '55+'],
    moods: ['nostalgic', 'sad', 'lonely'],
  },
  {
    id: 54,
    premise: "The email from an ex saying she has cancer. You're in the car park at your son's football practice.",
    genders: ['male', 'other'],
    ageRanges: ['35-44', '45-54'],
    moods: ['sad', 'restless', 'lonely'],
  },
  {
    id: 55,
    premise: "The mortgage is paid off. You don't feel what you thought you'd feel.",
    genders: ALL_GENDERS,
    ageRanges: ['35-44', '45-54', '55+'],
    moods: ['restless', 'hopeful', 'lonely'],
  },

  // ─── Female, 45–54 ───────────────────────────────────────────────────────
  {
    id: 56,
    premise: "Your mother calls you by your sister's name and corrects herself too quickly.",
    genders: ALL_GENDERS,
    ageRanges: ['45-54', '55+'],
    moods: ['sad', 'nostalgic', 'lonely'],
  },
  {
    id: 57,
    premise: "Your daughter has a boyfriend who looks like the boy you dated at 19. The one who broke it off.",
    genders: ['female', 'other'],
    ageRanges: ['45-54', '55+'],
    moods: ['nostalgic', 'restless', 'hopeful'],
  },
  {
    id: 58,
    premise: "The divorce is final. You bought yourself peonies. You don't know if you always liked them or if you just said you did.",
    genders: ['female', 'other'],
    ageRanges: ['45-54', '55+'],
    moods: ['hopeful', 'restless', 'lonely'],
  },
  {
    id: 59,
    premise: "Your ex-husband has a new wife. She's doing a better job than you did. You're happy about it. Mostly.",
    genders: ['female', 'other'],
    ageRanges: ['45-54', '55+'],
    moods: ['nostalgic', 'hopeful', 'angry'],
  },
  {
    id: 60,
    premise: "The menopause is kinder than you thought. The grief of it isn't what you expected.",
    genders: ['female', 'other'],
    ageRanges: ['45-54', '55+'],
    moods: ['restless', 'sad', 'hopeful'],
  },
  {
    id: 61,
    premise: "Your best friend from school is on the news. She was always going to be. You're not surprised, just proud in a way that feels private.",
    genders: ALL_GENDERS,
    ageRanges: ['45-54', '55+'],
    moods: ['nostalgic', 'happy', 'hopeful'],
  },

  // ─── Male, 45–54 ─────────────────────────────────────────────────────────
  {
    id: 62,
    premise: "The pub you used to drink in has a cocktail menu now. Your stool is still there. So is the barman.",
    genders: ['male', 'other'],
    ageRanges: ['45-54', '55+'],
    moods: ['angry', 'nostalgic', 'sad'],
  },
  {
    id: 63,
    premise: "Your son is taller than you. He hugs you differently.",
    genders: ['male', 'other'],
    ageRanges: ['45-54', '55+'],
    moods: ['nostalgic', 'hopeful', 'sad'],
  },
  {
    id: 64,
    premise: "Your wife's laugh at your brother's joke, across the garden. You remember the first time she laughed at one of yours.",
    genders: ['male', 'other'],
    ageRanges: ['45-54', '55+'],
    moods: ['romantic', 'nostalgic', 'happy'],
  },
  {
    id: 65,
    premise: "The band on TV is younger than your children, and they're good.",
    genders: ALL_GENDERS,
    ageRanges: ['45-54', '55+'],
    moods: ['nostalgic', 'restless', 'hopeful'],
  },
  {
    id: 66,
    premise: "Retirement came early. You don't miss it. You miss the mornings, though. Who you were in them.",
    genders: ALL_GENDERS,
    ageRanges: ['45-54', '55+'],
    moods: ['nostalgic', 'hopeless', 'hopeful'],
  },
  {
    id: 67,
    premise: "Your ex's husband died. You don't know if you're allowed to go to the funeral.",
    genders: ALL_GENDERS,
    ageRanges: ['45-54', '55+'],
    moods: ['restless', 'sad', 'nostalgic'],
  },

  // ─── Female, 55+ ─────────────────────────────────────────────────────────
  {
    id: 68,
    premise: "Your daughter found your old diaries in the attic. She's 28 now — the same age you were when you wrote them. She's calling.",
    genders: ['female', 'other'],
    ageRanges: ['55+'],
    moods: ['nostalgic', 'hopeful', 'sad'],
  },
  {
    id: 69,
    premise: "The man you should have married died last week. You haven't spoken to him in forty years. The drive home from his funeral.",
    genders: ['female', 'other'],
    ageRanges: ['55+'],
    moods: ['nostalgic', 'sad', 'lonely'],
  },
  {
    id: 70,
    premise: "Your grandson asked to learn your mother's language. Your mother is dead. You're not sure you remember enough of it.",
    genders: ALL_GENDERS,
    ageRanges: ['55+'],
    moods: ['nostalgic', 'sad', 'hopeful'],
  },
  {
    id: 71,
    premise: "The hospital bed your husband died in, two years later. His pyjamas are still in the chest of drawers.",
    genders: ['female', 'other'],
    ageRanges: ['55+'],
    moods: ['sad', 'lonely', 'heartbroken'],
  },
  {
    id: 72,
    premise: "A photograph from 1978. Your arm around a friend who has forgotten your name.",
    genders: ALL_GENDERS,
    ageRanges: ['55+'],
    moods: ['nostalgic', 'sad', 'lonely'],
  },
  {
    id: 73,
    premise: "The house is quiet. The dog is new. You didn't think you'd get another one. You don't regret it.",
    genders: ALL_GENDERS,
    ageRanges: ['55+'],
    moods: ['hopeful', 'nostalgic', 'lonely'],
  },
  {
    id: 74,
    premise: "A woman at the bus stop asks if you knew the Mitchells from number 34. You did. You married one of them.",
    genders: ['female', 'other'],
    ageRanges: ['55+'],
    moods: ['nostalgic', 'happy', 'sad'],
  },

  // ─── Male, 55+ ───────────────────────────────────────────────────────────
  {
    id: 75,
    premise: "You're the last one from the band. The rest are dead or on a cruise.",
    genders: ['male', 'other'],
    ageRanges: ['55+'],
    moods: ['nostalgic', 'sad', 'lonely'],
  },
  {
    id: 76,
    premise: "Your son's son has your name. He doesn't know what he's carrying.",
    genders: ['male', 'other'],
    ageRanges: ['55+'],
    moods: ['nostalgic', 'hopeful', 'sad'],
  },
  {
    id: 77,
    premise: "The last cigarette of your life. You don't announce it. You just don't have another one.",
    genders: ALL_GENDERS,
    ageRanges: ['45-54', '55+'],
    moods: ['hopeful', 'restless', 'lonely'],
  },
  {
    id: 78,
    premise: "A woman you once left gets in touch. She's widowed now. She's writing to say no.",
    genders: ['male', 'other'],
    ageRanges: ['55+'],
    moods: ['nostalgic', 'sad', 'lonely'],
  },
  {
    id: 79,
    premise: "Your grandson asks if you were ever in love. You think about whether he means the first time or the last.",
    genders: ['male', 'other'],
    ageRanges: ['55+'],
    moods: ['nostalgic', 'romantic', 'hopeful'],
  },
  {
    id: 80,
    premise: "Your wife's handwriting on a shopping list, three years after she died. Milk, bread, teabags. You stopped using the fridge magnet.",
    genders: ['male', 'other'],
    ageRanges: ['55+'],
    moods: ['sad', 'nostalgic', 'lonely'],
  },

  // ─── Other-specific ──────────────────────────────────────────────────────
  {
    id: 81,
    premise: "The first time you corrected someone on your pronouns and they apologised. You couldn't tell if you felt seen or sorry for them.",
    genders: ['other'],
    ageRanges: ['18-24', '25-34'],
    moods: ['restless', 'hopeful', 'lonely'],
  },
  {
    id: 82,
    premise: "Your mother still uses your old name. You don't correct her anymore.",
    genders: ['other'],
    ageRanges: ['18-24', '25-34', '35-44'],
    moods: ['sad', 'nostalgic', 'lonely'],
  },
  {
    id: 83,
    premise: "A boy on the bus doesn't look twice at you. The relief. The panic.",
    genders: ['other'],
    ageRanges: ['18-24', '25-34'],
    moods: ['restless', 'hopeful', 'lonely'],
  },
  {
    id: 84,
    premise: "Coming home for Christmas, and your grandmother has learnt the new name. She uses it once, then forgets. You love her more than you did last year.",
    genders: ['other'],
    ageRanges: ['25-34', '35-44'],
    moods: ['hopeful', 'nostalgic', 'lonely'],
  },
  {
    id: 85,
    premise: "The first pride where you didn't cry. You didn't know how much you needed to not cry.",
    genders: ['other'],
    ageRanges: ['18-24', '25-34'],
    moods: ['hopeful', 'happy', 'nostalgic'],
  },
  {
    id: 86,
    premise: "A friend from before you came out still calls you by the old name. They're not doing it on purpose. You don't know how to say it.",
    genders: ['other'],
    ageRanges: ['25-34', '35-44'],
    moods: ['sad', 'lonely', 'hopeful'],
  },
  {
    id: 87,
    premise: "You met a partner who has only ever known this version of you. You realise you've been waiting your whole life for that.",
    genders: ['other'],
    ageRanges: ['25-34', '35-44', '45-54'],
    moods: ['romantic', 'hopeful', 'nostalgic'],
  },
  {
    id: 88,
    premise: "Your teenager asks if it was hard. You tell them the truth. They hold your hand.",
    genders: ['other'],
    ageRanges: ['35-44', '45-54'],
    moods: ['hopeful', 'sad', 'nostalgic'],
  },
  {
    id: 89,
    premise: "The funeral of a friend who never lived the way they wanted to. You did. You sit in the back of the church thinking about their hands.",
    genders: ['other'],
    ageRanges: ['45-54', '55+'],
    moods: ['sad', 'nostalgic', 'hopeful'],
  },
  {
    id: 90,
    premise: "Forty years out. The kid you used to be wouldn't recognise you. You're glad.",
    genders: ['other'],
    ageRanges: ['45-54', '55+'],
    moods: ['hopeful', 'nostalgic', 'happy'],
  },

  // ─── Universal (cross-cutting) ───────────────────────────────────────────
  {
    id: 91,
    premise: "The window seat of a plane, taking off from a city you used to live in.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44', '45-54', '55+'],
    moods: ['nostalgic', 'restless', 'hopeful'],
  },
  {
    id: 92,
    premise: "A parking ticket from a date that went badly. You framed it.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44'],
    moods: ['happy', 'nostalgic', 'romantic'],
  },
  {
    id: 93,
    premise: "The Tuesday you realised you hadn't cried in a month.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44', '45-54'],
    moods: ['hopeful', 'restless', 'nostalgic'],
  },
  {
    id: 94,
    premise: "Someone you love, asleep on the sofa. You turn the TV down and watch them for a minute.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44', '45-54', '55+'],
    moods: ['romantic', 'happy', 'hopeful'],
  },
  {
    id: 95,
    premise: "The day you stopped checking their Instagram. You don't remember deciding to.",
    genders: ALL_GENDERS,
    ageRanges: ['18-24', '25-34', '35-44'],
    moods: ['hopeful', 'nostalgic', 'restless'],
  },
  {
    id: 96,
    premise: "The version of the story you tell strangers, and the version that's true.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44', '45-54', '55+'],
    moods: ['restless', 'lonely', 'nostalgic'],
  },
  {
    id: 97,
    premise: "You bought flowers for yourself. You keep them on the table where he used to sit.",
    genders: ['female', 'other'],
    ageRanges: ['25-34', '35-44', '45-54', '55+'],
    moods: ['hopeful', 'nostalgic', 'sad'],
  },
  {
    id: 98,
    premise: "The last voicemail from your father, saved for nine years.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44', '45-54', '55+'],
    moods: ['nostalgic', 'sad', 'lonely'],
  },
  {
    id: 99,
    premise: "The motorway at 5am. You have no reason to be driving.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44', '45-54'],
    moods: ['restless', 'lonely', 'hopeful'],
  },
  {
    id: 100,
    premise: "A song comes on in a cafe. You used to hate it. Today you sit there and listen to the whole thing.",
    genders: ALL_GENDERS,
    ageRanges: ['25-34', '35-44', '45-54', '55+'],
    moods: ['nostalgic', 'hopeful', 'happy'],
  },
];

/**
 * Filter the prompt database by the user's selections.
 *
 * - If the user picks 'prefer_not_to_say', gender is not filtered.
 * - Age range must match exactly.
 * - Moods: require ALL selected moods to be present (strict). If that pool
 *   is smaller than `minPool`, fall back to ANY-mood matching (loose).
 */
export function filterPrompts(
  gender: Gender,
  age: AgeRange,
  moods: Mood[],
  minPool = 3,
): Prompt[] {
  const byGender = (p: Prompt) =>
    gender === 'prefer_not_to_say' || p.genders.includes(gender as Exclude<Gender, 'prefer_not_to_say'>);

  const byAge = (p: Prompt) => p.ageRanges.includes(age);

  const strict = prompts.filter(
    (p) => byGender(p) && byAge(p) && moods.every((m) => p.moods.includes(m)),
  );

  if (strict.length >= minPool || moods.length < 2) {
    return strict;
  }

  const loose = prompts.filter(
    (p) => byGender(p) && byAge(p) && moods.some((m) => p.moods.includes(m)),
  );

  return loose.length > 0 ? loose : prompts.filter(byGender).filter(byAge);
}

export function pickRandom<T>(arr: T[], excludeId?: number): T | null {
  if (arr.length === 0) return null;
  const filtered = excludeId != null
    ? (arr as unknown as Prompt[]).filter((p) => p.id !== excludeId)
    : arr;
  const pool = filtered.length > 0 ? filtered : arr;
  return pool[Math.floor(Math.random() * pool.length)] as T;
}

