import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [homes, setHome] = useState("Home");
  const [apex, setApex] = useState();
  const acc = {};
  const [cru, setCru] = useState(true);
  for (let i = 0; i < apex?.length; i++) {
    const element = apex[i];
    const home = element.home;
    acc[home] = (acc[home] || 0) + 1;
  }

  let elemenTampil = apex?.filter((element) => acc[element.home] === +homes);
  let filtered = apex?.filter((e) => e.home == homes);
  const [search, setSearch] = useState();
  let searchResult = apex?.filter((e) => {
    return e.name.toLowerCase().includes(search?.toLowerCase());
  });

  let finalFilter;
  if (homes === "All" || homes === "Home") {
    finalFilter = apex;
  } else if (cru) {
    finalFilter = filtered;
  } else if (search) {
    finalFilter = searchResult;
  } else if (search == []) {
    finalFilter = apex;
  } else {
    finalFilter = elemenTampil;
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCru(false);
  };

  console.log(finalFilter);
  const handleSelectChange = (event) => {
    setHome(event.target.value);
    setCru(true);
  };
  const handleSelectChangeNum = (event) => {
    setHome(event.target.value);
    setCru(false);
  };
  // console.log(finalFilter);
  useEffect(() => {
    fetch("https://raddythebrand.github.io/apex-legends/data.json")
      .then((response) => response.json())
      .then((data) => {
        setApex(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h6>{search}</h6>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        className="w-[25%]  shadow-black shadow-2xl mt-10  border rounded text-black"
      />
      <table className="border-collapse w-full my-5">
        <thead className="">
          <tr className="h-[100px] bg-gray-800 text-white">
            <th className="border">No</th>
            <th className="border">Name</th>
            <th className="border">Nick Name</th>
            <th className="border">Quote</th>
            <th className="border">Thumbnail</th>
            <th className="border">Type</th>
            <th className="border   w-[15%] p-4">
              Home
              <div>
                <select
                  // onClick={setCru(false)}
                  value={homes}
                  onChange={handleSelectChange}
                  className="bg-gray-800 "
                  name=""
                  id=""
                >
                  <option className="text-center" value="Home">
                    All Home
                  </option>
                  <option value="Unknown">Unknown</option>
                  <option value="Gridiron">Gridiron</option>
                  <option value="Talos">Talos</option>
                  <option value="Gaea">Gaea</option>
                  <option value="Salvo">Salvo</option>
                  <option value="Solace">Solace</option>
                  <option value="Psamathe">Psamathe</option>
                  <option value="None">None</option>
                  <option value="Boreas">Boreas</option>
                  <option value="Angelia">Angelia</option>
                  <option value="Págos">Págos</option>
                  <option value="Typhon">Typhon</option>
                  <option value="He’s trying to find out!">He's trying to find out!</option>
                </select>
              </div>
            </th>
            <th className="border px-6">
              Category Number
              <div>
                <select value={homes} onChange={handleSelectChangeNum} className="bg-gray-800">
                  <option value="All">All</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {apex ? (
            finalFilter?.map((e, i) => {
              return (
                <tr key={e.quote} className="bg-gray-100">
                  <td className=" border">{i + 1}</td>
                  <td className=" border">{e.name}</td>
                  <td className=" border">{e.nickname}</td>
                  <td className="px-3 border">{e.quote}</td>
                  <td className=" border">
                    <img src={e.thumbnail.small} alt="" />
                  </td>
                  <td className=" border">{e.type}</td>
                  <td className=" border">{e.home}</td>
                  <td className=" border">{acc[e.home]}</td>
                </tr>
              );
            })
          ) : (
            <tr className="bg-gray-100 ">
              <td className="border">Loading ... </td>
              <td className="border">Loading ... </td>
              <td className="border">Loading ... </td>
              <td className="border">Loading ... </td>
              <td className="border">Loading ... </td>
              <td className="border">Loading ... </td>
              <td className="border">Loading ... </td>
              <td className="border">Loading ... </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default App;
