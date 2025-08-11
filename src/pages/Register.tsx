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
  paymentBank: z.enum(["BOC", "Commercial Bank"], {
    required_error: "Please select the bank you used for payment",
  }),
  paymentReference: z.string().min(3, "Payment reference is required"),
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
  const watchedPaymentBank = watch("paymentBank");
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
      <div className="min-h-screen bg-muted/50 py-12">
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
                  <div><span className="font-medium">Payment Bank:</span> {registrationData.paymentBank}</div>
                  <div className="md:col-span-2">
                    <span className="font-medium">Payment Reference:</span> {registrationData.paymentReference}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={copyReference}
                  variant="outline"
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Reference
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
                <p>Thank you for registering! We'll see you at the tournament.</p>
                <p className="mt-1">For any questions, contact: 074 123 1133</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Trophy className="h-8 w-8 text-chess-yellow" />
            <h1 className="text-3xl lg:text-4xl font-bold">Tournament Registration</h1>
          </div>
          <p className="text-xl text-muted-foreground">Chess Tournament – Season 06</p>
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
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nameWithInitials">Name with Initials *</Label>
                  <Input
                    id="nameWithInitials"
                    {...register("nameWithInitials")}
                    placeholder="e.g., A.B. Smith"
                  />
                  {errors.nameWithInitials && (
                    <p className="text-sm text-destructive">{errors.nameWithInitials.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fideId">FIDE ID (Optional)</Label>
                <Input
                  id="fideId"
                  {...register("fideId")}
                  placeholder="Enter your FIDE ID if you have one"
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
                  />
                  {errors.contactNumber && (
                    <p className="text-sm text-destructive">{errors.contactNumber.message}</p>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Payment Bank *</Label>
                  <Select value={watchedPaymentBank} onValueChange={(value) => setValue("paymentBank", value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BOC">Bank of Ceylon (BOC)</SelectItem>
                      <SelectItem value="Commercial Bank">Commercial Bank</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.paymentBank && (
                    <p className="text-sm text-destructive">{errors.paymentBank.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentReference">Payment Reference / Slip No. *</Label>
                  <Input
                    id="paymentReference"
                    {...register("paymentReference")}
                    placeholder="Enter payment reference"
                  />
                  {errors.paymentReference && (
                    <p className="text-sm text-destructive">{errors.paymentReference.message}</p>
                  )}
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
                    I confirm the above details are correct and I've paid the entry fee of 1000 LKR. *
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