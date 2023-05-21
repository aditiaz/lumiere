import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [homes, setHome] = useState("Home");
  const [apex, setApex] = useState();

  const acc = {};
  for (let i = 0; i < apex?.length; i++) {
    const element = apex[i];
    const home = element.home;
    acc[home] = (acc[home] || 0) + 1;
  }

  // let elemenTampil = apex?.filter((element) => acc[element.home] === +homes);

  const [search, setSearch] = useState();
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

  let finalFilter;

  if (search) {
    const searchResult = apex.filter((e) => {
      return e.name.toLowerCase().includes(search.toLowerCase());
    });
    finalFilter = searchResult;
  } else if (homes === 1 || homes === 2 || homes === 3 || homes === 4) {
    finalFilter = apex.filter((element) => acc[element.home] === +homes);
  } else if (homes !== "Home" && homes !== 0) {
    const filteredByCategory = apex.filter((element) => element.home === homes);
    finalFilter = filteredByCategory;
  } else if (homes == "Home" || homes == 0) {
    finalFilter = apex;
  }

  console.log("homes", homes);
  console.log("apex", apex);
  console.log("finalFilter", finalFilter);

  const handleSelectChange = (event) => {
    setHome(event.target.value);
    setSearch(null);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSelectChangeNum = (event) => {
    setHome(Number(event.target.value));
    setSearch(null);
  };

  return (
    <>
      <h6>{search}</h6>
      <input
        type="text"
        placeholder="Search by name ..."
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
                  <option value={0}>All</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
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
