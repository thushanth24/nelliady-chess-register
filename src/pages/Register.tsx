import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2, Trophy, CheckCircle, Copy } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  nameWithInitials: z.string().min(2, "Name with initials is required"),
  fideId: z.string().optional(),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  gender: z.enum(["Male", "Female", "Prefer not to say"], {
    required_error: "Please select your gender",
  }),
  contactNumber: z.string()
    .regex(/^(\+94|0)[0-9]{9}$/, "Please enter a valid Sri Lankan phone number"),
  ageCategory: z.enum(["U6", "U8", "U10", "U12", "U14", "U16", "Open"], {
    required_error: "Please select an age category",
  }),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms",
  }),
  honeypot: z.string().max(0, "Bot detected"),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationForm | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      honeypot: "",
    },
  });

  const watchedDate = watch("dateOfBirth");
  const watchedGender = watch("gender");
  const watchedAgeCategory = watch("ageCategory");
  const watchedAgreeToTerms = watch("agreeToTerms");

  const onSubmit = async (data: RegistrationForm) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call - In real implementation, this would go to Supabase
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, we'll just show success
      setRegistrationData(data);
      setIsSuccess(true);
      
      toast({
        title: "Registration Successful!",
        description: "Your tournament registration has been submitted.",
        variant: "default",
      });
      
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateReference = () => {
    return `NCC-${Date.now().toString().slice(-6)}`;
  };

  const copyReference = () => {
    const reference = generateReference();
    navigator.clipboard.writeText(reference);
    toast({
      title: "Reference Copied!",
      description: "Registration reference has been copied to clipboard.",
    });
  };

  const registerAnother = () => {
    setIsSuccess(false);
    setRegistrationData(null);
    reset();
  };

  if (isSuccess && registrationData) {
    return (
      <div className="min-h-screen bg-muted/50 py-6 sm:py-8 lg:py-12 overflow-x-hidden">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-success shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <CardTitle className="text-2xl text-success">Registration Successful!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Registration Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div><span className="font-medium">Name:</span> {registrationData.fullName}</div>
                  <div><span className="font-medium">Category:</span> {registrationData.ageCategory}</div>
                  <div><span className="font-medium">Contact:</span> {registrationData.contactNumber}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
              
                <Button 
                  asChild
                  variant="outline"
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 border-green-300"
                >
                  <a 
                    href="https://chat.whatsapp.com/DMgHeHloJyf5BBucdp1nv6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.498 14.382v-.002c-.301-.15-1.767-.868-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.963-.944 1.16-.174.199-.347.224-.646.075-.3-.15-1.27-.466-2.42-1.485-.894-.794-1.484-1.76-1.66-2.06-.174-.3-.02-.462.13-.61.136-.135.3-.345.45-.523.146-.18.194-.3.296-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.62-.922-2.206-.24-.584-.487-.5-.673-.51-.172-.008-.371-.01-.571-.01-.2 0-.523.074-.797.36-.273.3-1.05 1.02-1.05 2.48s1.07 2.88 1.225 3.075c.15.195 2.1 3.195 5.1 4.485.715.3 1.27.48 1.71.63.715.226 1.37.194 1.89.12.574-.08 1.767-.72 2.016-1.425.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.36m-5.446 7.443h-.016a7.2 7.2 0 01-3.9-1.13l-.3-.18-3.12.82.84-3.045-.2-.314a7.19 7.19 0 01-1.1-3.84 7.25 7.25 0 012.17-5.13 7.25 7.25 0 015.12-2.13h.06c1.92 0 3.75.75 5.12 2.12a7.25 7.25 0 012.13 5.13 7.19 7.19 0 01-2.12 5.13 7.13 7.13 0 01-5.04 2.12M20.52 3.45A11 11 0 0012.07 0h-.14A11 11 0 00.99 16.6L0 24l7.57-1.98a11.02 11.02 0 004.5.96h.06a11 11 0 007.8-18.75"/>
                    </svg>
                    Join WhatsApp Group
                  </a>
                </Button>
                <Button 
                  onClick={registerAnother}
                  variant="tournament"
                  className="flex-1"
                >
                  Register Another Player
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>Thank you for registering! Join our WhatsApp group for updates.</p>
                <p className="mt-1">For any questions, contact: 074 123 1133</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50 py-6 sm:py-8 lg:py-12 overflow-x-hidden">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
            <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-chess-yellow" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words">Tournament Registration</h1>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground break-words">Chess Tournament – Season 06</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Player Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                {...register("honeypot")}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    placeholder="Enter your full name"
                    className="w-full"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive break-words">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nameWithInitials">Name with Initials *</Label>
                  <Input
                    id="nameWithInitials"
                    {...register("nameWithInitials")}
                    placeholder="e.g., A.B. Smith"
                    className="w-full"
                  />
                  {errors.nameWithInitials && (
                    <p className="text-sm text-destructive break-words">{errors.nameWithInitials.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fideId">FIDE ID (Optional)</Label>
                <Input
                  id="fideId"
                  {...register("fideId")}
                  placeholder="Enter your FIDE ID if you have one"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Date of Birth *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !watchedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watchedDate ? format(watchedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={watchedDate}
                      onSelect={(date) => date && setValue("dateOfBirth", date)}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                {errors.dateOfBirth && (
                  <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Gender *</Label>
                <RadioGroup
                  value={watchedGender}
                  onValueChange={(value) => setValue("gender", value as any)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Prefer not to say" id="prefer-not-to-say" />
                    <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                  </div>
                </RadioGroup>
                {errors.gender && (
                  <p className="text-sm text-destructive">{errors.gender.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <Input
                    id="contactNumber"
                    {...register("contactNumber")}
                    placeholder="077 123 4567"
                    className="w-full"
                  />
                  {errors.contactNumber && (
                    <p className="text-sm text-destructive break-words">{errors.contactNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Age Category *</Label>
                  <Select value={watchedAgeCategory} onValueChange={(value) => setValue("ageCategory", value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="U6">Under 6</SelectItem>
                      <SelectItem value="U8">Under 8</SelectItem>
                      <SelectItem value="U10">Under 10</SelectItem>
                      <SelectItem value="U12">Under 12</SelectItem>
                      <SelectItem value="U14">Under 14</SelectItem>
                      <SelectItem value="U16">Under 16</SelectItem>
                      <SelectItem value="Open">Open</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.ageCategory && (
                    <p className="text-sm text-destructive">{errors.ageCategory.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Information</h3>
                <div className="text-sm text-muted-foreground">
                  <p>Please make the payment to one of the following accounts:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Bank of Ceylon (BOC): 7396371 - M. Thushanth</li>
                    <li>Commercial Bank: 8001613595 - G. Thuvaragan</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={watchedAgreeToTerms}
                    onCheckedChange={(checked) => setValue("agreeToTerms", checked as boolean)}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    I confirm the above details are correct *
                  </Label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-sm text-destructive">{errors.agreeToTerms.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="tournament"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Registration...
                  </>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;