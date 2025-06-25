
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { ServiceCategory } from "@/types/service";

interface ServiceStatsProps {
  services: ServiceCategory[];
}

const ServiceStats = ({ services }: ServiceStatsProps) => {
  const totalServices = services.length;
  const activeServices = services.filter(s => s.status === 'active').length;
  const draftServices = services.filter(s => s.status === 'draft').length;
  const avgPrice = services.length > 0 
    ? Math.round(services.reduce((acc, s) => acc + (s.pricing?.basePrice || 0), 0) / services.length)
    : 0;

  const mainServices = services.filter(s => s.level === 'main').length;
  const subServices = services.filter(s => s.level === 'sub').length;
  const variants = services.filter(s => s.level === 'variant').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Services</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalServices}</div>
          <p className="text-xs text-muted-foreground">
            {mainServices} main, {subServices} sub, {variants} variants
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Services</CardTitle>
          <Package className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeServices}</div>
          <p className="text-xs text-muted-foreground">Currently available</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Draft Services</CardTitle>
          <Package className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{draftServices}</div>
          <p className="text-xs text-muted-foreground">Under development</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
          <Package className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{avgPrice.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Average service price</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceStats;
