import { useState } from "react";
import { Copy } from "lucide-react"; // Install lucide-react if not already: npm install lucide-react
import upiQrcode from '../../Other_Data/UPI_Qrcode.jpeg'

export default function Donate() {
  const upiId = "adars94276022@barodampay"; // Change to your real UPI ID
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Hide copied message after 2s
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Donate</h1>

      {/* QR Code */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={upiQrcode}
          alt="UPI QR Code"
          className="w-64 h-64 object-contain border p-2 rounded-lg shadow-md"
        />
      </div>

      {/* UPI ID with copy button */}
      <div className="flex items-center justify-center mb-6">
        <span className="text-lg font-semibold mr-2">{upiId}</span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          <Copy size={18} />
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>

      {/* Context / Hardcoded Text */}
      <p className="text-gray-700 leading-relaxed text-justify">
      શાળામાં મોટેભાગે ગરીબ અને મધ્યમ વર્ગના બાળકો અભ્યાસ કરે છે. આ બાળકો પાસેથી કોઈપણ પ્રકારની ફી લેવામાં આવતી નથી. વિવિધ દાતાઓના દાન થકી મફત શિક્ષણ આપવામાં આવે છે. દાતાશ્રીઓના દાણ થકી શાળામાં ભૌતિક સુવિધાઓ પણ ઊભી કરવામાં આવી છે, પણ સમય પ્રમાણે અને નવા જમાના પ્રમાણે બીજી કેટલીક વધુ સુવિધાઓ પણ કરવી જરૂરી છે. જેથી ગામડાના બાળકો પણ શહેરની મોટી મોટી પ્રાઇવેટ શાળાઓની સાથે હરોળમાં ઊભા રહી શકે અને પોતે મેળવેલું શિક્ષણ નિમ્ન કક્ષાનું નથી એવો ભાવ પેદા કરી શકે એ માટે દાતાઓ આવકાર્ય છે. સૌ દાતાઓને વિનંતી છે કે ભગવાને તમને ઘણું આપ્યું હશે, તેમાંથી શાળા અને વિદ્યાર્થીઓ માટે ઉદાર હાથે દાન આપશો તેવી અપેક્ષા. અહીં રજૂ કરેલ ક્યુ. આર. કોડ સ્કેન કરીને આપ ઓનલાઇન દાન આપી શકો છો. સાથે આપેલ શાળાના આચાર્યશ્રીના મોબાઈલ નંબર પર આપ આપની ઈચ્છા દર્શાવશો અથવા શાળાની રૂબરૂ મુલાકાત લઈ શકો છો. આપેલ દાનની 80G ની પાવતી પણ આપવામાં આવશે જેથી ઇન્કમટેક્સમાં રાહત પણ મેળવી શકાય છે.<br></br>
      <h4 className="text-1xl font-bold mb-6 text-red-500">આચાર્યશ્રી, જગદીશ પટેલ<br></br>
      મોબાઈલ નંબર +91 9428752528</h4>
      </p>
    </div>
  );
}
