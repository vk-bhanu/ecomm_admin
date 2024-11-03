import SalesChart from "@/components/custom ui/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getSalesPerMonth, getTotalCustomers, getTotalSales } from "@/lib/actions/action";
import { CoinsIcon, ShoppingBagIcon, Users2 } from "lucide-react";
export default async function Home() {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue)
  const totalOrders = await getTotalSales().then((data) => data.totalOrders )
  const totalCustomers = await getTotalCustomers()

  const graphData = await getSalesPerMonth()
  return (
   <div className="px-8 py-10">
    <p className="text-heading2-bold">Dashboard</p>
    <Separator className="my-5 bg-blue-500" />

    <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
      <Card>
        <CardHeader className="flex justify-between items-center flex-row">
          <CardTitle>Total Revenue</CardTitle>
          <CoinsIcon  className="max-sm:hidden"/>
        </CardHeader>
        <CardContent>
          <p className="text-body-bold">₹ {totalRevenue}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between items-center flex-row">
          <CardTitle>Total Orders</CardTitle>
          <ShoppingBagIcon  className="max-sm:hidden"/>
        </CardHeader>
        <CardContent>
          <p className="text-body-bold">{totalOrders}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between items-center flex-row">
          <CardTitle>Total Customers</CardTitle>
          <Users2  className="max-sm:hidden"/>
        </CardHeader>
        <CardContent>
          <p className="text-body-bold">{totalCustomers}</p>
        </CardContent>
      </Card>
    </div>

    <Card className="mt-10">
        <CardHeader>
          <CardTitle>Sales Projection (₹)</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={graphData} />
        </CardContent>
      </Card>      
   </div>
  );
}
