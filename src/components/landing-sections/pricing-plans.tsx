// import React from 'react';

// const PricingPlans: React.FC = () => {
//   const plans = [
//     {
//       name: 'Free',
//       price: '$0',
//       userLimit: '1',
//       llmAccount: 'Customer Account',
//       questions: '300 / Month',
//       tables: '5',
//       dataSize: 'Unlimited',
//       databases: 'MySQL, PostgreSQL',
//       apiIntegration: 'Yes',
//       roleAccess: 'NA',
//       support: 'Regular Support',
//     },
//     {
//       name: 'Standard',
//       price: '$49 / User',
//       userLimit: '10',
//       llmAccount: 'Customer Account',
//       questions: '3000 / User / Month',
//       tables: '10',
//       dataSize: 'Unlimited',
//       databases: 'MySQL, PostgreSQL, MSSQL, MariaDB',
//       apiIntegration: 'Yes',
//       roleAccess: 'No',
//       support: 'Priority Support',
//     },
//     {
//       name: 'Enterprise',
//       price: '$99 / User',
//       userLimit: '10',
//       llmAccount: 'datumsAI OpenAI Account',
//       questions: '1000 / User / Month',
//       tables: '10',
//       dataSize: 'Unlimited',
//       databases: 'MySQL, PostgreSQL, MSSQL, MariaDB',
//       apiIntegration: 'Yes',
//       roleAccess: 'No',
//       support: 'Priority Support',
//     },
//   ];

//   return (
//     <div className="bg-gradient-to-r from-black to-[#0d0f22] p-10 text-white py-32">
//       <h2 className="text-center text-4xl font-bold mb-4">Pricing plans</h2>
//       <p className="text-center mb-8">
//         Lorem ipsum dolor amet, consectetur adipiscing elit. Dictum montes
//         posuere imperdiet leo dictum non donec quisque.
//       </p>

//       <div className="overflow-x-auto">
//         <table className="w-full max-w-5xl mx-auto border-separate border-spacing-y-3">
//           <thead>
//             <tr className="text-left">
//               <th></th>
//               {plans.map((plan, index) => (
//                 <th
//                   key={index}
//                   className={`px-4 py-2 rounded-t-lg ${
//                     plan.name === 'Standard'
//                       ? 'bg-gradient-to-r from-blue-500 to-purple-600'
//                       : 'bg-[#0d0f22]'
//                   }`}
//                 >
//                   <span className="block text-center font-semibold">
//                     {plan.name}
//                   </span>
//                   <span className="block text-center text-2xl font-bold">
//                     {plan.price}
//                   </span>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="px-4 py-2">Max User</td>
//               {plans.map((plan, index) => (
//                 <td key={index} className="px-4 py-2 text-center">
//                   {plan.userLimit}
//                 </td>
//               ))}
//             </tr>
//             <tr>
//               <td className="px-4 py-2">LLM Account</td>
//               {plans.map((plan, index) => (
//                 <td key={index} className="px-4 py-2 text-center">
//                   {plan.llmAccount}
//                 </td>
//               ))}
//             </tr>
//             <tr>
//               <td className="px-4 py-2">Questions</td>
//               {plans.map((plan, index) => (
//                 <td key={index} className="px-4 py-2 text-center">
//                   {plan.questions}
//                 </td>
//               ))}
//             </tr>
//             <tr>
//               <td className="px-4 py-2">Tables Supported</td>
//               {plans.map((plan, index) => (
//                 <td key={index} className="px-4 py-2 text-center">
//                   {plan.tables}
//                 </td>
//               ))}
//             </tr>
//             <tr>
//               <td className="px-4 py-2">Size of Data</td>
//               {plans.map((plan, index) => (
//                 <td key={index} className="px-4 py-2 text-center">
//                   {plan.dataSize}
//                 </td>
//               ))}
//             </tr>
//             <tr>
//               <td className="px-4 py-2">Supported Databases</td>
//               {plans.map((plan, index) => (
//                 <td key={index} className="px-4 py-2 text-center">
//                   {plan.databases}
//                 </td>
//               ))}
//             </tr>
//             <tr>
//               <td className="px-4 py-2">API Integration</td>
//               {plans.map((plan, index) => (
//                 <td key={index} className="px-4 py-2 text-center">
//                   {plan.apiIntegration}
//                 </td>
//               ))}
//             </tr>
//             <tr>
//               <td className="px-4 py-2">Role Based Data Access</td>
//               {plans.map((plan, index) => (
//                 <td key={index} className="px-4 py-2 text-center">
//                   {plan.roleAccess}
//                 </td>
//               ))}
//             </tr>
//             <tr>
//               <td className="px-4 py-2">Support</td>
//               {plans.map((plan, index) => (
//                 <td key={index} className="px-4 py-2 text-center">
//                   {plan.support}
//                 </td>
//               ))}
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <p className="mt-4 text-sm text-center text-gray-400">
//         *Additional server required by client to store the data retrieved via
//         API Response
//       </p>
//     </div>
//   );
// };

