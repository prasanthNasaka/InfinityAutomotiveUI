const Table = () => {
  return (
    <div className="w-full h-screen overflow-y-auto px-4">
      <div className="relative border rounded-t-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                SL.No
              </th>
              <th scope="col" className="px-6 py-3">
                Contestant No
              </th>
              <th scope="col" className="px-6 py-3">
                Driver
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Duration
              </th>
              <th scope="col" className="px-6 py-3">
                Penaulty
              </th>
              <th scope="col" className="px-6 py-3">
                POS
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Teams
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:bg-gray-800 dark:divide-gray-700">
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                2
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                3
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                4
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                5
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                6
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                7
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                8
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                9
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                10
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                11
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                12
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                13
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                14
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                15
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                16
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                17
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                18
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                19
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                20
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                21
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                22
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                23
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                24
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                25
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                26
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                27
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                28
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                29
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                30
              </th>
              <td className="px-6 py-4">123</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">1000CC</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">00:00:00:000</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">Null</td>
              <td className="px-6 py-4">Null</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
