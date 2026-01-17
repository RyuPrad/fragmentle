export default function HowToPlay() {
  return (
    <div className="max-w-xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        How to Play
      </h1>

      <p className="text-gray-600">
        Guess the hidden word by selecting its <strong>morphemes</strong> — the 
        building blocks of words: prefixes, roots, and suffixes.
      </p>

      <div className="space-y-6">
        <Section title="1. Build Your Guess">
          <p>
            Select morphemes from the palette to build a word. Each puzzle tells 
            you how many parts the word has (usually 3: prefix + root + suffix).
          </p>
        </Section>

        <Section title="2. Submit & Get Feedback">
          <div className="space-y-3 mt-3">
            <FeedbackExample 
              color="bg-green-500" 
              label="Correct morpheme, correct position"
              example="UN-"
            />
            <FeedbackExample 
              color="bg-yellow-500" 
              label="Correct morpheme, wrong position"
              example="ABLE"
            />
            <FeedbackExample 
              color="bg-gray-400" 
              label="Morpheme not in the word"
              example="PRE-"
            />
          </div>
        </Section>

        <Section title="3. Win in 6 Guesses">
          <p>
            Use the feedback to narrow down the answer. You have 6 attempts to 
            find the correct combination.
          </p>
        </Section>

        <Section title="Example">
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-gray-600 mb-3">Target word: <strong>UNCOMFORTABLE</strong></p>
            
            <div className="flex gap-2">
              <Tile color="bg-gray-400">RE-</Tile>
              <Tile color="bg-gray-400">PLAY</Tile>
              <Tile color="bg-yellow-500">-ABLE</Tile>
            </div>
            <p className="text-xs text-gray-500">-ABLE is in the word but might be in a different context</p>
            
            <div className="flex gap-2 mt-2">
              <Tile color="bg-green-500">UN-</Tile>
              <Tile color="bg-gray-400">BREAK</Tile>
              <Tile color="bg-green-500">-ABLE</Tile>
            </div>
            <p className="text-xs text-gray-500">UN- and -ABLE are correct!</p>
            
            <div className="flex gap-2 mt-2">
              <Tile color="bg-green-500">UN-</Tile>
              <Tile color="bg-green-500">COMFORT</Tile>
              <Tile color="bg-green-500">-ABLE</Tile>
            </div>
            <p className="text-xs text-gray-500">🎉 Correct!</p>
          </div>
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="font-semibold text-gray-800 mb-2">{title}</h2>
      <div className="text-gray-600 text-sm">{children}</div>
    </div>
  )
}

function FeedbackExample({ color, label, example }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`${color} text-white px-3 py-1 rounded font-medium text-sm`}>
        {example}
      </div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  )
}

function Tile({ color, children }) {
  return (
    <div className={`${color} text-white px-3 py-2 rounded font-medium text-sm`}>
      {children}
    </div>
  )
}