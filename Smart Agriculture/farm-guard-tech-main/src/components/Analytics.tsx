import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, Leaf, Calendar, Target, AlertTriangle } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsProps {
  onBack: () => void;
}

const Analytics = ({ onBack }: AnalyticsProps) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Mock data for charts
  const yieldData = [
    { month: 'Jan', yield: 850, target: 800, diseases: 12 },
    { month: 'Feb', yield: 920, target: 850, diseases: 8 },
    { month: 'Mar', yield: 890, target: 900, diseases: 15 },
    { month: 'Apr', yield: 950, target: 920, diseases: 6 },
    { month: 'May', yield: 1100, target: 980, diseases: 4 },
    { month: 'Jun', yield: 1050, target: 1000, diseases: 9 },
  ];

  const cropHealthData = [
    { name: 'Healthy', value: 78, color: '#22c55e' },
    { name: 'At Risk', value: 15, color: '#f59e0b' },
    { name: 'Diseased', value: 7, color: '#ef4444' },
  ];

  const sensorTrendsData = [
    { date: '2024-01-01', temperature: 22, humidity: 65, soilMoisture: 45 },
    { date: '2024-01-02', temperature: 24, humidity: 62, soilMoisture: 48 },
    { date: '2024-01-03', temperature: 23, humidity: 68, soilMoisture: 42 },
    { date: '2024-01-04', temperature: 25, humidity: 60, soilMoisture: 50 },
    { date: '2024-01-05', temperature: 26, humidity: 58, soilMoisture: 52 },
    { date: '2024-01-06', temperature: 24, humidity: 64, soilMoisture: 49 },
    { date: '2024-01-07', temperature: 23, humidity: 66, soilMoisture: 47 },
  ];

  const diseaseDetectionData = [
    { disease: 'Leaf Spot', cases: 45, severity: 'Medium' },
    { disease: 'Rust', cases: 32, severity: 'Low' },
    { disease: 'Blight', cases: 18, severity: 'High' },
    { disease: 'Mosaic Virus', cases: 12, severity: 'Medium' },
    { disease: 'Root Rot', cases: 8, severity: 'High' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-agriculture-forest">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Comprehensive insights into your farming operations</p>
            </div>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex space-x-2">
            {(['7d', '30d', '90d', '1y'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={timeRange === range ? "bg-agriculture-primary hover:bg-agriculture-primary/90" : "border-agriculture-primary text-agriculture-primary hover:bg-agriculture-primary hover:text-white"}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Yield</p>
                  <p className="text-2xl font-bold text-agriculture-forest">5,765 kg</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12.5%</span>
                  </div>
                </div>
                <BarChart3 className="h-8 w-8 text-agriculture-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Diseases Detected</p>
                  <p className="text-2xl font-bold text-agriculture-forest">23</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">-18.2%</span>
                  </div>
                </div>
                <AlertTriangle className="h-8 w-8 text-agriculture-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Crop Health Score</p>
                  <p className="text-2xl font-bold text-agriculture-forest">94%</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+5.1%</span>
                  </div>
                </div>
                <Leaf className="h-8 w-8 text-agriculture-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Target Achievement</p>
                  <p className="text-2xl font-bold text-agriculture-forest">107%</p>
                  <div className="flex items-center mt-1">
                    <Target className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">Above target</span>
                  </div>
                </div>
                <Target className="h-8 w-8 text-agriculture-earth" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="yield" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="yield">Yield Analysis</TabsTrigger>
            <TabsTrigger value="health">Crop Health</TabsTrigger>
            <TabsTrigger value="sensors">Sensor Data</TabsTrigger>
            <TabsTrigger value="diseases">Disease Tracking</TabsTrigger>
          </TabsList>

          {/* Yield Analysis Tab */}
          <TabsContent value="yield" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-card-custom">
                <CardHeader>
                  <CardTitle>Yield vs Target</CardTitle>
                  <CardDescription>Monthly yield performance compared to targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={yieldData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="target" stackId="1" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="yield" stackId="2" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-card-custom">
                <CardHeader>
                  <CardTitle>Disease Impact on Yield</CardTitle>
                  <CardDescription>Correlation between disease cases and yield</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={yieldData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="right" dataKey="diseases" fill="#f59e0b" fillOpacity={0.6} />
                      <Line yAxisId="left" type="monotone" dataKey="yield" stroke="#22c55e" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-card border-0 shadow-card-custom">
              <CardHeader>
                <CardTitle>Yield Insights</CardTitle>
                <CardDescription>AI-generated recommendations based on your data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-semibold text-green-800">Best Performance</span>
                    </div>
                    <p className="text-sm text-green-700">May showed 12% above target yield. Consider replicating conditions used in that period.</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                      <span className="font-semibold text-yellow-800">Attention Needed</span>
                    </div>
                    <p className="text-sm text-yellow-700">March had higher disease cases. Review prevention strategies for similar weather patterns.</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Target className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-800">Optimization</span>
                    </div>
                    <p className="text-sm text-blue-700">Projected Q3 yield can increase by 8% with optimized irrigation timing.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Crop Health Tab */}
          <TabsContent value="health" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-card-custom">
                <CardHeader>
                  <CardTitle>Overall Crop Health</CardTitle>
                  <CardDescription>Distribution of crop health status across fields</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={cropHealthData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {cropHealthData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center space-x-6 mt-4">
                    {cropHealthData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-card-custom">
                <CardHeader>
                  <CardTitle>Health Score Trends</CardTitle>
                  <CardDescription>Weekly crop health score progression</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                      { week: 'W1', score: 89 },
                      { week: 'W2', score: 92 },
                      { week: 'W3', score: 87 },
                      { week: 'W4', score: 94 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sensor Data Tab */}
          <TabsContent value="sensors" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-card-custom">
              <CardHeader>
                <CardTitle>Environmental Conditions</CardTitle>
                <CardDescription>7-day trend of key environmental parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={sensorTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} name="Temperature (°C)" />
                    <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} name="Humidity (%)" />
                    <Line type="monotone" dataKey="soilMoisture" stroke="#22c55e" strokeWidth={2} name="Soil Moisture (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disease Tracking Tab */}
          <TabsContent value="diseases" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-card-custom">
              <CardHeader>
                <CardTitle>Disease Detection Summary</CardTitle>
                <CardDescription>Most common diseases detected and their severity levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {diseaseDetectionData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-agriculture-primary/20 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-8 bg-agriculture-primary rounded-full"></div>
                        <div>
                          <h4 className="font-semibold text-agriculture-forest">{item.disease}</h4>
                          <p className="text-sm text-muted-foreground">{item.cases} cases detected</p>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(item.severity)}>
                        {item.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;