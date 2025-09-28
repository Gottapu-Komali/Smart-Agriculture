import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, Upload, CheckCircle, AlertTriangle, Leaf, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import diseaseImage from "@/assets/disease-detection.jpg";

interface DiseaseDetectionProps {
  onBack: () => void;
}

const DiseaseDetection = ({ onBack }: DiseaseDetectionProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = [
        {
          condition: "Healthy Crop",
          confidence: 92,
          severity: "None",
          treatment: "Continue current care routine. Monitor regularly for any changes.",
          prevention: "Maintain proper watering schedule and ensure good air circulation.",
          status: "healthy"
        },
        {
          condition: "Leaf Spot Disease",
          confidence: 87,
          severity: "Moderate",
          treatment: "Apply copper-based fungicide. Remove affected leaves and improve air circulation.",
          prevention: "Avoid overhead watering. Ensure proper plant spacing for air flow.",
          status: "disease"
        },
        {
          condition: "Nutrient Deficiency",
          confidence: 78,
          severity: "Mild",
          treatment: "Apply balanced fertilizer with nitrogen supplement. Test soil pH levels.",
          prevention: "Regular soil testing and proper fertilization schedule.",
          status: "warning"
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Detected: ${randomResult.condition} with ${randomResult.confidence}% confidence`,
      });
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'disease':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      default:
        return <Leaf className="h-6 w-6 text-agriculture-primary" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'disease':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-agriculture-primary/10 text-agriculture-primary border-agriculture-primary/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-agriculture-forest">Crop Disease Detection</h1>
            <p className="text-muted-foreground">Upload crop images for AI-powered disease analysis</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="h-6 w-6 mr-2 text-agriculture-primary" />
                Image Upload & Analysis
              </CardTitle>
              <CardDescription>
                Take a photo or upload an image of your crops for instant disease detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Preview */}
              <div className="border-2 border-dashed border-agriculture-primary/30 rounded-lg p-8 text-center bg-agriculture-primary/5">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded crop" 
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-card-custom"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-16 w-16 mx-auto text-agriculture-primary/60" />
                    <div>
                      <h3 className="text-lg font-semibold text-agriculture-forest">Upload Crop Image</h3>
                      <p className="text-muted-foreground">PNG, JPG up to 10MB</p>
                    </div>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      Choose File
                      <Upload className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Analysis Button */}
              <Button 
                className="w-full bg-gradient-primary hover:shadow-agriculture transition-all duration-300"
                onClick={analyzeImage}
                disabled={!selectedImage || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Zap className="mr-2 h-4 w-4 animate-pulse" />
                    Analyzing Image...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Analyze for Diseases
                  </>
                )}
              </Button>

              {/* Sample Image */}
              {!selectedImage && (
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-2">Or try with sample image:</p>
                  <img 
                    src={diseaseImage} 
                    alt="Sample crop for analysis" 
                    className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage(diseaseImage)}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="h-6 w-6 mr-2 text-agriculture-primary" />
                Analysis Results
              </CardTitle>
              <CardDescription>
                AI-powered crop health assessment and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-agriculture-primary mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-agriculture-forest">Analyzing Your Crop</h3>
                  <p className="text-muted-foreground">AI is examining the image for diseases and conditions...</p>
                </div>
              ) : analysisResult ? (
                <div className="space-y-6">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(analysisResult.status)}>
                      {getStatusIcon(analysisResult.status)}
                      <span className="ml-2">{analysisResult.condition}</span>
                    </Badge>
                    <span className="text-2xl font-bold text-agriculture-primary">
                      {analysisResult.confidence}%
                    </span>
                  </div>

                  {/* Severity */}
                  <div>
                    <h4 className="font-semibold text-agriculture-forest mb-2">Severity Level</h4>
                    <Badge variant="outline" className="border-agriculture-primary/30">
                      {analysisResult.severity}
                    </Badge>
                  </div>

                  {/* Treatment */}
                  <div>
                    <h4 className="font-semibold text-agriculture-forest mb-2">Recommended Treatment</h4>
                    <p className="text-sm bg-agriculture-primary/5 p-3 rounded-lg border border-agriculture-primary/20">
                      {analysisResult.treatment}
                    </p>
                  </div>

                  {/* Prevention */}
                  <div>
                    <h4 className="font-semibold text-agriculture-forest mb-2">Prevention Tips</h4>
                    <p className="text-sm bg-agriculture-accent/5 p-3 rounded-lg border border-agriculture-accent/20">
                      {analysisResult.prevention}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-agriculture-primary text-agriculture-primary hover:bg-agriculture-primary hover:text-white"
                    >
                      Save Report
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-agriculture-accent text-agriculture-accent hover:bg-agriculture-accent hover:text-white"
                    >
                      Find Suppliers
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Leaf className="h-16 w-16 mx-auto text-agriculture-primary/30 mb-4" />
                  <h3 className="text-lg font-semibold text-agriculture-forest">Ready for Analysis</h3>
                  <p className="text-muted-foreground">Upload an image to get started with disease detection</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardHeader>
              <CardTitle className="text-lg">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Upload a clear image of your crop leaves</li>
                <li>AI analyzes patterns and symptoms</li>
                <li>Get instant diagnosis and confidence score</li>
                <li>Receive treatment and prevention recommendations</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardHeader>
              <CardTitle className="text-lg">Supported Crops</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['Tomato', 'Corn', 'Potato', 'Wheat', 'Rice', 'Soybean'].map((crop) => (
                  <Badge key={crop} variant="secondary" className="text-xs">
                    {crop}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardHeader>
              <CardTitle className="text-lg">Accuracy Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Disease Detection</span>
                  <span className="font-semibold text-agriculture-primary">94%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Healthy Crop ID</span>
                  <span className="font-semibold text-agriculture-primary">96%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Treatment Success</span>
                  <span className="font-semibold text-agriculture-primary">89%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;