// export default PricingPlans;

import React from 'react';

const PricingPlans: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      userLimit: '1',
      llmAccount: 'Customer Account',
      questions: '300 / Month',
      tables: '5',
      dataSize: 'Unlimited',
      databases: 'MySQL, PostgreSQL',
      apiIntegration: 'Yes',
      roleAccess: 'NA',
      support: 'Regular Support',
    },
    {
      name: 'Standard',
      price: '$49 / User',
      userLimit: '10',
      llmAccount: 'Customer Account',
      questions: '3000 / User / Month',
      tables: '10',
      dataSize: 'Unlimited',
      databases: 'MySQL, PostgreSQL, MSSQL, MariaDB',
      apiIntegration: 'Yes',
      roleAccess: 'No',
      support: 'Priority Support',
    },
    {
      name: 'Enterprise',
      price: '$99 / User',
      userLimit: '10',
      llmAccount: 'datumsAI OpenAI Account',
      questions: '1000 / User / Month',
      tables: '10',
      dataSize: 'Unlimited',
      databases: 'MySQL, PostgreSQL, MSSQL, MariaDB',
      apiIntegration: 'Yes',
      roleAccess: 'No',
      support: 'Priority Support',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-black to-[#0d0f22] p-10 text-white py-32">
      <h2 className="text-center text-4xl font-bold mb-4">Pricing Plans</h2>
      <p className="text-center mb-8">
        Lorem ipsum dolor amet, consectetur adipiscing elit. Dictum montes
        posuere imperdiet leo dictum non donec quisque.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full max-w-5xl mx-auto border border-gray-700 rounded-lg">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2"></th>
              {plans.map((plan, index) => (
                <th
                  key={index}
                  className={`px-4 py-4 border border-gray-700 ${
                    plan.name === 'Standard'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-[#0d0f22]'
                  } rounded-t-lg`}
                >
                  <span className="block text-center font-semibold">
                    {plan.name}
                  </span>
                  <span className="block text-center text-2xl font-bold">
                    {plan.price}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Max User', key: 'userLimit' },
              { label: 'LLM Account', key: 'llmAccount' },
              { label: 'Questions', key: 'questions' },
              { label: 'Tables Supported', key: 'tables' },
              { label: 'Size of Data', key: 'dataSize' },
              { label: 'Supported Databases', key: 'databases' },
              { label: 'API Integration', key: 'apiIntegration' },
              { label: 'Role Based Data Access', key: 'roleAccess' },
              { label: 'Support', key: 'support' },
            ].map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`odd:bg-gray-800 even:bg-gray-900 border-t border-gray-700`}
              >
                <td className="px-4 py-4 border border-gray-700">
                  {row.label}
                </td>
                {plans.map((plan, index) => (
                  <td
                    key={index}
                    className="px-4 py-4 text-center border border-gray-700"
                  >
                    {plan[row.key as keyof (typeof plans)[0]]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-center text-gray-400">
        *Additional server required by client to store the data retrieved via
        API Response
      </p>
    </div>
  );
};

export default PricingPlans;
