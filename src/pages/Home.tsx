import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Phone, 
  Mail, 
  Trophy,
  Medal,
  Award,
  CreditCard,
  Building2
} from "lucide-react";

const Home = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient text-white py-12 sm:py-16 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-4 sm:mb-6 bg-chess-yellow text-chess-black hover:bg-chess-yellow-bright font-bold text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2">
                Season 06 • Register Now
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                CHESS
                <span className="block text-chess-yellow">Tournament</span>
              </h1>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg xl:text-xl">
                <div className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-3">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-chess-yellow flex-shrink-0" />
                  <span className="break-words">06 & 07 September</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-3">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-chess-yellow flex-shrink-0" />
                  <span>08:00 AM</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-chess-yellow flex-shrink-0" />
                  <span className="break-words text-center lg:text-left">J/Nelliady Central College</span>
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-chess-yellow mb-2">
                  Entry Fee: 1000 LKR
                </p>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl">
                  Grand Prize Awaits! 🏆
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
                  <Link to="/register">Register Now</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto border-white text-yellow bg-white/10 hover:bg-white hover:text-black transition-colors duration-200"
                  onClick={() => scrollToSection('details')}
                >
                  View Details
                </Button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
              <div className="relative">
                <div className="w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[400px] bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-2 sm:p-4 shadow-tournament">
                  <img 
                    src="/posters/NCC 1.png" 
                    alt="NCC Chess Tournament Season 06 Poster" 
                    className="w-full h-auto object-contain rounded-xl sm:rounded-2xl"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-full h-full bg-chess-yellow/20 rounded-xl sm:rounded-2xl items-center justify-center">
                    <Trophy className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 text-chess-yellow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Details Section */}
      <section id="details" className="py-12 sm:py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Tournament Details</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">Everything you need to know</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="text-center p-4 sm:p-6 bg-gradient-to-br from-chess-yellow/5 to-chess-yellow/10">
              <CardContent className="pt-4 sm:pt-6">
                <Calendar className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-chess-yellow mx-auto mb-3 sm:mb-4" />
                <h3 className="font-bold text-base sm:text-lg mb-2">Date</h3>
                <p className="text-sm sm:text-base text-muted-foreground">06 & 07 September</p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 sm:p-6 bg-gradient-to-br from-chess-yellow/5 to-chess-yellow/10">
              <CardContent className="pt-4 sm:pt-6">
                <Clock className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-chess-yellow mx-auto mb-3 sm:mb-4" />
                <h3 className="font-bold text-base sm:text-lg mb-2">Time</h3>
                <p className="text-sm sm:text-base text-muted-foreground">08:00 AM Start</p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 sm:p-6 bg-gradient-to-br from-chess-yellow/5 to-chess-yellow/10">
              <CardContent className="pt-4 sm:pt-6">
                <MapPin className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-chess-yellow mx-auto mb-3 sm:mb-4" />
                <h3 className="font-bold text-base sm:text-lg mb-2">Venue</h3>
                <p className="text-sm sm:text-base text-muted-foreground break-words">J/Nelliady Central College</p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 sm:p-6 bg-gradient-to-br from-chess-yellow/5 to-chess-yellow/10">
              <CardContent className="pt-4 sm:pt-6">
                <Users className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-chess-yellow mx-auto mb-3 sm:mb-4" />
                <h3 className="font-bold text-base sm:text-lg mb-2">Organizer</h3>
                <p className="text-sm sm:text-base text-muted-foreground break-words">Nelliady Chess Club (NCC)</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Information</h3>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-chess-yellow flex-shrink-0" />
                <span className="text-base sm:text-lg break-all">074 123 1133</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-chess-yellow flex-shrink-0" />
                <span className="text-base sm:text-lg break-all">nelliadychess@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Prizes & Recognition</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">Celebrate excellence in chess</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <Card className="text-center p-4 sm:p-6 border-chess-yellow shadow-glow-yellow bg-gradient-to-br from-chess-yellow/10 to-amber-50">
              <CardContent className="pt-4 sm:pt-6">
                <Trophy className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-chess-yellow mx-auto mb-3 sm:mb-4" />
                <h3 className="font-bold text-lg sm:text-xl mb-2 text-chess-yellow">1st Place</h3>
                <p className="text-base sm:text-lg">Champion + Medal</p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 sm:p-6 bg-gradient-to-br from-chess-yellow/5 to-chess-yellow/10">
              <CardContent className="pt-4 sm:pt-6">
                <Medal className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                <h3 className="font-bold text-lg sm:text-xl mb-2">2nd Place</h3>
                <p className="text-base sm:text-lg">Champion + Medal</p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 sm:p-6 md:col-span-2 lg:col-span-1 bg-gradient-to-br from-amber-50 to-amber-100">
              <CardContent className="pt-4 sm:pt-6">
                <Award className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-amber-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="font-bold text-lg sm:text-xl mb-2">3rd Place</h3>
                <p className="text-base sm:text-lg">Champion + Medal</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="text-center p-4 sm:p-6 bg-gradient-to-br from-chess-yellow/5 to-chess-yellow/10">
              <CardContent className="pt-4 sm:pt-6">
                <Medal className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                <h3 className="font-bold text-base sm:text-lg mb-2">4th & 5th Place</h3>
                <p className="text-sm sm:text-base">Medal</p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 sm:p-6 bg-gradient-to-br from-chess-yellow/5 to-chess-yellow/10">
              <CardContent className="pt-4 sm:pt-6">
                <Award className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                <h3 className="font-bold text-base sm:text-lg mb-2">All Participants</h3>
                <p className="text-sm sm:text-base">Certificate of Participation</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <img 
              src="/posters/NCC 2.png" 
              alt="Prize Details Poster" 
              className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded-lg sm:rounded-xl shadow-tournament"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* Payment Details Section */}
      <section id="payment" className="py-12 sm:py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Bank Details</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">Payment information for registration</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-start mb-4">
                  <Building2 className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-chess-yellow mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold break-words">Bank of Ceylon (BOC)</h3>
                </div>
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base lg:text-lg">
                  <p><span className="font-semibold">Name:</span> <span className="break-words">M. Thushanth</span></p>
                  <p><span className="font-semibold">Branch:</span> <span className="break-words">Nelliady</span></p>
                  <p><span className="font-semibold">Account:</span> <span className="break-all">7396371</span></p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-start mb-4">
                  <CreditCard className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-chess-yellow mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold break-words">Commercial Bank</h3>
                </div>
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base lg:text-lg">
                  <p><span className="font-semibold">Name:</span> <span className="break-words">G. Thuvaragan</span></p>
                  <p><span className="font-semibold">Branch:</span> <span className="break-words">Nelliady</span></p>
                  <p><span className="font-semibold">Account:</span> <span className="break-all">8001613595</span></p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="bg-chess-yellow/10 border border-chess-yellow rounded-lg p-4 sm:p-6 max-w-2xl mx-auto mb-6 sm:mb-8">
              <p className="text-sm sm:text-base lg:text-lg font-semibold text-chess-black">
                ⚠️ Important: Keep your deposit slip or payment reference number. 
                You'll need to enter it during registration.
              </p>
            </div>

            <img 
              src="/posters/bank1.jpeg" 
              alt="Bank Details Poster" 
              className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded-lg sm:rounded-xl shadow-tournament"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-chess-black text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
            <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-chess-yellow" />
            <span className="text-lg sm:text-xl lg:text-2xl font-bold break-words">Nelliady Chess Club</span>
          </div>
          <p className="text-base sm:text-lg mb-3 sm:mb-4">Follow us on social media</p>
          <p className="text-chess-yellow font-semibold text-lg sm:text-xl break-words">@NelliadyChessClub</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;