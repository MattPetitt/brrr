import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";

const TreeMap = dynamic(() => import("../components/TreeMap"), { ssr: false });
const PieChart = dynamic(() => import("../components/PieChart"), {
  ssr: false,
});

const data = {
  industries: [
    {
      name: "Technology",
      color: "hsl(123, 100%, 50%)",
      children: [
        {
          name: "Large Cap",
          children: [
            {
              name: "Amazon",
              value: 1156,
            },
            {
              name: "Apple",
              value: 1852,
            },
            {
              name: "Google",
              value: 1675,
            },
            {
              name: "Netflix",
              value: 1513,
            },
          ],
        },
        {
          name: "Mid Cap",
          children: [
            {
              name: "Shopify",
              value: 1156,
            },
            {
              name: "Nvidia",
              value: 1852,
            },
            {
              name: "AMD",
              value: 1675,
            },
            {
              name: "Square",
              value: 1533,
            },
          ],
        },
      ],
    },
    {
      name: "Energy",
      color: "hsl(185, 100%, 50%)",
      children: [
        {
          name: "Large Cap",
          color: "hsl(185, 100%, 50%)",
          children: [
            {
              name: "Amazon",
              value: 1106,
            },
            {
              name: "Apple",
              value: 1402,
            },
            {
              name: "Google",
              value: 5875,
            },
            {
              name: "Netflix",
              value: 1513,
            },
          ],
        },
        {
          name: "Mid Cap",
          children: [
            {
              name: "Shopify",
              value: 1106,
            },
            {
              name: "Nvidia",
              value: 1402,
            },
            {
              name: "AMD",
              value: 5875,
            },
            {
              name: "Square",
              value: 7713,
            },
          ],
        },
      ],
    },
    {
      name: "Finance",
      color: "red",
      children: [
        {
          name: "Large Cap",
          children: [
            {
              name: "Amazon",
              value: 1506,
            },
            {
              name: "Apple",
              value: 1402,
            },
            {
              name: "Google",
              value: 1675,
            },
            {
              name: "Netflix",
              value: 1713,
            },
          ],
        },
        {
          name: "Mid Cap",
          children: [
            {
              name: "Shopify",
              value: 1106,
            },
            {
              name: "Nvidia",
              value: 1852,
            },
            {
              name: "AMD",
              value: 1875,
            },
            {
              name: "Square",
              value: 1573,
            },
          ],
        },
      ],
    },
  ],
};

const getRandomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

const stockDataToTreeChart = (stockData) => {
  return {
    name: "Your Portfolio",
    color: "hsl(185, 100%, 50%)",
    children: stockData.industries,
  };
};

const stockDataToPieChart = (stockData) => {
  const data = stockData.industries.map((industry) => {
    let value = 0;
    industry.children.map((category) => {
      category.children.map((stock) => {
        value = value + stock.value;
      });
    });

    return {
      // replace with ticker
      id: industry.name,
      label: industry.name,
      value,
      color: industry.color,
    };
  });
  return data;
};

function Home() {
  return (
    <div>
      <Head>
        <title>Index Funder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white min-h-screen">
        <header className="bg-gray-50 relative z-40 shadow">
          <div className="max-w-7xl mx-auto py-6 px-10">
            <h1 className="text-3xl font-bold leading-tight text-gray-800">
              Portfolio Manager
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="flex flex-wrap">
                <TreeMap data={stockDataToTreeChart(data)} />
                <PieChart data={stockDataToPieChart(data)} />
              </div>
              <table className="table-auto w-full mt-6">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border border-gray-500 text-gray-600">
                      Company
                    </th>
                    <th className="px-4 py-2 border border-gray-500 text-gray-600">
                      Category
                    </th>
                    <th className="px-4 py-2 border border-gray-500 text-gray-600">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.industries.map((industry) => {
                    return industry.children.map((category) => {
                      return category.children.map((stock) => {
                        return (
                          <tr>
                            <td className="border border-gray-500 px-4 py-2 text-gray-600 font-medium">
                              {stock.name}
                            </td>
                            <td className="border border-gray-500 px-4 py-2 text-gray-600 font-medium">
                              {industry.name}
                            </td>
                            <td className="border border-gray-500 px-4 py-2 text-gray-600 font-medium">
                              {stock.value}
                            </td>
                          </tr>
                        );
                      });
                    });
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
