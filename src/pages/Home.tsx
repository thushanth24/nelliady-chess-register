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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-chess-yellow text-chess-black hover:bg-chess-yellow-bright font-bold text-sm px-4 py-2">
                Season 06 • Register Now
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                CHESS
                <span className="block text-chess-yellow">Tournament</span>
              </h1>
              
              <div className="space-y-4 mb-8 text-lg lg:text-xl">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Calendar className="h-6 w-6 text-chess-yellow" />
                  <span>06 & 07 September</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Clock className="h-6 w-6 text-chess-yellow" />
                  <span>08:00 AM</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <MapPin className="h-6 w-6 text-chess-yellow" />
                  <span>J/Nelliady Central College</span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-2xl lg:text-3xl font-bold text-chess-yellow mb-2">
                  Entry Fee: 1000 LKR
                </p>
                <p className="text-xl lg:text-2xl">
                  Grand Prize Awaits! 🏆
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild variant="hero" size="lg">
                  <Link to="/register">Register Now</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-black"
                  onClick={() => scrollToSection('details')}
                >
                  View Details
                </Button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-tournament">
                  <img 
                    src="/posters/NCC-1.png" 
                    alt="NCC Chess Tournament Season 06 Poster" 
                    className="w-full h-full object-cover rounded-2xl"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-full h-full bg-chess-yellow/20 rounded-2xl flex items-center justify-center">
                    <Trophy className="h-24 w-24 text-chess-yellow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Details Section */}
      <section id="details" className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Tournament Details</h2>
            <p className="text-xl text-muted-foreground">Everything you need to know</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Calendar className="h-12 w-12 text-chess-yellow mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Date</h3>
                <p className="text-muted-foreground">06 & 07 September</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-chess-yellow mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Time</h3>
                <p className="text-muted-foreground">08:00 AM Start</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <MapPin className="h-12 w-12 text-chess-yellow mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Venue</h3>
                <p className="text-muted-foreground">J/Nelliady Central College</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-chess-yellow mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Organizer</h3>
                <p className="text-muted-foreground">Nelliady Chess Club (NCC)</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-chess-yellow" />
                <span className="text-lg">074 123 1133</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-chess-yellow" />
                <span className="text-lg">nelliadychess@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Prizes & Recognition</h2>
            <p className="text-xl text-muted-foreground">Celebrate excellence in chess</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="text-center p-6 border-chess-yellow shadow-glow-yellow">
              <CardContent className="pt-6">
                <Trophy className="h-16 w-16 text-chess-yellow mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2 text-chess-yellow">1st Place</h3>
                <p className="text-lg">Champion + Medal</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Medal className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">2nd Place</h3>
                <p className="text-lg">Champion + Medal</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Award className="h-16 w-16 text-amber-600 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">3rd Place</h3>
                <p className="text-lg">Champion + Medal</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Medal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">4th & 5th Place</h3>
                <p>Medal</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">All Participants</h3>
                <p>Certificate of Participation</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <img 
              src="/posters/NCC-2.png" 
              alt="Prize Details Poster" 
              className="mx-auto max-w-md h-auto rounded-xl shadow-tournament"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* Payment Details Section */}
      <section id="payment" className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Bank Details</h2>
            <p className="text-xl text-muted-foreground">Payment information for registration</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Building2 className="h-8 w-8 text-chess-yellow mr-3" />
                  <h3 className="text-2xl font-bold">Bank of Ceylon (BOC)</h3>
                </div>
                <div className="space-y-3 text-lg">
                  <p><span className="font-semibold">Name:</span> M. Thushanth</p>
                  <p><span className="font-semibold">Branch:</span> Nelliady</p>
                  <p><span className="font-semibold">Account:</span> 7396371</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="h-8 w-8 text-chess-yellow mr-3" />
                  <h3 className="text-2xl font-bold">Commercial Bank</h3>
                </div>
                <div className="space-y-3 text-lg">
                  <p><span className="font-semibold">Name:</span> G. Thuvaragan</p>
                  <p><span className="font-semibold">Branch:</span> Nelliady</p>
                  <p><span className="font-semibold">Account:</span> 8001613595</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="bg-chess-yellow/10 border border-chess-yellow rounded-lg p-6 max-w-2xl mx-auto mb-8">
              <p className="text-lg font-semibold text-chess-black">
                ⚠️ Important: Keep your deposit slip or payment reference number. 
                You'll need to enter it during registration.
              </p>
            </div>

            <img 
              src="/posters/bank.jpeg" 
              alt="Bank Details Poster" 
              className="mx-auto max-w-md h-auto rounded-xl shadow-tournament"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-chess-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Trophy className="h-8 w-8 text-chess-yellow" />
            <span className="text-2xl font-bold">Nelliady Chess Club</span>
          </div>
          <p className="text-lg mb-4">Follow us on social media</p>
          <p className="text-chess-yellow font-semibold text-xl">@NelliadyChessClub</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;