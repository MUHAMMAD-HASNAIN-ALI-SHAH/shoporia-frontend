import {
  ChartBarIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const AdminPerformancePage = () => {
  const stats = [
    { name: "Total Sales", value: "$24,567", icon: CurrencyDollarIcon },
    { name: "Total Orders", value: "1,234", icon: ShoppingBagIcon },
    { name: "Total Users", value: "5,678", icon: UserGroupIcon },
    { name: "Conversion Rate", value: "3.2%", icon: ChartBarIcon },
  ];
  return (
    <div className="h-full w-full flex justify-start flex-col gap-5 p-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome to your admin dashboard. Here's an overview of your store's
          performance.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat,index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPerformancePage;
