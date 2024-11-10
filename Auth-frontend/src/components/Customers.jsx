import React from 'react';
import { useEffect, useState } from 'react';


const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/customers');
        const data = await response.json();
        if (data.success) {
          setCustomers(data.customers);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      <div className="container mx-auto px-4 py-8">
      <div className='justify-center flex'>  <span className="text-3xl mx-5 font-bold mb-6 text-green-800">beSecure <p className="text-green-900 text-sm">Active Customers </p></span></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {customers.map((customer) => (
            <div
              key={customer.customerId}
              className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border border-green-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">
                    {customer.customerName.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-green-800">{customer.customerName}</h2>
                  <p className="text-green-600">{customer.email}</p>
                </div>
              </div>
              
              {customer.plans.map((plan) => (
                <div key={plan.planId} className="mt-4 p-4 bg-green-50/80 rounded-md border border-green-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-green-700">Plan Amount:</span>
                    <span className="font-semibold text-green-800">
                      ${plan.amount} {plan.currency.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-green-700">Status:</span>
                    <span className={`font-semibold ${
                      plan.status === 'active' ? 'text-emerald-600' :
                      plan.status === 'canceled' ? 'text-red-600' :
                      plan.status === 'past_due' ? 'text-amber-600' : 'text-green-600'
                    }`}>
                      {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Next Payment:</span>
                    <span className="font-semibold text-green-800">
                      {new Date(plan.current_period_end).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customers;
