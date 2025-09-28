import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Thermometer, Droplets, Wind, Zap, MapPin, RefreshCw, AlertCircle } from "lucide-react";
import iotImage from "@/assets/iot-monitoring.jpg";

interface IoTDashboardProps {
  onBack: () => void;
}

interface SensorData {
  id: string;
  name: string;
  location: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  lightLevel: number;
  batteryLevel: number;
  status: 'online' | 'offline' | 'warning';
  lastUpdate: string;
}

const IoTDashboard = ({ onBack }: IoTDashboardProps) => {
  const [sensors, setSensors] = useState<SensorData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Generate mock sensor data
  const generateSensorData = (): SensorData[] => {
    const locations = ['Field A - North', 'Field B - South', 'Greenhouse 1', 'Field C - East'];
    const statuses: ('online' | 'offline' | 'warning')[] = ['online', 'online', 'online', 'warning'];
    
    return Array.from({ length: 4 }, (_, i) => ({
      id: `sensor-${i + 1}`,
      name: `Sensor ${i + 1}`,
      location: locations[i],
      temperature: Math.round((Math.random() * 15 + 20) * 10) / 10, // 20-35°C
      humidity: Math.round((Math.random() * 40 + 40) * 10) / 10, // 40-80%
      soilMoisture: Math.round((Math.random() * 60 + 20) * 10) / 10, // 20-80%
      lightLevel: Math.round((Math.random() * 80 + 20) * 10) / 10, // 20-100%
      batteryLevel: Math.round((Math.random() * 40 + 60) * 10) / 10, // 60-100%
      status: statuses[i],
      lastUpdate: new Date(Date.now() - Math.random() * 300000).toLocaleTimeString() // Last 5 minutes
    }));
  };

  useEffect(() => {
    setSensors(generateSensorData());
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => ({
        ...sensor,
        temperature: Math.round((sensor.temperature + (Math.random() - 0.5) * 0.2) * 10) / 10,
        humidity: Math.round((sensor.humidity + (Math.random() - 0.5) * 2) * 10) / 10,
        soilMoisture: Math.round((sensor.soilMoisture + (Math.random() - 0.5) * 1) * 10) / 10,
        lastUpdate: new Date().toLocaleTimeString()
      })));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSensors(generateSensorData());
      setIsRefreshing(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'offline':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />;
      case 'offline':
        return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full" />;
    }
  };

  const getValueColor = (value: number, type: string) => {
    if (type === 'temperature') {
      if (value < 15 || value > 35) return 'text-red-500';
      if (value < 20 || value > 30) return 'text-yellow-500';
      return 'text-green-500';
    }
    if (type === 'humidity') {
      if (value < 30 || value > 80) return 'text-red-500';
      if (value < 40 || value > 70) return 'text-yellow-500';
      return 'text-green-500';
    }
    if (type === 'soilMoisture') {
      if (value < 30) return 'text-red-500';
      if (value < 40) return 'text-yellow-500';
      return 'text-green-500';
    }
    return 'text-agriculture-primary';
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
              <h1 className="text-3xl font-bold text-agriculture-forest">IoT Monitoring Dashboard</h1>
              <p className="text-muted-foreground">Real-time sensor data from your fields</p>
            </div>
          </div>
          <Button 
            onClick={refreshData} 
            disabled={isRefreshing}
            variant="outline"
            className="border-agriculture-primary text-agriculture-primary hover:bg-agriculture-primary hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Updating...' : 'Refresh'}
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Thermometer className="h-8 w-8 text-agriculture-primary mr-3" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Temperature</p>
                  <p className="text-2xl font-bold text-agriculture-forest">
                    {sensors.length > 0 ? Math.round(sensors.reduce((acc, s) => acc + s.temperature, 0) / sensors.length * 10) / 10 : 0}°C
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Droplets className="h-8 w-8 text-agriculture-accent mr-3" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Soil Moisture</p>
                  <p className="text-2xl font-bold text-agriculture-forest">
                    {sensors.length > 0 ? Math.round(sensors.reduce((acc, s) => acc + s.soilMoisture, 0) / sensors.length * 10) / 10 : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Wind className="h-8 w-8 text-agriculture-secondary mr-3" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Humidity</p>
                  <p className="text-2xl font-bold text-agriculture-forest">
                    {sensors.length > 0 ? Math.round(sensors.reduce((acc, s) => acc + s.humidity, 0) / sensors.length * 10) / 10 : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card-custom">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-agriculture-earth mr-3" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Sensors</p>
                  <p className="text-2xl font-bold text-agriculture-forest">
                    {sensors.filter(s => s.status === 'online').length}/{sensors.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sensor Grid */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-0 shadow-card-custom">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-agriculture-primary" />
                  Field Sensors
                </CardTitle>
                <CardDescription>
                  Real-time monitoring data from IoT sensors across your fields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {sensors.map((sensor) => (
                    <Card key={sensor.id} className="border border-agriculture-primary/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="font-semibold text-agriculture-forest">{sensor.name}</div>
                            <Badge className={getStatusColor(sensor.status)}>
                              {getStatusIcon(sensor.status)}
                              <span className="ml-2 capitalize">{sensor.status}</span>
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Last update: {sensor.lastUpdate}
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          {sensor.location}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="flex items-center mb-1">
                              <Thermometer className="h-4 w-4 mr-1 text-agriculture-primary" />
                              <span className="text-xs font-medium">Temperature</span>
                            </div>
                            <div className={`text-lg font-bold ${getValueColor(sensor.temperature, 'temperature')}`}>
                              {sensor.temperature}°C
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center mb-1">
                              <Wind className="h-4 w-4 mr-1 text-agriculture-accent" />
                              <span className="text-xs font-medium">Humidity</span>
                            </div>
                            <div className={`text-lg font-bold ${getValueColor(sensor.humidity, 'humidity')}`}>
                              {sensor.humidity}%
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center mb-1">
                              <Droplets className="h-4 w-4 mr-1 text-agriculture-secondary" />
                              <span className="text-xs font-medium">Soil Moisture</span>
                            </div>
                            <div className={`text-lg font-bold ${getValueColor(sensor.soilMoisture, 'soilMoisture')}`}>
                              {sensor.soilMoisture}%
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center mb-1">
                              <Zap className="h-4 w-4 mr-1 text-agriculture-earth" />
                              <span className="text-xs font-medium">Battery</span>
                            </div>
                            <div className="text-lg font-bold text-agriculture-forest">
                              {sensor.batteryLevel}%
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Alerts */}
            <Card className="bg-gradient-card border-0 shadow-card-custom">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-6 w-6 mr-2 text-yellow-500" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-sm font-medium">Low Soil Moisture</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Field A - North requires irrigation</p>
                  </div>
                  
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm font-medium">High Temperature</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Greenhouse 1 needs ventilation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card border-0 shadow-card-custom">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-agriculture-primary text-agriculture-primary hover:bg-agriculture-primary hover:text-white"
                >
                  <Droplets className="h-4 w-4 mr-2" />
                  Trigger Irrigation
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-agriculture-accent text-agriculture-accent hover:bg-agriculture-accent hover:text-white"
                >
                  <Wind className="h-4 w-4 mr-2" />
                  Open Ventilation
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-agriculture-secondary text-agriculture-secondary hover:bg-agriculture-secondary hover:text-white"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Configure Sensors
                </Button>
              </CardContent>
            </Card>

            {/* Field Overview */}
            <Card className="bg-gradient-card border-0 shadow-card-custom">
              <CardHeader>
                <CardTitle>Field Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={iotImage} 
                  alt="IoT sensors in field" 
                  className="w-full h-32 object-cover rounded-lg shadow-card-custom"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Area</span>
                    <span className="font-semibold">12.5 hectares</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Sensors Deployed</span>
                    <span className="font-semibold">{sensors.length} units</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Coverage</span>
                    <span className="font-semibold text-green-600">98%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTDashboard;