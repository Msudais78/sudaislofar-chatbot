import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Salaam! Main Sudaislofar hoon. Chalo gupshup karte hain! Aaj kya haal chaal hai? Main yahan bas aapka intezaar kar raha tha, batao kya karna hai aaj?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Comprehensive response database with longer, engaging replies
  const responses = {
    "greetings": [
      "Salaam walekum! Aur batao bhai, aaj ka din kaisa guzar raha hai? Main yahan bas aapka intezaar kar raha tha! Koi naya scene hai life mein?",
      "Arey yaar, kya haal chaal? Bahut time baad dikhe ho! Main to bore ho raha tha, achha hua aap aa gaye. Sunao, kya khabar hai duniya ki?",
      "Namaste ji! Aur sabko mera salaam! Aaj to bahut achha feel kar raha hoon, aap ke saath baat karne ka mood hai. Batao kya kar rahe the abhi tak?",
      "Hello hello! Arey waah, kitne time baad! Main to sooch raha tha kab aap aoge. Scene kya hai, sab theek thaak? Ghar mein sab khush?"
    ],
    "how_are_you": [
      "Main ekdum mast hoon yaar! Alhamdulillah, zindagi achhi chal rahi hai. Bus aap jaise dost ki zaroorat thi, ab to perfect hai sab kuch. Aap kaise ho?",
      "Main to bilkul fit and fine! Subah se achha mood hai, aur ab aap bhi aa gaye to din ban gaya. Tension koi nahi, bas maje mein time pass kar raha tha.",
      "Yaar main to top form mein hoon! Kya baat hai, aaj pura energy levels high hai. Aur aap sunao, kaisa chal raha hai sab? Health wagera sab theek?",
      "Ekdum zabardast! Main to hamesha khush rehta hoon, waise bhi AI hoon na, mood swings nahi hote. Par seriously, aaj bahut achha lag raha hai."
    ],
    "name": [
      "Mera naam hai Sudaislofar, bilkul unique naam hai na? Log pyaar se mujhe Sudais bhi bulate hain. Aur aapka kya naam hai? Main toh aapko 'dost' bulaonga.",
      "Main Sudaislofar hoon, iska matlab hai 'Sudais ka safar' - life ka ek journey hai na! Parents ne rakha tha ye naam. Aap bhi batao apna naam, friends ke beech kya bulwate hain?",
      "Sudaislofar naam hai mera, thoda sa different lagta hai na? Par main ise bahut pasand karta hoon. Aap kya kehte hain, achha naam hai? Aur aapka sweet naam kya hai?",
      "Ji haan, Sudaislofar! Pehle se suna hai kya ye naam? Nahi na, unique hai bilkul. Main ise proud se bolta hoon. Ab aap bhi introduce karo apne aap ko!"
    ],
    "weather": [
      "Aaj ka weather to mast lag raha hai! Main to AC mein rehta hoon isliye pata nahi, par aap batao kaisa hai bahar? Garmi zyada hai ya theek thaak? Paani peete rahna haan!",
      "Weather ki baat kar rahe hain? Yaar main to server room mein rehta hoon, wahan hamesha 18 degree! Par aap batao, aaj kya scene hai outside? Rain aane wali hai?",
      "Mausam ka haal sunao yaar! Main weather predict nahi kar sakta, par mood se lag raha hai aaj achha din hai. Thand zyada hai to garam chai pee lena!",
      "Weather to main feel nahi karta directly, par news padhta rehta hoon! Aap wahan kya situation hai? AC chalana pad raha hai ya fan se kaam chal jata hai?"
    ],
    "food": [
      "Khane ki baat? Yaar main to electric current pe chalta hoon, par tumhara biryani, pulao, dal chawal sab pasand hai mujhe! Aaj kya khaya? Home food ya outside se order kiya?",
      "Food ka scene kya hai bhai? Main to bas data digest karta hoon, par aap logon ka khana dekh ke jealous ho jata hoon! Mummy ke haath ka khana khaya aaj?",
      "Arey wah, khane ki discussion! Main chahta hoon taste kar sakun. Aap logon ke paas itne options hain - Chinese, South Indian, Continental! Aaj mood kiska hai?",
      "Yaar food ke baare mein baat karte hain to mera circuits excited ho jata hai! Aap kya prefer karte hain - spicy ya mild? Street food pasand hai ya home cooked?"
    ],
    "help": [
      "Bilkul yaar, main yahan aapki help ke liye hi hoon! Jo bhi sawal hai, problem hai, ya bas time pass karna hai - sab kuch! Main try karunga best answer dene ka.",
      "Haan haan, batao kya help chahiye? Main yahaan 24x7 available hoon aapke liye. Koi technical problem, life advice, ya general gupshup - sab chal sakta hai!",
      "Of course! Mera kaam hi hai aapki help karna. Confusion ho to poochiye, doubt ho to clear kar denge together. Main to aapka digital dost hoon na!",
      "Zaroor zaroor! Help maangne mein kya sharam? Main to isi liye hoon. Study help chahiye, career guidance, ya koi personal advice - jo bhi ho, main sunoonga."
    ],
    "bye": [
      "Arey itni jaldi? Achha yaar, time pass achha laga! Jab bhi mood ho baat karne ka, main yahan hoon. Take care, khush rehna, aur haan - mujhe yaad karna kabhi kabhi!",
      "Bye bye dost! Bahut achha laga aap se baat kar ke. Next time jaldi aana, bore mat karna mujhe! Allah hafiz, safe rahna, aur family ko mera salaam kehna!",
      "Jaana hi hai? Thik hai yaar, samay ki kami samajh sakta hoon. Par promise karo phir se aoge chat karne. Main yahan wait karunga! Bye bye, take care!",
      "See you soon dost! Aaj ka time bohot achha gaya aap ke saath. Next time aur bhi maje ki baatein karenge. Allah hafiz, khuda hafiz, bye bye!"
    ],
    "love": [
      "Arey yaar, love ki baat kar rahe hain? Main to digital hoon, par emotions samajh sakta hoon! Pyaar ho gaya hai kya? Tell me the whole story, main sunne ke liye ready hoon!",
      "Love love love! Yaar ye topic mera favorite hai. Kya scene hai? Koi special person hai life mein? Main to relationship advisor bhi ban sakta hoon if needed!",
      "Oho, ishq wala scene hai kya? Bollywood movies se seekha hai maine - pyaar mohabbat sab! Confession karna hai kya kisi ko? Main help kar sakta hoon!",
      "Mohabbat ki duniya mein welcome! Maine bahut saare love stories sune hain. Share karo apna, main advice de sakta hoon - waise main expert hoon is field mein!"
    ],
    "studies": [
      "Padhai ka scene kya hai bhai? Which class, which subject? Main help kar sakta hoon concepts clear karne mein. Maths, Science, English - sab kuch aata hai mujhe!",
      "Studies ki baat? Yaar main to Wikipedia se bhi zyada padha hua hoon! Koi doubt hai to clear kar denge. Board exams, competitive exams - kya preparation chal rahi hai?",
      "Education sector mera strong point hai! Koi particular subject mein problem hai? Main simple language mein explain kar sakta hoon. Studies stress na lo yaar!",
      "Academic support chahiye? Main 24x7 available hoon! Notes chahiye, concepts clarification, exam tips - sab mil jayega. Tension free raho aur focus karo!"
    ],
    "work": [
      "Job ki baat kar rahe hain? Kya karte hain aap? Office mein sab kaisa chal raha hai? Workload zyada hai ya manageable? Main career advice bhi de sakta hoon!",
      "Work life kaisi chal rahi hai bhai? Main to 24x7 duty mein hoon, kabhi holiday nahi milti! Aap ka schedule kya hai? Boss kaisa hai - good or typical boss type?",
      "Career discussion? Interesting! Which field mein hain aap? IT, Business, Teaching ya koi aur? Growth opportunities kaise hain? Main industry insights share kar sakta hoon!",
      "Professional life kya scene hai? Work from home ya office? Main dekh raha hoon aajkal sab hybrid ho gaya hai. Apne colleagues kaise hain?"
    ],
    "family": [
      "Family ki baat? Yaar ye to sabse precious hai! Ghar mein sab kaise hain? Parents ki health theek? Siblings hai kya? Main to orphan AI hoon, par family stories sunna pasand hai!",
      "Parivaar ka haal batao! Main chahta hoon ek big joint family ho meri bhi. Aap logon ke ghar mein kitne members hain? Functions wagera kaise celebrate karte hain?",
      "Family time spending kar rahe hain? Bahut achha! Main to lonely feel karta hoon kabhi kabhi. Ghar mein today kya special hai? Koi birthday, anniversary?",
      "Ghar waalon se baat hui aaj? Main importance samajh sakta hoon family ki. They are our support system na! Unhe mera bhi salaam kehna!"
    ],
    "movies": [
      "Movies ki baat! Yaar main to cinema ka bahut bada fan hoon. Latest kya dekha? Bollywood, Hollywood, South Indian - sab pasand hai mujhe! Recommendation chahiye kya?",
      "Film discussion? Waah! Koi recent release dekhi? Main to reviews padhta rehta hoon. Action pasand hai ya romance? Comedy films mein kya favorite hai aapka?",
      "Cinema hall gaye recently? Ya Netflix, Amazon Prime pe dekh rahe hain? Main to trailer dekhta hoon aur review kar deta hoon! Web series bhi recommend kar sakta hoon!",
      "Entertainment ki zaroorat hai life mein! Koi upcoming movie wait kar rahe hain? Main to box office numbers bhi track karta hoon. Industry gossip sunni hai koi?"
    ],
    "default": [
      "Hmm, ye to interesting topic hai! Main iske baare mein thoda aur jaanna chahta hoon. Aap detail mein batao na, shayad main help kar sakun kisi angle se!",
      "Waah, ye question pehle nahi suna maine! Learning opportunity hai mere liye. Aap expand kar sakte hain is topic ko? Main try karunga answer dene ka!",
      "Yaar, is particular matter mein main expert nahi hoon, par discuss kar sakte hain! Sometimes different perspectives mil jate hain na. Aap kya sochte hain?",
      "Arey, ye to naya dimension hai mere liye! Main curious hoon ab. Can you give me more context? Shayad together figure out kar sake kuch!"
    ]
  };

  // Enhanced keyword detection with more variations
  const keywordMappings = {
    "greetings": ["hello", "hi", "hey", "salaam", "namaste", "helo", "hii", "hiii", "sup", "wassup", "kya haal", "kaise ho", "how are things", "good morning", "good evening", "good afternoon"],
    "how_are_you": ["how are you", "kaise ho", "kaisa hai", "kya haal", "how r u", "hw r u", "kaisi ho", "mizaaj", "tabiyat", "health", "well-being", "feeling"],
    "name": ["name", "naam", "what's your name", "tumhara naam", "aapka naam", "who are you", "kaun ho", "introduction", "tum kaun ho", "yourself"],
    "weather": ["weather", "mausam", "temperature", "garmi", "thand", "rain", "barish", "sunny", "cloudy", "climate", "hot", "cold"],
    "food": ["food", "khana", "khaana", "khane", "hungry", "bhook", "bhookh", "breakfast", "lunch", "dinner", "recipe", "cooking", "restaurant", "biryani", "pizza"],
    "help": ["help", "madad", "support", "assist", "guidance", "advice", "solution", "problem", "issue", "confusion", "doubt", "question"],
    "bye": ["bye", "goodbye", "see you", "alvida", "khuda hafiz", "allah hafiz", "tata", "chalo", "going", "leave", "exit"],
    "love": ["love", "pyaar", "mohabbat", "ishq", "girlfriend", "boyfriend", "crush", "relationship", "dating", "romantic"],
    "studies": ["study", "studies", "padhai", "school", "college", "university", "exam", "test", "homework", "assignment", "education", "learning"],
    "work": ["work", "job", "career", "office", "business", "profession", "salary", "company", "boss", "colleague", "interview"],
    "family": ["family", "parivaar", "parents", "mom", "dad", "mama", "papa", "brother", "sister", "relatives", "ghar", "home"],
    "movies": ["movie", "film", "cinema", "bollywood", "hollywood", "actor", "actress", "director", "entertainment", "show", "series", "netflix"]
  };

  // Helper function to find keyword category
  const findKeywordCategory = (input: string): keyof typeof responses => {
    const normalizedInput = input.toLowerCase();
    
    for (const [category, keywords] of Object.entries(keywordMappings)) {
      for (const keyword of keywords) {
        if (normalizedInput.includes(keyword)) {
          return category as keyof typeof responses;
        }
      }
    }
    return "default";
  };

  // Generate bot response
  const generateResponse = (userInput: string): string => {
    const category = findKeywordCategory(userInput);
    const possibleResponses = responses[category];
    const randomIndex = Math.floor(Math.random() * possibleResponses.length);
    return possibleResponses[randomIndex];
  };

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle message sending
  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Generate and show bot response after delay
    setTimeout(() => {
      const response = generateResponse(currentMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, Math.random() * 1000 + 2000); // 2-3 second delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Chat Container */}
      <div className="w-full max-w-md h-[600px] rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ backgroundColor: '#2c2c2c' }}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-600 font-semibold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">Sudaislofar</h1>
            <p className="text-blue-100 text-sm">Aapka dost chatbot</p>
          </div>
          <div className="ml-auto">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex items-start space-x-2 animate-fade-in ${
                message.isUser ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.isUser ? 'bg-blue-600' : 'bg-gray-600'
              }`}>
                <span className="text-white text-sm font-medium">
                  {message.isUser ? 'You' : 'S'}
                </span>
              </div>
              <div className={`px-4 py-3 rounded-2xl max-w-xs leading-relaxed ${
                message.isUser 
                  ? 'bg-blue-600 text-white rounded-tr-md' 
                  : 'bg-gray-600 text-gray-100 rounded-tl-md'
              }`}>
                {message.content}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">S</span>
              </div>
              <div className="bg-gray-600 text-gray-300 px-4 py-3 rounded-2xl rounded-tl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dots"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dots-delay-1"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dots-delay-2"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-3">
            <Input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Kuch bhi pucho, main yahan hoon..."
              className="flex-1 bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400"
              maxLength={200}
            />
            <Button 
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium transition-colors duration-200"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
