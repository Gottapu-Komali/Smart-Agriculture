import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, BarChart3, Wifi, Smartphone, Leaf, TrendingUp, Shield, Globe } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";
import DiseaseDetection from "@/components/DiseaseDetection";
import IoTDashboard from "@/components/IoTDashboard";
import Analytics from "@/components/Analytics";

const Index = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'detection' | 'monitoring' | 'analytics'>('home');

  const features = [
    {
      icon: Camera,
      title: "AI Disease Detection",
      description: "Upload crop images to instantly detect diseases and get treatment recommendations",
      color: "agriculture-primary"
    },
    {
      icon: Wifi,
      title: "IoT Monitoring",
      description: "Real-time soil moisture, temperature, and humidity monitoring with smart sensors",
      color: "agriculture-accent"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track crop health trends, yield predictions, and optimize farming practices",
      color: "agriculture-secondary"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Access all features on mobile devices perfect for field use",
      color: "agriculture-earth"
    }
  ];

  const benefits = [
    { icon: TrendingUp, title: "Increase Yield", description: "Up to 30% improvement in crop yield" },
    { icon: Shield, title: "Reduce Losses", description: "Early detection prevents 60% of crop losses" },
    { icon: Leaf, title: "Sustainable Farming", description: "Optimize resource usage for eco-friendly farming" },
    { icon: Globe, title: "Global Access", description: "Multi-language support for farmers worldwide" }
  ];

  if (activeSection === 'detection') {
    return <DiseaseDetection onBack={() => setActiveSection('home')} />;
  }

  if (activeSection === 'monitoring') {
    return <IoTDashboard onBack={() => setActiveSection('home')} />;
  }

  if (activeSection === 'analytics') {
    return <Analytics onBack={() => setActiveSection('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-agriculture-primary" />
            <span className="text-2xl font-bold text-agriculture-forest">SmartAgri</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Button variant="ghost" onClick={() => setActiveSection('detection')}>Disease Detection</Button>
            <Button variant="ghost" onClick={() => setActiveSection('monitoring')}>IoT Monitoring</Button>
            <Button variant="ghost" onClick={() => setActiveSection('analytics')}>Analytics</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge className="bg-agriculture-primary/10 text-agriculture-primary border-agriculture-primary/20">
              🌱 Smart Agriculture Revolution
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-agriculture-forest leading-tight">
              Protect Your Crops with{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Agriculture
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              Detect crop diseases early, monitor soil conditions in real-time, and get personalized farming recommendations to maximize your yield and minimize losses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-agriculture transition-all duration-300"
                onClick={() => setActiveSection('detection')}
              >
                Start Disease Detection
                <Camera className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-agriculture-primary text-agriculture-primary hover:bg-agriculture-primary hover:text-white"
                onClick={() => setActiveSection('monitoring')}
              >
                View Dashboard
                <BarChart3 className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Smart Agriculture Technology" 
              className="rounded-2xl shadow-agriculture w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-hero/20 rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-agriculture-forest mb-4">
            Comprehensive Smart Farming Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to transform your farming practices with cutting-edge technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-card-custom hover:shadow-glow transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    if (feature.title.includes('Disease')) setActiveSection('detection');
                    else if (feature.title.includes('IoT')) setActiveSection('monitoring');
                    else if (feature.title.includes('Analytics')) setActiveSection('analytics');
                  }}>
              <CardHeader className="text-center">
                <feature.icon className={`h-12 w-12 mx-auto mb-4 text-${feature.color}`} />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-agriculture-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-agriculture-forest mb-4">
              Transform Your Farming Success
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of farmers already benefiting from smart agriculture
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-card-custom">
                  <benefit.icon className="h-8 w-8 text-agriculture-primary" />
                </div>
                <h3 className="text-xl font-semibold text-agriculture-forest mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-hero rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Revolutionize Your Farming?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start protecting your crops today with AI-powered agriculture technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-agriculture-primary hover:bg-white/90"
              onClick={() => setActiveSection('detection')}
            >
              Try Disease Detection
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-agriculture-primary"
              onClick={() => setActiveSection('monitoring')}
            >
              Explore Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-agriculture-forest text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Leaf className="h-8 w-8" />
              <span className="text-2xl font-bold">SmartAgri</span>
            </div>
            <p className="text-center md:text-right opacity-80">
              © 2024 SmartAgri. Empowering farmers with intelligent agriculture solutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;